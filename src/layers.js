import L from 'leaflet';
import { solarData, SOLAR_RANGE } from './data/solar.js';
import { windData,  WIND_RANGE  } from './data/wind.js';
import { soilData,  SOIL_RANGE  } from './data/soil.js';
import { esgZonesData, ZONE_STYLES } from './data/esg_zones.js';

// ── Colour interpolation helpers ──────────────────────────────────────────────

/**
 * Map a 0–1 value to a CSS hex colour along a gradient stop list.
 * stops: [[r,g,b], ...]  — evenly spaced
 */
function gradientColor(t, stops) {
  t = Math.max(0, Math.min(1, t));
  const seg = (stops.length - 1) * t;
  const lo  = Math.floor(seg);
  const hi  = Math.min(stops.length - 1, lo + 1);
  const f   = seg - lo;
  const r   = Math.round(stops[lo][0] + f * (stops[hi][0] - stops[lo][0]));
  const g   = Math.round(stops[lo][1] + f * (stops[hi][1] - stops[lo][1]));
  const b   = Math.round(stops[lo][2] + f * (stops[hi][2] - stops[lo][2]));
  return `rgb(${r},${g},${b})`;
}

// Colour ramps
const SOLAR_RAMP = [[30,60,30], [146,102,0], [245,158,11], [252,211,77], [255,245,150]];
const WIND_RAMP  = [[15,23,42], [49,46,129], [99,102,241], [167,243,208], [224,242,254]];
const SOIL_RAMP  = [[92,51,23], [120,86,34], [74,168,96],  [52,211,153], [167,243,208]];

function normalize(val, min, max) {
  return (val - min) / (max - min);
}

// ── Generic point-grid layer factory ──────────────────────────────────────────

function makePointLayer(geojson, valueKey, range, ramp, labelFn) {
  const markers = [];
  geojson.features.forEach(f => {
    const val  = f.properties[valueKey];
    const t    = normalize(val, range.min, range.max);
    const fill = gradientColor(t, ramp);
    const [lng, lat] = f.geometry.coordinates;

    const m = L.circleMarker([lat, lng], {
      radius:       11,
      fillColor:    fill,
      fillOpacity:  0.82,
      color:        fill,
      weight:       0,
      // pane for stacking order
      pane:         'overlayPane',
    });

    m.bindTooltip(labelFn(f.properties, val), {
      direction:  'top',
      offset:     [0, -8],
      opacity:    1,
    });

    markers.push(m);
  });

  return L.layerGroup(markers);
}

// ── Solar layer ───────────────────────────────────────────────────────────────

export function buildSolarLayer() {
  return makePointLayer(
    solarData,
    'ghi',
    SOLAR_RANGE,
    SOLAR_RAMP,
    (props, val) =>
      `<strong>Solar GHI</strong><br/>${val.toFixed(2)} kWh/m²/day<br/>` +
      `Peak: ${props.month_peak} · Low: ${props.month_low}<br/>` +
      `Optimal tilt: ${props.panel_tilt_opt}°`
  );
}

// ── Wind layer ────────────────────────────────────────────────────────────────

export function buildWindLayer() {
  return makePointLayer(
    windData,
    'speed',
    WIND_RANGE,
    WIND_RAMP,
    (props, val) =>
      `<strong>Wind Speed @ 80m</strong><br/>${val.toFixed(2)} m/s<br/>` +
      `Predominant dir: ${props.dir}<br/>` +
      `Turbine suitable: ${props.turbine_suitable ? 'Yes' : 'No'}`
  );
}

// ── Soil moisture layer ───────────────────────────────────────────────────────

export function buildSoilLayer() {
  return makePointLayer(
    soilData,
    'moisture',
    SOIL_RANGE,
    SOIL_RAMP,
    (props, val) =>
      `<strong>Soil Moisture</strong><br/>${val.toFixed(3)} m³/m³<br/>` +
      `Quality: ${props.quality}<br/>` +
      `Erosion risk: ${props.erosion_risk}`
  );
}

// ── ESG risk zones layer ──────────────────────────────────────────────────────

export function buildEsgLayer() {
  return L.geoJSON(esgZonesData, {
    style: f => {
      const t = f.properties.zone_type;
      return {
        ...ZONE_STYLES[t] || ZONE_STYLES.moderate_caution,
        interactive: true,
      };
    },
    onEachFeature: (f, layer) => {
      const p = f.properties;
      const scoreText = p.esg_score != null ? `ESG Score: <strong>${p.esg_score}</strong>` : 'ESG Score: N/A (water body)';
      layer.bindTooltip(
        `<strong>${p.label}</strong><br/>` +
        `Zone: ${p.zone_type.replace(/_/g, ' ')}<br/>` +
        `${scoreText}<br/>` +
        `Land use: ${p.land_use}<br/>` +
        (p.protected ? `⚠️ <em>${p.regulation}</em>` : '✅ No restrictions'),
        { direction: 'top', maxWidth: 240 }
      );
      layer.on('mouseover', e => e.target.setStyle({ fillOpacity: 0.5, weight: 3 }));
      layer.on('mouseout',  e => {
        const t = f.properties.zone_type;
        e.target.setStyle(ZONE_STYLES[t] || ZONE_STYLES.moderate_caution);
      });
    },
  });
}

// ── Legend metadata per layer ─────────────────────────────────────────────────

export const LAYER_LEGENDS = {
  solar: {
    title: 'Solar GHI (kWh/m²/day)',
    items: [
      { color: '#ff5',     label: '≥5.0 — Excellent' },
      { color: '#f59e0b',  label: '4.7–5.0 — Good' },
      { color: '#926600',  label: '4.4–4.7 — Moderate' },
    ],
  },
  wind: {
    title: 'Wind Speed @ 80m (m/s)',
    items: [
      { color: '#e0f2fe',  label: '≥6.0 — Class 3+' },
      { color: '#818cf8',  label: '5.5–6.0 — Class 2–3' },
      { color: '#312e81',  label: '5.0–5.5 — Class 2' },
    ],
  },
  soil: {
    title: 'Soil Moisture (m³/m³)',
    items: [
      { color: '#34d399',  label: '≥0.32 — High' },
      { color: '#4aa860',  label: '0.26–0.32 — Good' },
      { color: '#783300',  label: '0.20–0.26 — Low' },
    ],
  },
  esg: {
    title: 'ESG Risk Zones',
    items: [
      { color: '#00d4aa',  label: 'High Opportunity' },
      { color: '#fbbf24',  label: 'Moderate Caution' },
      { color: '#fb923c',  label: 'Riparian Buffer' },
      { color: '#f87171',  label: 'Wetland Protected' },
      { color: '#60a5fa',  label: 'Water Body' },
    ],
  },
};
