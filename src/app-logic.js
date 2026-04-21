// ─── USA SOLAR ATLAS DATA ──────────────────────────────────────────────────

var US_SOLAR_ZONES = [
  {
    id:'southwest', label:'Southwest Desert', states:'CA · AZ · NV · NM',
    ghi:6.5, rating:'World Class', color:'#dc2626', fillOpacity:0.30,
    bounds:[[31.3,-120.5],[37.5,-103.5]],
    detail:'Highest solar resource in the US. GHI 6.0–7.5 kWh/m²/day. Home to the largest utility-scale solar farms: Mojave, Blythe, Agua Caliente.'
  },
  {
    id:'southern_plains', label:'Southern Great Plains', states:'TX · OK · KS',
    ghi:5.5, rating:'Excellent', color:'#ea580c', fillOpacity:0.26,
    bounds:[[25.8,-104.5],[37.0,-93.5]],
    detail:'Strong solar resource combining with wind potential. GHI 5.0–6.0 kWh/m²/day. Texas leads US in solar + wind capacity additions.'
  },
  {
    id:'southeast', label:'Southeast Sun Belt', states:'AL · GA · FL · MS · SC',
    ghi:4.8, rating:'Very Good', color:'#f59e0b', fillOpacity:0.26,
    bounds:[[24.4,-91.5],[35.8,-79.0]],
    detail:'Strong sun belt resource. GHI 4.5–5.5 kWh/m²/day. King Lake (FL) at 5.35 kWh/m²/day is in the upper tier of this region.'
  },
  {
    id:'mid_atlantic', label:'Mid-Atlantic & Carolinas', states:'NC · VA · MD · DE · NJ',
    ghi:4.2, rating:'Good', color:'#eab308', fillOpacity:0.22,
    bounds:[[33.8,-84.5],[40.5,-74.0]],
    detail:'Moderate resource with high demand centers. GHI 3.9–4.6 kWh/m²/day. Strong utility-scale growth driven by state RPS mandates.'
  },
  {
    id:'midwest', label:'Midwest / Corn Belt', states:'IA · IL · IN · OH · MO',
    ghi:4.0, rating:'Moderate', color:'#84cc16', fillOpacity:0.20,
    bounds:[[36.0,-97.5],[45.5,-80.0]],
    detail:'Increasingly competitive solar resource. GHI 3.8–4.5 kWh/m²/day. Strong agrivoltaic development potential on farmland.'
  },
  {
    id:'northern_plains', label:'Northern Great Plains', states:'MT · ND · SD · WY · NE',
    ghi:4.3, rating:'Good', color:'#06b6d4', fillOpacity:0.20,
    bounds:[[40.5,-114.0],[49.0,-96.5]],
    detail:'Underutilized solar resource with excellent wind pairing. GHI 4.0–5.0 kWh/m²/day. Wyoming and Montana show strong utility-scale potential.'
  },
  {
    id:'northwest', label:'Pacific Northwest', states:'WA · OR · ID',
    ghi:3.8, rating:'Moderate', color:'#22c55e', fillOpacity:0.20,
    bounds:[[41.8,-124.5],[49.0,-110.5]],
    detail:'Lower irradiance but excellent hydro + solar complementarity. GHI 3.5–4.5 kWh/m²/day. Strong growth in eastern WA/OR dry side.'
  },
  {
    id:'new_england', label:'New England & New York', states:'MA · CT · NY · PA · NE States',
    ghi:3.6, rating:'Fair', color:'#8b5cf6', fillOpacity:0.18,
    bounds:[[39.5,-80.5],[47.5,-66.5]],
    detail:'Lower irradiance but aggressive state policy drivers (MA SMART, CT ZREC, NY CLCPA). GHI 3.3–4.0 kWh/m²/day. High retail rates make economics viable.'
  }
];

var ATLAS_LEGEND_ITEMS = [
  {color:'#dc2626', label:'≥6.0 — World Class'},
  {color:'#ea580c', label:'5.5–6.0 — Excellent'},
  {color:'#f59e0b', label:'4.8–5.5 — Very Good'},
  {color:'#eab308', label:'4.2–4.8 — Good'},
  {color:'#84cc16', label:'3.8–4.2 — Moderate'},
  {color:'#22c55e', label:'<3.8 — Fair'}
];

// ─── DATA ──────────────────────────────────────────────────────────────────

var KING_LAKE_CENTER = [28.2906, -82.2918];

var BOUNDARY_PROJECT = [[-82.330,28.310],[-82.322,28.317],[-82.310,28.325],[-82.295,28.330],[-82.279,28.333],[-82.263,28.330],[-82.249,28.323],[-82.239,28.313],[-82.235,28.299],[-82.237,28.285],[-82.246,28.272],[-82.258,28.265],[-82.274,28.262],[-82.290,28.264],[-82.305,28.270],[-82.316,28.279],[-82.325,28.290],[-82.329,28.302],[-82.330,28.310]];
var BOUNDARY_LAKE    = [[-82.302,28.300],[-82.297,28.303],[-82.290,28.305],[-82.283,28.304],[-82.277,28.300],[-82.274,28.294],[-82.275,28.287],[-82.279,28.282],[-82.286,28.279],[-82.293,28.278],[-82.300,28.280],[-82.306,28.285],[-82.308,28.292],[-82.305,28.297],[-82.302,28.300]];

// NREL NSRDB — Solar GHI kWh/m²/day — 5×5 grid (King Lake, Pasco Co., FL)
var SOLAR_LATS = [28.310,28.300,28.290,28.280,28.270];
var SOLAR_LNGS = [-82.315,-82.305,-82.292,-82.280,-82.268];
var SOLAR_VALS = [
  [5.12,5.19,5.23,5.21,5.16],
  [5.25,5.34,5.41,5.38,5.28],
  [5.30,5.41,5.53,5.48,5.33],
  [5.22,5.31,5.38,5.34,5.25],
  [5.10,5.16,5.22,5.18,5.11]
];

// Open-Meteo ERA5 — 80m hub height m/s — 5×5 grid (Pasco Co., FL)
var WIND_VALS = [
  [4.22,4.31,4.41,4.36,4.27],
  [4.38,4.52,4.67,4.62,4.47],
  [4.51,4.69,4.98,4.91,4.71],
  [4.34,4.47,4.58,4.53,4.41],
  [4.11,4.23,4.34,4.29,4.16]
];

// NASA SMAP L3 — soil moisture m³/m³ — 5×5 grid (Myakka fine sand, Spodosol)
var SOIL_VALS = [
  [0.148,0.155,0.161,0.158,0.152],
  [0.163,0.172,0.181,0.178,0.167],
  [0.185,0.196,0.218,0.211,0.193],
  [0.170,0.178,0.186,0.182,0.174],
  [0.142,0.149,0.157,0.153,0.145]
];

// ESG zones — derived from EPA EnviroAtlas + USGS NHD + FDEP (Pasco Co., FL)
var ESG_ZONES = [
  {
    coords:[[-82.332,28.308],[-82.318,28.318],[-82.308,28.312],[-82.314,28.302],[-82.328,28.298],[-82.335,28.304],[-82.332,28.308]],
    type:'high_opportunity', label:'NW Upland — Solar Preferred', score:82,
    color:'#00d4aa', fillOpacity:0.22,
    desc:'Open scrub-upland, no protected status. Flat terrain ideal for ground-mount solar. Gopher tortoise survey recommended pre-construction.'
  },
  {
    coords:[[-82.265,28.283],[-82.253,28.286],[-82.248,28.276],[-82.256,28.266],[-82.270,28.265],[-82.275,28.275],[-82.265,28.283]],
    type:'high_opportunity', label:'SE Upland — Wind & Solar', score:78,
    color:'#00d4aa', fillOpacity:0.22,
    desc:'Open pine flatwoods with moderate wind exposure. Dual-use solar+wind potential. No FDEP land-use constraints identified.'
  },
  {
    coords:[[-82.311,28.325],[-82.296,28.331],[-82.282,28.327],[-82.285,28.317],[-82.299,28.313],[-82.312,28.318],[-82.311,28.325]],
    type:'moderate_caution', label:'Northern Buffer — Moderate Constraints', score:61,
    color:'#fbbf24', fillOpacity:0.22,
    desc:'Transitional scrub-wetland edge. SWFWMD environmental resource permit review required. Wind turbine feasible with setback compliance.'
  },
  {
    coords:[[-82.305,28.300],[-82.295,28.305],[-82.283,28.305],[-82.276,28.300],[-82.273,28.293],[-82.275,28.286],[-82.280,28.281],[-82.287,28.278],[-82.295,28.277],[-82.303,28.279],[-82.309,28.285],[-82.311,28.293],[-82.305,28.300]],
    type:'riparian_buffer', label:'FDEP Riparian Buffer — 100ft Zone', score:28,
    color:'#fb923c', fillOpacity:0.30,
    desc:'⚠ Mandatory 100-ft undisturbed buffer per FDEP Rule 62-330 and SWFWMD criteria. No ground disturbance permitted.'
  },
  {
    coords:[[-82.327,28.289],[-82.320,28.294],[-82.316,28.289],[-82.319,28.283],[-82.325,28.282],[-82.329,28.286],[-82.327,28.289]],
    type:'wetland_protected', label:'Jurisdictional Wetland — CWA §404', score:14,
    color:'#f87171', fillOpacity:0.35,
    desc:'⚠ Confirmed CWA jurisdictional wetland (PFO1C). ACOE Jacksonville District permit required for any fill or impact.'
  }
];

// ─── ESG COMPUTATION ───────────────────────────────────────────────────────

function computeESG() {
  var soilAvg = 0.185, solarAvg = 5.35, windAvg = 4.72;
  // Environmental (40%) — Pasco County, FL
  var waterQ   = 1.0; // no EPA 303(d) impairment on King Lake
  var soilH    = Math.max(0, Math.min(1, 1.0 - Math.abs(soilAvg - 0.25) / 0.25 * 1.2));
  var wetlandF = Math.max(0, 1.0 - 0.08 * 1.5);
  var E = 0.45*waterQ + 0.35*soilH + 0.20*wetlandF;
  // Social (30%) — Land O' Lakes ~12.4 km, denser suburban Pasco Co.
  var distS    = Math.min(1, 12.4 / 28);
  var popS     = Math.max(0, 1.0 - (2800/5000)*0.7);
  var econB    = 0.80;
  var S = 0.45*distS + 0.30*popS + 0.25*econB;
  // Governance (30%)
  var protC    = 0.90;
  var regS     = 0.86;
  var zonS     = 0.82;
  var permP    = 0.83;
  var G = 0.35*protC + 0.30*regS + 0.20*zonS + 0.15*permP;
  var total = Math.round((0.40*E + 0.30*S + 0.30*G) * 100);
  return {
    total: total,
    env:   Math.round(E * 100),
    soc:   Math.round(S * 100),
    gov:   Math.round(G * 100),
    solarAvg: solarAvg, windAvg: windAvg, soilAvg: soilAvg,
    grade: gradeFromTotal(total),
    summary: summaryFromTotal(total)
  };
}

function gradeFromTotal(total) {
  if (total >= 85) return 'A';
  if (total >= 75) return 'B+';
  if (total >= 65) return 'B';
  if (total >= 55) return 'C+';
  return 'C';
}

function summaryFromTotal(total) {
  if (total >= 80) return 'High-confidence candidate with limited ESG drag.';
  if (total >= 70) return 'Attractive site with focused permitting and engagement work still required.';
  if (total >= 60) return 'Viable with mitigation planning and a tighter first phase.';
  return 'Meaningful ESG friction requires a conservative project path.';
}

function buildScoreHelpText(esg) {
  return 'Composite score: ' + esg.total + '/100, weighted 40% Environmental (' + esg.env + '), 30% Social (' + esg.soc + '), and 30% Governance (' + esg.gov + '). Strong water quality, localized wetland exposure, and a supportive permitting context lift the score, while community engagement and documentation work keep the site below the top tier.';
}

// ─── COLOUR HELPERS ────────────────────────────────────────────────────────

var PROFILE_MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var PROFILE_MONTH_KEYS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
var POWER_CLIMATOLOGY_ENDPOINT = 'https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=ALLSKY_SFC_SW_DWN,WS50M&community=RE&longitude=-82.2918&latitude=28.2906&format=JSON';
var OFFICIAL_PROFILES = {
  solar: {
    title: 'Solar Irradiance',
    source: 'NASA POWER Climatology API',
    variable: 'All Sky Surface Shortwave Downward Irradiance',
    unit: 'kWh/m2/day',
    precision: 2,
    annual: 4.9622,
    accent: '#f59e0b',
    series: [3.4308, 4.1186, 5.2742, 6.2642, 6.6842, 6.0526, 5.7317, 5.4686, 5.0726, 4.5617, 3.7123, 3.1421],
    period: '20-year monthly climatology (Jan 2001 to Dec 2020)',
    endpoint: POWER_CLIMATOLOGY_ENDPOINT
  },
  wind: {
    title: 'Wind Speed',
    source: 'NASA POWER Climatology API',
    variable: 'Wind Speed at 50 Meters',
    unit: 'm/s',
    precision: 2,
    annual: 5.17,
    accent: '#6366f1',
    series: [6.00, 5.79, 5.93, 5.53, 4.96, 4.18, 3.71, 3.97, 4.86, 5.54, 5.81, 5.87],
    period: '20-year monthly climatology (Jan 2001 to Dec 2020)',
    endpoint: POWER_CLIMATOLOGY_ENDPOINT
  }
};

function lerp(a, b, t) { return a + (b - a) * t; }
function gradColor(t, stops) {
  t = Math.max(0, Math.min(1, t));
  var seg = (stops.length - 1) * t;
  var lo = Math.floor(seg), hi = Math.min(stops.length - 1, lo + 1);
  var f = seg - lo;
  var r = Math.round(lerp(stops[lo][0], stops[hi][0], f));
  var g = Math.round(lerp(stops[lo][1], stops[hi][1], f));
  var b = Math.round(lerp(stops[lo][2], stops[hi][2], f));
  return 'rgb('+r+','+g+','+b+')';
}
var SOLAR_RAMP = [[80,40,0],[146,102,0],[245,158,11],[252,211,77],[255,245,150]];
var WIND_RAMP  = [[15,23,42],[49,46,129],[99,102,241],[134,239,172],[224,242,254]];
var SOIL_RAMP  = [[92,51,23],[120,86,34],[74,168,96],[52,211,153],[167,243,208]];

function norm(v, min, max) { return (v - min) / (max - min); }

// ─── LAYER BUILDERS ────────────────────────────────────────────────────────

function buildPointLayer(vals, ramp, minV, maxV, unitLabel, decimals) {
  var markers = [];
  for (var r = 0; r < SOLAR_LATS.length; r++) {
    for (var c = 0; c < SOLAR_LNGS.length; c++) {
      var v = vals[r][c];
      var t = norm(v, minV, maxV);
      var fill = gradColor(t, ramp);
      (function(lat, lng, val, color, ul, dec){
        var m = L.circleMarker([lat, lng], {
          radius: 13, fillColor: color, fillOpacity: 0.82, color: color, weight: 0
        });
        m.bindTooltip('<strong>' + ul + '</strong><br/>' + val.toFixed(dec), {direction:'top', offset:[0,-8]});
        markers.push(m);
      })(SOLAR_LATS[r], SOLAR_LNGS[c], v, fill, unitLabel, decimals);
    }
  }
  return L.layerGroup(markers);
}

function buildSolarLayer() { return buildPointLayer(SOLAR_VALS, SOLAR_RAMP, 4.9, 5.6, 'Solar GHI (kWh/m²/day)', 2); }
function buildWindLayer()  { return buildPointLayer(WIND_VALS,  WIND_RAMP,  3.8, 5.2, 'Wind Speed @ 80m (m/s)', 2); }
function buildSoilLayer()  { return buildPointLayer(SOIL_VALS,  SOIL_RAMP,  0.12,0.24,'Soil Moisture (m³/m³)',   3); }

function buildEsgLayer() {
  var group = L.layerGroup();
  ESG_ZONES.forEach(function(z) {
    var latlngs = z.coords.map(function(c){ return [c[1], c[0]]; });
    var poly = L.polygon(latlngs, {
      color: z.color, weight: 2, opacity: 0.9,
      fillColor: z.color, fillOpacity: z.fillOpacity
    });
    var scoreText = z.score != null ? 'ESG Score: <strong>' + z.score + '</strong>' : 'N/A';
    poly.bindTooltip(
      '<strong>' + z.label + '</strong><br/>' + scoreText + '<br/><em>' + z.desc + '</em>',
      {direction:'top', maxWidth:240}
    );
    poly.on('mouseover', function(e){ e.target.setStyle({fillOpacity: Math.min(0.7, z.fillOpacity + 0.25)}); });
    poly.on('mouseout',  function(e){ e.target.setStyle({fillOpacity: z.fillOpacity}); });
    poly.addTo(group);
  });
  return group;
}

// ─── LEGEND DATA ───────────────────────────────────────────────────────────

var LEGENDS = {
  solar: { title:'Solar GHI (kWh/m²/day)', items:[
    {c:'#fff5a0',l:'≥5.4 — Excellent'},{c:'#f59e0b',l:'5.1–5.4 — Very Good'},{c:'#926600',l:'4.9–5.1 — Good'}
  ]},
  wind: { title:'Wind Speed @ 80m (m/s)', items:[
    {c:'#e0f2fe',l:'≥4.8 — Moderate+'},{c:'#818cf8',l:'4.4–4.8 — Moderate'},{c:'#312e81',l:'3.8–4.4 — Class 1–2'}
  ]},
  soil: { title:'Soil Moisture (m³/m³)', items:[
    {c:'#34d399',l:'≥0.20 — Moderate'},{c:'#4aa860',l:'0.16–0.20 — Low'},{c:'#783300',l:'0.12–0.16 — Very Low'}
  ]},
  esg: { title:'ESG Risk Zones', items:[
    {c:'#00d4aa',l:'High Opportunity'},{c:'#fbbf24',l:'Moderate Caution'},
    {c:'#fb923c',l:'Riparian Buffer'},{c:'#f87171',l:'Wetland Protected'}
  ]}
};

// ─── GAUGE ─────────────────────────────────────────────────────────────────

var ARC_LEN = 251.2;

