# TerraIQ — Project Guide

> **Agent context file.** Updated on every session. Read this before touching any code.

---

## What This Project Is

**USA Solar Atlas Explorer** — a two-view, zero-build, self-contained web application that combines:

1. **View 1 — USA Solar Atlas Explorer** (main / landing view): A full-screen US satellite map showing 8 regional solar GHI resource zones. King Lake, Alabama is highlighted with a pulsing marker as the available case study.
2. **View 2 — King Lake Case Study** (TerraScope): The existing ESG & Renewable Feasibility Analysis dashboard for King Lake, Cullman County, AL. Accessed via the Case Study button or the pulsing marker on the US map.

**No build step required.** Open `index.html` directly in a browser, or serve with:
```bash
python3 -m http.server 8080
# → http://localhost:8080
```

---

## Repository Layout

```
TerraIQ/
├── index.html          ← THE ENTIRE APP (CSS + HTML + JS, ~1390 lines)
├── PROJECT_GUIDE.md    ← This file — update on every session
├── README.md           ← Original TerraScope README (King Lake data)
├── package.json        ← Minimal npm metadata (no build dependencies)
├── vite.config.js      ← Unused Vite scaffold (ignore)
└── src/                ← Unused ES module scaffold (NOT loaded by index.html)
    ├── main.js, map.js, layers.js, esg.js, insights.js, ui.js, style.css
    └── data/ (boundary.js, solar.js, wind.js, soil.js, esg_zones.js)
```

> **Important:** `src/` is dead code — a leftover Vite scaffold. All production code lives **exclusively** in `index.html` as inline CSS and JS. Do not modify `src/`.

---

## Two-View Architecture

Both views are full-viewport `div.view` siblings inside `<body>`. CSS `display` toggling switches between them.

| Selector         | View Name                  | Default state  |
|------------------|----------------------------|----------------|
| `#view-atlas`    | USA Solar Atlas Explorer   | `display:flex` (active) |
| `#view-casestudy`| King Lake Case Study       | `display:none` |

**Navigation functions (inline JS):**
- `showCaseStudy()` — hide Atlas, show Case Study, lazy-init King Lake map on first call
- `showAtlas()` — hide Case Study, show Atlas, call `invalidateSize()` on atlas map

**Why lazy init?** Leaflet measures container pixel size at construction time. A `display:none` container returns 0×0 and breaks the map. The King Lake Leaflet instance (`_klMap`) is created only when View 2 is first made visible. A 60ms `setTimeout` gives the browser time to paint before Leaflet initialises.

---

## Leaflet Map Instances

| Variable    | DOM element  | Initialised when         | Bounds / center         |
|-------------|--------------|--------------------------|-------------------------|
| `_atlasMap` | `#us-map`    | Page load (`initAtlas()`) | USA, center `[38.5,-95.5]`, zoom 4 |
| `_klMap`    | `#map`       | First `showCaseStudy()` call | King Lake area, center `[34.1547,-86.8503]`, zoom 13 |

**Both maps use:**
- Basemap: ESRI World Imagery (satellite) — `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}`
- Labels: ESRI World Boundaries and Places hybrid overlay — opacity 0.75

---

## View 1: USA Solar Atlas Explorer

### Key DOM elements
| ID / selector       | Purpose                                      |
|---------------------|----------------------------------------------|
| `#atlas-header`     | App header with logo, tags, Case Study button |
| `#us-map`           | Full-screen Leaflet US map                   |
| `#atlas-cta-btn`    | Floating "View King Lake Case Study" button  |
| `#atlas-legend-overlay` | Floating GHI color-scale legend (top-right) |
| `#atlas-info-panel` | Region detail card (bottom-left, on hover)   |
| `#atlas-panel`      | Right sidebar: stats, legend, case studies   |
| `#atlas-bar`        | Bottom bar with attribution                  |
| `#case-study-btn`   | Pulsing CTA button in header                 |

### US Solar Zones Data (`US_SOLAR_ZONES` array)
8 rectangular Leaflet zones covering the contiguous US. Each entry has:
`id, label, states, ghi (kWh/m²/day), rating, color, fillOpacity, bounds [[sw],[ne]], detail`

| Zone ID          | Region                   | GHI   | Color     |
|------------------|--------------------------|-------|-----------|
| `southwest`      | CA · AZ · NV · NM        | 6.5   | `#dc2626` |
| `southern_plains`| TX · OK · KS             | 5.5   | `#ea580c` |
| `southeast`      | AL · GA · FL · MS · SC   | 4.8   | `#f59e0b` |
| `mid_atlantic`   | NC · VA · MD · DE · NJ   | 4.2   | `#eab308` |
| `midwest`        | IA · IL · IN · OH · MO   | 4.0   | `#84cc16` |
| `northern_plains`| MT · ND · SD · WY · NE   | 4.3   | `#06b6d4` |
| `northwest`      | WA · OR · ID             | 3.8   | `#22c55e` |
| `new_england`    | MA · CT · NY · PA + NE   | 3.6   | `#8b5cf6` |

