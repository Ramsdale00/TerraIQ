import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from typing import Dict, Any, List, Optional
import rasterio
import numpy as np

app = FastAPI(title="Solar & Wind Atlas API", description="API for querying Global Solar Atlas and Wind Atlas GeoTIFF data")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Configuration ---
# All paths are relative to the project root for portability.
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
BASE_DIR = os.path.join(ROOT_DIR, "USA_GISdata_LTAy_AvgDailyTotals_GlobalSolarAtlas-v2_GEOTIFF")
WIND_DIR = os.path.join(ROOT_DIR, "WIND")
HEMISPHERE = "western-hemisphere"  # Default for USA (data coverage)

PARAM_DESCRIPTIONS = {
    "GHI":  "Global Horizontal Irradiation (kWh/m²/day)",
    "DNI":  "Direct Normal Irradiation (kWh/m²/day)",
    "DIF":  "Diffuse Horizontal Irradiation (kWh/m²/day)",
    "GTI":  "Global Tilted Irradiation (kWh/m²/day)",
    "PVOUT":"PV Power Output Potential (kWh/kWp/day)",
    "OPTA": "Optimal Tilt Angle (degrees)",
    "TEMP": "Air Temperature (°C)",
}

WIND_PARAMS = {
    "air_density": {
        "100m": "USA_air-density_100m.tif",
        "150m": "USA_air-density_150m.tif",
        "200m": "USA_air-density_200m.tif",
        "unit": "kg/m³",
        "description": "Air Density"
    },
    "power_density": {
        "100m": "USA_power-density_100m.tif",
        "150m": "USA_power-density_150m.tif",
        "200m": "USA_power-density_200m.tif",
        "unit": "W/m²",
        "description": "Wind Power Density"
    },
    "wind_speed": {
        "100m": "USA_wind-speed_100m.tif",
        "150m": "USA_wind-speed_150m.tif",
        "200m": "USA_wind-speed_200m.tif",
        "unit": "m/s",
        "description": "Mean Wind Speed"
    }
}

def get_value_from_tif(tif_path: str, lat: float, lon: float) -> Optional[float]:
    """Retrieves pixel value from a GeoTIFF at specific lat/lon."""
    if not os.path.exists(tif_path):
        return None
    
    with rasterio.open(tif_path) as src:
        # Check if coordinates are within bounds
        if not (src.bounds.left <= lon <= src.bounds.right and src.bounds.bottom <= lat <= src.bounds.top):
            return None
            
        # Sample the value at the given coordinates
        try:
            value = next(src.sample([(lon, lat)]))[0]
            # Handle NoData or NaN values
            if np.isnan(value) or value == src.nodata:
                return None
            return float(value)
        except Exception:
            return None

@app.get("/")
async def root():
    from fastapi.responses import FileResponse
    return FileResponse("index.html")

@app.get("/analyze")
async def analyze(lat: float, lon: float):
    hem_dir = os.path.join(BASE_DIR, HEMISPHERE)
    
    # Initialize results with explicit typing for key-value flexibility
    results: Dict[str, Any] = {
        "coordinates": {"lat": lat, "lon": lon},
        "solar": {
            "yearly_averages": {},
            "monthly_pvout": {}
        },
        "wind": {}
    }

    # 1. Fetch Solar Data (Yearly)
    if os.path.exists(hem_dir):
        for param in PARAM_DESCRIPTIONS.keys():
            tif_path = os.path.join(hem_dir, f"{param}.tif")
            value = get_value_from_tif(tif_path, lat, lon)
            results["solar"]["yearly_averages"][param] = {
                "value": value,
                "description": PARAM_DESCRIPTIONS[param]
            }

        # 2. Fetch Solar Data (Monthly PVOUT)
        monthly_dir = os.path.join(hem_dir, "monthly")
        if os.path.exists(monthly_dir):
            month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            for i in range(1, 13):
                tif_path = os.path.join(monthly_dir, f"PVOUT_{i:02d}.tif")
                value = get_value_from_tif(tif_path, lat, lon)
                results["solar"]["monthly_pvout"][month_names[i-1]] = value

    # 3. Fetch Wind Data (Multiplexed Heights)
    if os.path.exists(WIND_DIR):
        for param_key, param_info in WIND_PARAMS.items():
            param_results = {
                "description": param_info["description"],
                "unit": param_info["unit"],
                "heights": {}
            }
            for height in ["100m", "150m", "200m"]:
                tif_name = param_info[height]
                tif_path = os.path.join(WIND_DIR, tif_name)
                value = get_value_from_tif(tif_path, lat, lon)
                param_results["heights"][height] = value
            
            results["wind"][param_key] = param_results

    # Validation: Check if any valid data was found
    solar_values = [v["value"] for v in results["solar"]["yearly_averages"].values()]
    wind_values = []
    for p in results["wind"].values():
        wind_values.extend(p["heights"].values())
        
    if all(v is None for v in solar_values) and all(v is None for v in wind_values):
        raise HTTPException(status_code=404, detail="No data found for the given coordinates. Make sure they are within the USA bounds.")

    return results

if __name__ == "__main__":
    import uvicorn
    # Launch server on port 8000
    uvicorn.run(app, host="0.0.0.0", port=8000)