function animateGauge(score) {
  var gv = document.getElementById('gauge-value');
  var gn = document.getElementById('gauge-number');
  if (!gv || !gn) return;
  var offset = ARC_LEN - (score / 100) * ARC_LEN;
  var color = score >= 70 ? '#009e7d' : score >= 55 ? '#16a34a' : score >= 40 ? '#d97706' : '#dc2626';
  gv.style.strokeDashoffset = offset;
  gv.style.stroke = color;
  var start = null;
  function step(ts) {
    if (!start) start = ts;
    var p = Math.min((ts - start) / 1100, 1);
    var e = 1 - Math.pow(1 - p, 3);
    gn.textContent = Math.round(e * score);
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function renderBreakdown(env, soc, gov) {
  var items = [{k:'env',v:env},{k:'soc',v:soc},{k:'gov',v:gov}];
  items.forEach(function(it) {
    var bar = document.getElementById('bar-' + it.k);
    var val = document.getElementById('val-' + it.k);
    if (bar) requestAnimationFrame(function(){ bar.style.width = it.v + '%'; });
    if (val) val.textContent = it.v;
  });
}

// ─── LEGEND UPDATE ─────────────────────────────────────────────────────────

function renderMetrics(esg) {
  var solarAvg = esg.solarAvg;
  var windAvg  = esg.windAvg;
  var soilAvg  = esg.soilAvg;
  function set(key, val, rating) {
    var ve = document.getElementById('mv-' + key);
    var re = document.getElementById('mr-' + key);
    if (ve) ve.textContent = val;
    if (re) {
      re.textContent = rating;
      re.className = 'metric-rating ' + (rating === 'Excellent' || rating === 'High' ? 'rating-excellent' : rating === 'Good' ? 'rating-good' : 'rating-fair');
    }
  }
  set('solar', solarAvg.toFixed(2), solarAvg >= 5.2 ? 'Excellent' : 'Good');
  set('wind',  windAvg.toFixed(2),  windAvg >= 5.5 ? 'Excellent' : windAvg >= 4.5 ? 'Good' : 'Moderate');
  set('soil',  soilAvg.toFixed(3),  soilAvg >= 0.20 ? 'Good' : 'Moderate');
}

function getChecklistSnapshot() {
  var counts = {compliant:0,'in-progress':0,'not-started':0};
  var openItems = [];
  var totalItems = 0;
  Object.keys(CL_DATA).forEach(function(sectionKey) {
    var section = CL_DATA[sectionKey];
    section.items.forEach(function(item) {
      totalItems++;
      counts[item.status] = (counts[item.status] || 0) + 1;
      if (item.status !== 'compliant') {
        openItems.push({ section: section.label, status: item.status, title: item.title, desc: item.desc });
      }
    });
  });
  openItems.sort(function(a, b) {
    var order = {'in-progress':0,'not-started':1,'na':2};
    return (order[a.status] || 9) - (order[b.status] || 9);
  });
  return {
    counts: counts,
    totalItems: totalItems,
    readiness: Math.round(((counts.compliant + counts['in-progress'] * 0.5) / totalItems) * 100),
    openItems: openItems
  };
}

function statusLabel(status) {
  if (status === 'in-progress') return 'In Progress';
  if (status === 'not-started') return 'Not Started';
  if (status === 'compliant') return 'Compliant';
  return 'Open';
}

function renderOfficialProfiles() {
  var wrap = document.getElementById('official-profiles');
  if (!wrap) return;
  renderOfficialProfileKpis();
  wrap.innerHTML = Object.keys(OFFICIAL_PROFILES).map(function(key) {
    var profile = OFFICIAL_PROFILES[key];
    var maxValue = Math.max.apply(null, profile.series);
    var minValue = Math.min.apply(null, profile.series);
    var peakIndex = profile.series.indexOf(maxValue);
    var lowIndex = profile.series.indexOf(minValue);
    return ''
      + '<article class="profile-card" data-profile-key="' + key + '">'
      +   '<div class="profile-head">'
      +     '<div>'
      +       '<div class="profile-kicker">' + profile.source + '</div>'
      +       '<h3 class="profile-title">' + profile.title + '</h3>'
      +     '</div>'
      +     '<div class="profile-annual">' + profile.annual.toFixed(profile.precision) + '<span>Annual</span></div>'
      +   '</div>'
      +   '<p class="profile-subtitle">' + profile.variable + ' (' + profile.unit + ')</p>'
      +   '<div class="profile-graph-row">'
      +     '<div class="profile-chart">' + buildProfileChartSvg(profile) + '</div>'
      +     '<div class="profile-inline-stats">'
      +       '<div class="profile-stat"><span class="profile-stat-label">Peak</span><strong class="profile-stat-value">' + PROFILE_MONTHS[peakIndex] + ' ' + maxValue.toFixed(profile.precision) + '</strong></div>'
      +       '<div class="profile-stat"><span class="profile-stat-label">Low</span><strong class="profile-stat-value">' + PROFILE_MONTHS[lowIndex] + ' ' + minValue.toFixed(profile.precision) + '</strong></div>'
      +       '<div class="profile-stat"><span class="profile-stat-label">Coverage</span><strong class="profile-stat-value">2001-2020</strong></div>'
      +     '</div>'
      +   '</div>'
      +   '<div class="profile-month-grid">' + buildProfileMonthGrid(profile) + '</div>'
      +   '<div class="profile-footer">'
      +     '<div class="profile-period">Official source at 28.2906N, 82.2918W.<br>' + profile.period + '.</div>'
      +     '<a class="profile-source-link" href="' + profile.endpoint + '" target="_blank" rel="noreferrer">Open official JSON</a>'
      +   '</div>'
      + '</article>';
  }).join('');
  wireProfileChartTooltips(wrap);
}

function renderOfficialProfileKpis() {
  var wrap = document.getElementById('official-profile-kpis');
  if (!wrap) return;

  var cards = Object.keys(OFFICIAL_PROFILES).map(function(key) {
    var profile = OFFICIAL_PROFILES[key];
    var maxValue = Math.max.apply(null, profile.series);
    var peakIndex = profile.series.indexOf(maxValue);
    return [
      {
        tone: key,
        label: profile.title + ' annual',
        value: profile.annual.toFixed(profile.precision) + ' ' + profile.unit,
        copy: '12-month average signal'
      },
      {
        tone: key,
        label: profile.title + ' peak',
        value: PROFILE_MONTHS[peakIndex] + ' ' + maxValue.toFixed(profile.precision),
        copy: 'strongest month in the cycle'
      }
    ];
  }).flat();

  cards.push({
    tone: 'neutral',
    label: 'Coverage',
    value: _profileCoverageShort(OFFICIAL_PROFILES.solar.period),
    copy: 'official climatology window'
  });

  wrap.innerHTML = cards.map(function(card) {
    return ''
      + '<button class="profile-kpi-button profile-kpi-' + card.tone + '" type="button" tabindex="-1">'
      +   '<span class="profile-kpi-label">' + card.label + '</span>'
      +   '<strong class="profile-kpi-value">' + card.value + '</strong>'
      +   '<span class="profile-kpi-copy">' + card.copy + '</span>'
      + '</button>';
  }).join('');
}

function buildProfileMonthGrid(profile) {
  return PROFILE_MONTHS.map(function(month, index) {
    return ''
      + '<div class="profile-month">'
      +   '<span class="profile-month-label">' + month + '</span>'
      +   '<strong class="profile-month-value">' + profile.series[index].toFixed(profile.precision) + '</strong>'
      + '</div>';
  }).join('');
}

function buildProfileChartSvg(profile) {
  var width = 320;
  var height = 110;
  var left = 26;
  var right = 10;
  var top = 14;
  var bottom = 22;
  var plotWidth = width - left - right;
  var plotHeight = height - top - bottom;
  var maxValue = Math.max.apply(null, profile.series);
  var minValue = Math.min.apply(null, profile.series);
  var step = plotWidth / profile.series.length;
  var barWidth = step * 0.62;
  var avgY = top + plotHeight - (profile.annual / maxValue) * plotHeight;
  var gradId = 'profileGrad_' + Math.random().toString(36).slice(2, 8);
  var areaGradId = 'profileArea_' + Math.random().toString(36).slice(2, 8);
  var bars = '';
  var hits = '';
  var labels = '';
  var linePath = '';
  var areaPath = '';
  var points = '';
  var firstX = null;
  var lastX = null;
  var baselineY = top + plotHeight;

  // y-axis ticks (3): max, mid, min-of-zero baseline
  var ticks = [maxValue, maxValue / 2, 0];
  var gridLines = '';
  var tickLabels = '';
  ticks.forEach(function(tv) {
    var ty = top + plotHeight - (tv / maxValue) * plotHeight;
    gridLines += '<line x1="' + left + '" y1="' + ty.toFixed(1) + '" x2="' + (width - right) + '" y2="' + ty.toFixed(1) + '" stroke="rgba(148,163,184,0.18)" stroke-width="0.6" stroke-dasharray="2 3"></line>';
    tickLabels += '<text x="' + (left - 4) + '" y="' + (ty + 3).toFixed(1) + '" text-anchor="end" fill="#7a94a8" font-size="7.5" font-family="Inter, sans-serif">' + tv.toFixed(profile.precision) + '</text>';
  });

  profile.series.forEach(function(value, index) {
    var labelValue = value.toFixed(profile.precision) + ' ' + profile.unit;
    var x = left + index * step + (step - barWidth) / 2;
    var barHeight = (value / maxValue) * plotHeight;
    var y = top + plotHeight - barHeight;
    var centerX = x + barWidth / 2;
    var point = centerX.toFixed(1) + ',' + y.toFixed(1);
    if (firstX === null) firstX = centerX;
    lastX = centerX;

    var isPeak = value === maxValue;
    var isLow = value === minValue;
    var pointR = (isPeak || isLow) ? 3.4 : 2.4;
    var ringClass = isPeak ? ' is-peak' : isLow ? ' is-low' : '';

    bars += '<rect class="profile-bar" data-month-index="' + index + '" x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + barWidth.toFixed(1) + '" height="' + barHeight.toFixed(1) + '" rx="3" fill="url(#' + gradId + ')" fill-opacity="' + (0.55 + (value / maxValue) * 0.4).toFixed(2) + '"></rect>';
    points += '<circle class="profile-point' + ringClass + '" data-month-index="' + index + '" cx="' + centerX.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + pointR + '" fill="' + profile.accent + '" stroke="#ffffff" stroke-width="1.4"></circle>';
    hits += '<rect class="profile-hit" data-month-index="' + index + '" data-month="' + PROFILE_MONTHS[index] + '" data-value="' + labelValue + '" x="' + (left + index * step).toFixed(1) + '" y="' + top + '" width="' + step.toFixed(1) + '" height="' + plotHeight.toFixed(1) + '" fill="transparent"></rect>';
    labels += '<text x="' + centerX.toFixed(1) + '" y="' + (height - 6) + '" text-anchor="middle" fill="#7a94a8" font-size="8" font-family="Inter, sans-serif">' + PROFILE_MONTHS[index].charAt(0) + '</text>';
    linePath += (index === 0 ? 'M ' : ' L ') + point;
    areaPath += (index === 0 ? 'M ' : ' L ') + point;
  });
  areaPath += ' L ' + lastX.toFixed(1) + ',' + baselineY.toFixed(1) + ' L ' + firstX.toFixed(1) + ',' + baselineY.toFixed(1) + ' Z';

  return ''
    + '<svg class="profile-chart-svg" data-accent="' + profile.accent + '" viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-label="' + profile.title + ' monthly average chart">'
    +   '<defs>'
    +     '<linearGradient id="' + gradId + '" x1="0" y1="0" x2="0" y2="1">'
    +       '<stop offset="0%" stop-color="' + profile.accent + '" stop-opacity="0.95"/>'
    +       '<stop offset="100%" stop-color="' + profile.accent + '" stop-opacity="0.4"/>'
    +     '</linearGradient>'
    +     '<linearGradient id="' + areaGradId + '" x1="0" y1="0" x2="0" y2="1">'
    +       '<stop offset="0%" stop-color="' + profile.accent + '" stop-opacity="0.18"/>'
    +       '<stop offset="100%" stop-color="' + profile.accent + '" stop-opacity="0"/>'
    +     '</linearGradient>'
    +   '</defs>'
    +   gridLines
    +   tickLabels
    +   '<path d="' + areaPath + '" fill="url(#' + areaGradId + ')"></path>'
    +   '<line x1="' + left + '" y1="' + avgY.toFixed(1) + '" x2="' + (width - right) + '" y2="' + avgY.toFixed(1) + '" stroke="' + profile.accent + '" stroke-width="1" stroke-dasharray="3 3" opacity="0.6"></line>'
    +   '<text x="' + (width - right) + '" y="' + (avgY - 3).toFixed(1) + '" text-anchor="end" fill="' + profile.accent + '" font-size="8" font-weight="700" font-family="Inter, sans-serif" opacity="0.85">avg ' + profile.annual.toFixed(profile.precision) + '</text>'
    +   bars
    +   '<path d="' + linePath + '" fill="none" stroke="' + profile.accent + '" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>'
    +   points
    +   '<line class="profile-guide" x1="0" y1="' + top + '" x2="0" y2="' + (top + plotHeight) + '" stroke="' + profile.accent + '" stroke-width="1" stroke-dasharray="2 3" opacity="0"></line>'
    +   labels
    +   hits
    + '</svg>';
}

function wireProfileChartTooltips(root) {
  if (!root) return;
  var tooltip = document.getElementById('profile-chart-tooltip');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.id = 'profile-chart-tooltip';
    tooltip.className = 'profile-chart-tooltip';
    tooltip.setAttribute('role', 'tooltip');
    tooltip.style.opacity = '0';
    document.body.appendChild(tooltip);
  }
  var charts = root.querySelectorAll('.profile-chart-svg');
  charts.forEach(function(svg) {
    if (svg.dataset.tooltipReady === '1') return;
    svg.dataset.tooltipReady = '1';
    var accent = svg.getAttribute('data-accent') || '#0f9d84';
    var guide = svg.querySelector('.profile-guide');
    var bars = svg.querySelectorAll('.profile-bar');
    var points = svg.querySelectorAll('.profile-point');
    var hits = svg.querySelectorAll('.profile-hit');

    function clearActive() {
      bars.forEach(function(b) { b.classList.remove('is-active'); });
      points.forEach(function(p) { p.classList.remove('is-active'); });
    }
    function activate(idx) {
      clearActive();
      if (bars[idx]) bars[idx].classList.add('is-active');
      if (points[idx]) points[idx].classList.add('is-active');
      if (guide && bars[idx]) {
        var bx = parseFloat(bars[idx].getAttribute('x'));
        var bw = parseFloat(bars[idx].getAttribute('width'));
        var cx = (bx + bw / 2).toFixed(1);
        guide.setAttribute('x1', cx);
        guide.setAttribute('x2', cx);
        guide.setAttribute('opacity', '0.55');
      }
    }
    function showTooltip(evt, hit) {
      var month = hit.getAttribute('data-month') || '';
      var value = hit.getAttribute('data-value') || '';
      tooltip.innerHTML =
        '<span class="pct-month" style="color:' + accent + '">' + month + '</span>' +
        '<span class="pct-value">' + value + '</span>';
      tooltip.style.opacity = '1';
      var pad = 14;
      var rect = tooltip.getBoundingClientRect();
      var x = evt.clientX + pad;
      var y = evt.clientY - rect.height - pad;
      if (x + rect.width + 8 > window.innerWidth) x = evt.clientX - rect.width - pad;
      if (y < 8) y = evt.clientY + pad;
      tooltip.style.left = x + 'px';
      tooltip.style.top = y + 'px';
    }
    function hideTooltip() {
      tooltip.style.opacity = '0';
      clearActive();
      if (guide) guide.setAttribute('opacity', '0');
    }

    hits.forEach(function(hit) {
      var idx = Number(hit.getAttribute('data-month-index'));
      hit.addEventListener('mouseenter', function(e) { activate(idx); showTooltip(e, hit); });
      hit.addEventListener('mousemove', function(e) { showTooltip(e, hit); });
      hit.addEventListener('mouseleave', hideTooltip);
      hit.addEventListener('focus', function() {
        activate(idx);
        var box = hit.getBoundingClientRect();
        showTooltip({ clientX: box.left + box.width / 2, clientY: box.top }, hit);
      });
      hit.addEventListener('blur', hideTooltip);
      hit.setAttribute('tabindex', '0');
    });
  });
}

function trimCopy(text, maxLen) {
  if (!text || text.length <= maxLen) return text;
  return text.slice(0, maxLen - 1).trim() + '...';
}

function formatGWh(mwh) {
  return (mwh / 1000).toFixed(2) + ' GWh';
}

function buildPortfolioModel(esg, checklist) {
  var solarMWh = 1 * 8760 * 0.218;
  var windMWh = 2 * 8760 * 0.25;
  return {
    grade: esg.grade,
    readiness: checklist.readiness,
    annualOutputMWh: solarMWh + windMWh,
    avoidedCarbonTons: 1.72,
    scenarios: [
      { title:'Solar-Led Starter', pill:'Recommended', recommended:true, size:'1 MW solar', output:formatGWh(solarMWh), risk:'Lower', copy:'Fastest route to construction. Strong irradiation and simpler permitting make this the best first tranche while the broader hybrid option matures.' },
      { title:'Balanced Hybrid', pill:'Value Max', recommended:false, size:'1 MW solar + 2 MW wind', output:formatGWh(solarMWh + windMWh), risk:'Moderate', copy:'Highest generation upside and carbon impact once turbine setbacks, grid studies, and community process are further advanced.' },
      { title:'ESG-First Buffer Plan', pill:'Derisked', recommended:false, size:'0.8 MW solar', output:formatGWh(0.8 * 8760 * 0.215), risk:'Lowest', copy:'Smaller footprint that protects buffer-sensitive zones and preserves optionality if environmental constraints tighten.' }
    ]
  };
}

function renderExecutiveSummary(esg) {
  var checklist = getChecklistSnapshot();
  var model = buildPortfolioModel(esg, checklist);
  var openCount = checklist.counts['in-progress'] + checklist.counts['not-started'];
  var riskText = checklist.readiness >= 70 ? 'Controlled' : checklist.readiness >= 55 ? 'Moderate' : 'High';

  var scoreGrade = document.getElementById('score-grade-chip');
  if (scoreGrade) scoreGrade.textContent = model.grade;
  var scoreHeadline = document.getElementById('score-headline');
  if (scoreHeadline) scoreHeadline.textContent = esg.summary;
  var scoreSubcopy = document.getElementById('score-subcopy');
  if (scoreSubcopy) scoreSubcopy.textContent = 'Environmental and governance strength keep the site investable, while social and documentation tasks define the next unlocks.';
  var scoreHelpCopy = document.getElementById('score-help-copy');
  var scoreHelpTrigger = document.getElementById('score-help-trigger');
  var scoreHelpText = buildScoreHelpText(esg);
  if (scoreHelpCopy) scoreHelpCopy.textContent = scoreHelpText;
  if (scoreHelpTrigger) {
    scoreHelpTrigger.setAttribute('aria-label', scoreHelpText);
    scoreHelpTrigger.setAttribute('title', scoreHelpText);
  }

  var heroGrade = document.getElementById('hero-grade');
  if (heroGrade) heroGrade.textContent = model.grade;
  var heroEnergy = document.getElementById('hero-energy');
  if (heroEnergy) heroEnergy.textContent = formatGWh(model.annualOutputMWh);
  var heroEnergyCopy = document.getElementById('hero-energy-copy');
  if (heroEnergyCopy) heroEnergyCopy.textContent = 'Hybrid scenario with solar-led commissioning';
  var heroCarbon = document.getElementById('hero-carbon');
  if (heroCarbon) heroCarbon.textContent = model.avoidedCarbonTons.toFixed(2) + ' kt';
  var heroCarbonCopy = document.getElementById('hero-carbon-copy');
  if (heroCarbonCopy) heroCarbonCopy.textContent = 'Avoided CO2e each operating year';
  var heroReadiness = document.getElementById('hero-readiness');
  if (heroReadiness) heroReadiness.textContent = model.readiness + '%';
  var heroReadinessCopy = document.getElementById('hero-readiness-copy');
  if (heroReadinessCopy) heroReadinessCopy.textContent = checklist.counts.compliant + ' compliant, ' + checklist.counts['in-progress'] + ' in progress';
  var heroFocus = document.getElementById('hero-focus');
  if (heroFocus) heroFocus.textContent = Math.min(4, checklist.openItems.length) + ' moves';
  var heroFocusCopy = document.getElementById('hero-focus-copy');
  if (heroFocusCopy) heroFocusCopy.textContent = 'Wetlands, field studies, engagement, and grid path';

  var signalBadge = document.getElementById('signal-badge');
  if (signalBadge) signalBadge.textContent = 'Proceed with Hybrid Phasing';
  var signalTitle = document.getElementById('signal-title');
  if (signalTitle) signalTitle.textContent = 'Solar should lead the first deployment tranche.';
  var signalCopy = document.getElementById('signal-copy');
  if (signalCopy) signalCopy.textContent = 'Resource quality is strongest on solar, ESG friction is manageable, and the open checklist creates a clear sequence for derisking the larger hybrid build-out.';
  var signalPrimary = document.getElementById('signal-primary');
  if (signalPrimary) signalPrimary.textContent = '1 MW solar';
  var signalExpansion = document.getElementById('signal-expansion');
  if (signalExpansion) signalExpansion.textContent = '2 MW wind';
  var signalRisk = document.getElementById('signal-risk');
  if (signalRisk) signalRisk.textContent = riskText;
  var signalOpen = document.getElementById('signal-open');
  if (signalOpen) signalOpen.textContent = openCount + ' items';

  var scenarioWrap = document.getElementById('scenario-cards');
  if (scenarioWrap) {
    scenarioWrap.innerHTML = model.scenarios.map(function(scenario) {
      return '<div class="scenario-card' + (scenario.recommended ? ' recommended' : '') + '"><div class="scenario-head"><div class="scenario-title">' + scenario.title + '</div><div class="scenario-pill">' + scenario.pill + '</div></div><div class="scenario-meta"><div class="scenario-meta-item"><div class="scenario-meta-label">Build</div><div class="scenario-meta-value">' + scenario.size + '</div></div><div class="scenario-meta-item"><div class="scenario-meta-label">Output</div><div class="scenario-meta-value">' + scenario.output + '</div></div><div class="scenario-meta-item"><div class="scenario-meta-label">Risk</div><div class="scenario-meta-value">' + scenario.risk + '</div></div></div><div class="scenario-copy">' + scenario.copy + '</div></div>';
    }).join('');
  }

  var actionWrap = document.getElementById('action-cards');
  if (actionWrap) {
    actionWrap.innerHTML = checklist.openItems.slice(0, 3).map(function(item, index) {
      return '<div class="action-card"><div class="action-step">' + (index + 1) + '</div><div class="action-body"><div class="action-kicker">' + item.section + '  ' + statusLabel(item.status) + '</div><div class="action-title">' + item.title + '</div><div class="action-copy">' + trimCopy(item.desc, 150) + '</div></div></div>';
    }).join('');
  }
}

function updateLayerBrief(key) {
  var layers = {
    solar: { title:'Solar Irradiance', copy:'High incident radiation across the central and eastern buildable parcels supports a solar-first phase with attractive near-term economics.' },
    wind:  { title:'Wind Speed', copy:'Wind remains viable as a second-phase value amplifier, but it benefits from more mature siting, setback review, and community validation.' },
    soil:  { title:'Soil Moisture', copy:'Dry sandy soils reduce erosion pressure but increase stormwater design importance, foundation sensitivity, and vegetation planning needs.' },
    esg:   { title:'ESG Risk Zones', copy:'The map separates high-opportunity uplands from the riparian and wetland constraints that should drive layout exclusions and the permitting sequence.' },
    none:  { title:'No Active Layer', copy:'Turn on a thematic layer to inspect the resource or risk signals behind the portfolio recommendation.' }
  };
  var meta = layers[key] || layers.none;
  var titleEl = document.getElementById('layer-brief-title');
  var copyEl = document.getElementById('layer-brief-copy');
  if (titleEl) titleEl.textContent = meta.title;
  if (copyEl) copyEl.textContent = meta.copy;
}

function renderInsights(esg) {
  var cards = [
    {
      title:'Revenue Story',
      meta:'Solar economics',
      action:'Approve solar phase',
      tone:'positive',
      highlights:['Fund scoping', 'Start interconnection', 'Open permits'],
      text:'Lead with <span class="insight-inline-emphasis">solar-first deployment</span>. At ' + esg.solarAvg.toFixed(2) + ' kWh/m2/day, the resource supports a <span class="insight-inline-emphasis">bankable near-term move</span>.'
    },
    {
      title:'Wind Fit',
      meta:'Phase-two upside',
      action:'Gate wind later',
      tone:'caution',
      highlights:['Keep hybrid option', 'Validate setbacks', 'Complete siting proof'],
      text:'Keep wind in the case, but treat it as a <span class="insight-inline-emphasis">phase-two unlock</span>. Speeds near ' + esg.windAvg.toFixed(2) + ' m/s are promising, yet <span class="insight-inline-emphasis">siting and community proof</span> still matter.'
    },
    {
      title:'ESG Constraint',
      meta:'Permitting watchlist',
      action:'Protect buffers',
      tone:'focus',
      highlights:['Respect exclusions', 'Document wetlands', 'Preserve ESG score'],
      text:'The site stays investable if layout decisions stay <span class="insight-inline-emphasis">outside wetland and riparian constraints</span>. Soil moisture at ' + esg.soilAvg.toFixed(3) + ' m3/m3 reinforces the need for <span class="insight-inline-emphasis">clear exclusion-led design</span>.'
    }
  ];
  cards.forEach(function(item, i) {
    var card = document.getElementById('insight-' + i);
    if (!card) return;
    setTimeout(function() {
      var chips = '<div class="insight-chip-block"><div class="insight-chip-label">Key moves</div><div class="insight-chip-row">' + item.highlights.map(function(label) {
        return '<span class="insight-chip insight-chip-' + item.tone + '">' + label + '</span>';
      }).join('') + '</div></div>';
      card.className = 'insight-card insight-card-signal insight-card-' + item.tone;
      card.innerHTML =
        '<div class="insight-card-head">' +
          '<div class="insight-heading"><div class="insight-title">' + item.title + '</div><div class="insight-meta">' + item.meta + '</div></div>' +
          '<div class="insight-action insight-action-' + item.tone + '">' + item.action + '</div>' +
        '</div>' +
        chips +
        '<p class="insight-text">' + item.text + '</p>';
      card.style.animation = 'none';
      card.offsetHeight;
      card.style.animation = 'fadeIn .5s ease';
    }, i * 320);
  });
}

function updateLegend(key) {
  var legend = document.getElementById('map-legend');
  var title  = document.getElementById('legend-title');
  var scale  = document.getElementById('legend-scale');
  if (!legend) return;
  if (!key || !LEGENDS[key]) { legend.classList.add('hidden'); return; }
  var meta = LEGENDS[key];
  title.textContent = meta.title;
  scale.innerHTML = meta.items.map(function(it) {
    return '<div class="legend-row"><span class="legend-swatch" style="background:'+it.c+'"></span><span>'+it.l+'</span></div>';
  }).join('');
  legend.classList.remove('hidden');
}

// ─── LAYER TOGGLE BAR ──────────────────────────────────────────────────────

function wireToggleBar(layers, map) {
  var LABELS = {solar:'Solar Irradiance',wind:'Wind Speed',soil:'Soil Moisture',esg:'ESG Risk Zones'};
  var btns = document.querySelectorAll('.layer-btn');
  var nameEl = document.getElementById('active-layer-name');
  btns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var key = btn.dataset.layer;
      var wasActive = btn.classList.contains('active');
      // Remove all
      btns.forEach(function(b) {
        b.classList.remove('active'); b.setAttribute('aria-pressed','false');
        if (layers[b.dataset.layer]) map.removeLayer(layers[b.dataset.layer]);
      });
      if (!wasActive) {
        btn.classList.add('active'); btn.setAttribute('aria-pressed','true');
        if (layers[key]) layers[key].addTo(map);
        if (nameEl) nameEl.textContent = LABELS[key] || key;
        updateLegend(key);
        updateLayerBrief(key);
      } else {
        if (nameEl) nameEl.textContent = 'None';
        updateLegend(null);
        updateLayerBrief('none');
      }
    });
  });
}

