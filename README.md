# ☀️ Solar & Wind Atlas Explorer (USA)

An efficient, lightweight GIS application for analyzing solar and wind potential across the USA. This project provides a unified API and interactive map that retrieves real-time data from local GeoTIFF datasets.

## 🚀 Quick Start

### 1. Installation
Install the necessary Python dependencies:
```bash
pip install -r requirements.txt
```

### 2. Run the Backend
Start the FastAPI server:
```bash
python main.py
```
The application will automatically be available at `http://localhost:8000`.

### 3. Usage
- Open your browser and navigate to `http://localhost:8000`.
- **Click anywhere on the map** within the USA to fetch detailed solar and wind analysis for that specific coordinate.

---

## 🛠️ How it Works

The project is designed to be **portable and efficient**, handling all complex GIS operations on the server side using the `rasterio` library.

### 🏠 Backend Logic (`main.py`)
- **API**: Built with **FastAPI** for high-performance data serving.
- **GIS Sampling**: Uses `rasterio` to perform rapid value sampling from high-resolution GeoTIFF files without loading the entire raster into memory.
- **Portability**: All data paths are relative to the project root, making it a "plug-and-play" solution.

### 📐 Data Layers
The system integrates two major datasets:
1.  **Solar Atlas**: Yearly averages (GHI, DNI, PVOUT, etc.) and Monthly PV power potential.
2.  **Wind Atlas**: Multiplexed wind metrics (**Air Density**, **Power Density**, and **Wind Speed**) queried simultaneously at **100m, 150m, and 200m** heights.

### 🌐 Frontend (`index.html`)
- **Interactive Map**: Powered by **Leaflet.js** for smooth navigation.
- **Dynamic Results**: Displays solar potential, periodic monthly variations, and multi-height wind comparisons in a clean, professional dashboard.

---

## 📂 Project Structure
- `main.py`: The unified API for both solar and wind queries.
- `index.html`: The frontend map interface.
- `WIND/`: GeoTIFF directory for wind datasets (100m–200m).
- `USA_GISdata.../`: GeoTIFF directory for Global Solar Atlas datasets.
- `requirements.txt`: Python package requirements.

---

## 📦 Handoff Notes
This codebase is "zero-config." All file paths are dynamically resolved based on the project root folder. No absolute paths are hardcoded.
