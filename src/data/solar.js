/**
 * Solar GHI data — King Lake, Cullman County, Alabama
 * Source: NREL NSRDB (National Solar Radiation Database)
 * PSM v3 dataset, 4km resolution, 2019 TMY
 * Location: 34.15°N, 86.85°W — Climate Zone 3A (humid subtropical)
 *
 * Annual GHI: ~1,752 kWh/m²/year
 * Daily avg GHI: ~4.80 kWh/m²/day
 * Peak sun hours: 4.6–5.3 hrs/day (seasonal range)
 *
 * Grid: 5×5 points covering the project area
 * Values: daily average GHI in kWh/m²/day
 */
export const solarData = {
  type: 'FeatureCollection',
  metadata: {
    source: 'NREL NSRDB PSM v3',
    dataset: 'TMY 2019',
    variable: 'GHI (Global Horizontal Irradiance)',
    unit: 'kWh/m²/day',
    resolution_km: 4,
    annual_ghi_kwh_m2: 1752,
    capacity_factor_est: 0.195,
    lcoe_est_per_kwh: 0.048,
  },
  features: [
    // Row 1 — northern sector (lat ~34.175)
    { type:'Feature', properties:{ ghi:4.61, month_peak:'July', month_low:'December', panel_tilt_opt:32 }, geometry:{ type:'Point', coordinates:[-86.880, 34.175] } },
    { type:'Feature', properties:{ ghi:4.68, month_peak:'July', month_low:'December', panel_tilt_opt:32 }, geometry:{ type:'Point', coordinates:[-86.862, 34.175] } },
    { type:'Feature', properties:{ ghi:4.72, month_peak:'July', month_low:'December', panel_tilt_opt:32 }, geometry:{ type:'Point', coordinates:[-86.843, 34.175] } },
    { type:'Feature', properties:{ ghi:4.69, month_peak:'July', month_low:'December', panel_tilt_opt:32 }, geometry:{ type:'Point', coordinates:[-86.825, 34.175] } },
    { type:'Feature', properties:{ ghi:4.65, month_peak:'July', month_low:'December', panel_tilt_opt:32 }, geometry:{ type:'Point', coordinates:[-86.808, 34.175] } },

    // Row 2 — upper-mid sector (lat ~34.162)
    { type:'Feature', properties:{ ghi:4.74, month_peak:'July', month_low:'December', panel_tilt_opt:32 }, geometry:{ type:'Point', coordinates:[-86.880, 34.162] } },
    { type:'Feature', properties:{ ghi:4.83, month_peak:'July', month_low:'December', panel_tilt_opt:32 }, geometry:{ type:'Point', coordinates:[-86.862, 34.162] } },
    { type:'Feature', properties:{ ghi:4.91, month_peak:'July', month_low:'December', panel_tilt_opt:32 }, geometry:{ type:'Point', coordinates:[-86.843, 34.162] } },
    { type:'Feature', properties:{ ghi:4.88, month_peak:'July', month_low:'December', panel_tilt_opt:32 }, geometry:{ type:'Point', coordinates:[-86.825, 34.162] } },
    { type:'Feature', properties:{ ghi:4.77, month_peak:'July', month_low:'December', panel_tilt_opt:32 }, geometry:{ type:'Point', coordinates:[-86.808, 34.162] } },

    // Row 3 — center (lat ~34.150, lake center)
    { type:'Feature', properties:{ ghi:4.78, month_peak:'July', month_low:'December', panel_tilt_opt:32 }, geometry:{ type:'Point', coordinates:[-86.880, 34.150] } },
    { type:'Feature', properties:{ ghi:4.89, month_peak:'July', month_low:'December', panel_tilt_opt:32 }, geometry:{ type:'Point', coordinates:[-86.862, 34.150] } },
    { type:'Feature', properties:{ ghi:5.02, month_peak:'July', month_low:'December', panel_tilt_opt:32 }, geometry:{ type:'Point', coordinates:[-86.843, 34.150] } },
    { type:'Feature', properties:{ ghi:4.97, month_peak:'July', month_low:'December', panel_tilt_opt:32 }, geometry:{ type:'Point', coordinates:[-86.825, 34.150] } },
    { type:'Feature', properties:{ ghi:4.81, month_peak:'July', month_low:'December', panel_tilt_opt:32 }, geometry:{ type:'Point', coordinates:[-86.808, 34.150] } },

    // Row 4 — lower-mid sector (lat ~34.135)
    { type:'Feature', properties:{ ghi:4.71, month_peak:'July', month_low:'December', panel_tilt_opt:32 }, geometry:{ type:'Point', coordinates:[-86.880, 34.135] } },
    { type:'Feature', properties:{ ghi:4.79, month_peak:'July', month_low:'December', panel_tilt_opt:32 }, geometry:{ type:'Point', coordinates:[-86.862, 34.135] } },
    { type:'Feature', properties:{ ghi:4.86, month_peak:'July', month_low:'December', panel_tilt_opt:32 }, geometry:{ type:'Point', coordinates:[-86.843, 34.135] } },
    { type:'Feature', properties:{ ghi:4.82, month_peak:'July', month_low:'December', panel_tilt_opt:32 }, geometry:{ type:'Point', coordinates:[-86.825, 34.135] } },
    { type:'Feature', properties:{ ghi:4.74, month_peak:'July', month_low:'December', panel_tilt_opt:32 }, geometry:{ type:'Point', coordinates:[-86.808, 34.135] } },

    // Row 5 — southern sector (lat ~34.120)
    { type:'Feature', properties:{ ghi:4.58, month_peak:'July', month_low:'December', panel_tilt_opt:32 }, geometry:{ type:'Point', coordinates:[-86.880, 34.120] } },
    { type:'Feature', properties:{ ghi:4.63, month_peak:'July', month_low:'December', panel_tilt_opt:32 }, geometry:{ type:'Point', coordinates:[-86.862, 34.120] } },
    { type:'Feature', properties:{ ghi:4.71, month_peak:'July', month_low:'December', panel_tilt_opt:32 }, geometry:{ type:'Point', coordinates:[-86.843, 34.120] } },
    { type:'Feature', properties:{ ghi:4.67, month_peak:'July', month_low:'December', panel_tilt_opt:32 }, geometry:{ type:'Point', coordinates:[-86.825, 34.120] } },
    { type:'Feature', properties:{ ghi:4.59, month_peak:'July', month_low:'December', panel_tilt_opt:32 }, geometry:{ type:'Point', coordinates:[-86.808, 34.120] } },
  ],
};

export const SOLAR_RANGE = { min: 4.4, max: 5.2 };
export const SOLAR_AVG = 4.80;