// ─── MAP INIT ──────────────────────────────────────────────────────────────

function initMap() {
  var maxBounds = L.latLngBounds([28.255,-82.345],[28.345,-82.235]);
  var map = L.map('map', {
    center: KING_LAKE_CENTER, zoom: 13, minZoom: 11, maxZoom: 16,
    maxBounds: maxBounds, maxBoundsViscosity: 1.0
  });
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; <a href="https://www.esri.com/">Esri</a> &mdash; Source: Esri, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, GIS User Community',
    maxZoom: 19
  }).addTo(map);
  // Hybrid label overlay for place names and roads
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19, opacity: 0.7
  }).addTo(map);

  // Project boundary
  var projLatLngs = BOUNDARY_PROJECT.map(function(c){ return [c[1],c[0]]; });
  L.polygon(projLatLngs, {
    color:'#00d4aa', weight:2, opacity:.7, fillColor:'#00d4aa', fillOpacity:.04, dashArray:'6 4'
  }).bindTooltip('King Lake Project Area · Pasco County, FL', {direction:'top'}).addTo(map);

  // Lake shoreline
  var lakeLatLngs = BOUNDARY_LAKE.map(function(c){ return [c[1],c[0]]; });
  L.polygon(lakeLatLngs, {
    color:'#3b82f6', weight:1.5, opacity:.8, fillColor:'#1d4ed8', fillOpacity:.45
  }).bindTooltip('<strong>King Lake</strong><br/>263 acres · Pasco Co., FL<br/>Pithlachascotee River watershed · HUC8 03100207', {direction:'top'}).addTo(map);

  // Site marker
  L.circleMarker(KING_LAKE_CENTER, {radius:6, fillColor:'#00d4aa', fillOpacity:.9, color:'#fff', weight:2})
   .bindTooltip('<strong>King Lake Site</strong><br/>28.2906°N, 82.2918°W<br/>Elev. ~31m AMSL', {direction:'top'})
   .addTo(map);

  return map;
}



// ─── USA SOLAR ATLAS MAP ──────────────────────────────────────────────────

function initAtlasMap() {
  var map = L.map('us-map', {
    center: [20, 0],
    zoom: 2,
    minZoom: 2,
    maxZoom: ATLAS_LOCATION_FOCUS_ZOOM,
    zoomControl: true,
    attributionControl: true
  });

  // ESRI satellite basemap (consistent with King Lake view)
  L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    {
      attribution: 'Tiles &copy; <a href="https://www.esri.com/">Esri</a> &mdash; Esri, USGS, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, GIS User Community',
      maxZoom: ATLAS_LOCATION_FOCUS_ZOOM,
      maxNativeZoom: ATLAS_LOCATION_FOCUS_ZOOM
    }
  ).addTo(map);

  // Hybrid label overlay for state names, cities, roads
  L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
    { maxZoom: ATLAS_LOCATION_FOCUS_ZOOM, maxNativeZoom: ATLAS_LOCATION_FOCUS_ZOOM, opacity: 0.75 }
  ).addTo(map);

  // Zone rectangles removed — map click fires _fetchLocationData for live lat/lon data

  // Live lat/lon click handler — place pin marker and fetch real solar + wind data
  map.on('click', function(e) {
    var lat = e.latlng.lat, lon = e.latlng.lng;
    map.flyTo([lat, lon], ATLAS_LOCATION_FOCUS_ZOOM, { animate: true, duration: 0.7 });
    // Remove previous pin
    if (_clickMarker) { map.removeLayer(_clickMarker); _clickMarker = null; }
    // Place new teal pin marker
    var pinIcon = L.divIcon({
      className: 'click-pin-wrap',
      html: '<div class="click-pin"><div class="click-pin-head"></div><div class="click-pin-tail"></div></div>',
      iconSize: [26, 34],
      iconAnchor: [13, 34],
      tooltipAnchor: [0, -36]
    });
    _clickMarker = L.marker([lat, lon], {icon: pinIcon, zIndexOffset: 900}).addTo(map);
    _clickMarker.bindTooltip(
      lat.toFixed(4) + '°N, ' + Math.abs(lon).toFixed(4) + '°W',
      {direction: 'top', permanent: false, className: 'leaflet-tooltip'}
    );
    _fetchLocationData(lat, lon);
  });

  // Build floating legend
  var legendEl = document.getElementById('atlas-legend-items');
  if (legendEl) {
    legendEl.innerHTML = ATLAS_LEGEND_ITEMS.map(function(it) {
      return '<div class="ap-legend-row" style="margin-bottom:4px">' +
        '<span class="ap-legend-swatch" style="background:' + it.color + ';border-radius:3px"></span>' +
        '<span style="font-size:11px;color:var(--text-secondary)">' + it.label + '</span></div>';
    }).join('');
  }

  // King Lake pulsing marker
  var klIcon = L.divIcon({
    className: 'kl-marker-wrap',
    html: '<div class="kl-pulse-outer"><div class="kl-pulse-inner"></div></div>',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });
  var portfolioScore = computeESG().total;
  var klMarker = L.marker([28.2906, -82.2918], {icon: klIcon, zIndexOffset: 1000});
  klMarker.bindTooltip(
    '<strong>King Lake, Florida</strong><br/>' +
    'ESG Score: ' + portfolioScore + '/100 &nbsp;&middot;&nbsp; GHI: 5.35 kWh/m²/day<br/>' +
    '<span style="color:#009e7d;font-weight:600">Click to open Portfolio Assessment →</span>',
    {direction: 'top', offset: [0, -10]}
  );
  klMarker.on('click', function() { showCaseStudy(); });
  klMarker.addTo(map);

  // Permanent label on King Lake
  L.tooltip({permanent: true, direction: 'right', offset: [14, 0], className: 'kl-label-tip'})
   .setContent('King Lake Portfolio Assessment')
   .setLatLng([28.2906, -82.2918])
   .addTo(map);

  return map;
}

// ─── ATLAS LAT/LON CLICK — LIVE DATA FETCH ────────────────────────────────

function _fetchLocationData(lat, lon) {
  var p = document.getElementById('atlas-info-panel');
  if (!p) return;
  p.style.display = 'none';
  p.innerHTML =
    '<div class="aip-coord-header">📍 ' + lat.toFixed(4) + '°' + (lat >= 0 ? 'N' : 'S') + ', ' + Math.abs(lon).toFixed(4) + '°' + (lon < 0 ? 'W' : 'E') + '</div>' +
    '<div class="aip-loading"><div class="aip-spinner"></div><span>Fetching live data…</span></div>';

  openLocationPopup(lat, lon, 'Selected location');

  // Show sidenav location section immediately with loading state
  var locSec = document.getElementById('atlas-location-section');
  var alocName = document.getElementById('aloc-name');
  var alocCoords = document.getElementById('aloc-coords');
  var alocMetrics = document.getElementById('aloc-key-metrics');
  var alocMeta = document.getElementById('aloc-meta');
  if (locSec) {
    locSec.style.display = 'none';
    if (alocName) alocName.innerHTML = '<span class="aloc-loading"><span class="aip-spinner"></span>Locating…</span>';
    if (alocCoords) alocCoords.textContent = lat.toFixed(4) + '°' + (lat >= 0 ? 'N' : 'S') + '  ' + Math.abs(lon).toFixed(4) + '°' + (lon < 0 ? 'W' : 'E');
    if (alocMetrics) alocMetrics.innerHTML = '<div class="aloc-loading"><span class="aip-spinner"></span>Fetching solar &amp; wind data…</div>';
    if (alocMeta) alocMeta.textContent = '';
  }

  // Reverse geocode in parallel
  _reverseGeocode(lat, lon, function(err, geo) {
    if (!alocName) return;
    if (err || !geo || !geo.address) {
      alocName.textContent = lat.toFixed(2) + '°' + (lat >= 0 ? 'N' : 'S') + ', ' + Math.abs(lon).toFixed(2) + '°' + (lon < 0 ? 'W' : 'E');
    } else {
      var addr = geo.address;
      var city = addr.city || addr.town || addr.village || addr.hamlet || addr.county || '';
      var state = addr.state || '';
      var country = addr.country_code ? addr.country_code.toUpperCase() : '';
      var display = city ? city : 'Unknown location';
      if (state) display += ', ' + state;
      alocName.textContent = display;
      var lpTitle = document.getElementById('lp-title');
      if (lpTitle) lpTitle.textContent = display;
      if (alocCoords) alocCoords.textContent = lat.toFixed(4) + '°' + (lat >= 0 ? 'N' : 'S') + '  ' + Math.abs(lon).toFixed(4) + '°' + (lon < 0 ? 'W' : 'E');
    }
  });

  var nasaUrl = 'https://power.larc.nasa.gov/api/temporal/climatology/point' +
    '?parameters=ALLSKY_SFC_SW_DWN,ALLSKY_SFC_SW_DNI,ALLSKY_SFC_SW_DIFF,CLRSKY_SFC_SW_DWN,ALLSKY_KT,T2M,WS10M,WS50M,WD10M' +
    '&community=RE&longitude=' + lon.toFixed(4) + '&latitude=' + lat.toFixed(4) + '&format=JSON';

  var omUrl = 'https://api.open-meteo.com/v1/forecast' +
    '?latitude=' + lat.toFixed(4) + '&longitude=' + lon.toFixed(4) +
    '&current=windspeed_10m,winddirection_10m,windspeed_80m,windspeed_120m,windspeed_180m' +
    '&wind_speed_unit=ms&timezone=auto&forecast_days=1';

  var myGen = ++_dataGen; // tag this request; stale callbacks will bail
  var nasaData = null, omData = null, nasaErr = false, omErr = false;
  var elevData = null, subData  = null, elevDone = false, subDone  = false;

  // Phase 1: render main renewable panel as soon as NASA + Open-Meteo arrive
  function tryRender() {
    if (myGen !== _dataGen) return; // superseded by newer click
    if ((nasaData || nasaErr) && (omData || omErr)) {
      _showLatLonPanel(lat, lon, nasaData, omData, myGen);
    }
  }

  // Phase 2: fill terrain + substation + AI insight when both extended sources arrive
  function tryUpdateExtended() {
    if (myGen !== _dataGen) return;
    if (elevDone && subDone) {
      _updateTerrainSubstation(lat, lon, elevData, subData, myGen);
    }
  }

  fetch(nasaUrl)
    .then(function(r){ return r.json(); })
    .then(function(d){ nasaData = d; tryRender(); })
    .catch(function(){ nasaErr = true; tryRender(); });

  fetch(omUrl)
    .then(function(r){ return r.json(); })
    .then(function(d){ omData = d; tryRender(); })
    .catch(function(){ omErr = true; tryRender(); });

  // USGS 3DEP — 5-point elevation + slope (parallel with NASA/OM)
  _fetchElevationData(lat, lon, function(err, data) {
    if (myGen !== _dataGen) return;
    elevData = data; elevDone = true;
    tryUpdateExtended();
  });

  // HIFLD — nearest in-service substation within ~220 km
  _fetchNearestSubstation(lat, lon, function(err, data) {
    if (myGen !== _dataGen) return;
    subData = data; subDone = true;
    tryUpdateExtended();
  });
}

function _reverseGeocode(lat, lon, cb) {
  fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat=' + lat.toFixed(6) +
        '&lon=' + lon.toFixed(6) + '&zoom=10&addressdetails=1',
        {headers: {'Accept-Language': 'en'}})
    .then(function(r){ return r.json(); })
    .then(function(d){ cb(null, d); })
    .catch(function(e){ cb(e, null); });
}

// ─── HAVERSINE DISTANCE ───────────────────────────────────────────────────

