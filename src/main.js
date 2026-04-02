/**
 * TerraScope — Main entry point
 * King Lake ESG & Renewable Feasibility Analysis Dashboard
 */

import 'leaflet/dist/leaflet.css';
import './style.css';

import { initMap }          from './map.js';
import { buildSolarLayer, buildWindLayer, buildSoilLayer, buildEsgLayer } from './layers.js';
import { computeESG }       from './esg.js';
import { generateInsights } from './insights.js';
import {
  animateGauge,
  renderBreakdown,
  renderRenewable,
  renderInsights,
  wireToggleBar,
  updateLegend,
} from './ui.js';

// ── Bootstrap ─────────────────────────────────────────────────────────────────

function init() {
  // 1. Initialize Leaflet map
  const map = initMap();

  // 2. Build all data layers (lazy — only solar shown by default)
  const layers = {
    solar: buildSolarLayer(),
    wind:  buildWindLayer(),
    soil:  buildSoilLayer(),
    esg:   buildEsgLayer(),
  };

  // Show solar layer on load (matches the default active button)
  layers.solar.addTo(map);
  updateLegend('solar');

  // 3. Compute ESG score from embedded data
  const esgResult = computeESG();

  // 4. Render right panel with a short delay to let map paint first
  requestAnimationFrame(() => {
    setTimeout(() => {
      animateGauge(esgResult.total);
      renderBreakdown(esgResult);
      renderRenewable(esgResult.renewable);
    }, 300);

    // Insights stagger in slightly later
    setTimeout(() => {
      const insights = generateInsights(esgResult);
      renderInsights(insights);
    }, 600);
  });

  // 5. Wire layer toggle bar
  wireToggleBar(layers, map, activeKey => {
    // Could extend: update right-panel metrics based on active layer
    console.debug('[TerraScope] Active layer:', activeKey);
  });

  // 6. Log summary to console for demo purposes
  console.info(
    `%cTerraScope — King Lake ESG Analysis`,
    'color:#00d4aa;font-weight:bold;font-size:14px'
  );
  console.info('ESG Score:', esgResult.total, '/', 100, `(${esgResult.grade})`);
  console.info('Environmental:', esgResult.environmental.score);
  console.info('Social:',       esgResult.social.score);
  console.info('Governance:',   esgResult.governance.score);
  console.info('Solar GHI avg:', esgResult.renewable.solar.avg_ghi, 'kWh/m²/day');
  console.info('Wind speed avg:', esgResult.renewable.wind.avg_speed_ms, 'm/s @ 80m');
  console.info('Soil moisture avg:', esgResult.renewable.soil.avg_moisture, 'm³/m³');
}

// Run after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
