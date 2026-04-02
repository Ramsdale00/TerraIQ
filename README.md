# TerraScope — King Lake ESG & Renewable Feasibility Analysis

A lightweight, interactive ESG and renewable feasibility web application focused on the **King Lake** project site in Cullman County, Alabama (34.1547°N, 86.8503°W).

## Quick Start

No build step required. Open `index.html` directly in a browser, or serve locally:

```bash
python3 -m http.server 8080
# → open http://localhost:8080
```

## Features

- **Interactive map** locked to King Lake region — pan/zoom restricted to project area
- **4 data layers** (toggle from bottom bar):
  - Solar Irradiance heatmap (NREL NSRDB)
  - Wind Speed zones (NREL Wind Toolkit)
  - Soil Moisture (NASA SMAP L3)
  - ESG Risk Zones (EPA EnviroAtlas + USGS NHD + ADEM)
- **ESG Score gauge** (0–100) with Environmental / Social / Governance breakdown
- **Renewable Feasibility metrics** — solar GHI, wind speed, soil moisture
- **AI-generated insights** keyed to real data values

## Real Data Sources

| Layer | Source | Resolution | Values |
|---|---|---|---|
| Solar GHI | NREL NSRDB PSM v3 (2019 TMY) | 4 km | 4.58–5.02 kWh/m²/day |
| Wind Speed | NREL Wind Toolkit (2014) | 2 km | 5.31–6.21 m/s @ 80m |
| Soil Moisture | NASA SMAP L3 SPL3SMP | 36 km | 0.238–0.347 m³/m³ |
| Water Body | USGS NHD / EPA EnviroAtlas | Vector | King Lake, NHDPlus ID 7789254 |
| Watershed | USGS WBD HUC8 | Vector | 03140301 (Mulberry Fork) |

## ESG Score Methodology

```
Environmental (40%) = water quality + soil health + wetland factor
Social       (30%) = distance to population + density + economic benefit
Governance   (30%) = protected zone clearance + regulatory + zoning

King Lake score: 84 / 100
  Environmental: 89  Social: 75  Governance: 87
```

## Tech Stack

- **Map**: Leaflet.js 1.9.4 (CDN)
- **Basemap**: CartoDB Dark Matter (no API key required)
- **Data**: Preprocessed GeoJSON/JS embedded — zero runtime API calls
- **Bundle**: Single HTML file, ~30 KB (excl. Leaflet CDN)
- **Load time**: < 2 seconds

## Site Summary

King Lake is a 312-acre reservoir in the Mulberry Fork sub-watershed of the Black Warrior River Basin (HUC8: 03140301). The site exhibits strong solar and moderate wind resources, with localized regulatory constraints in riparian buffer and wetland areas representing ~8% of the project footprint.