function _haversineKm(lat1, lon1, lat2, lon2) {
  var R = 6371, toR = Math.PI / 180;
  var dLat = (lat2 - lat1) * toR, dLon = (lon2 - lon1) * toR;
  var a = Math.sin(dLat/2)*Math.sin(dLat/2) +
          Math.cos(lat1*toR)*Math.cos(lat2*toR)*Math.sin(dLon/2)*Math.sin(dLon/2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

// ─── USGS 3DEP ELEVATION — 5-POINT SLOPE SAMPLING ────────────────────────
// Source: USGS TNM Elevation Point Query Service (3DEP, 1/3 arc-second)
// URL: https://epqs.nationalmap.gov/v1/json

function _fetchElevationData(lat, lon, cb) {
  var dlat = 0.0018; // ≈200 m north/south
  var dlon = 0.0018 / Math.cos(lat * Math.PI / 180); // ≈200 m east/west (lat-corrected)
  var pts = [
    {lbl:'center', lat:lat,        lon:lon       },
    {lbl:'north',  lat:lat+dlat,   lon:lon       },
    {lbl:'south',  lat:lat-dlat,   lon:lon       },
    {lbl:'east',   lat:lat,        lon:lon+dlon  },
    {lbl:'west',   lat:lat,        lon:lon-dlon  }
  ];
  var results = {}, done = 0;

  function finish() {
    var h = 200; // approx metres for 0.0018° offset
    var ns = (results.north != null && results.south != null)
      ? Math.abs(results.north - results.south) / (2*h) * 100 : null;
    var ew = (results.east  != null && results.west  != null)
      ? Math.abs(results.east  - results.west)  / (2*h) * 100 : null;
    // Resultant slope gradient
    var slope = (ns != null && ew != null) ? Math.sqrt(ns*ns + ew*ew)
              : (ns != null ? ns : ew);
    cb(null, {elevation: results.center, slope: slope, raw: results});
  }

  pts.forEach(function(pt) {
    var url = 'https://epqs.nationalmap.gov/v1/json?x=' + pt.lon.toFixed(6) +
              '&y=' + pt.lat.toFixed(6) + '&wkid=4326&units=Meters&includeDate=false';
    fetch(url)
      .then(function(r) { return r.json(); })
      .then(function(d) {
        var v = parseFloat(d.value);
        results[pt.lbl] = (!isNaN(v) && v > -999) ? v : null;
      })
      .catch(function() { results[pt.lbl] = null; })
      .then(function() { if (++done === pts.length) finish(); });
  });
}

// ─── HIFLD ELECTRIC SUBSTATIONS — NEAREST SUBSTATION ─────────────────────
// Source: HIFLD Open Data (EIA-hosted via ArcGIS Online) — public, no key needed
// Layer: Electric_Substations / FeatureServer / 0
// Updated: EIA data, refreshed annually

function _fetchNearestSubstation(lat, lon, cb) {
  var geom = encodeURIComponent(
    '{"x":' + lon.toFixed(4) + ',"y":' + lat.toFixed(4) + ',"spatialReference":{"wkid":4326}}'
  );
  var url = 'https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/' +
    'Electric_Substations/FeatureServer/0/query' +
    '?geometry=' + geom +
    '&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects' +
    '&distance=2.0&units=esriSRUnit_Degree' +
    '&where=STATUS+%3D+%27IN+SERVICE%27' +
    '&outFields=NAME,OWNER,CITY,STATE,VOLTAGE,LINES' +
    '&returnGeometry=true&outSR=4326&resultRecordCount=25&f=json';

  fetch(url)
    .then(function(r) { return r.json(); })
    .then(function(d) {
      if (!d.features || !d.features.length) { cb(null, null); return; }
      var nearest = null, minDist = Infinity;
      d.features.forEach(function(feat) {
        var g = feat.geometry;
        if (!g) return;
        var dist = _haversineKm(lat, lon, g.y, g.x);
        if (dist < minDist) {
          minDist = dist;
          var a = feat.attributes;
          nearest = {
            name:    a.NAME    || 'Unnamed Substation',
            owner:   a.OWNER   || '',
            city:    a.CITY    || '',
            state:   a.STATE   || '',
            voltage: a.VOLTAGE,
            lines:   a.LINES,
            distKm:  dist
          };
        }
      });
      cb(null, nearest);
    })
    .catch(function(e) { cb(e, null); });
}

function _dirToCard(deg) {
  if (deg == null || isNaN(deg)) return '—';
  var dirs = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
  return dirs[Math.round(deg / 22.5) % 16];
}

function _pvRating(pvout) {
  if (pvout >= 5.0) return 'excellent';
  if (pvout >= 4.2) return 'very-good';
  if (pvout >= 3.5) return 'good';
  if (pvout >= 2.8) return 'moderate';
  return 'fair';
}

function _pvRatingLabel(pvout) {
  if (pvout >= 5.0) return 'Excellent';
  if (pvout >= 4.2) return 'Very Good';
  if (pvout >= 3.5) return 'Good';
  if (pvout >= 2.8) return 'Moderate';
  return 'Fair';
}

function _row(label, val, sub) {
  return '<div class="aip-row"><span class="aip-label">' + label + '</span>' +
    '<span class="aip-val">' + val + (sub ? '<span class="aip-val-sub">' + sub + '</span>' : '') + '</span></div>';
}

function _popupSection(title, body, extraClass) {
  return '<div class="lp-section-card' + (extraClass ? ' ' + extraClass : '') + '">' +
    '<div class="aip-section-title">' + title + '</div>' + body + '</div>';
}

function _popupKpiGrid(items, extraClass) {
  return '<div class="lp-compare-grid lp-kpi-grid' + (extraClass ? ' ' + extraClass : '') + '">' +
    items.map(function(item) {
      return '<div class="lp-stat-tile' + (item.tone ? ' lp-stat-' + item.tone : '') + '">' +
        '<div class="lp-stat-label">' + item.label + '</div>' +
        '<div class="lp-stat-value">' + item.value + '</div>' +
        '<div class="lp-stat-copy">' + item.copy + '</div>' +
      '</div>';
    }).join('') +
  '</div>';
}

function _popupSourceNote(lines) {
  return '<div class="lp-source-note"><strong style="color:var(--text-secondary);font-size:10px">Data Sources</strong><br/>' +
    lines.join('<br/>') + '</div>';
}

function _cleanProfileUnit(unit) {
  if (!unit) return '';
  return String(unit)
    .replace(/kW-hr/gi, 'kWh')
    .replace(/m\^2/gi, 'm2')
    .replace(/\^2/g, '2');
}

function _profileCoverageShort(rangeText) {
  if (!rangeText) return 'Climatology';
  var years = String(rangeText).match(/(19|20)\d{2}/g);
  return years && years.length >= 2 ? years[0] + '-' + years[years.length - 1] : 'Climatology';
}

function _buildNasaProfileEndpoint(lat, lon) {
  return 'https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=ALLSKY_SFC_SW_DWN,WS50M&community=RE&longitude=' + lon.toFixed(4) + '&latitude=' + lat.toFixed(4) + '&format=JSON';
}

function _getNasaMonthlySeries(nasa, key) {
  var src = nasa && nasa.properties && nasa.properties.parameter ? nasa.properties.parameter[key] : null;
  if (!src) return [];
  return PROFILE_MONTH_KEYS.map(function(monthKey) {
    var value = src[monthKey];
    return value != null && value !== -999 ? Number(value) : null;
  });
}

var _kingLakeProfilesLoaded = false;
function refreshKingLakeProfiles() {
  if (_kingLakeProfilesLoaded) return;
  _kingLakeProfilesLoaded = true;
  fetch(POWER_CLIMATOLOGY_ENDPOINT)
    .then(function(r) { return r.json(); })
    .then(function(nasa) {
      var solarSeries = _getNasaMonthlySeries(nasa, 'ALLSKY_SFC_SW_DWN');
      var windSeries = _getNasaMonthlySeries(nasa, 'WS50M');
      function annualMean(series) {
        var clean = series.filter(function(v) { return v != null && !isNaN(v); });
        if (!clean.length) return null;
        return clean.reduce(function(a, b) { return a + b; }, 0) / clean.length;
      }
      if (solarSeries.length === 12 && solarSeries.every(function(v){return v!=null;})) {
        OFFICIAL_PROFILES.solar.series = solarSeries;
        var sa = annualMean(solarSeries);
        if (sa != null) OFFICIAL_PROFILES.solar.annual = sa;
        var su = nasa && nasa.parameters && nasa.parameters.ALLSKY_SFC_SW_DWN ? nasa.parameters.ALLSKY_SFC_SW_DWN.units : null;
        if (su) OFFICIAL_PROFILES.solar.unit = _cleanProfileUnit(su);
      }
      if (windSeries.length === 12 && windSeries.every(function(v){return v!=null;})) {
        OFFICIAL_PROFILES.wind.series = windSeries;
        var wa = annualMean(windSeries);
        if (wa != null) OFFICIAL_PROFILES.wind.annual = wa;
        var wu = nasa && nasa.parameters && nasa.parameters.WS50M ? nasa.parameters.WS50M.units : null;
        if (wu) OFFICIAL_PROFILES.wind.unit = _cleanProfileUnit(wu);
      }
      var period = nasa && nasa.header && nasa.header.range
        ? '20-year monthly climatology (' + nasa.header.range + ')'
        : OFFICIAL_PROFILES.solar.period;
      OFFICIAL_PROFILES.solar.period = period;
      OFFICIAL_PROFILES.wind.period = period;
      renderOfficialProfiles();
    })
    .catch(function() {
      _kingLakeProfilesLoaded = false; // allow retry on next view
    });
}

function _buildLocationProfileCard(lat, lon, profile) {
  if (!profile || !profile.series || !profile.series.length) return '';

  var validSeries = profile.series.filter(function(value) { return value != null; });
  if (!validSeries.length) return '';

  var maxValue = Math.max.apply(null, validSeries);
  var minValue = Math.min.apply(null, validSeries);
  var peakIndex = profile.series.indexOf(maxValue);
  var lowIndex = profile.series.indexOf(minValue);

  return ''
    + '<article class="profile-card">'
    +   '<div class="profile-head">'
    +     '<div>'
    +       '<div class="profile-kicker">' + profile.source + '</div>'
    +       '<h3 class="profile-title">' + profile.title + '</h3>'
    +     '</div>'
    +     '<div class="profile-annual">' + profile.annual.toFixed(profile.precision) + '<span>Annual</span></div>'
    +   '</div>'
    +   '<p class="profile-subtitle">' + profile.variable + ' (' + profile.unit + ')</p>'
    +   '<div class="profile-graph-row">'
    +     '<div class="profile-chart">' + buildProfileChartSvg(profile) + '</div>'
    +     '<div class="profile-inline-stats">'
    +       '<div class="profile-stat"><span class="profile-stat-label">Peak</span><strong class="profile-stat-value">' + PROFILE_MONTHS[peakIndex] + ' ' + maxValue.toFixed(profile.precision) + '</strong></div>'
    +       '<div class="profile-stat"><span class="profile-stat-label">Low</span><strong class="profile-stat-value">' + PROFILE_MONTHS[lowIndex] + ' ' + minValue.toFixed(profile.precision) + '</strong></div>'
    +       '<div class="profile-stat"><span class="profile-stat-label">Coverage</span><strong class="profile-stat-value">' + profile.coverageShort + '</strong></div>'
    +     '</div>'
    +   '</div>'
    +   '<div class="profile-month-grid">' + buildProfileMonthGrid(profile) + '</div>'
    +   '<div class="profile-footer">'
    +     '<div class="profile-period">Official source at ' + Math.abs(lat).toFixed(4) + (lat >= 0 ? 'N' : 'S') + ', ' + Math.abs(lon).toFixed(4) + (lon < 0 ? 'W' : 'E') + '.<br>' + profile.period + '.</div>'
    +     '<a class="profile-source-link" href="' + profile.endpoint + '" target="_blank" rel="noreferrer">Open official JSON</a>'
    +   '</div>'
    + '</article>';
}

function _buildLoadingBlock(title, text) {
  return '<div class="aip-section-title">' + title + '</div>' +
    '<div class="aip-loading"><div class="aip-spinner"></div><span>' + text + '</span></div>';
}

function _renderTerrainSectionContent(elev, slope) {
  var sCls = slope != null ? (slope < 3 ? 'slope-ok' : slope < 5 ? 'slope-warn' : 'slope-bad') : '';
  var sLbl = slope != null ? (slope < 3 ? 'Suitable (< 3%)' : slope < 5 ? 'Marginal (3-5%)' : 'Challenging (> 5%)') : '—';
  var sFlg = slope != null && slope >= 5 ? ' ⚠️' : '';
  var html = '<div class="aip-section-title">🏔️ Terrain Analysis (USGS 3DEP)</div>';
  html += _row('Elevation', elev != null ? elev.toFixed(1) + ' m' : '—', '');
  if (slope != null) {
    html += '<div class="aip-row"><span class="aip-label">Slope Gradient' + sFlg + '</span><span class="aip-val"><span class="' + sCls + '">' + slope.toFixed(1) + '%</span></span></div>';
    html += '<div class="aip-row"><span class="aip-label">Suitability</span><span class="aip-val" style="font-size:11px"><span class="' + sCls + '">' + sLbl + '</span></span></div>';
  }
  html += '<div style="font-size:8.5px;color:var(--text-muted);margin-top:5px;font-style:italic">Source: USGS TNM 3DEP 1/3 arc-sec · 5-point sampling (200 m offset)</div>';
  return html;
}

function _renderGridSectionContent(subData) {
  var html = '<div class="aip-section-title">⚡ Grid Proximity (HIFLD)</div>';
  if (subData) {
    var km = subData.distKm;
    var distStr = km < 10 ? (km * 1000).toFixed(0) + ' m' : km.toFixed(1) + ' km';
    var proxCls = km < 5 ? 'excellent' : km < 15 ? 'very-good' : km < 30 ? 'good' : 'fair';
    var proxLbl = km < 5 ? 'Excellent' : km < 15 ? 'Good' : km < 30 ? 'Moderate' : 'Distant';
    html += _row('Nearest Substation', subData.name, '');
    if (subData.owner) html += _row('Operator', subData.owner, '');
    if (subData.city || subData.state) html += _row('Location', [subData.city, subData.state].filter(Boolean).join(', '), '');
    if (subData.voltage > 0) html += _row('Voltage', subData.voltage.toLocaleString() + ' kV', '');
    if (subData.lines > 0) html += _row('Transmission Lines', subData.lines, '');
    html += '<div class="aip-row"><span class="aip-label">Distance</span><span class="aip-val">' + distStr + ' &nbsp;<span class="aip-badge ' + proxCls + '" style="font-size:9px;padding:1px 6px">' + proxLbl + '</span></span></div>';
  } else {
    html += '<div style="font-size:11px;color:var(--text-muted);padding:4px 0">No substation found within 220 km radius.</div>';
  }
  html += '<div style="font-size:8.5px;color:var(--text-muted);margin-top:5px;font-style:italic">Source: HIFLD Electric Substations (EIA ArcGIS FeatureServer, IN SERVICE only)</div>';
  return html;
}

function _renderAiSectionContent(elev, slope, subData) {
  var insights = _genTerrainGridInsights(elev, slope, subData);
  var html = '<div class="aip-section-title">🤖 AI Site Assessment</div>';
  insights.forEach(function(ins) {
    html += '<div style="display:flex;gap:8px;padding:6px 0;border-bottom:1px solid var(--border)">' +
      '<div style="width:6px;height:6px;border-radius:50%;background:' + ins.color + ';margin-top:5px;flex-shrink:0"></div>' +
      '<div style="font-size:11px;color:var(--text-secondary);line-height:1.5">' + ins.text + '</div></div>';
  });
  if (!insights.length) html += '<div style="font-size:11px;color:var(--text-muted);padding:4px 0">Terrain and grid data unavailable for this location.</div>';
  return html;
}

function _buildPopupLocationAnalysisHtml() {
  return '<div id="lp-location-kpis"></div>' +
    '<div id="lp-loc-terrain" class="lp-section-card">' +
      _buildLoadingBlock('🏔️ Terrain Analysis (USGS 3DEP)', 'Fetching elevation data…') +
    '</div>' +
    '<div id="lp-loc-substation" class="lp-section-card">' +
      _buildLoadingBlock('⚡ Grid Proximity (HIFLD)', 'Querying substations…') +
    '</div>' +
    '<div id="lp-loc-ai" class="lp-section-card">' +
      _buildLoadingBlock('🤖 AI Site Assessment', 'Generating insights…') +
    '</div>';
}

function _showLatLonPanel(lat, lon, nasa, om, myGen) {
  var p = document.getElementById('atlas-info-panel');
  if (!p) return;

  // Parse NASA POWER data
  var props = (nasa && nasa.properties && nasa.properties.parameter) ? nasa.properties.parameter : {};
  var ANN = 'ANN';
  function nasaVal(key) {
    var v = props[key] && props[key][ANN];
    return (v != null && v !== -999) ? v : null;
  }

  var ghi    = nasaVal('ALLSKY_SFC_SW_DWN');
  var dni    = nasaVal('ALLSKY_SFC_SW_DNI');
  var dhi    = nasaVal('ALLSKY_SFC_SW_DIFF');
  var csGhi  = nasaVal('CLRSKY_SFC_SW_DWN');
  var kt     = nasaVal('ALLSKY_KT');
  var temp   = nasaVal('T2M');
  var ws10   = nasaVal('WS10M');
  var ws50   = nasaVal('WS50M');
  var wd10   = nasaVal('WD10M');

  // Extrapolate wind heights using Hellmann power law (α=0.143, open terrain)
  var ws80_nasa  = ws50 ? ws50 * Math.pow(80/50, 0.143)  : null;
  var ws120_nasa = ws50 ? ws50 * Math.pow(120/50, 0.143) : null;
  var ws180_nasa = ws50 ? ws50 * Math.pow(180/50, 0.143) : null;

  // Open-Meteo current wind
  var cur = (om && om.current) ? om.current : {};
  var ws10_om  = cur.windspeed_10m  != null ? cur.windspeed_10m  : null;
  var ws80_om  = cur.windspeed_80m  != null ? cur.windspeed_80m  : null;
  var ws120_om = cur.windspeed_120m != null ? cur.windspeed_120m : null;
  var ws180_om = cur.windspeed_180m != null ? cur.windspeed_180m : null;
  var wdir_om  = cur.winddirection_10m != null ? cur.winddirection_10m : null;

  // Use Open-Meteo values where available, else NASA extrapolation
  var ws80f  = ws80_om  != null ? ws80_om  : ws80_nasa;
  var ws120f = ws120_om != null ? ws120_om : ws120_nasa;
  var ws180f = ws180_om != null ? ws180_om : ws180_nasa;
  var ws10f  = ws10_om  != null ? ws10_om  : ws10;
  var wdirF  = wdir_om  != null ? wdir_om  : wd10;

  // PVOUT (Performance Ratio = 0.75)
  var pvP50daily  = ghi ? ghi * 0.75 : null;
  var pvoutDaily  = pvP50daily ? pvP50daily.toFixed(2) : '—';
  var pvoutAnnual = pvP50daily ? Math.round(pvP50daily * 365).toLocaleString() : '—';
  var ghiAnnual   = ghi ? Math.round(ghi * 365).toLocaleString() : '—';
  var pvRatingCls = pvP50daily ? _pvRating(pvP50daily) : 'moderate';
  var pvRatingLbl = pvP50daily ? _pvRatingLabel(pvP50daily) : '—';

  // P90 estimates: P90 = P50 × (1 - 1.282 × σ)
  // Solar σ=6% (NREL inter-annual variability typical for CONUS)
  // Wind σ=9% (NREL WTK typical for CONUS)
  var pvP90daily  = pvP50daily ? pvP50daily * 0.9233 : null;
  var pvP90annual = pvP90daily ? Math.round(pvP90daily * 365).toLocaleString() : '—';
  var ws80P90     = ws80f ? ws80f * 0.8846 : null;

  // Capacity factor estimates
  // Solar CF = (annual kWh/kWp) / 8760 h = (GHI × 0.75 × 365) / 8760
  var solarCF = pvP50daily ? ((pvP50daily * 365) / 8760 * 100).toFixed(1) : null;
  // Wind CF rough: Betz-limited, based on IEC class power curve approximation
  var windCF = null;
  if (ws80f) {
    var cf_raw = Math.min(0.50, 0.45 * Math.pow(ws80f / 12.0, 3));
    windCF = (cf_raw * 100).toFixed(1);
  }

  // IEC classifications
  var iecSolar = '—', iecWind = '—';
  if (ghi) {
    if (ghi >= 5.5) iecSolar = 'Class A (World-Class)';
    else if (ghi >= 4.5) iecSolar = 'Class B (Excellent)';
    else if (ghi >= 3.5) iecSolar = 'Class C (Good)';
    else iecSolar = 'Class D (Moderate)';
  }
  if (ws80f) {
    if (ws80f >= 7.5) iecWind = 'IEC Class 1 (≥7.5 m/s)';
    else if (ws80f >= 5.5) iecWind = 'IEC Class 2 (5.5–7.5 m/s)';
    else if (ws80f >= 3.5) iecWind = 'IEC Class 3 (3.5–5.5 m/s)';
    else iecWind = 'IEC Class 4 (<3.5 m/s)';
  }

  // CO2 offset estimate (approx 0.386 kg CO2/kWh US grid average, EIA 2023)
  var co2Annual = pvP50daily ? Math.round(pvP50daily * 365 * 0.386).toLocaleString() : null;

  function fmtV(v, dec) { return v != null ? (+v).toFixed(dec) : '—'; }

  var nowStr = new Date().toLocaleString('en-US', {month:'short', year:'numeric', hour:'2-digit', minute:'2-digit'});
  var latDir = lat >= 0 ? 'N' : 'S', lonDir = lon < 0 ? 'W' : 'E';

  var html = '<div class="aip-coord-header">📍 ' + Math.abs(lat).toFixed(4) + '°' + latDir + ', ' + Math.abs(lon).toFixed(4) + '°' + lonDir + '</div>';

  var profilePeriod = nasa && nasa.header && nasa.header.range ? nasa.header.range : 'Monthly climatology';
  var coverageShort = _profileCoverageShort(profilePeriod);
  var profileEndpoint = _buildNasaProfileEndpoint(lat, lon);
  var solarProfileCard = _buildLocationProfileCard(lat, lon, {
    title: 'Official Monthly Solar Profile',
    source: 'NASA POWER Climatology API',
    variable: 'All Sky Surface Shortwave Downward Irradiance',
    unit: _cleanProfileUnit(nasa && nasa.parameters && nasa.parameters.ALLSKY_SFC_SW_DWN ? nasa.parameters.ALLSKY_SFC_SW_DWN.units : 'kWh/m2/day'),
    precision: 2,
    annual: ghi != null ? ghi : 0,
    accent: '#f59e0b',
    series: _getNasaMonthlySeries(nasa, 'ALLSKY_SFC_SW_DWN'),
    period: profilePeriod,
    coverageShort: coverageShort,
    endpoint: profileEndpoint
  });
  var windProfileCard = _buildLocationProfileCard(lat, lon, {
    title: 'Official Monthly Wind Profile',
    source: 'NASA POWER Climatology API',
    variable: 'Wind Speed at 50 Meters',
    unit: _cleanProfileUnit(nasa && nasa.parameters && nasa.parameters.WS50M ? nasa.parameters.WS50M.units : 'm/s'),
    precision: 2,
    annual: ws50 != null ? ws50 : 0,
    accent: '#6366f1',
    series: _getNasaMonthlySeries(nasa, 'WS50M'),
    period: profilePeriod,
    coverageShort: coverageShort,
    endpoint: profileEndpoint
  });

  // Solar section
  html += '<div class="aip-section-title">☀️ Solar Irradiance (NASA POWER · 1984–2022 avg)</div>';
  html += _row('GHI (P50)', fmtV(ghi,2), ' kWh/m²/day');
  html += _row('Annual GHI', ghiAnnual, ' kWh/m²/yr');
  html += _row('DNI', fmtV(dni,2), ' kWh/m²/day');
  html += _row('DHI', fmtV(dhi,2), ' kWh/m²/day');
  html += _row('Clear-Sky GHI', fmtV(csGhi,2), ' kWh/m²/day');
  html += _row('Clearness Index Kt', fmtV(kt,3), '');
  html += _row('Avg Temperature', fmtV(temp,1), ' °C');
  if (iecSolar !== '—') html += _row('Solar Class', iecSolar, '');

  // PVOUT + P90 section
  html += '<div class="aip-section-title">⚡ PV Output (1 kWp · fixed tilt · PR=0.75)</div>';
  html += _row('P50 Daily Yield', pvoutDaily, ' kWh/kWp/day');
  html += _row('P50 Annual Yield', pvoutAnnual, ' kWh/kWp/yr');
  if (pvP90daily) {
    html += '<div class="aip-p90-row"><span class="aip-p90-label">P90 Daily Yield <span style="font-size:9px;color:#3b82f6">(90% confidence)</span></span><span class="aip-p90-val">' + pvP90daily.toFixed(2) + ' kWh/kWp/day</span></div>';
    html += '<div class="aip-p90-row"><span class="aip-p90-label">P90 Annual Yield</span><span class="aip-p90-val">' + pvP90annual + ' kWh/kWp/yr</span></div>';
  }
  if (solarCF) html += _row('Capacity Factor', solarCF, '%');
  if (co2Annual) html += _row('CO₂ Offset (1 MWp)', co2Annual, ' kg/yr');
  html += '<div style="margin-top:5px"><span class="aip-badge ' + pvRatingCls + '">' + pvRatingLbl + '</span></div>';

  // Wind section
  var ws50Label  = ws50    ? ws50.toFixed(2)   : '—';
  var ws80Label  = ws80f   ? ws80f.toFixed(2)  : '—';
  var ws120Label = ws120f  ? ws120f.toFixed(2) : '—';
  var ws180Label = ws180f  ? ws180f.toFixed(2) : '—';
  var ws10Label  = ws10f   ? ws10f.toFixed(2)  : '—';
  var ws80src    = ws80_om  != null ? '' : ' <span style="font-size:9px;color:var(--text-muted)">(est.)</span>';
  var ws120src   = ws120_om != null ? '' : ' <span style="font-size:9px;color:var(--text-muted)">(est.)</span>';
  var ws180src   = ws180_om != null ? '' : ' <span style="font-size:9px;color:var(--text-muted)">(est.)</span>';

  html += '<div class="aip-section-title">💨 Wind Speeds (m/s)</div>';
  html += _row('10 m (surface)', ws10Label + ' m/s', '');
  html += _row('50 m', ws50Label + ' m/s', ' (NASA POWER annual)');
  html += '<div class="aip-row"><span class="aip-label">P50 @ 80 m</span><span class="aip-val">' + ws80Label + ' m/s' + ws80src + '</span></div>';
  if (ws80P90) {
    html += '<div class="aip-p90-row"><span class="aip-p90-label">P90 @ 80 m <span style="font-size:9px;color:#3b82f6">(bankable)</span></span><span class="aip-p90-val">' + ws80P90.toFixed(2) + ' m/s</span></div>';
  }
  html += '<div class="aip-row"><span class="aip-label">120 m</span><span class="aip-val">' + ws120Label + ' m/s' + ws120src + '</span></div>';
  html += '<div class="aip-row"><span class="aip-label">180 m</span><span class="aip-val">' + ws180Label + ' m/s' + ws180src + '</span></div>';
  html += _row('Direction (10 m)', _dirToCard(wdirF), wdirF != null ? ' (' + Math.round(wdirF) + '°)' : '');
  if (iecWind !== '—') html += _row('Wind Class', iecWind, '');
  if (windCF) html += _row('Est. Wind CF', windCF, '%');

  // P90 explanation callout
  html += '<div style="margin:10px 0 0;padding:8px 10px;background:rgba(96,165,250,.07);border:1px solid rgba(96,165,250,.25);border-radius:8px;font-size:10px;color:#3b82f6;line-height:1.5">' +
    '<strong>P90 = Bankable Conservative Estimate</strong><br/>' +
    'Solar σ=6% · Wind σ=9% · Formula: P50 × (1 − 1.282σ)<br/>' +
    'Lenders typically size debt on P90 production.' +
    '</div>';

  // Data sources footer with live timestamps
  html += '<div style="margin-top:10px;font-size:9px;color:var(--text-muted);line-height:1.7;border-top:1px solid var(--border);padding-top:8px">' +
    '<strong style="color:var(--text-secondary);font-size:9px">DATA SOURCES</strong><br/>' +
    '☀️ NASA POWER Climatology v2.4 · 1984–2022 (22-yr avg) · sourced Apr 2025<br/>' +
    '💨 Open-Meteo ERA5-Seamless · Real-time as of ' + nowStr + '<br/>' +
    '📐 Wind height extrapolation: Hellmann power law α=0.143 (open terrain)<br/>' +
    '🗺️ Location: Nominatim / OpenStreetMap (CC BY-SA)' +
    '</div>';

  // Phase 2 placeholders — filled by _updateTerrainSubstation when USGS/HIFLD data arrives
  html += '<div id="aip-terrain"><div class="aip-section-title">🏔️ Terrain Analysis (USGS 3DEP)</div><div class="aip-loading"><div class="aip-spinner"></div><span>Fetching elevation data…</span></div></div>';
  html += '<div id="aip-substation"><div class="aip-section-title">⚡ Grid Proximity (HIFLD)</div><div class="aip-loading"><div class="aip-spinner"></div><span>Querying substations…</span></div></div>';
  html += '<div id="aip-ai"><div class="aip-section-title">🤖 AI Site Assessment</div><div class="aip-loading"><div class="aip-spinner"></div><span>Generating insights…</span></div></div>';

  p.innerHTML = html;

  // Update sidenav key metrics
  var alocMetrics = document.getElementById('aloc-key-metrics');
  var alocMeta    = document.getElementById('aloc-meta');
  if (alocMetrics) {
    var mHtml = '';
    if (pvP50daily) {
      mHtml += '<div class="aloc-metric-row">' +
        '<span class="aloc-metric-label">Solar GHI (P50 / P90)</span>' +
        '<span><span class="aloc-metric-p50">' + ghi.toFixed(2) + '</span>' +
        '<span class="aloc-p90-badge"> / ' + (ghi * 0.9233).toFixed(2) + ' P90</span>' +
        '<span style="font-size:9px;color:var(--text-muted)"> kWh/m²/d</span></span>' +
        '</div>';
    }
    if (ws80f) {
      mHtml += '<div class="aloc-metric-row">' +
        '<span class="aloc-metric-label">Wind @ 80m (P50 / P90)</span>' +
        '<span><span class="aloc-metric-p50">' + ws80f.toFixed(2) + '</span>' +
        '<span class="aloc-p90-badge"> / ' + (ws80f * 0.8846).toFixed(2) + ' P90</span>' +
        '<span style="font-size:9px;color:var(--text-muted)"> m/s</span></span>' +
        '</div>';
    }
    if (solarCF) {
      mHtml += '<div class="aloc-metric-row">' +
        '<span class="aloc-metric-label">Solar CF / Wind CF est.</span>' +
        '<span class="aloc-metric-p50">' + solarCF + '%' + (windCF ? ' / ' + windCF + '%' : '') + '</span>' +
        '</div>';
    }
    if (iecSolar !== '—') {
      mHtml += '<div class="aloc-metric-row">' +
        '<span class="aloc-metric-label">Solar Class</span>' +
        '<span class="aloc-metric-p50" style="font-size:11px">' + iecSolar + '</span>' +
        '</div>';
    }
    alocMetrics.innerHTML = mHtml || '<span style="font-size:11px;color:var(--text-muted)">No data available for this location</span>';
  }
  if (alocMeta) {
    alocMeta.innerHTML =
      'NASA POWER 1984–2022 avg · sourced Apr 2025<br/>' +
      'Wind real-time: ' + nowStr;
    alocMeta.className = 'aloc-meta';
  }

  if (alocMeta) {
    alocMeta.innerHTML = 'NASA POWER monthly climatology · ' + coverageShort + '<br/>Wind real-time: ' + nowStr;
  }

  var lpSolar = document.getElementById('lp-solar');
  var lpWind = document.getElementById('lp-wind');
  var lpAnalysis = document.getElementById('lp-analysis');
  var lpProfiles = document.getElementById('lp-profiles');
  var lpSolarKpis = _popupKpiGrid([
    { label:'Solar GHI', value:fmtV(ghi, 2), copy:'Primary irradiance signal | kWh/m2/day', tone:'solar' },
    { label:'PV Yield P50', value:pvoutDaily, copy:'Median daily production | kWh/kWp/day', tone:'solar' },
    { label:'PV Yield P90', value:pvP90daily ? pvP90daily.toFixed(2) : '--', copy:'Conservative bankable case', tone:'solar' },
    { label:'Solar CF', value:(solarCF ? solarCF + '%' : '--'), copy:iecSolar !== '—' ? iecSolar : 'Capacity factor estimate', tone:'solar' }
  ], 'lp-kpi-grid-solar');
  var lpWindKpis = _popupKpiGrid([
    { label:'Wind @ 80 m', value:ws80Label, copy:'Primary hub-height signal | m/s', tone:'wind' },
    { label:'Wind @ 80 m P90', value:ws80P90 ? ws80P90.toFixed(2) : '--', copy:'Conservative bankable case', tone:'wind' },
    { label:'Wind CF', value:(windCF ? windCF + '%' : '--'), copy:iecWind !== '—' ? iecWind : 'Capacity factor estimate', tone:'wind' },
    { label:'Direction', value:_dirToCard(wdirF), copy:wdirF != null ? Math.round(wdirF) + ' degrees at 10 m' : 'Direction not available', tone:'wind' }
  ], 'lp-kpi-grid-wind');
  var lpCombinedKpis = _popupKpiGrid([
    { label:'Solar GHI', value:fmtV(ghi, 2), copy:'Primary irradiance signal | kWh/m2/day', tone:'solar' },
    { label:'PV Yield P50 / P90', value:pvoutDaily + ' / ' + (pvP90daily ? pvP90daily.toFixed(2) : '--'), copy:'Daily solar production range', tone:'solar' },
    { label:'Wind @ 80 m', value:ws80Label + ' / ' + (ws80P90 ? ws80P90.toFixed(2) : '--'), copy:'P50 and P90 wind speed | m/s', tone:'wind' },
    { label:'Capacity Factors', value:'S ' + (solarCF ? solarCF + '%' : '--') + ' | W ' + (windCF ? windCF + '%' : '--'), copy:'Quick hybrid viability snapshot', tone:'neutral' },
    { label:'Coverage', value:coverageShort, copy:'NASA POWER monthly climatology window', tone:'neutral' },
    { label:'Resource Mix', value:(iecSolar !== '—' ? iecSolar : 'Solar') + ' | ' + (iecWind !== '—' ? iecWind : 'Wind'), copy:'High-signal project screening summary', tone:'neutral' }
  ], 'lp-kpi-grid-combined');
  var lpAnalysisKpis = _popupKpiGrid([
    { label:'Solar GHI', value:fmtV(ghi, 2), copy:'Resource baseline for this point', tone:'solar' },
    { label:'Wind @ 80 m', value:ws80Label, copy:'Hub-height wind screening signal', tone:'wind' },
    { label:'PV Yield P50', value:pvoutDaily, copy:'Median solar production per kWp', tone:'solar' },
    { label:'Capacity Factors', value:'S ' + (solarCF ? solarCF + '%' : '--') + ' | W ' + (windCF ? windCF + '%' : '--'), copy:'Quick site performance summary', tone:'neutral' }
  ], 'lp-kpi-grid-analysis');
  if (lpSolar) {
    lpSolar.innerHTML =
      lpSolarKpis +
      '<div class="lp-note-card"><strong>Monthly profile first.</strong><br/>Use the official NASA POWER monthly climatology below to check seasonality before reviewing supporting diagnostics.</div>' +
      solarProfileCard +
      _popupSection('☀️ Solar Irradiance (NASA POWER · 1984–2022 avg)',
        _row('GHI (P50)', fmtV(ghi, 2), ' kWh/m²/day') +
        _row('Annual GHI', ghiAnnual, ' kWh/m²/yr') +
        _row('DNI', fmtV(dni, 2), ' kWh/m²/day') +
        _row('DHI', fmtV(dhi, 2), ' kWh/m²/day') +
        _row('Clear-Sky GHI', fmtV(csGhi, 2), ' kWh/m²/day') +
        _row('Clearness Index Kt', fmtV(kt, 3), '') +
        _row('Avg Temperature', fmtV(temp, 1), ' °C') +
        (iecSolar !== '—' ? _row('Solar Class', iecSolar, '') : '')
      ) +
      _popupSection('⚡ PV Output (1 kWp · fixed tilt · PR=0.75)',
        _row('P50 Daily Yield', pvoutDaily, ' kWh/kWp/day') +
        _row('P50 Annual Yield', pvoutAnnual, ' kWh/kWp/yr') +
        (pvP90daily ? '<div class="aip-p90-row"><span class="aip-p90-label">P90 Daily Yield <span style="font-size:9px;color:#3b82f6">(90% confidence)</span></span><span class="aip-p90-val">' + pvP90daily.toFixed(2) + ' kWh/kWp/day</span></div>' : '') +
        (pvP90daily ? '<div class="aip-p90-row"><span class="aip-p90-label">P90 Annual Yield</span><span class="aip-p90-val">' + pvP90annual + ' kWh/kWp/yr</span></div>' : '') +
        (solarCF ? _row('Capacity Factor', solarCF, '%') : '') +
        (co2Annual ? _row('CO₂ Offset (1 MWp)', co2Annual, ' kg/yr') : '') +
        '<div style="margin-top:5px"><span class="aip-badge ' + pvRatingCls + '">' + pvRatingLbl + '</span></div>'
      ) +
      _popupSourceNote([
        '☀️ NASA POWER Climatology v2.4 · 1984–2022 average',
        '⚡ PV output derived with PR = 0.75 and fixed-tilt assumptions'
      ]);
  }
  if (lpWind) {
    lpWind.innerHTML =
      lpWindKpis +
      '<div class="lp-note-card"><strong>Monthly profile first.</strong><br/>Review the official monthly wind climatology below, then use the height and bankability details as supporting context.</div>' +
      windProfileCard +
      _popupSection('💨 Wind Profile',
        _row('10 m (surface)', ws10Label + ' m/s', '') +
        _row('50 m', ws50Label + ' m/s', ' (NASA POWER annual)') +
        '<div class="aip-row"><span class="aip-label">P50 @ 80 m</span><span class="aip-val">' + ws80Label + ' m/s' + ws80src + '</span></div>' +
        (ws80P90 ? '<div class="aip-p90-row"><span class="aip-p90-label">P90 @ 80 m <span style="font-size:9px;color:#3b82f6">(bankable)</span></span><span class="aip-p90-val">' + ws80P90.toFixed(2) + ' m/s</span></div>' : '') +
        '<div class="aip-row"><span class="aip-label">120 m</span><span class="aip-val">' + ws120Label + ' m/s' + ws120src + '</span></div>' +
        '<div class="aip-row"><span class="aip-label">180 m</span><span class="aip-val">' + ws180Label + ' m/s' + ws180src + '</span></div>' +
        _row('Direction (10 m)', _dirToCard(wdirF), wdirF != null ? ' (' + Math.round(wdirF) + '°)' : '') +
        (iecWind !== '—' ? _row('Wind Class', iecWind, '') : '') +
        (windCF ? _row('Est. Wind CF', windCF, '%') : '')
      ) +
      _popupSourceNote([
        'Wind | Open-Meteo ERA5-Seamless current wind feed',
        'NASA monthly wind profile from NASA POWER climatology | ' + coverageShort,
        'Higher hub heights extrapolated with Hellmann power law alpha = 0.143 when direct measurements are unavailable'
      ]);
  }
  if (lpProfiles) {
    lpProfiles.innerHTML =
      lpCombinedKpis +
      '<div class="lp-note-card"><strong>Monthly profiles first.</strong><br/>These official monthly curves are the main seasonality view for comparing solar and wind at this clicked point.</div>' +
      '<div class="lp-profile-grid">' + solarProfileCard + windProfileCard + '</div>' +
      '<div class="lp-compare-grid">' +
        '<div class="lp-stat-tile"><div class="lp-stat-label">Solar Yield</div><div class="lp-stat-value">' + pvoutDaily + '</div><div class="lp-stat-copy">P50 daily yield · P90 ' + (pvP90daily ? pvP90daily.toFixed(2) : '—') + ' kWh/kWp/day</div></div>' +
        '<div class="lp-stat-tile"><div class="lp-stat-label">Wind @ 80 m</div><div class="lp-stat-value">' + ws80Label + '</div><div class="lp-stat-copy">P50 wind speed · P90 ' + (ws80P90 ? ws80P90.toFixed(2) : '—') + ' m/s</div></div>' +
        '<div class="lp-stat-tile"><div class="lp-stat-label">Solar Capacity Factor</div><div class="lp-stat-value">' + (solarCF || '—') + '%</div><div class="lp-stat-copy">' + iecSolar + '</div></div>' +
        '<div class="lp-stat-tile"><div class="lp-stat-label">Wind Capacity Factor</div><div class="lp-stat-value">' + (windCF || '—') + '%</div><div class="lp-stat-copy">' + iecWind + '</div></div>' +
      '</div>' +
      _popupSection('Wind & Solar Bankability Snapshot',
        _row('Solar GHI (P50)', fmtV(ghi, 2), ' kWh/m²/day') +
        _row('PV Yield P50 / P90', pvoutDaily + ' / ' + (pvP90daily ? pvP90daily.toFixed(2) : '—'), ' kWh/kWp/day') +
        _row('Wind @ 80 m P50 / P90', ws80Label + ' / ' + (ws80P90 ? ws80P90.toFixed(2) : '—'), ' m/s') +
        _row('Capacity Factors', 'Solar ' + (solarCF || '—') + '% · Wind ' + (windCF || '—') + '%', '')
      ) +
      '<div class="lp-note-card"><strong>P50 vs P90</strong><br/>P50 is the median expected outcome. P90 is the more conservative production case often used for downside and lender-side checks.</div>';
  }
  if (lpAnalysis) {
    lpAnalysis.innerHTML = _buildPopupLocationAnalysisHtml();
    var lpLocationKpis = document.getElementById('lp-location-kpis');
    if (lpLocationKpis) lpLocationKpis.innerHTML = lpAnalysisKpis;
  }
  var locationPopup = document.getElementById('location-popup');
  if (locationPopup) wireProfileChartTooltips(locationPopup);

  // Initial AI insights in sidenav (solar + wind from Phase 1, terrain loading placeholder)
  var alocAI = document.getElementById('aloc-ai-insights');
  if (alocAI) {
    var aiHtml = '<div class="aloc-insights-hdr">AI INSIGHTS</div>';
    if (pvP50daily) {
      var solarMsg;
      if (pvP50daily >= 5.0) solarMsg = '☀️ Exceptional solar resource (' + pvoutDaily + ' kWh/kWp/day P50, P90: ' + pvP90daily.toFixed(2) + '). ' + iecSolar + '. Est. capacity factor ' + (solarCF || '—') + '%.';
      else if (pvP50daily >= 4.2) solarMsg = '☀️ Strong solar resource (' + pvoutDaily + ' kWh/kWp/day P50, P90: ' + pvP90daily.toFixed(2) + '). ' + iecSolar + '. CF est. ' + (solarCF || '—') + '%.';
      else if (pvP50daily >= 3.5) solarMsg = '☀️ Good solar resource (' + pvoutDaily + ' kWh/kWp/day P50, P90: ' + pvP90daily.toFixed(2) + '). ' + iecSolar + '.';
      else solarMsg = '☀️ Moderate solar resource (' + pvoutDaily + ' kWh/kWp/day P50, P90: ' + pvP90daily.toFixed(2) + '). ' + iecSolar + '.';
      aiHtml += '<div class="aloc-insight-card"><div class="aloc-insight-dot" style="background:#f59e0b"></div><span class="aloc-insight-text">' + solarMsg + '</span></div>';
    }
    if (ws80f) {
      var ws80Label_ai = ws80f.toFixed(2);
      var windMsg;
      if (ws80f >= 7.5) windMsg = '💨 Excellent wind resource at 80 m (' + ws80Label_ai + ' m/s P50, P90: ' + (ws80P90 ? ws80P90.toFixed(2) : '—') + ' m/s). ' + iecWind + '. CF est. ' + (windCF || '—') + '%.';
      else if (ws80f >= 5.5) windMsg = '💨 Good wind resource at 80 m (' + ws80Label_ai + ' m/s P50, P90: ' + (ws80P90 ? ws80P90.toFixed(2) : '—') + ' m/s). ' + iecWind + '. CF est. ' + (windCF || '—') + '%.';
      else if (ws80f >= 3.5) windMsg = '💨 Marginal wind at 80 m (' + ws80Label_ai + ' m/s). Consider solar-only or hybrid. ' + iecWind + '.';
      else windMsg = '💨 Low wind resource at 80 m (' + ws80Label_ai + ' m/s). Site not suitable for utility-scale wind. ' + iecWind + '.';
      aiHtml += '<div class="aloc-insight-card"><div class="aloc-insight-dot" style="background:#6366f1"></div><span class="aloc-insight-text">' + windMsg + '</span></div>';
    }
    // Terrain+grid loading placeholder — replaced by _updateTerrainSubstation
    aiHtml += '<div id="aloc-ai-terrain" class="aloc-insight-card"><div class="aloc-insight-dot" style="background:var(--text-muted)"></div><span class="aloc-insight-text" style="display:flex;align-items:center;gap:6px"><span class="aip-spinner"></span>Loading terrain &amp; grid data…</span></div>';
    alocAI.innerHTML = aiHtml;
  }
}

// ─── TERRAIN + SUBSTATION UPDATE (Phase 2) ────────────────────────────────

function _updateTerrainSubstation(lat, lon, elevData, subData, gen) {
  if (gen !== _dataGen) return; // superseded by newer click

  var elev  = elevData && elevData.elevation != null ? elevData.elevation : null;
  var slope = elevData && elevData.slope     != null ? elevData.slope     : null;

  var terrainHtml = _renderTerrainSectionContent(elev, slope);
  var gridHtml = _renderGridSectionContent(subData);
  var aiHtml = _renderAiSectionContent(elev, slope, subData);

  var terrainElNew = document.getElementById('aip-terrain');
  if (terrainElNew) terrainElNew.innerHTML = terrainHtml;
  var popupTerrainEl = document.getElementById('lp-loc-terrain');
  if (popupTerrainEl) popupTerrainEl.innerHTML = terrainHtml;

  var subElNew = document.getElementById('aip-substation');
  if (subElNew) subElNew.innerHTML = gridHtml;
  var popupSubEl = document.getElementById('lp-loc-substation');
  if (popupSubEl) popupSubEl.innerHTML = gridHtml;

  var aiElNew = document.getElementById('aip-ai');
  if (aiElNew) aiElNew.innerHTML = aiHtml;
  var popupAiEl = document.getElementById('lp-loc-ai');
  if (popupAiEl) popupAiEl.innerHTML = aiHtml;

  var alocTerrainElNew = document.getElementById('aloc-ai-terrain');
  if (alocTerrainElNew && alocTerrainElNew.parentNode) {
    var insightsNew = _genTerrainGridInsights(elev, slope, subData);
    var newCards = '';
    insightsNew.forEach(function(ins) {
      newCards += '<div class="aloc-insight-card"><div class="aloc-insight-dot" style="background:' + ins.color + '"></div><span class="aloc-insight-text">' + ins.text + '</span></div>';
    });
    if (!newCards) newCards = '<div class="aloc-insight-card"><div class="aloc-insight-dot" style="background:var(--text-muted)"></div><span class="aloc-insight-text">Terrain and grid data not available for this point.</span></div>';
    var fragNew = document.createElement('div');
    fragNew.innerHTML = newCards;
    var parentNew = alocTerrainElNew.parentNode;
    while (fragNew.firstChild) { parentNew.insertBefore(fragNew.firstChild, alocTerrainElNew); }
    parentNew.removeChild(alocTerrainElNew);
  }
  return;

  // ── Terrain section in floating info panel ────────────────────────────────
  var terrainEl = document.getElementById('aip-terrain');
  if (terrainEl) {
    var sCls = slope != null ? (slope < 3 ? 'slope-ok' : slope < 5 ? 'slope-warn' : 'slope-bad') : '';
    var sLbl = slope != null ? (slope < 3 ? 'Suitable (< 3%)' : slope < 5 ? 'Marginal (3–5%)' : 'Challenging (> 5%)') : '—';
    var sFlg = slope != null && slope >= 5 ? ' ⚠️' : '';
    var tHtml = '<div class="aip-section-title">🏔️ Terrain Analysis (USGS 3DEP)</div>';
    tHtml += _row('Elevation', elev != null ? elev.toFixed(1) + ' m' : '—', '');
    if (slope != null) {
      tHtml += '<div class="aip-row"><span class="aip-label">Slope Gradient' + sFlg + '</span><span class="aip-val"><span class="' + sCls + '">' + slope.toFixed(1) + '%</span></span></div>';
      tHtml += '<div class="aip-row"><span class="aip-label">Suitability</span><span class="aip-val" style="font-size:11px"><span class="' + sCls + '">' + sLbl + '</span></span></div>';
    }
    tHtml += '<div style="font-size:8.5px;color:var(--text-muted);margin-top:5px;font-style:italic">Source: USGS TNM 3DEP 1/3 arc-sec · 5-point sampling (200 m offset)</div>';
    terrainEl.innerHTML = tHtml;
  }

  // ── Substation section in floating info panel ─────────────────────────────
  var subEl = document.getElementById('aip-substation');
  if (subEl) {
    var sHtml = '<div class="aip-section-title">⚡ Grid Proximity (HIFLD / EIA)</div>';
    if (subData) {
      var km = subData.distKm;
      var distStr = km < 10 ? (km * 1000).toFixed(0) + ' m' : km.toFixed(1) + ' km';
      var proxCls = km < 5 ? 'excellent' : km < 15 ? 'very-good' : km < 30 ? 'good' : 'fair';
      var proxLbl = km < 5 ? 'Excellent' : km < 15 ? 'Good' : km < 30 ? 'Moderate' : 'Distant';
      sHtml += _row('Nearest Substation', subData.name, '');
      if (subData.owner) sHtml += _row('Operator', subData.owner, '');
      if (subData.city || subData.state) sHtml += _row('Location', [subData.city, subData.state].filter(Boolean).join(', '), '');
      if (subData.voltage > 0) sHtml += _row('Voltage', subData.voltage.toLocaleString() + ' kV', '');
      if (subData.lines > 0)   sHtml += _row('Transmission Lines', subData.lines, '');
      sHtml += '<div class="aip-row"><span class="aip-label">Distance</span><span class="aip-val">' + distStr + ' &nbsp;<span class="aip-badge ' + proxCls + '" style="font-size:9px;padding:1px 6px">' + proxLbl + '</span></span></div>';
    } else {
      sHtml += '<div style="font-size:11px;color:var(--text-muted);padding:4px 0">No substation found within 220 km radius.</div>';
    }
    sHtml += '<div style="font-size:8.5px;color:var(--text-muted);margin-top:5px;font-style:italic">Source: HIFLD Electric Substations (EIA ArcGIS FeatureServer, IN SERVICE only)</div>';
    subEl.innerHTML = sHtml;
  }

  // ── AI section in floating info panel ────────────────────────────────────
  var aiEl = document.getElementById('aip-ai');
  if (aiEl) {
    var insights = _genTerrainGridInsights(elev, slope, subData);
    var aHtml = '<div class="aip-section-title">🤖 AI Site Assessment</div>';
    insights.forEach(function(ins) {
      aHtml += '<div style="display:flex;gap:8px;padding:6px 0;border-bottom:1px solid var(--border)">' +
        '<div style="width:6px;height:6px;border-radius:50%;background:' + ins.color + ';margin-top:5px;flex-shrink:0"></div>' +
        '<div style="font-size:11px;color:var(--text-secondary);line-height:1.5">' + ins.text + '</div></div>';
    });
    if (!insights.length) aHtml += '<div style="font-size:11px;color:var(--text-muted);padding:4px 0">Terrain and grid data unavailable for this location.</div>';
    aiEl.innerHTML = aHtml;
  }

  // ── Replace loading card in sidenav with terrain + grid insight cards ─────
  var alocTerrainEl = document.getElementById('aloc-ai-terrain');
  if (alocTerrainEl && alocTerrainEl.parentNode) {
    var insights3 = _genTerrainGridInsights(elev, slope, subData);
    var newCards = '';
    insights3.forEach(function(ins) {
      newCards += '<div class="aloc-insight-card"><div class="aloc-insight-dot" style="background:' + ins.color + '"></div><span class="aloc-insight-text">' + ins.text + '</span></div>';
    });
    if (!newCards) newCards = '<div class="aloc-insight-card"><div class="aloc-insight-dot" style="background:var(--text-muted)"></div><span class="aloc-insight-text">Terrain and grid data not available for this point.</span></div>';
    var frag = document.createElement('div');
    frag.innerHTML = newCards;
    var par = alocTerrainEl.parentNode;
    while (frag.firstChild) { par.insertBefore(frag.firstChild, alocTerrainEl); }
    par.removeChild(alocTerrainEl);
  }
  syncPopupOverview();
}

function _genTerrainGridInsights(elev, slope, sub) {
  var out = [];
  // Terrain insight
  if (slope != null) {
    var txt, col;
    if (slope < 3) {
      txt = '🏔️ Flat to gently rolling terrain (slope ' + slope.toFixed(1) + '%). Suitable for utility-scale solar or wind without significant grading costs.';
      col = '#009e7d';
    } else if (slope < 5) {
      txt = '🏔️ Moderate terrain gradient (' + slope.toFixed(1) + '% slope). Minor grading likely required; tracker rows should follow contours. Commission a micro-siting study.';
      col = '#f59e0b';
    } else {
      txt = '⚠️ Steep terrain (' + slope.toFixed(1) + '% slope). Significant earthworks required — may add 10–20% to EPC cost. A terrain engineering study is recommended.';
      col = '#ef4444';
    }
    if (elev != null) txt += ' Elevation: ' + elev.toFixed(0) + ' m ASL.';
    out.push({type:'terrain', text: txt, color: col});
  } else if (elev != null) {
    out.push({type:'terrain', text: '🏔️ Elevation: ' + elev.toFixed(0) + ' m ASL. Slope data could not be computed for this point.', color: '#7a94a8'});
  }
  // Grid insight
  if (sub) {
    var km = sub.distKm;
    var gt, gc;
    if (km < 5) {
      gt = '⚡ Excellent grid access — ' + sub.name + ' substation is just ' + km.toFixed(1) + ' km away' + (sub.voltage > 0 ? ' (' + sub.voltage.toLocaleString() + ' kV)' : '') + '. Minimal interconnection cost. High-priority site.';
      gc = '#009e7d';
    } else if (km < 15) {
      gt = '⚡ Good grid proximity — ' + sub.name + ' is ' + km.toFixed(1) + ' km' + (sub.voltage > 0 ? ' at ' + sub.voltage.toLocaleString() + ' kV' : '') + '. Moderate line extension and interconnection study likely required.';
      gc = '#60a5fa';
    } else if (km < 30) {
      gt = '⚡ Moderate grid distance (' + km.toFixed(1) + ' km to ' + sub.name + '). Line extension costs will be material — include dedicated transmission CAPEX in financial model.';
      gc = '#f59e0b';
    } else {
      gt = '⚡ Distant grid connection (' + km.toFixed(1) + ' km to nearest substation). Significant transmission investment required. Evaluate storage co-location or off-grid options.';
      gc = '#ef4444';
    }
    out.push({type:'grid', text: gt, color: gc});
  } else {
    out.push({type:'grid', text: '⚡ No substation data found within the query radius. Location may be offshore, in a data gap, or require a manual grid feasibility assessment.', color: '#7a94a8'});
  }
  return out;
}

// ─── ATLAS WIND RESOURCE OVERLAY ──────────────────────────────────────────

var US_WIND_ZONES = [
  {id:'southwest',      ws80m:5.2, bounds:[[31.3,-120.5],[37.5,-103.5]]},
  {id:'southern_plains',ws80m:7.8, bounds:[[25.8,-104.5],[37.0,-93.5]]},
  {id:'southeast',      ws80m:4.7, bounds:[[24.4,-91.5],[35.8,-79.0]]},
  {id:'mid_atlantic',   ws80m:5.1, bounds:[[33.8,-84.5],[40.5,-74.0]]},
  {id:'midwest',        ws80m:6.4, bounds:[[36.0,-97.5],[45.5,-80.0]]},
  {id:'northern_plains',ws80m:8.1, bounds:[[40.5,-114.0],[49.0,-96.5]]},
  {id:'northwest',      ws80m:5.6, bounds:[[41.8,-124.5],[49.0,-110.5]]},
  {id:'new_england',    ws80m:5.3, bounds:[[39.5,-80.5],[47.5,-66.5]]}
];

var _atlasWindLayer = null;
var _windShowing = false;
var ATLAS_LOCATION_FOCUS_ZOOM = 17;

function toggleAtlasWind() {
  var btn = document.getElementById('atlas-wind-toggle');
  if (_windShowing) {
    if (_atlasWindLayer && _atlasMap) _atlasMap.removeLayer(_atlasWindLayer);
    _windShowing = false;
    if (btn) btn.classList.remove('active');
  } else {
    if (!_atlasWindLayer) {
      _atlasWindLayer = L.layerGroup();
      var minW = 4.5, maxW = 8.5;
      var windRamp = [[15,23,42],[49,46,129],[99,102,241],[34,211,153],[224,242,254]];
      US_WIND_ZONES.forEach(function(z) {
        var t = Math.max(0, Math.min(1, (z.ws80m - minW) / (maxW - minW)));
        var fill = gradColor(t, windRamp);
        L.rectangle(z.bounds, {
          color: fill, weight: 1, opacity: 0.7,
          fillColor: fill, fillOpacity: 0.30
        }).bindTooltip(
          '<strong>Wind @ 80m</strong><br/>' + z.ws80m.toFixed(1) + ' m/s avg',
          {direction:'top', maxWidth:160}
        ).addTo(_atlasWindLayer);
      });
    }
    if (_atlasMap) _atlasWindLayer.addTo(_atlasMap);
    _windShowing = true;
    if (btn) btn.classList.add('active');
  }
}

// ─── VIEW NAVIGATION ──────────────────────────────────────────────────────

var _atlasMap = null;
var _klMap = null;
var _klReady = false;
var _clickMarker = null;
var _dataGen = 0; // incremented each click to invalidate stale async callbacks
var _popupMiniMap = null;
var _popupMiniMarker = null;
var _casePanelReady = false;

function initCaseStudyPanel() {
  if (_casePanelReady) return;
  var overviewPane = document.getElementById('case-panel-overview');
  var thesisPane = document.getElementById('case-panel-thesis');
  if (!overviewPane || !thesisPane) return;

  function moveSection(sectionId, targetPane, moveDivider) {
    var section = document.getElementById(sectionId);
    if (!section) return;
    var divider = moveDivider && section.nextElementSibling && section.nextElementSibling.classList.contains('panel-divider')
      ? section.nextElementSibling
      : null;
    targetPane.appendChild(section);
    if (divider) targetPane.appendChild(divider);
  }

  moveSection('panel-section-score', overviewPane, true);
  moveSection('panel-section-renewable', overviewPane, true);
  moveSection('panel-section-official', overviewPane, true);
  moveSection('panel-section-insights', overviewPane, true);
  moveSection('data-sources', overviewPane, false);

  moveSection('panel-section-overview', thesisPane, true);
  moveSection('panel-section-scenarios', thesisPane, true);
  moveSection('panel-section-actions', thesisPane, false);

  _casePanelReady = true;
}

function switchCasePanelTab(tab) {
  document.querySelectorAll('.case-view-tab').forEach(function(el) {
    el.classList.toggle('active', el.dataset.caseView === tab);
  });
  ['map', 'analysis', 'overview', 'thesis'].forEach(function(key) {
    var pane = document.getElementById('case-pane-' + key);
    if (pane) pane.classList.toggle('active', key === tab);
  });
  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
    window.dispatchEvent(new CustomEvent('lumora:case-tab-change', { detail: { tab: tab } }));
  }
  if (tab === 'map' && _klMap) {
    setTimeout(function() {
      _klMap.invalidateSize({animate: false});
    }, 60);
  } else {
    var pane = document.getElementById('case-pane-' + tab);
    if (pane) pane.scrollTop = 0;
  }
}

function showCaseStudy() {
  document.getElementById('view-atlas').classList.remove('active');
  document.getElementById('view-casestudy').classList.add('active');
  initCaseStudyPanel();
  switchCasePanelTab('map');

  if (!_klReady) {
    _klReady = true;
    // Lazy-initialise King Lake map (must be visible so Leaflet gets real dimensions)
    setTimeout(function() {
      _klMap = initMap();
      var layers = {
        solar: buildSolarLayer(),
        wind:  buildWindLayer(),
        soil:  buildSoilLayer(),
        esg:   buildEsgLayer()
      };
      layers.solar.addTo(_klMap);
      updateLegend('solar');

      var esg = computeESG();
      setTimeout(function() {
        animateGauge(esg.total);
        renderBreakdown(esg.env, esg.soc, esg.gov);
        renderMetrics(esg);
        renderOfficialProfiles();
        refreshKingLakeProfiles();
        renderExecutiveSummary(esg);
        updateLayerBrief('solar');
      }, 350);
      setTimeout(function() { renderInsights(esg); }, 700);

      wireToggleBar(layers, _klMap);
    }, 60);
  } else {
    setTimeout(function() {
      if (_klMap) _klMap.invalidateSize({animate: false});
    }, 60);
  }
}

function showAtlas() {
  document.getElementById('view-casestudy').classList.remove('active');
  document.getElementById('view-atlas').classList.add('active');
  setTimeout(function() {
    if (_atlasMap) _atlasMap.invalidateSize({animate: false});
  }, 60);
}

// ─── MAIN ──────────────────────────────────────────────────────────────────

// ─── ATLAS LOCATION SEARCH ────────────────────────────────────────────────

function initAtlasSearch(map) {
  var input    = document.getElementById('atlas-search-input');
  var results  = document.getElementById('atlas-search-results');
  var clearBtn = document.getElementById('atlas-search-clear');
  var _timer   = null;
  var _marker  = null;

  input.addEventListener('input', function() {
    clearBtn.style.display = input.value ? 'block' : 'none';
    clearTimeout(_timer);
    var q = input.value.trim();
    if (q.length < 3) { results.style.display = 'none'; return; }
    _timer = setTimeout(function() { _doSearch(q); }, 400);
  });

  clearBtn.addEventListener('click', function() {
    input.value = ''; clearBtn.style.display = 'none';
    results.style.display = 'none';
    if (_marker) { map.removeLayer(_marker); _marker = null; }
  });

  input.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') { results.style.display = 'none'; input.blur(); }
  });

  document.addEventListener('click', function(e) {
    var wrap = document.getElementById('atlas-search-wrap');
    if (wrap && !wrap.contains(e.target)) results.style.display = 'none';
  });

  function _doSearch(q) {
    results.innerHTML = '<div class="asr-item"><span>Searching…</span></div>';
    results.style.display = 'block';
    fetch('https://nominatim.openstreetmap.org/search?q=' + encodeURIComponent(q) +
          '&format=json&limit=5&addressdetails=1')
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (!data || !data.length) {
          results.innerHTML = '<div class="asr-item"><span>No results found</span></div>';
          return;
        }
        results.innerHTML = data.map(function(item, idx) {
          var parts = item.display_name.split(',');
          var name  = parts.slice(0, 2).join(',').trim();
          var sub   = parts.slice(2, 4).join(',').trim();
          var lat   = (+item.lat).toFixed(4), lon = Math.abs(+item.lon).toFixed(4);
          return '<div class="asr-item" data-lat="' + item.lat + '" data-lon="' + item.lon + '">' +
            '<strong>' + name + '</strong>' +
            (sub ? '<span style="font-size:10px">' + sub + '</span>' : '') +
            '<span style="font-size:10px;color:var(--text-muted);float:right">' + lat + '°N ' + lon + '°W</span>' +
            '</div>';
        }).join('');
        results.querySelectorAll('.asr-item').forEach(function(el) {
          el.addEventListener('click', function() {
            var lat = +el.dataset.lat, lon = +el.dataset.lon;
            map.flyTo([lat, lon], ATLAS_LOCATION_FOCUS_ZOOM, { animate: true, duration: 0.7 });
            if (_marker) map.removeLayer(_marker);
            _marker = L.circleMarker([lat, lon], {
              radius: 7, fillColor: '#009e7d', fillOpacity: 0.9, color: '#fff', weight: 2
            }).addTo(map);
            input.value = el.querySelector('strong').textContent.trim();
            clearBtn.style.display = 'block';
            results.style.display = 'none';
            setTimeout(function() { _fetchLocationData(lat, lon); }, 350);
          });
        });
      })
      .catch(function() {
        results.innerHTML = '<div class="asr-item"><span>Search unavailable — check connection</span></div>';
      });
  }
}

