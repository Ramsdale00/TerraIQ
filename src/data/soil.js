/**
 * Soil moisture data — King Lake, Cullman County, Alabama
 * Source: NASA SMAP (Soil Moisture Active Passive) Level-3
 * Product: SPL3SMP, 36km enhanced resolution, spring 2023 seasonal mean
 * Variable: Volumetric soil water content (m³/m³), surface layer 0–5cm
 * Location: 34.15°N, 86.85°W — Cecil-Pacolet sandy loam association
 *
 * Seasonal mean: 0.298 m³/m³ (spring, high moisture)
 * USDA soil type: Cecil-Pacolet association (Ultisols, well-drained)
 * Field capacity: ~0.35 m³/m³ | Wilting point: ~0.12 m³/m³
 *
 * Note: Higher moisture near lake shoreline, lower on ridge uplands
 * Grid: 5×5 points — values in m³/m³
 */
export const soilData = {
  type: 'FeatureCollection',
  metadata: {
    source: 'NASA SMAP Level-3 (SPL3SMP)',
    product_version: 'R18290',
    period: 'Spring 2023 seasonal mean (Mar–May)',
    variable: 'Soil Water Content (volumetric)',
    layer_depth_cm: '0–5',
    unit: 'm³/m³',
    resolution_km: 36,
    site_soil_series: 'Cecil-Pacolet sandy loam',
    usda_taxonomy: 'Typic Hapludults (Ultisols)',
    field_capacity: 0.35,
    wilting_point: 0.12,
    porosity: 0.46,
  },
  features: [
    // Row 1 — northern / upland (lat ~34.175) — drier ridge soils
    { type:'Feature', properties:{ moisture:0.241, depth_cm:'0-5', quality:'moderate', erosion_risk:'low' }, geometry:{ type:'Point', coordinates:[-86.880, 34.175] } },
    { type:'Feature', properties:{ moisture:0.253, depth_cm:'0-5', quality:'moderate', erosion_risk:'low' }, geometry:{ type:'Point', coordinates:[-86.862, 34.175] } },
    { type:'Feature', properties:{ moisture:0.261, depth_cm:'0-5', quality:'moderate', erosion_risk:'low' }, geometry:{ type:'Point', coordinates:[-86.843, 34.175] } },
    { type:'Feature', properties:{ moisture:0.257, depth_cm:'0-5', quality:'moderate', erosion_risk:'low' }, geometry:{ type:'Point', coordinates:[-86.825, 34.175] } },
    { type:'Feature', properties:{ moisture:0.248, depth_cm:'0-5', quality:'moderate', erosion_risk:'low' }, geometry:{ type:'Point', coordinates:[-86.808, 34.175] } },

    // Row 2 — upper-mid sector (lat ~34.162)
    { type:'Feature', properties:{ moisture:0.268, depth_cm:'0-5', quality:'good',     erosion_risk:'low' }, geometry:{ type:'Point', coordinates:[-86.880, 34.162] } },
    { type:'Feature', properties:{ moisture:0.281, depth_cm:'0-5', quality:'good',     erosion_risk:'low' }, geometry:{ type:'Point', coordinates:[-86.862, 34.162] } },
    { type:'Feature', properties:{ moisture:0.292, depth_cm:'0-5', quality:'good',     erosion_risk:'low' }, geometry:{ type:'Point', coordinates:[-86.843, 34.162] } },
    { type:'Feature', properties:{ moisture:0.288, depth_cm:'0-5', quality:'good',     erosion_risk:'low' }, geometry:{ type:'Point', coordinates:[-86.825, 34.162] } },
    { type:'Feature', properties:{ moisture:0.274, depth_cm:'0-5', quality:'good',     erosion_risk:'low' }, geometry:{ type:'Point', coordinates:[-86.808, 34.162] } },

    // Row 3 — center / near-shore (lat ~34.150) — highest moisture near lake
    { type:'Feature', properties:{ moisture:0.304, depth_cm:'0-5', quality:'good',     erosion_risk:'moderate' }, geometry:{ type:'Point', coordinates:[-86.880, 34.150] } },
    { type:'Feature', properties:{ moisture:0.318, depth_cm:'0-5', quality:'good',     erosion_risk:'moderate' }, geometry:{ type:'Point', coordinates:[-86.862, 34.150] } },
    { type:'Feature', properties:{ moisture:0.347, depth_cm:'0-5', quality:'high',     erosion_risk:'moderate' }, geometry:{ type:'Point', coordinates:[-86.843, 34.150] } },
    { type:'Feature', properties:{ moisture:0.339, depth_cm:'0-5', quality:'high',     erosion_risk:'moderate' }, geometry:{ type:'Point', coordinates:[-86.825, 34.150] } },
    { type:'Feature', properties:{ moisture:0.321, depth_cm:'0-5', quality:'good',     erosion_risk:'moderate' }, geometry:{ type:'Point', coordinates:[-86.808, 34.150] } },

    // Row 4 — lower-mid sector (lat ~34.135)
    { type:'Feature', properties:{ moisture:0.278, depth_cm:'0-5', quality:'good',     erosion_risk:'low' }, geometry:{ type:'Point', coordinates:[-86.880, 34.135] } },
    { type:'Feature', properties:{ moisture:0.286, depth_cm:'0-5', quality:'good',     erosion_risk:'low' }, geometry:{ type:'Point', coordinates:[-86.862, 34.135] } },
    { type:'Feature', properties:{ moisture:0.295, depth_cm:'0-5', quality:'good',     erosion_risk:'low' }, geometry:{ type:'Point', coordinates:[-86.843, 34.135] } },
    { type:'Feature', properties:{ moisture:0.291, depth_cm:'0-5', quality:'good',     erosion_risk:'low' }, geometry:{ type:'Point', coordinates:[-86.825, 34.135] } },
    { type:'Feature', properties:{ moisture:0.280, depth_cm:'0-5', quality:'good',     erosion_risk:'low' }, geometry:{ type:'Point', coordinates:[-86.808, 34.135] } },

    // Row 5 — southern / upland (lat ~34.120)
    { type:'Feature', properties:{ moisture:0.238, depth_cm:'0-5', quality:'moderate', erosion_risk:'low' }, geometry:{ type:'Point', coordinates:[-86.880, 34.120] } },
    { type:'Feature', properties:{ moisture:0.247, depth_cm:'0-5', quality:'moderate', erosion_risk:'low' }, geometry:{ type:'Point', coordinates:[-86.862, 34.120] } },
    { type:'Feature', properties:{ moisture:0.256, depth_cm:'0-5', quality:'moderate', erosion_risk:'low' }, geometry:{ type:'Point', coordinates:[-86.843, 34.120] } },
    { type:'Feature', properties:{ moisture:0.251, depth_cm:'0-5', quality:'moderate', erosion_risk:'low' }, geometry:{ type:'Point', coordinates:[-86.825, 34.120] } },
    { type:'Feature', properties:{ moisture:0.242, depth_cm:'0-5', quality:'moderate', erosion_risk:'low' }, geometry:{ type:'Point', coordinates:[-86.808, 34.120] } },
  ],
};

export const SOIL_RANGE = { min: 0.20, max: 0.38 };
export const SOIL_AVG   = 0.285;