### King Lake Marker on US Map
- CSS `divIcon` with `.kl-pulse-outer` / `.kl-pulse-inner` classes
- Pulsing ring animation: `@keyframes kl-ring` (scale 0.7 → 2, opacity 0.9 → 0)
- Permanent tooltip `.kl-label-tip` with "King Lake Case Study" label
- Click → `showCaseStudy()`

---

## View 2: King Lake Case Study (TerraScope)

### Key DOM elements
| ID / selector       | Purpose                                       |
|---------------------|-----------------------------------------------|
| `#back-btn`         | "← Back to Atlas" button (first child of `#header`) |
| `#breadcrumb`       | "USA Solar Atlas Explorer › King Lake Case Study" |
| `#map`              | King Lake Leaflet map (satellite, locked to local area) |
| `#right-panel`      | ESG gauge, breakdown bars, metrics, insights  |
| `#layer-bar`        | Solar / Wind / Soil / ESG Risk toggle buttons |
| `#audit-btn`        | Opens ESG Audit Readiness Checklist drawer    |
| `#checklist-drawer` | 26-item ESG checklist (position:fixed, works across both views) |

### King Lake Map Details
- Center: `[34.1547, -86.8503]` (Cullman County, AL)
- Zoom: 13 (min 11, max 16), `maxBoundsViscosity: 1.0`
- Boundary: dashed teal outline `#009e7d` (project area) + blue-fill lake polygon
- Basemap: ESRI World Imagery + hybrid labels overlay

### King Lake Data (all embedded in JS)
| Dataset    | Variable       | Source              | Values                      |
|------------|----------------|---------------------|-----------------------------|
| Solar GHI  | `SOLAR_VALS`   | NREL NSRDB PSM v3   | 4.58–5.02 kWh/m²/day, 5×5 grid |
| Wind Speed | `WIND_VALS`    | NREL Wind Toolkit   | 5.31–6.21 m/s @ 80m, 5×5 grid  |
| Soil Moist.| `SOIL_VALS`    | NASA SMAP L3        | 0.238–0.347 m³/m³, 5×5 grid    |
| Boundary   | `BOUNDARY_PROJECT`, `BOUNDARY_LAKE` | USGS NHD | Polygon coords arrays |
| ESG Zones  | `ESG_ZONES`    | EPA EnviroAtlas     | 5 polygon zones with scores     |

### ESG Score (King Lake)
**Total: 84 / 100** (Grade A)
- Environmental: 89 (weight 40%)
- Social: 75 (weight 30%)
- Governance: 87 (weight 30%)

Computed live by `computeESG()` from embedded constants.

### Layer Toggle Functions
- `buildSolarLayer()` — 25-pt circle grid, GHI color ramp (brown → amber → yellow)
- `buildWindLayer()` — 25-pt circle grid, wind ramp (dark navy → indigo → cyan)
- `buildSoilLayer()` — 25-pt circle grid, soil ramp (brown → green → teal)
- `buildEsgLayer()` — 5 ESG zone polygons (teal/amber/orange/red)
- `wireToggleBar(layers, map)` — wires the bottom `.layer-btn` buttons

---

## Design System (CSS Variables)

```css
--accent:        #009e7d   /* teal — primary brand */
--accent-dim:    #007f64   /* darker teal for hover */
--accent-glow:   rgba(0,158,125,0.12)
--text-primary:  #111827
--text-secondary:#3d5268
--text-muted:    #7a94a8
--bg-primary:    #f0f4f8
--bg-secondary:  #ffffff
--bg-panel:      #f7f9fb
--bg-card:       #ffffff
--bg-hover:      #eaeff5
--border:        #dde4ec
--border-light:  #c2cfd9
--header-h:      52px
--bar-h:         56px
--panel-w:       300px      /* King Lake right panel width */
--font:          'Inter', system-ui, sans-serif
```

---

## Git Branch

Active development branch: `claude/add-king-lake-nav-5bDxK`

Push with: `git push -u origin claude/add-king-lake-nav-5bDxK`

---

## Change Log

| Date       | Session / Change                                                              | Files            |
|------------|-------------------------------------------------------------------------------|------------------|
| 2026-04-08 | Initial two-view integration: USA Solar Atlas Explorer + King Lake Case Study | `index.html`     |
| 2026-04-08 | Created PROJECT_GUIDE.md                                                      | `PROJECT_GUIDE.md` |

---

## Agent Notes

- **Never touch `src/`** — it is unused dead code.
- **All changes go in `index.html`** — CSS in the `<style>` block, HTML in the `<body>`, JS in the `<script>` block at the bottom.
- The checklist drawer (`#checklist-drawer`) uses `position:fixed` so it overlays both views correctly. Do not move it inside either view div.
- When adding new Leaflet maps, always call `invalidateSize()` after making the container visible.
- The `#app` div (King Lake view shell) uses `width:100%; height:100%` (not `100vw/100vh`) because it is nested inside `#view-casestudy` which itself is `100vw/100vh`.