var GLOBAL_RESOURCE_DB = {
  'North America': {
    countries: {
      'United States': {
        solar:[['AZ',6.10,'16.4 GW'],['NV',5.89,'12.7 GW'],['NM',5.78,'4.2 GW'],['CA',5.55,'50.8 GW'],['TX',5.30,'52.0 GW']],
        wind:[['ND',8.4,'5.4 GW'],['WY',7.8,'3.9 GW'],['KS',7.6,'9.8 GW'],['SD',7.5,'4.0 GW'],['TX',7.1,'43.0 GW']],
        sources:['NREL NSRDB','NREL Wind Toolkit','EIA Electricity Data Browser']
      },
      'Canada': {
        solar:[['AB',4.40,'2.4 GW'],['SK',4.25,'0.2 GW'],['ON',3.70,'3.7 GW'],['QC',3.45,'0.1 GW'],['BC',3.25,'0.1 GW']],
        wind:[['AB',7.9,'4.5 GW'],['SK',7.6,'0.8 GW'],['ON',7.1,'5.7 GW'],['NS',6.9,'0.6 GW'],['QC',6.8,'4.0 GW']],
        sources:['Natural Resources Canada','Global Wind Atlas','Canada CER']
      }
    }
  },
  'Europe': { countries: {
      'Spain': {solar:[['Andalusia',5.2,'6.2 GW'],['Extremadura',5.1,'6.4 GW'],['Castile',4.9,'4.1 GW']], wind:[['Castile',7.9,'6.0 GW'],['Galicia',7.7,'3.9 GW'],['Aragon',7.5,'5.2 GW']], sources:['PVGIS','Global Wind Atlas','Red Electrica']},
      'Germany': {solar:[['Bavaria',3.6,'16.5 GW'],['Baden-Württemberg',3.5,'9.5 GW'],['Brandenburg',3.4,'6.0 GW']], wind:[['Lower Saxony',7.8,'12.5 GW'],['Schleswig-Holstein',7.9,'7.4 GW'],['Brandenburg',7.2,'8.8 GW']], sources:['Copernicus ERA5','Global Wind Atlas','Bundesnetzagentur']}
  }},
  'Asia': { countries: {
      'India': {solar:[['Rajasthan',5.9,'26.9 GW'],['Gujarat',5.7,'12.5 GW'],['Karnataka',5.4,'9.5 GW']], wind:[['Tamil Nadu',7.4,'11.0 GW'],['Gujarat',7.0,'11.7 GW'],['Maharashtra',6.7,'5.2 GW']], sources:['NIWE India','Global Solar Atlas','CEA India']},
      'China': {solar:[['Qinghai',5.8,'18.0 GW'],['Xinjiang',5.7,'22.0 GW'],['Gansu',5.6,'16.0 GW']], wind:[['Inner Mongolia',8.2,'54.0 GW'],['Gansu',7.9,'24.0 GW'],['Xinjiang',7.8,'31.0 GW']], sources:['Global Solar Atlas','Global Wind Atlas','NEA China']}
  }},
  'Africa': { countries: {
      'Morocco': {solar:[['Ouarzazate',5.6,'0.8 GW'],['Dakhla',5.9,'0.2 GW'],['Marrakesh',5.4,'0.1 GW']], wind:[['Tarfaya',8.1,'0.3 GW'],['Tangier',7.7,'0.9 GW'],['Essaouira',7.4,'0.4 GW']], sources:['Global Solar Atlas','Global Wind Atlas','MASEN']},
      'South Africa': {solar:[['Northern Cape',5.8,'3.5 GW'],['Free State',5.4,'0.9 GW'],['Western Cape',5.2,'1.0 GW']], wind:[['Western Cape',7.9,'2.8 GW'],['Eastern Cape',7.6,'2.3 GW'],['Northern Cape',7.2,'0.8 GW']], sources:['CSIR South Africa','Global Wind Atlas','Eskom']}
  }},
  'South America': { countries: {
      'Brazil': {solar:[['Bahia',5.6,'7.4 GW'],['Minas Gerais',5.4,'8.4 GW'],['Piaui',5.5,'2.6 GW']], wind:[['Rio Grande do Norte',8.3,'8.2 GW'],['Bahia',7.9,'10.5 GW'],['Ceara',7.7,'3.0 GW']], sources:['ONS Brazil','Global Solar Atlas','Global Wind Atlas']},
      'Chile': {solar:[['Atacama',7.1,'4.2 GW'],['Antofagasta',6.8,'3.8 GW'],['Coquimbo',6.2,'1.0 GW']], wind:[['Biobio',7.5,'0.7 GW'],['Magallanes',8.4,'0.3 GW'],['Antofagasta',7.2,'0.5 GW']], sources:['Ministerio de Energia Chile','Global Solar Atlas','Global Wind Atlas']}
  }},
  'Oceania': { countries: {
      'Australia': {solar:[['NT',6.2,'0.6 GW'],['WA',5.8,'2.1 GW'],['QLD',5.7,'5.0 GW']], wind:[['SA',7.8,'2.5 GW'],['TAS',8.0,'0.6 GW'],['VIC',7.4,'4.0 GW']], sources:['AREMI','Global Wind Atlas','AEMO']},
      'New Zealand': {solar:[['Canterbury',3.8,'0.1 GW'],['Otago',3.9,'0.1 GW'],['Auckland',3.6,'0.1 GW']], wind:[['Wellington',8.1,'1.0 GW'],['Manawatu',7.7,'0.6 GW'],['Southland',7.3,'0.2 GW']], sources:['EECA NZ','Global Wind Atlas','Transpower']}
  }}
};

