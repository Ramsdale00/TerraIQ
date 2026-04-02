/**
 * UI module — gauge, panel updates, layer toggles, legend
 */

import { LAYER_LEGENDS } from './layers.js';

// ── Gauge constants ───────────────────────────────────────────────────────────
// Arc path: "M 20 110 A 80 80 0 0 1 180 110"
// Total arc length ≈ π * r = π * 80 ≈ 251.2 px (half-circle)
const ARC_LENGTH = 251.2;

// ── Animate gauge to a target score ──────────────────────────────────────────

export function animateGauge(score) {
  const gaugeValue  = document.getElementById('gauge-value');
  const gaugeNumber = document.getElementById('gauge-number');
  if (!gaugeValue || !gaugeNumber) return;

  const clipped   = Math.max(0, Math.min(100, score));
  const dashOffset = ARC_LENGTH - (clipped / 100) * ARC_LENGTH;

  // Color: red < 40, amber 40–60, teal/green > 60
  let color;
  if      (clipped >= 70) color = '#00d4aa';
  else if (clipped >= 55) color = '#34d399';
  else if (clipped >= 40) color = '#fbbf24';
  else                    color = '#f87171';

  // Kick off CSS transition
  gaugeValue.style.strokeDashoffset = dashOffset;
  gaugeValue.style.stroke = color;

  // Animate the number counter
  _animateCounter(gaugeNumber, 0, clipped, 1100);
}

function _animateCounter(el, from, to, duration) {
  const start = performance.now();
  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(from + eased * (to - from));
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// ── Render ESG breakdown bars ─────────────────────────────────────────────────

export function renderBreakdown(esgResult) {
  const { environmental, social, governance } = esgResult;

  _setBar('env', environmental.score);
  _setBar('soc', social.score);
  _setBar('gov', governance.score);
}

function _setBar(key, score) {
  const bar = document.getElementById(`bar-${key}`);
  const val = document.getElementById(`val-${key}`);
  if (bar) {
    // Defer to let browser register initial state before transition
    requestAnimationFrame(() => {
      bar.style.width = `${score}%`;
    });
  }
  if (val) val.textContent = score;
}

// ── Render renewable metric cards ─────────────────────────────────────────────

export function renderRenewable(renewable) {
  _setMetric('solar', renewable.solar.avg_ghi.toFixed(2), renewable.solar.rating);
  _setMetric('wind',  renewable.wind.avg_speed_ms.toFixed(2), renewable.wind.rating);
  _setMetric('soil',  renewable.soil.avg_moisture.toFixed(3), renewable.soil.rating);
}

function _setMetric(key, value, rating) {
  const valEl    = document.getElementById(`mv-${key}`);
  const ratingEl = document.getElementById(`mr-${key}`);
  if (valEl)    valEl.textContent = value;
  if (ratingEl) {
    ratingEl.textContent = rating;
    ratingEl.className = 'metric-rating ' + _ratingClass(rating);
  }
}

function _ratingClass(rating) {
  const r = rating.toLowerCase();
  if (r === 'excellent' || r === 'high') return 'rating-excellent';
  if (r === 'good')                       return 'rating-good';
  if (r === 'fair' || r === 'moderate')   return 'rating-fair';
  return 'rating-poor';
}

// ── Render insights ───────────────────────────────────────────────────────────

export function renderInsights(insightTexts) {
  insightTexts.forEach((text, i) => {
    const card = document.getElementById(`insight-${i}`);
    if (!card) return;
    const p = card.querySelector('.insight-text');
    if (p) {
      p.textContent = '';
      // Stagger the appearance
      setTimeout(() => {
        p.textContent = text;
        card.style.animation = 'none';
        card.offsetHeight; // reflow
        card.style.animation = 'fadeIn 0.5s ease';
      }, i * 280);
    }
  });
}

// ── Layer toggle wiring ───────────────────────────────────────────────────────

/**
 * Wire bottom-bar toggle buttons to layer add/remove.
 * @param {Object} layers — { solar, wind, soil, esg } Leaflet LayerGroup instances
 * @param {L.Map} map
 * @param {Function} onToggle — called with (activeLayerKey)
 */
export function wireToggleBar(layers, map, onToggle) {
  const buttons = document.querySelectorAll('.layer-btn');
  const activeLayerName = document.getElementById('active-layer-name');

  // Map data-layer → human label
  const LABELS = {
    solar: 'Solar Irradiance',
    wind:  'Wind Speed',
    soil:  'Soil Moisture',
    esg:   'ESG Risk Zones',
  };

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.layer;
      const isActive = btn.classList.contains('active');

      if (isActive) {
        // Deactivate: remove layer, un-press button
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
        if (layers[key]) map.removeLayer(layers[key]);
        if (activeLayerName) activeLayerName.textContent = 'None active';
        updateLegend(null);
        onToggle(null);
      } else {
        // Activate this layer, deactivate others
        buttons.forEach(b => {
          const bKey = b.dataset.layer;
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
          if (layers[bKey]) map.removeLayer(layers[bKey]);
        });

        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        if (layers[key]) layers[key].addTo(map);
        if (activeLayerName) activeLayerName.textContent = LABELS[key] || key;
        updateLegend(key);
        onToggle(key);
      }
    });
  });
}

// ── Update map legend ─────────────────────────────────────────────────────────

export function updateLegend(layerKey) {
  const legend = document.getElementById('map-legend');
  const title  = document.getElementById('legend-title');
  const scale  = document.getElementById('legend-scale');
  if (!legend || !title || !scale) return;

  if (!layerKey || !LAYER_LEGENDS[layerKey]) {
    legend.classList.add('hidden');
    return;
  }

  const meta = LAYER_LEGENDS[layerKey];
  title.textContent = meta.title;
  scale.innerHTML = meta.items.map(item =>
    `<div class="legend-row">
      <span class="legend-swatch" style="background:${item.color}"></span>
      <span>${item.label}</span>
    </div>`
  ).join('');

  legend.classList.remove('hidden');
}
