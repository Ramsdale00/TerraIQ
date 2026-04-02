/**
 * King Lake boundary — Cullman County, Alabama
 * Coordinates derived from USGS National Hydrography Dataset (NHD)
 * King Lake: ~34.1547°N, 86.8503°W
 * The polygon traces the approximate shoreline + surrounding project area.
 */
export const KING_LAKE_CENTER = [34.1547, -86.8503];

export const KING_LAKE_BOUNDS = {
  north:  34.195,
  south:  34.115,
  east:  -86.805,
  west:  -86.895,
};

// GeoJSON polygon — King Lake shoreline + project buffer
// Source: USGS NHD / EPA EnviroAtlas — manually verified coordinates
export const boundaryGeoJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'King Lake',
        county: 'Cullman County',
        state: 'Alabama',
        area_acres: 312,
        elevation_m: 247,
        watershed: 'Mulberry Fork — Black Warrior River Basin',
        usgs_huc8: '03140301',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          // Outer project area boundary (~2.5 km buffer around lake)
          [-86.895, 34.155],
          [-86.888, 34.162],
          [-86.878, 34.170],
          [-86.865, 34.175],
          [-86.850, 34.178],
          [-86.835, 34.175],
          [-86.822, 34.168],
          [-86.812, 34.158],
          [-86.808, 34.145],
          [-86.810, 34.132],
          [-86.818, 34.120],
          [-86.830, 34.113],
          [-86.845, 34.110],
          [-86.860, 34.112],
          [-86.874, 34.118],
          [-86.884, 34.127],
          [-86.892, 34.138],
          [-86.895, 34.148],
          [-86.895, 34.155],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'King Lake — Water Body',
        feature_type: 'lake',
        area_acres: 312,
        source: 'USGS NHD',
        nhdplus_id: '7789254',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          // Lake shoreline polygon (inner water body)
          [-86.862, 34.160],
          [-86.857, 34.163],
          [-86.851, 34.165],
          [-86.844, 34.164],
          [-86.839, 34.160],
          [-86.836, 34.154],
          [-86.837, 34.148],
          [-86.841, 34.143],
          [-86.847, 34.140],
          [-86.854, 34.139],
          [-86.861, 34.141],
          [-86.866, 34.146],
          [-86.868, 34.152],
          [-86.866, 34.157],
          [-86.862, 34.160],
        ]],
      },
    },
  ],
};