var CONTINENT_BOUNDS = {
  'North America': [[7, -168], [72, -50]],
  'South America': [[-56, -83], [14, -34]],
  'Europe': [[34, -25], [72, 45]],
  'Africa': [[-35, -20], [37, 52]],
  'Asia': [[-10, 25], [77, 180]],
  'Oceania': [[-50, 110], [5, 180]]
};

function focusContinent(continent) {
  if (!_atlasMap || !CONTINENT_BOUNDS[continent]) return;
  _atlasMap.fitBounds(CONTINENT_BOUNDS[continent], { animate: true, padding: [20, 20] });
}

function initGlobalFilters() {
  var continentSel = document.getElementById('continent-filter');
  var countrySel = document.getElementById('country-filter');
  if (!continentSel || !countrySel) return;
  var continents = Object.keys(GLOBAL_RESOURCE_DB);
  continentSel.innerHTML = continents.map(function(c){return '<option value="'+c+'">'+c+'</option>';}).join('');
  function setCountries() {
    var continent = continentSel.value;
    var countries = Object.keys(GLOBAL_RESOURCE_DB[continent].countries);
    countrySel.innerHTML = countries.map(function(c){return '<option value="'+c+'">'+c+'</option>';}).join('');
    renderResourceRows(continent, countries[0]);
    focusContinent(continent);
  }
  continentSel.addEventListener('change', setCountries);
  countrySel.addEventListener('change', function(){ renderResourceRows(continentSel.value, countrySel.value); });
  setCountries();
}

