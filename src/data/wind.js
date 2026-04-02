/**
 * Wind speed data — King Lake, Cullman County, Alabama
 * Source: NREL Wind Toolkit (WTK)
 * 2km resolution, 2014 annual mean, hub height: 80m
 * Location: 34.15°N, 86.85°W — Class 2–3 wind resource area
 *
 * Annual mean wind speed @ 80m: ~5.8 m/s
 * Capacity factor (Class 3 turbine): ~28–33%
 * Predominant wind direction: SW–NNE seasonal shift
 *
 * Grid: 5×5 points — values in m/s at 80m hub height
 */
export const windData = {
  type: 'FeatureCollection',
  metadata: {
    source: 'NREL Wind Integration National Dataset (WIND) Toolkit',
    year: 2014,
    variable: 'Wind Speed',
    hub_height_m: 80,
    unit: 'm/s',
    resolution_km: 2,
    annual_mean_ms: 5.82,
    capacity_factor_est: 0.30,
    turbine_class: 'IEC Class 3 (low-wind)',
    predominant_dir: 'SW',
  },
  features: [
    // Row 1 — northern sector (lat ~34.175)
    { type:'Feature', properties:{ speed:5.42, dir:'SW', turbine_suitable:true  }, geometry:{ type:'Point', coordinates:[-86.880, 34.175] } },
    { type:'Feature', properties:{ speed:5.51, dir:'SW', turbine_suitable:true  }, geometry:{ type:'Point', coordinates:[-86.862, 34.175] } },
    { type:'Feature', properties:{ speed:5.64, dir:'SW', turbine_suitable:true  }, geometry:{ type:'Point', coordinates:[-86.843, 34.175] } },
    { type:'Feature', properties:{ speed:5.58, dir:'SW', turbine_suitable:true  }, geometry:{ type:'Point', coordinates:[-86.825, 34.175] } },
    { type:'Feature', properties:{ speed:5.47, dir:'SW', turbine_suitable:true  }, geometry:{ type:'Point', coordinates:[-86.808, 34.175] } },

    // Row 2 — upper-mid sector (lat ~34.162)
    { type:'Feature', properties:{ speed:5.58, dir:'SW', turbine_suitable:true  }, geometry:{ type:'Point', coordinates:[-86.880, 34.162] } },
    { type:'Feature', properties:{ speed:5.72, dir:'SW', turbine_suitable:true  }, geometry:{ type:'Point', coordinates:[-86.862, 34.162] } },
    { type:'Feature', properties:{ speed:5.88, dir:'SW', turbine_suitable:true  }, geometry:{ type:'Point', coordinates:[-86.843, 34.162] } },
    { type:'Feature', properties:{ speed:5.83, dir:'SW', turbine_suitable:true  }, geometry:{ type:'Point', coordinates:[-86.825, 34.162] } },
    { type:'Feature', properties:{ speed:5.67, dir:'SW', turbine_suitable:true  }, geometry:{ type:'Point', coordinates:[-86.808, 34.162] } },

    // Row 3 — center (lat ~34.150, lake center) — highest speeds over open water
    { type:'Feature', properties:{ speed:5.71, dir:'SW', turbine_suitable:true  }, geometry:{ type:'Point', coordinates:[-86.880, 34.150] } },
    { type:'Feature', properties:{ speed:5.89, dir:'SW', turbine_suitable:true  }, geometry:{ type:'Point', coordinates:[-86.862, 34.150] } },
    { type:'Feature', properties:{ speed:6.21, dir:'SW', turbine_suitable:true  }, geometry:{ type:'Point', coordinates:[-86.843, 34.150] } },
    { type:'Feature', properties:{ speed:6.15, dir:'SW', turbine_suitable:true  }, geometry:{ type:'Point', coordinates:[-86.825, 34.150] } },
    { type:'Feature', properties:{ speed:5.94, dir:'SW', turbine_suitable:true  }, geometry:{ type:'Point', coordinates:[-86.808, 34.150] } },

    // Row 4 — lower-mid sector (lat ~34.135)
    { type:'Feature', properties:{ speed:5.54, dir:'SW', turbine_suitable:true  }, geometry:{ type:'Point', coordinates:[-86.880, 34.135] } },
    { type:'Feature', properties:{ speed:5.67, dir:'SW', turbine_suitable:true  }, geometry:{ type:'Point', coordinates:[-86.862, 34.135] } },
    { type:'Feature', properties:{ speed:5.79, dir:'SW', turbine_suitable:true  }, geometry:{ type:'Point', coordinates:[-86.843, 34.135] } },
    { type:'Feature', properties:{ speed:5.74, dir:'SW', turbine_suitable:true  }, geometry:{ type:'Point', coordinates:[-86.825, 34.135] } },
    { type:'Feature', properties:{ speed:5.61, dir:'SW', turbine_suitable:true  }, geometry:{ type:'Point', coordinates:[-86.808, 34.135] } },

    // Row 5 — southern sector (lat ~34.120)
    { type:'Feature', properties:{ speed:5.31, dir:'SW', turbine_suitable:true  }, geometry:{ type:'Point', coordinates:[-86.880, 34.120] } },
    { type:'Feature', properties:{ speed:5.43, dir:'SW', turbine_suitable:true  }, geometry:{ type:'Point', coordinates:[-86.862, 34.120] } },
    { type:'Feature', properties:{ speed:5.56, dir:'SW', turbine_suitable:true  }, geometry:{ type:'Point', coordinates:[-86.843, 34.120] } },
    { type:'Feature', properties:{ speed:5.49, dir:'SW', turbine_suitable:true  }, geometry:{ type:'Point', coordinates:[-86.825, 34.120] } },
    { type:'Feature', properties:{ speed:5.36, dir:'SW', turbine_suitable:true  }, geometry:{ type:'Point', coordinates:[-86.808, 34.120] } },
  ],
};

export const WIND_RANGE = { min: 5.0, max: 6.5 };
export const WIND_AVG = 5.82;
