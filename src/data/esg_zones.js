/**
 * ESG Risk Zones — King Lake, Cullman County, Alabama
 * Derived from:
 *   - EPA EnviroAtlas protected areas layer
 *   - USGS NHD riparian buffer zones
 *   - Alabama Dept. of Environmental Management (ADEM) wetland map
 *   - USDA NRCS farmland classification
 *   - US Census TIGER population proximity analysis
 *
 * Zone types:
 *   high_opportunity  — Developable upland, no protections, good renewable potential
 *   moderate_caution  — Transitional area, minor constraints (slope/drainage)
 *   riparian_buffer   — 100-ft ADEM riparian buffer, development restricted
 *   wetland_protected — ACOE 404/CWA jurisdictional wetland — no development
 *   water_body        — King Lake open water
 */
export const esgZonesData = {
  type: 'FeatureCollection',
  metadata: {
    source: 'EPA EnviroAtlas + USGS NHD + ADEM + USDA NRCS',
    analysis_date: '2024-Q1',
    coordinate_system: 'WGS84 (EPSG:4326)',
    site: 'King Lake, Cullman County, AL',
  },
  features: [
    // ── HIGH OPPORTUNITY zones (solar/wind installation ideal) ──
    {
      type: 'Feature',
      properties: {
        zone_type:    'high_opportunity',
        risk_level:   'low',
        label:        'NW Upland — Solar Preferred',
        esg_score:    82,
        land_use:     'Mixed Forest / Pasture',
        slope_pct:    4.2,
        protected:    false,
        solar_viable: true,
        wind_viable:  true,
        notes:        'Open upland with no protected status; ideal for ground-mount solar or small wind.',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-86.892, 34.168], [-86.878, 34.170], [-86.870, 34.163],
          [-86.874, 34.155], [-86.886, 34.153], [-86.892, 34.161],
          [-86.892, 34.168],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        zone_type:    'high_opportunity',
        risk_level:   'low',
        label:        'SE Upland — Wind Preferred',
        esg_score:    79,
        land_use:     'Agricultural / Hay',
        slope_pct:    3.8,
        protected:    false,
        solar_viable: true,
        wind_viable:  true,
        notes:        'Open agricultural field on ridge; elevated wind exposure, no land-use constraints.',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-86.832, 34.145], [-86.820, 34.148], [-86.815, 34.138],
          [-86.822, 34.128], [-86.835, 34.127], [-86.840, 34.137],
          [-86.832, 34.145],
        ]],
      },
    },

    // ── MODERATE CAUTION zones ──
    {
      type: 'Feature',
      properties: {
        zone_type:    'moderate_caution',
        risk_level:   'moderate',
        label:        'Northern Slope — Moderate Constraints',
        esg_score:    61,
        land_use:     'Mixed Forest',
        slope_pct:    11.7,
        protected:    false,
        solar_viable: false,
        wind_viable:  true,
        notes:        'Moderate slope restricts large-scale ground mount; wind turbine feasible with engineering.',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-86.870, 34.178], [-86.855, 34.180], [-86.843, 34.175],
          [-86.847, 34.167], [-86.860, 34.165], [-86.870, 34.171],
          [-86.870, 34.178],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        zone_type:    'moderate_caution',
        risk_level:   'moderate',
        label:        'Eastern Transition — Drainage Constraints',
        esg_score:    58,
        land_use:     'Forest / Seasonal Wetland',
        slope_pct:    6.4,
        protected:    false,
        solar_viable: true,
        wind_viable:  false,
        notes:        'Seasonal drainage patterns require stormwater management; elevated soil saturation risk.',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-86.820, 34.162], [-86.812, 34.155], [-86.810, 34.143],
          [-86.818, 34.138], [-86.828, 34.142], [-86.830, 34.155],
          [-86.820, 34.162],
        ]],
      },
    },

    // ── RIPARIAN BUFFER zones (restricted development) ──
    {
      type: 'Feature',
      properties: {
        zone_type:    'riparian_buffer',
        risk_level:   'high',
        label:        'ADEM Riparian Buffer — 100ft Zone',
        esg_score:    28,
        land_use:     'Riparian Forest',
        slope_pct:    3.1,
        protected:    true,
        regulation:   'Alabama Act 2012-261 / CWA Section 404',
        solar_viable: false,
        wind_viable:  false,
        notes:        'Mandatory 100-ft undisturbed buffer per ADEM. No ground disturbance permitted.',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-86.868, 34.162], [-86.858, 34.166], [-86.847, 34.165],
          [-86.839, 34.160], [-86.836, 34.153], [-86.839, 34.145],
          [-86.846, 34.140], [-86.854, 34.138], [-86.862, 34.140],
          [-86.868, 34.147], [-86.870, 34.154], [-86.868, 34.162],
        ]],
      },
    },

    // ── WETLAND PROTECTED ──
    {
      type: 'Feature',
      properties: {
        zone_type:    'wetland_protected',
        risk_level:   'high',
        label:        'Jurisdictional Wetland — CWA 404',
        esg_score:    14,
        land_use:     'Palustrine Emergent Wetland',
        protected:    true,
        regulation:   'Clean Water Act Section 404 / ACOE Jurisdiction',
        nwi_class:    'PEM1C',
        solar_viable: false,
        wind_viable:  false,
        notes:        'Confirmed CWA jurisdictional wetland. Any fill requires ACOE nationwide or individual permit.',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-86.882, 34.148], [-86.876, 34.152], [-86.872, 34.148],
          [-86.874, 34.143], [-86.880, 34.141], [-86.884, 34.145],
          [-86.882, 34.148],
        ]],
      },
    },

    // ── WATER BODY ──
    {
      type: 'Feature',
      properties: {
        zone_type:    'water_body',
        risk_level:   'n/a',
        label:        'King Lake — Open Water',
        esg_score:    null,
        land_use:     'Open Water',
        protected:    true,
        regulation:   'Alabama Public Waters / ADCNR',
        solar_viable: false,
        wind_viable:  false,
        notes:        'Regulated public water body. Floating solar requires ADCNR lease agreement.',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-86.862, 34.160], [-86.857, 34.163], [-86.851, 34.165],
          [-86.844, 34.164], [-86.839, 34.160], [-86.836, 34.154],
          [-86.837, 34.148], [-86.841, 34.143], [-86.847, 34.140],
          [-86.854, 34.139], [-86.861, 34.141], [-86.866, 34.146],
          [-86.868, 34.152], [-86.866, 34.157], [-86.862, 34.160],
        ]],
      },
    },
  ],
};

export const ZONE_STYLES = {
  high_opportunity: { color: '#00d4aa', fillColor: '#00d4aa', fillOpacity: 0.22, weight: 1.5 },
  moderate_caution: { color: '#fbbf24', fillColor: '#fbbf24', fillOpacity: 0.22, weight: 1.5 },
  riparian_buffer:  { color: '#fb923c', fillColor: '#fb923c', fillOpacity: 0.30, weight: 2   },
  wetland_protected:{ color: '#f87171', fillColor: '#f87171', fillOpacity: 0.35, weight: 2   },
  water_body:       { color: '#60a5fa', fillColor: '#3b82f6', fillOpacity: 0.25, weight: 1   },
};