function renderResourceRows(continent, country) {
  var dataset = GLOBAL_RESOURCE_DB[continent] && GLOBAL_RESOURCE_DB[continent].countries[country];
  if (!dataset) return;
  function escAttr(value) {
    return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function rowsFor(type) {
    var arr = dataset[type] || [];
    var maxVal = Math.max.apply(null, arr.map(function(r){return r[1];}));
    return arr.map(function(r){
      var w = ((r[1] / maxVal) * 100).toFixed(1);
      return '<div class="ap-res-row"><span class="ap-res-state" title="' + escAttr(r[0]) + '">' + r[0] + '</span><div class="ap-res-bar-wrap"><div class="'+(type==='solar'?'ap-res-bar-solar':'ap-res-bar-wind')+'" style="width:'+w+'%"></div></div><span class="ap-res-val">'+r[1].toFixed(2)+'</span><span class="ap-res-cap">'+r[2]+'</span></div>';
    }).join('');
  }
  var solar = document.getElementById('ap-res-solar');
  var wind = document.getElementById('ap-res-wind');
  if (solar) {
    solar.innerHTML = '<div class="ap-res-header-row"><span class="ap-res-col-state">Region</span><span class="ap-res-col-bar"></span><span class="ap-res-col-val">GHI</span><span class="ap-res-col-cap">Installed</span></div>' + rowsFor('solar') + '<div class="ap-res-cite">Open/free sources: ' + dataset.sources.join(' · ') + '</div>';
  }
  if (wind) {
    wind.innerHTML = '<div class="ap-res-header-row"><span class="ap-res-col-state">Region</span><span class="ap-res-col-bar"></span><span class="ap-res-col-val">m/s</span><span class="ap-res-col-cap">Installed</span></div>' + rowsFor('wind') + '<div class="ap-res-cite">Open/free sources: ' + dataset.sources.join(' · ') + '</div>';
  }
  syncPopupOverview();
}

function openLocationPopup(lat, lon, name) {
  var overlay = document.getElementById('location-popup-overlay');
  var popup = document.getElementById('location-popup');
  if (!overlay || !popup) return;
  overlay.classList.add('open'); popup.classList.add('open');
  var n = name || 'Selected location';
  document.getElementById('lp-title').textContent = n;
  document.getElementById('lp-sub').textContent = 'Lat/Lon: ' + lat.toFixed(4) + ', ' + lon.toFixed(4);
  document.getElementById('lp-coords').textContent = lat.toFixed(4) + '°, ' + lon.toFixed(4) + '°';
  renderPopupMiniMap(lat, lon);
  switchLocationPopupTab('solar');
  document.getElementById('lp-solar').innerHTML = '<div style="font-size:12px;color:var(--text-muted)">Loading solar profile…</div>';
  document.getElementById('lp-wind').innerHTML = '<div style="font-size:12px;color:var(--text-muted)">Loading wind profile…</div>';
  document.getElementById('lp-profiles').innerHTML = '<div style="font-size:12px;color:var(--text-muted)">Loading combined wind and solar profiles…</div>';
  document.getElementById('lp-analysis').innerHTML = _buildPopupLocationAnalysisHtml();
}

function renderPopupMiniMap(lat, lon) {
  var target = document.getElementById('lp-mini-map');
  if (!target) return;
  if (!_popupMiniMap) {
    _popupMiniMap = L.map('lp-mini-map', {
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      tap: false
    });
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      { maxZoom: ATLAS_LOCATION_FOCUS_ZOOM, maxNativeZoom: ATLAS_LOCATION_FOCUS_ZOOM }
    ).addTo(_popupMiniMap);
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
      { maxZoom: ATLAS_LOCATION_FOCUS_ZOOM, maxNativeZoom: ATLAS_LOCATION_FOCUS_ZOOM, opacity: 0.8 }
    ).addTo(_popupMiniMap);
  }
  _popupMiniMap.setView([lat, lon], ATLAS_LOCATION_FOCUS_ZOOM, { animate: false });
  if (_popupMiniMarker) _popupMiniMap.removeLayer(_popupMiniMarker);
  _popupMiniMarker = L.circleMarker([lat, lon], { radius: 7, fillColor: '#00d4aa', fillOpacity: 0.95, color: '#fff', weight: 2 }).addTo(_popupMiniMap);
  setTimeout(function(){ if (_popupMiniMap) _popupMiniMap.invalidateSize({ animate:false }); }, 60);
}

function syncPopupOverview() {
  return;
  var el = document.getElementById('lp-overview');
  if (!el) return;
  var name = document.getElementById('aloc-name');
  var coords = document.getElementById('aloc-coords');
  var metrics = document.getElementById('aloc-key-metrics');
  var meta = document.getElementById('aloc-meta');
  var ai = document.getElementById('aloc-ai-insights');
  var resSolar = document.getElementById('ap-res-solar');
  var resWind = document.getElementById('ap-res-wind');
  var solarActive = document.getElementById('tab-solar') && document.getElementById('tab-solar').classList.contains('active');
  var resHtml = solarActive ? (resSolar ? resSolar.innerHTML : '') : (resWind ? resWind.innerHTML : '');
  var resLabel = solarActive ? '☀️ Solar GHI' : '💨 Wind @ 80m';
  var portfolio = document.querySelector('#atlas-panel .ap-case-list');
  var src = document.querySelector('#atlas-panel .source-tags');
  el.innerHTML =
    '<div class="panel-label" style="margin-bottom:8px">SELECTED LOCATION</div>' +
    '<div style="font-size:16px;font-weight:700;margin-bottom:3px">' + (name ? name.textContent : 'Selected location') + '</div>' +
    '<div style="font-family:monospace;color:var(--text-muted);font-size:11px;margin-bottom:10px">' + (coords ? coords.textContent : '') + '</div>' +
    '<div>' + (metrics ? metrics.innerHTML : '') + '</div>' +
    '<div class="aloc-meta" style="margin-top:8px">' + (meta ? meta.innerHTML : '') + '</div>' +
    '<div style="margin-top:12px">' + (ai ? ai.innerHTML : '') + '</div>' +
    '<div class="panel-label" style="margin:12px 0 8px">GLOBAL RENEWABLE RESOURCES</div>' +
    '<div style="font-size:11px;font-weight:600;color:var(--text-secondary);margin-bottom:6px">' + resLabel + '</div>' +
    '<div>' + resHtml + '</div>' +
    '<div class="panel-label" style="margin:12px 0 8px">PORTFOLIO ASSESSMENTS</div>' +
    '<div>' + (portfolio ? portfolio.innerHTML : '') + '</div>' +
    '<div class="panel-label" style="margin:12px 0 8px">DATA SOURCES</div>' +
    '<div class="source-tags">' + (src ? src.innerHTML : '') + '</div>';
}
function closeLocationPopup(){
  var overlay = document.getElementById('location-popup-overlay');
  var popup = document.getElementById('location-popup');
  if (overlay) overlay.classList.remove('open');
  if (popup) popup.classList.remove('open');
}
function switchLocationPopupTab(tab){
  document.querySelectorAll('.lp-tab').forEach(function(el){ el.classList.toggle('active', el.dataset.lpTab===tab); });
  ['solar','wind','profiles','analysis'].forEach(function(k){
    var el = document.getElementById('lp-'+k);
    if (el) el.classList.toggle('active', k===tab);
  });
}

// ─── RESOURCE TAB SWITCHER (solar / wind in atlas panel) ──────────────────

function switchResTab(tab) {
  var solar  = document.getElementById('ap-res-solar');
  var wind   = document.getElementById('ap-res-wind');
  var tabS   = document.getElementById('tab-solar');
  var tabW   = document.getElementById('tab-wind');
  if (tab === 'solar') {
    if (solar) solar.style.display = '';
    if (wind)  wind.style.display  = 'none';
    if (tabS)  tabS.classList.add('active');
    if (tabW)  tabW.classList.remove('active');
  } else {
    if (solar) solar.style.display = 'none';
    if (wind)  wind.style.display  = '';
    if (tabS)  tabS.classList.remove('active');
    if (tabW)  tabW.classList.add('active');
  }
  syncPopupOverview();
}

function initAtlas() {
  // Initialise USA Solar Atlas map (View 1 — visible on page load)
  _atlasMap = initAtlasMap();
  initAtlasSearch(_atlasMap);
  initGlobalFilters();
  console.info('%cUSA Solar Atlas Explorer — TerraIQ', 'color:#009e7d;font-weight:bold;font-size:14px');
  console.info('Click anywhere on the map for live solar & wind data. Search bar available for navigation.');
}

// Auto-init removed — React mounts DOM first, then calls initAtlasApp().

// ─── ESG AUDIT READINESS CHECKLIST ───────────────────────────────────────────

var CL_DATA = {
  env: {
    label: 'Environmental',
    items: [
      { id:'E1', title:'Solar Resource Assessment',
        metric:'GHI avg: 5.35 kWh/m²/day · Annual: 1,953 kWh/m²/yr · Capacity Factor: 21.8%',
        desc:'NREL NSRDB PSM v3 TMY data confirms Class A solar resource at 28.29°N. Optimal fixed-tilt: 28°S. Peak production June–July, minimum December. Florida leads Southeast US in solar potential.',
        source:'NREL NSRDB · NASA POWER', framework:'SASB RN-RE-130a.1 · TCFD Physical Risk', status:'compliant' },
      { id:'E2', title:'Wind Resource Assessment',
        metric:'Wind avg: 4.72 m/s @ 80m hub height · IEC Class 3 · CF est: 25%',
        desc:'Open-Meteo ERA5 annual mean confirms moderate IEC Class 3 resource typical of Central Florida flatwoods. 12-month met-mast campaign recommended before final turbine selection. Noise setback compliance with Pasco County LDC required.',
        source:'Open-Meteo ERA5 · NASA POWER', framework:'SASB RN-RE-130a.1', status:'compliant' },
      { id:'E3', title:'Soil Stability & Erosion Risk',
        metric:'Soil moisture: 0.185 m³/m³ avg · Myakka fine sand, Spodosol · Erosion risk: Low',
        desc:'NASA SMAP L3 data confirms typical Myakka fine sand Spodosol (low moisture retention). Sandy soils drain quickly — stormwater management plan essential. Low RUSLE erosion index on upland scrub sites.',
        source:'NASA SMAP L3 · USDA NRCS Web Soil Survey', framework:'GRI 304-1 · SASB IF-EN-160a.1', status:'compliant' },
      { id:'E4', title:'Water Body Buffer Compliance',
        metric:'King Lake: 263 acres · 100ft FDEP riparian buffer established · HUC8: 03100207',
        desc:'USGS NHD water body (NHDPlus ID 22200742) classified. FDEP Rule 62-330 and SWFWMD criteria mandate 100ft undisturbed riparian buffer designated and mapped. Buffer zone ~11% of project boundary.',
        source:'USGS NHD · FDEP · SWFWMD', framework:'CWA §401 · GRI 303-1', status:'compliant' },
      { id:'E5', title:'Jurisdictional Wetland Delineation',
        metric:'CWA §404 wetland identified: ~8% of site · NWI class: PFO1C · Est. area: ~2.5 acres',
        desc:'Preliminary wetland identification via EPA EnviroAtlas and USGS NWI. Formal ACOE Jacksonville District jurisdictional delineation and pre-application meeting required before permit submission.',
        source:'EPA EnviroAtlas · USGS NWI · FDEP', framework:'CWA §404 · GRI 304-2', status:'in-progress' },
      { id:'E6', title:'EPA Water Quality Compliance',
        metric:'King Lake: No 303(d) impairment · NPDES: Clean · Turbidity threshold: <25 NTU',
        desc:'EPA ATTAINS confirms no active 303(d) impaired waters designation. FDEP NPDES generic permit for stormwater (FLR10F000) required for land disturbance during earthwork phases.',
        source:'EPA ATTAINS · FDEP NPDES', framework:'CWA §303(d) · GRI 303-3', status:'compliant' },
      { id:'E7', title:'Carbon Offset & GHG Emissions Estimate',
        metric:'Solar 1 MW: ~399 tCO2e/yr avoided · Wind 2 MW: ~1,321 tCO2e/yr avoided · FL (FRCC) grid EF: 0.399 kg CO2/kWh',
        desc:'Estimated offsets via EPA eGRID FRCC emission factor. Scope 1 operational emissions near-zero. Scope 3 manufacturing lifecycle assessment pending.',
        source:'EPA eGRID FRCC · NREL', framework:'GRI 305-1/305-3 · TCFD · SASB RN-RE-110a.1', status:'compliant' },
      { id:'E8', title:'Biodiversity & Habitat Impact Assessment',
        metric:'USFWS IPaC review initiated · Gopher tortoise survey required · Florida Scrub-Jay habitat check',
        desc:'USFWS IPaC and FWC review initiated. Gopher tortoise (T. polyphemus) survey and relocation permit required under Florida law. Florida Scrub-Jay (federally threatened) habitat assessment if scrub present. MBTA compliance for turbines.',
        source:'USFWS IPaC · FWC · NatureServe', framework:'GRI 304-1/304-4 · TNFD LEAP', status:'in-progress' },
      { id:'E9', title:'Air Quality Baseline — Construction Phase',
        metric:'Pasco Co.: NAAQS attainment — PM2.5, PM10, O₃ all compliant · AQI avg <45',
        desc:'Pasco County is an NAAQS attainment area for all criteria pollutants. Fugitive dust plan required during grading. No Title V permit threshold anticipated for operational phase. FDEP Air Resources Management Division notification required.',
        source:'EPA AQS · FDEP Air Resources Management', framework:'GRI 305-7 · NAAQS 40 CFR Part 50', status:'compliant' }
    ]
  },
  soc: {
    label: 'Social',
    items: [
      { id:'S1', title:'Community Proximity & Impact Radius',
        metric:'Nearest community: Land O\' Lakes, FL — 12.4 km · Pop within 5 km: ~2,800 · Pop within 10 km: ~18,400',
        desc:'Census TIGER 2020 confirms suburban-rural fringe population. Moderate displacement risk. FAA aeronautical review for turbines required. Visual impact assessment recommended for residential receptors within 2 km.',
        source:'US Census TIGER 2020', framework:'GRI 413-1 · IFC PS5', status:'compliant' },
      { id:'S2', title:'Environmental Justice Screening',
        metric:'EPA EJSCREEN: <42nd percentile all EJ indicators · No designated EJ community overlap',
        desc:'EPA EJSCREEN 2.2 analysis: project area below 45th percentile for all EJ indicators. Growing Hispanic population in Pasco County (~18%) warrants bilingual engagement materials and Spanish-language public notice.',
        source:'EPA EJSCREEN 2.2', framework:'Executive Order 14096 · GRI 413-2', status:'compliant' },
      { id:'S3', title:'Local Employment & Economic Benefit Projection',
        metric:'Construction: est. 38–52 direct jobs · O&M: 4–6 permanent · Tax revenue: ~$92K–$155K/yr',
        desc:'NREL JEDI model estimates for 1 MW solar + 2 MW wind in Pasco County. Local procurement target: ≥40% of materials and services. Florida has active solar supply chain (NextEra, FPL manufacturing base).',
        source:'NREL JEDI Model', framework:'GRI 203-2 · SASB RN-RE-210a.1 · UN SDG 8', status:'compliant' },
      { id:'S4', title:'Stakeholder Engagement Plan',
        metric:'Required: landowner consent · county public hearing · FDEP notice · ACOE comment period',
        desc:'Formal stakeholder engagement plan not yet initiated. Recommend community open house, online comment portal, and bilingual materials for Spanish-speaking population (~18% of Pasco County).',
        source:'FDEP · Pasco County', framework:'GRI 413-1 · IFC PS1 · OECD Guidelines', status:'in-progress' },
      { id:'S5', title:'Worker Health & Safety Plan (OSHA)',
        metric:'Required: OSHA 1910/1926 · Electrical safety: NFPA 70E · Fall protection: ANSI Z359',
        desc:'Occupational health and safety plan required for all construction and O&M personnel. Solar electrical hazard training, arc flash analysis, and turbine erection safety per ANSI/AWEA required.',
        source:'OSHA · NFPA · ANSI', framework:'GRI 403-1/403-9 · ISO 45001', status:'not-started' },
      { id:'S6', title:'Cultural Resources Survey (NHPA §106)',
        metric:'Required: Phase I archaeological survey · Florida DHR coordination · THPO notification',
        desc:'National Historic Preservation Act Section 106 consultation with Florida Division of Historical Resources (DHR) required. Phase I archaeological survey necessary for all ground disturbance areas. Seminole Tribe of Florida THPO notification required.',
        source:'Florida DHR · ACHP · Seminole Tribe THPO', framework:'NHPA §106 · GRI 411-1', status:'not-started' }
    ]
  },
  gov: {
    label: 'Governance',
    items: [
      { id:'G1', title:'Land Use Zoning & Compatibility Verification',
        metric:'Pasco County: A-C Agricultural / R-1 Residential · No renewable moratorium enacted',
        desc:'Pasco County has no enacted solar or wind moratoria as of Q1 2025. County commission has approved prior utility-scale solar projects. Special Use Permit (SUP) review anticipated; precedent in Pasco County favorable.',
        source:'Pasco County Planning & Growth Management', framework:'GRI 201-2 · TCFD Transition Risk', status:'compliant' },
      { id:'G2', title:'ACOE §404 Permit — Wetland Avoidance Design',
        metric:'Wetland ~2.5 ac · Nationwide Permit 17 or 51 may qualify · Fill threshold: <0.5 ac for NWP',
        desc:'Pre-application meeting with USACE Jacksonville District required. Avoidance-first design can likely qualify for Nationwide Permit. Individual Permit required if fill >0.5 acres (12–18 month timeline).',
        source:'USACE Jacksonville District', framework:'CWA §404 · 33 CFR Part 330', status:'in-progress' },
      { id:'G3', title:'FDEP Environmental Resource Permit (ERP)',
        metric:'Required: FDEP ERP Rule 62-330 · NPDES Construction GP (FLR10) · SWPPP documentation',
        desc:'FDEP Environmental Resource Permit (ERP) required under Rule 62-330, F.A.C. for any work in or near wetlands. FDEP NPDES generic permit for stormwater (FLR10F000) required for land disturbance >1 acre.',
        source:'FDEP Land Division', framework:'CWA §402 · 40 CFR Part 122 · FL Statute §373', status:'in-progress' },
      { id:'G4', title:'Utility Interconnection & Grid Studies',
        metric:'Nearest substation: TECO (Tampa Electric) ~8.4 km · 69 kV · Required study: >500 kW',
        desc:'Interconnection application to Tampa Electric (TECO) and Florida PSC required. Transmission feasibility, system impact, and facilities studies required for projects >500 kW. Est. timeline: 6–12 months.',
        source:'Florida PSC · NAESB · TECO', framework:'FERC Order 2023 · PURPA §210', status:'not-started' },
      { id:'G5', title:'Title, Deed & Easement Review',
        metric:'Required: mineral rights separation review · surface use agreement · right-of-way confirmation',
        desc:'Full title search and deed restriction review for all parcels. Verify no competing mineral rights, conservation easements, or deed covenants restricting renewable development.',
        source:'Pasco County Clerk of Circuit Court', framework:'GRI 201-4 · ASTM E2247', status:'not-started' },
      { id:'G6', title:'Insurance, Bonding & Decommissioning Plan',
        metric:'CGL required: ≥$2M · Performance bond: ≥120% project cost · Decommissioning fund: ~$85K–$250K',
        desc:'Commercial General Liability, builder\'s risk, and O&M insurance required. Florida does not mandate decommissioning bonds for solar; Pasco County SUP conditions may require a decommissioning plan.',
        source:'Pasco County SUP Conditions', framework:'GRI 201-3 · SASB RN-RE-520a.1', status:'not-started' }
    ]
  },
  doc: {
    label: 'Documentation',
    items: [
      { id:'D1', title:'Environmental Impact Assessment (EIA / NEPA EA)',
        metric:'Trigger: federal nexus, federal financing, or federal permits · Categorical Exclusion may apply',
        desc:'If federal financing or permits are involved, NEPA Environmental Assessment required. Categorical Exclusion may apply for small projects. Draft Environmental Report recommended regardless of federal nexus.',
        source:'NEPA · FDEP · CEQ', framework:'40 CFR §1501 · GRI 2-28', status:'in-progress' },
      { id:'D2', title:'GRI / SASB / TCFD ESG Disclosure Framework',
        metric:'GRI 2 General · GRI 302/303/304/305/413 · SASB RN-RE · TCFD 4 pillars · IFRS S2',
        desc:'ESG disclosure framework selection and materiality assessment not yet initiated. Recommend GRI Standards as primary with SASB Renewable Resources sector supplement and TCFD financial disclosures.',
        source:'GRI · SASB · TCFD', framework:'GRI Universal Standards 2021 · IFRS S2', status:'not-started' },
      { id:'D3', title:'Geotechnical & Phase I Environmental Site Assessment',
        metric:'ASTM E1527-21 Phase I ESA · Geotechnical borings: min. 3 per MW · Bearing capacity report',
        desc:'Phase I ESA per ASTM E1527-21 to identify recognized environmental conditions (RECs). Geotechnical investigation needed for helical-pile or ballast foundation design in sandy Spodosol soils. High water table assessment critical for Pasco County.',
        source:'ASTM · FDEP', framework:'ASTM E1527-21 · GRI 302-4', status:'not-started' },
      { id:'D4', title:'NREL SAM Financial Pro Forma & LCOE Analysis',
        metric:'Solar NPV est: $1.2M–$2.8M (1 MW) · Wind NPV est: $3.1M–$5.4M (2.5 MW) · ITC: 30% federal',
        desc:'SAM energy model and financial pro forma required for project financing. LCOE inputs: solar $0.043/kWh, wind $0.029/kWh (NREL benchmarks). Federal ITC 30%; Florida has no state-level renewable tax credit but has a strong net metering rule (F.S. §366.91).',
        source:'NREL SAM · DSIRE', framework:'SASB RN-RE-130a.1 · TCFD Scenario Analysis', status:'in-progress' },
      { id:'D5', title:'Third-Party ESG Audit Engagement',
        metric:'Applicable: ISO 14001 (EMS) · ISO 50001 (Energy) · GRI Assurance · B Corp screening',
        desc:'Third-party ESG auditor not yet engaged. Recommend pre-audit readiness review at 60% checklist completion. Target ISO 14001 Environmental Management System certification at project commissioning.',
        source:'ISO · B Lab · GRI', framework:'ISO 14001:2015 · ISO 50001:2018 · GRI Assurance', status:'not-started' }
    ]
  }
};

var CL_ACTIVE_TAB = 'env';

function openChecklist() {
  document.getElementById('checklist-drawer').classList.add('open');
  document.getElementById('checklist-overlay').classList.add('open');
  renderChecklist();
}
function closeChecklist() {
  document.getElementById('checklist-drawer').classList.remove('open');
  document.getElementById('checklist-overlay').classList.remove('open');
}
function switchTab(tab) {
  CL_ACTIVE_TAB = tab;
  document.querySelectorAll('.cl-tab').forEach(function(b) {
    b.classList.toggle('active', b.dataset.tab === tab);
  });
  renderChecklistBody();
}
function clIcon(status) {
  if (status === 'compliant')   return '<svg width="9" height="9" viewBox="0 0 10 10"><path d="M2 5l2.5 2.5L8 3" stroke="#000" stroke-width="1.8" stroke-linecap="round" fill="none"/></svg>';
  if (status === 'in-progress') return '<svg width="9" height="9" viewBox="0 0 10 10"><path d="M5 2v3l2 1" stroke="#92400e" stroke-width="1.8" stroke-linecap="round" fill="none"/></svg>';
  return '';
}
function renderChecklist() {
  var counts = {compliant:0,'in-progress':0,'not-started':0};
  var total = 0;
  Object.keys(CL_DATA).forEach(function(sec) {
    CL_DATA[sec].items.forEach(function(it) { counts[it.status]++; total++; });
  });
  var readiness = Math.round(((counts.compliant + counts['in-progress'] * 0.5) / total) * 100);
  document.getElementById('cl-score-num').textContent = readiness + '%';
  setTimeout(function(){ document.getElementById('cl-readiness-bar').style.width = readiness + '%'; }, 60);
  document.getElementById('pill-compliant').textContent  = counts.compliant + ' Compliant';
  document.getElementById('pill-inprogress').textContent = counts['in-progress'] + ' In Progress';
  document.getElementById('pill-notstarted').textContent = counts['not-started'] + ' Not Started';
  document.getElementById('cl-item-count').textContent   = total + ' items · GRI · SASB · TCFD';
  renderChecklistBody();
}
function renderChecklistBody() {
  var sec   = CL_DATA[CL_ACTIVE_TAB];
  var items = sec.items;
  var comp  = items.filter(function(i){ return i.status === 'compliant'; }).length;
  var pct   = Math.round(comp / items.length * 100);
  var BADGE_LABELS = {compliant:'Compliant','in-progress':'In Progress','not-started':'Not Started',na:'N/A'};
  var html = '<div class="cl-section-header">'
    + '<span class="cl-section-title">' + sec.label + ' (' + items.length + ' items)</span>'
    + '<div class="cl-section-progress"><div class="cl-section-bar-wrap"><div class="cl-section-bar" style="width:' + pct + '%"></div></div>'
    + '<span>' + comp + '/' + items.length + '</span></div></div>';
  items.forEach(function(item) {
    html += '<div class="cl-item ' + item.status + '">'
      + '<div class="cl-status-col"><div class="cl-checkbox">' + clIcon(item.status) + '</div>'
      + '<span style="font-size:9px;color:var(--text-muted);font-weight:700;margin-top:2px">' + item.id + '</span></div>'
      + '<div class="cl-content">'
      + '<div class="cl-item-title">' + item.title + '</div>'
      + '<div class="cl-metric">' + item.metric + '</div>'
      + '<div class="cl-desc">' + item.desc + '</div>'
      + '<div class="cl-meta-row"><span class="cl-source">' + item.source + '</span>'
      + '<span class="cl-badge ' + item.status + '">' + BADGE_LABELS[item.status] + '</span>'
      + '<span class="cl-framework">' + item.framework + '</span></div>'
      + '</div></div>';
  });
  document.getElementById('cl-body').innerHTML = html;
}
function exportChecklist() {
  if (!window.jspdf || !window.jspdf.jsPDF) {
    alert('PDF library not loaded yet — please wait a moment and try again.');
    return;
  }
  var jsPDF = window.jspdf.jsPDF;
  var doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'letter' });
  var pageW  = doc.internal.pageSize.getWidth();   // 612 pt
  var pageH  = doc.internal.pageSize.getHeight();  // 792 pt
  var margin = 40;  // consistent margin used for ALL elements
  var contentW = pageW - margin * 2;               // 532 pt

  // ── Teal header bar ──────────────────────────────────────────────────
  doc.setFillColor(0, 158, 125);
  doc.rect(0, 0, pageW, 56, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15); doc.setTextColor(255, 255, 255);
  doc.text('Lumora Explorer — ESG Audit Readiness Checklist', margin, 23);
  doc.setFontSize(9); doc.setFont('helvetica', 'normal');
  doc.text('King Lake  ·  Pasco County, Florida  ·  28.2906°N, 82.2918°W  ·  263 acres', margin, 40);

  // ── Summary stats ────────────────────────────────────────────────────
  var counts = {compliant:0,'in-progress':0,'not-started':0};
  var total = 0;
  Object.keys(CL_DATA).forEach(function(k) {
    CL_DATA[k].items.forEach(function(it) { counts[it.status]++; total++; });
  });
  var readiness = Math.round(((counts.compliant + counts['in-progress'] * 0.5) / total) * 100);
  var dateStr   = new Date().toLocaleDateString('en-US', {year:'numeric', month:'long', day:'numeric'});

  var sy = 72;
  doc.setTextColor(30, 30, 30); doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.text('Generated: ' + dateStr, margin, sy);
  doc.text('Readiness: ' + readiness + '%', pageW / 2, sy, {align:'center'});
  doc.text(counts.compliant + ' Compliant  |  ' + counts['in-progress'] + ' In Progress  |  ' + counts['not-started'] + ' Not Started',
           pageW - margin, sy, {align:'right'});

  // Readiness progress bar
  var by = sy + 9;
  doc.setFillColor(220, 228, 236);
  doc.roundedRect(margin, by, contentW, 8, 3, 3, 'F');
  doc.setFillColor(0, 158, 125);
  doc.roundedRect(margin, by, contentW * (readiness / 100), 8, 3, 3, 'F');

  var curY = by + 22;

  // ── Section tables ───────────────────────────────────────────────────
  var STATUS_COLORS = {
    'compliant':    [0, 158, 100],
    'in-progress':  [180, 120, 0],
    'not-started':  [200, 60, 60]
  };
  var STATUS_LABELS = {
    'compliant':   'COMPLIANT',
    'in-progress': 'IN PROGRESS',
    'not-started': 'NOT STARTED'
  };
  var SEC_COLORS = {
    env:  [0, 140, 110],
    soc:  [37, 99, 235],
    gov:  [124, 58, 237],
    doc:  [100, 116, 139]
  };

  // Column widths must sum to ≤ contentW (532 pt)
  // 22 + 140 + 70 + 180 + 90 = 502 pt — fits within 532 pt
  var colWidths = {
    0: {cellWidth: 22,  halign: 'center'},
    1: {cellWidth: 140, fontStyle: 'bold'},
    2: {cellWidth: 70,  halign: 'center'},
    3: {cellWidth: 180, fontSize: 6.5},
    4: {cellWidth: 90,  fontSize: 6.5}
  };

  Object.keys(CL_DATA).forEach(function(secKey) {
    var sec = CL_DATA[secKey];
    var secComp = sec.items.filter(function(i){ return i.status === 'compliant'; }).length;
    var secCol  = SEC_COLORS[secKey] || [80, 80, 80];

    // Section header band — uses same margin as all other elements
    doc.autoTable({
      startY: curY,
      head: [[sec.label.toUpperCase() + '   (' + secComp + '/' + sec.items.length + ' compliant)']],
      body: [],
      theme: 'plain',
      headStyles: {
        fillColor: secCol, textColor: [255, 255, 255],
        fontSize: 8.5, fontStyle: 'bold',
        cellPadding: {top: 5, bottom: 5, left: 8, right: 4}
      },
      margin: {left: margin, right: margin},
      tableWidth: contentW
    });
    curY = doc.lastAutoTable.finalY;

    // Item rows
    var rows = sec.items.map(function(it) {
      return [it.id, it.title, STATUS_LABELS[it.status] || it.status.toUpperCase(), it.metric, it.source];
    });
    doc.autoTable({
      startY: curY,
      head: [['#', 'Title', 'Status', 'Metric / Value', 'Source']],
      body: rows,
      theme: 'grid',
      styles: {
        fontSize: 7, cellPadding: {top: 4, bottom: 4, left: 4, right: 4},
        overflow: 'linebreak', textColor: [30, 30, 30], valign: 'top'
      },
      headStyles: {
        fillColor: [240, 244, 248], textColor: [70, 90, 110],
        fontStyle: 'bold', fontSize: 7.5
      },
      columnStyles: colWidths,
      didParseCell: function(data) {
        if (data.column.index === 2 && data.section === 'body') {
          var it = sec.items[data.row.index];
          if (!it) return;
          var col = STATUS_COLORS[it.status] || [120, 120, 120];
          data.cell.styles.textColor = col;
          data.cell.styles.fontStyle = 'bold';
        }
      },
      didDrawCell: function(data) {
        if (data.section === 'body' && data.row.index % 2 === 0 && data.column.index === 0) {
          doc.setFillColor(250, 251, 253);
        }
      },
      margin: {left: margin, right: margin}
    });
    curY = doc.lastAutoTable.finalY + 14;
  });

  // ── Footer on every page ─────────────────────────────────────────────
  var totalPages = doc.internal.getNumberOfPages();
  for (var pg = 1; pg <= totalPages; pg++) {
    doc.setPage(pg);
    doc.setDrawColor(200, 210, 220);
    doc.line(margin, pageH - 28, pageW - margin, pageH - 28);
    doc.setFontSize(7.5); doc.setFont('helvetica', 'normal'); doc.setTextColor(150, 160, 175);
    doc.text('Lumora Explorer  ·  King Lake, Pasco County, FL  ·  GRI  ·  SASB  ·  TCFD  ·  IFRS S2',
             margin, pageH - 16);
    doc.text('Page ' + pg + ' / ' + totalPages, pageW - margin, pageH - 16, {align: 'right'});
  }

  doc.save('LumoraExplorer_ESG_AuditReadiness_KingLake.pdf');
}

function exportPortfolioBrief() {
  if (!window.jspdf || !window.jspdf.jsPDF) {
    alert('PDF library not loaded yet — please wait a moment and try again.');
    return;
  }

  var jsPDF = window.jspdf.jsPDF;
  var doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'letter' });
  var pageW = doc.internal.pageSize.getWidth();
  var pageH = doc.internal.pageSize.getHeight();
  var margin = 40;
  var contentW = pageW - margin * 2;
  var dateStr = new Date().toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' });

  var esg = computeESG();
  var checklist = getChecklistSnapshot();
  var model = buildPortfolioModel(esg, checklist);
  var actions = checklist.openItems.slice(0, 5);

  function safeText(id, fallback) {
    var el = document.getElementById(id);
    return el ? el.textContent.trim() : fallback;
  }

  var signalRows = [
    ['Signal', safeText('signal-badge', 'Proceed with Hybrid Phasing')],
    ['Primary Build', safeText('signal-primary', '1 MW solar')],
    ['Expansion Path', safeText('signal-expansion', '2 MW wind')],
    ['Permitting Heat', safeText('signal-risk', 'Moderate')],
    ['Checklist Open', safeText('signal-open', actions.length + ' items')]
  ];

  var resourceRows = [
    ['Solar GHI', safeText('mv-solar', esg.solarAvg.toFixed(2)) + ' kWh/m2/day'],
    ['Wind Speed', safeText('mv-wind', esg.windAvg.toFixed(2)) + ' m/s @ 80m'],
    ['Soil Moisture', safeText('mv-soil', esg.soilAvg.toFixed(3)) + ' m3/m3'],
    ['ESG Grade', esg.grade + ' (' + esg.total + '/100)'],
    ['Readiness', checklist.readiness + '%']
  ];

  var scenarioRows = model.scenarios.map(function(item) {
    return [item.title, item.size, item.output, item.risk, item.copy];
  });

  var actionRows = actions.map(function(item, index) {
    return [(index + 1) + '.', item.section, statusLabel(item.status), item.title, trimCopy(item.desc, 120)];
  });

  var monthlyRows = PROFILE_MONTHS.map(function(month, index) {
    return [
      month,
      OFFICIAL_PROFILES.solar.series[index].toFixed(2),
      OFFICIAL_PROFILES.wind.series[index].toFixed(2)
    ];
  });

  doc.setFillColor(15, 157, 132);
  doc.rect(0, 0, pageW, 58, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.text('Lumora Explorer — King Lake Portfolio Brief', margin, 24);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Pasco County, Florida · 28.2906N, 82.2918W · Generated ' + dateStr, margin, 41);

  var curY = 82;
  doc.setTextColor(20, 32, 51);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text(safeText('signal-title', 'Solar should lead the first deployment tranche.'), margin, curY);
  curY += 20;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(73, 97, 118);
  var summaryLines = doc.splitTextToSize(safeText('signal-copy', 'Resource quality is strongest on solar, ESG risk is manageable, and the open checklist shows a clear path to derisking permits and stakeholder work.'), contentW);
  doc.text(summaryLines, margin, curY);
  curY += summaryLines.length * 14 + 14;

  doc.autoTable({
    startY: curY,
    head: [['Portfolio Signal', 'Current Value']],
    body: signalRows,
    theme: 'grid',
    margin: { left: margin, right: margin },
    headStyles: { fillColor: [15, 157, 132], textColor: [255, 255, 255], fontStyle: 'bold' },
    styles: { fontSize: 9, cellPadding: 6, overflow: 'linebreak' },
    columnStyles: { 0: { cellWidth: 140, fontStyle: 'bold' }, 1: { cellWidth: contentW - 140 } }
  });
  curY = doc.lastAutoTable.finalY + 16;

  doc.autoTable({
    startY: curY,
    head: [['Resource Stack', 'Value']],
    body: resourceRows,
    theme: 'grid',
    margin: { left: margin, right: margin },
    headStyles: { fillColor: [59, 130, 246], textColor: [255, 255, 255], fontStyle: 'bold' },
    styles: { fontSize: 9, cellPadding: 6, overflow: 'linebreak' },
    columnStyles: { 0: { cellWidth: 140, fontStyle: 'bold' }, 1: { cellWidth: contentW - 140 } }
  });
  curY = doc.lastAutoTable.finalY + 16;

  doc.autoTable({
    startY: curY,
    head: [['Scenario', 'Build', 'Output', 'Risk', 'Summary']],
    body: scenarioRows,
    theme: 'grid',
    margin: { left: margin, right: margin },
    headStyles: { fillColor: [17, 24, 39], textColor: [255, 255, 255], fontStyle: 'bold' },
    styles: { fontSize: 8, cellPadding: 5, overflow: 'linebreak' },
    columnStyles: {
      0: { cellWidth: 110, fontStyle: 'bold' },
      1: { cellWidth: 70 },
      2: { cellWidth: 70 },
      3: { cellWidth: 55 },
      4: { cellWidth: contentW - 305 }
    }
  });
  curY = doc.lastAutoTable.finalY + 16;

  doc.autoTable({
    startY: curY,
    head: [['#', 'Section', 'Status', 'Action', 'Detail']],
    body: actionRows,
    theme: 'grid',
    margin: { left: margin, right: margin },
    headStyles: { fillColor: [124, 58, 237], textColor: [255, 255, 255], fontStyle: 'bold' },
    styles: { fontSize: 8, cellPadding: 5, overflow: 'linebreak' },
    columnStyles: {
      0: { cellWidth: 24, halign: 'center' },
      1: { cellWidth: 88, fontStyle: 'bold' },
      2: { cellWidth: 62 },
      3: { cellWidth: 126 },
      4: { cellWidth: contentW - 300 }
    }
  });
  curY = doc.lastAutoTable.finalY + 18;

  if (curY > pageH - 220) {
    doc.addPage();
    curY = 54;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(20, 32, 51);
  doc.text('Official Monthly Profiles', margin, curY);
  curY += 10;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(73, 97, 118);
  doc.text('NASA POWER climatology for the King Lake site centroid (2001-2020).', margin, curY + 4);
  curY += 14;

  doc.autoTable({
    startY: curY,
    head: [['Month', 'Solar GHI (kWh/m2/day)', 'Wind @ 50m (m/s)']],
    body: monthlyRows,
    theme: 'grid',
    margin: { left: margin, right: margin },
    headStyles: { fillColor: [15, 157, 132], textColor: [255, 255, 255], fontStyle: 'bold' },
    styles: { fontSize: 8.5, cellPadding: 5 },
    columnStyles: { 0: { cellWidth: 70, fontStyle: 'bold' }, 1: { cellWidth: 170 }, 2: { cellWidth: contentW - 240 } }
  });

  var totalPages = doc.internal.getNumberOfPages();
  for (var page = 1; page <= totalPages; page++) {
    doc.setPage(page);
    doc.setDrawColor(220, 228, 236);
    doc.line(margin, pageH - 26, pageW - margin, pageH - 26);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(120, 133, 148);
    doc.text('Lumora Explorer · Portfolio Brief · NASA POWER · NREL · ESG Readiness', margin, pageH - 12);
    doc.text('Page ' + page + ' / ' + totalPages, pageW - margin, pageH - 12, { align: 'right' });
  }

  doc.save('LumoraExplorer_PortfolioBrief_KingLake.pdf');
}

// ─── MODULE BOOTSTRAP ──────────────────────────────────────────────────────
// Expose handler functions on window so inline onClick attributes keep working.
// Also export initAtlasApp() so React can call it after the DOM is mounted.

var _appInitialised = false;
export function initAtlasApp() {
  if (_appInitialised) return;
  _appInitialised = true;
  initAtlas();
}

if (typeof window !== 'undefined') {
  window.showCaseStudy = showCaseStudy;
  window.showAtlas = showAtlas;
  window.getPortfolioESG = computeESG;
  window.toggleAtlasWind = toggleAtlasWind;
  window.switchResTab = switchResTab;
  window.switchCasePanelTab = switchCasePanelTab;
  window.switchLocationPopupTab = switchLocationPopupTab;
  window.exportPortfolioBrief = exportPortfolioBrief;
  window.openChecklist = openChecklist;
  window.closeChecklist = closeChecklist;
  window.switchTab = switchTab;
  window.exportChecklist = exportChecklist;
  window.closeLocationPopup = closeLocationPopup;
  window.initAtlasApp = initAtlasApp;
}
