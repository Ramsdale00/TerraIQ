import React, { useEffect, useRef, useState } from 'react';

var NUMBER_FORMAT = new Intl.NumberFormat('en-US');
var DECIMAL_FORMAT = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
var COMPACT_FORMAT = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 });
var PERCENT_FORMAT = new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 0 });
var LAYER_GLOSSARY = [
  { key: 'RGB', meaning: 'True-color satellite composite using red, green, and blue bands for visual context.' },
  { key: 'NDVI', meaning: 'Normalized Difference Vegetation Index showing vegetation vigor and shoreline biomass.' },
  { key: 'FAI', meaning: 'Floating Algae Index highlighting possible floating algae and emergent surface vegetation.' },
  { key: 'MNDWI', meaning: 'Modified Normalized Difference Water Index separating open water from land and emergent cover.' },
  { key: 'NIR', meaning: 'Near-infrared reflectance layer that helps reveal healthy vegetation and wetland response.' },
  { key: 'SWIR1', meaning: 'Short-wave infrared band used to read moisture contrast, exposed material, and wetness patterns.' },
];

function assetUrl(path) {
  var base = import.meta.env.BASE_URL || '/';
  return base.replace(/\/$/, '') + path;
}

function formatArea(value) {
  return NUMBER_FORMAT.format(Math.round(value)) + ' m²';
}

function formatMonthLabel(value) {
  var parts = value.split('-');
  if (parts.length !== 2) return value;
  var date = new Date(Date.UTC(Number(parts[0]), Number(parts[1]) - 1, 1));
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
}

function getLeafletBounds(bounds) {
  return [
    [bounds[1], bounds[0]],
    [bounds[3], bounds[2]],
  ];
}

function getLayerById(layers, id) {
  return layers.find(function(layer) { return layer.id === id; }) || null;
}

function buildStudyInsights(data) {
  var peak = data.chart.summary.peakVegM2;
  var latest = data.chart.summary.latestVegM2;
  var latestShare = peak > 0 ? latest / peak : 0;
  var ndvi = getLayerById(data.layers, 'ndvi');
  var fai = getLayerById(data.layers, 'fai');
  var mndwi = getLayerById(data.layers, 'mndwi');
  var ndviMean = ndvi && ndvi.stats && ndvi.stats[0] ? ndvi.stats[0].mean : null;
  var faiMean = fai && fai.stats && fai.stats[0] ? fai.stats[0].mean : null;
  var mndwiMean = mndwi && mndwi.stats && mndwi.stats[0] ? mndwi.stats[0].mean : null;

  return [
    {
      title: 'Baseline lake condition becomes easier to frame',
      badge: 'Baseline',
      points: [
        'The raster stack helps establish a clear <strong>baseline visual condition</strong> for the 263-acre lake before monthly comparisons are made.',
        'Average <strong>NDVI</strong> of ' + (ndviMean == null ? 'n/a' : '<strong>' + DECIMAL_FORMAT.format(ndviMean) + '</strong>') + ' and average <strong>MNDWI</strong> of ' + (mndwiMean == null ? 'n/a' : '<strong>' + DECIMAL_FORMAT.format(mndwiMean) + '</strong>') + ' indicate a lake system dominated by <strong>open water with biologically active fringes</strong>.',
        'That context supports the project goal of describing the existing <strong>trophic-state setting</strong> before interpreting future water-quality changes.',
      ],
    },
    {
      title: 'Monthly sampling can be compared against a seasonal benchmark',
      badge: 'Trend',
      points: [
        'Aquatic vegetation reaches its strongest mapped extent in <strong>' + formatMonthLabel(data.chart.summary.peakDate) + '</strong> at <strong>' + formatArea(peak) + '</strong>.',
        'The latest observation is <strong>' + PERCENT_FORMAT.format(latestShare) + '</strong> of that peak, reinforcing that the lake responds to a <strong>strong seasonal cycle</strong> rather than a static condition.',
        'This is useful for monthly water-quality interpretation because apparent changes can be checked against a <strong>known seasonal vegetation benchmark</strong>, not just against a single baseline snapshot.',
      ],
    },
    {
      title: 'LVI field work can be supported by the mapped vegetation pattern',
      badge: 'LVI',
      points: [
        'The strongest remote signal remains concentrated along <strong>shallow shoreline margins</strong>, which aligns well with where plant-community condition is most likely to influence the <strong>Lake Vegetation Index</strong>.',
        'This does <strong>not replace the Verdantas field-based LVI</strong> performed under the <strong>FDEP SOP</strong>, but it gives a defensible spatial backdrop for where plant-community change is most likely to be observed.',
        'Used together, the map and the rapid field assessment help show whether King Lake supports a <strong>balanced aquatic and wetland plant community</strong> or whether specific fringe zones deserve more attention.',
      ],
    },
    {
      title: 'Remote sensing strengthens QA/QC and final reporting',
      badge: 'QA/QC',
      points: [
        'The combined <strong>FAI</strong>, <strong>NDVI</strong>, and <strong>water-mask</strong> layers provide a transparent way to screen for <strong>anomalous surface conditions</strong> when monthly results are reviewed.',
        'These layers cannot confirm <strong>legacy pesticides or herbicides</strong> on their own, but they can help identify where unusual optical conditions should be compared carefully against <strong>lab chemistry</strong> and field observations.',
        'That makes the final report stronger because baseline findings, monthly sample results, and QA/QC flags can all be explained against a consistent <strong>mapped condition record</strong>.',
      ],
    },
  ];
}

function useAnalysisData() {
  var [state, setState] = useState({
    loading: true,
    error: '',
    data: null,
  });

  useEffect(function loadData() {
    var cancelled = false;

    fetch(assetUrl('/earth-engine/kinglake-analysis.json'))
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Unable to load Earth Engine analysis assets.');
        }
        return response.json();
      })
      .then(function(payload) {
        if (!cancelled) {
          setState({ loading: false, error: '', data: payload });
        }
      })
      .catch(function(error) {
        if (!cancelled) {
          setState({ loading: false, error: error.message || 'Unable to load analysis data.', data: null });
        }
      });

    return function cleanup() {
      cancelled = true;
    };
  }, []);

  return state;
}

function buildChartGeometry(rows, width, height) {
  var padding = { top: 20, right: 16, bottom: 34, left: 54 };
  var innerWidth = width - padding.left - padding.right;
  var innerHeight = height - padding.top - padding.bottom;
  var maxValue = rows.reduce(function(max, row) { return Math.max(max, row.vegM2); }, 0);
  var xStep = rows.length > 1 ? innerWidth / (rows.length - 1) : innerWidth;
  var safeMax = maxValue > 0 ? maxValue : 1;

  var points = rows.map(function(row, index) {
    return {
      x: padding.left + (index * xStep),
      y: padding.top + innerHeight - ((row.vegM2 / safeMax) * innerHeight),
      value: row.vegM2,
      date: row.date,
      label: formatMonthLabel(row.date),
    };
  });

  var line = points.map(function(point, index) {
    return (index === 0 ? 'M' : 'L') + point.x.toFixed(2) + ' ' + point.y.toFixed(2);
  }).join(' ');

  var area = points.length
    ? [
        'M' + points[0].x.toFixed(2) + ' ' + (padding.top + innerHeight).toFixed(2),
        points.map(function(point) {
          return 'L' + point.x.toFixed(2) + ' ' + point.y.toFixed(2);
        }).join(' '),
        'L' + points[points.length - 1].x.toFixed(2) + ' ' + (padding.top + innerHeight).toFixed(2),
        'Z',
      ].join(' ')
    : '';

  var yTicks = [0, 0.25, 0.5, 0.75, 1].map(function(step) {
    return {
      value: safeMax * step,
      y: padding.top + innerHeight - (innerHeight * step),
    };
  });

  var xTicks = points.filter(function(_, index) {
    if (points.length <= 6) return true;
    if (index === 0 || index === points.length - 1) return true;
    return index % Math.ceil(points.length / 5) === 0;
  });

  return {
    width: width,
    height: height,
    padding: padding,
    innerHeight: innerHeight,
    area: area,
    line: line,
    points: points,
    yTicks: yTicks,
    xTicks: xTicks,
    maxValue: safeMax,
  };
}

function AnalysisChart(props) {
  var rows = props.rows;
  var geometry = buildChartGeometry(rows, 760, 290);
  var peakIndex = rows.reduce(function(bestIndex, row, index, collection) {
    return row.vegM2 > collection[bestIndex].vegM2 ? index : bestIndex;
  }, 0);
  var latestIndex = rows.length - 1;

  return (
    <div className="analysis-card analysis-chart-card">
      <div className="analysis-card-head">
        <div>
          <div className="panel-label">Aquatic Vegetation Trend</div>
          <h3>King Lake - Monthly Aquatic Vegetation Area (m²)</h3>
          <p>Earth Engine monthly series.</p>
        </div>
        <div className="analysis-chart-pill">
          <strong>{rows.length}</strong>
          <span>Observations</span>
        </div>
      </div>

      <div className="analysis-chart-wrap">
        <svg viewBox={'0 0 ' + geometry.width + ' ' + geometry.height} className="analysis-chart-svg" role="img" aria-label="Monthly aquatic vegetation area line chart">
          <defs>
            <linearGradient id="analysisChartArea" x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#0f9d84" stopOpacity="0.34" />
              <stop offset="100%" stopColor="#0f9d84" stopOpacity="0.03" />
            </linearGradient>
          </defs>

          {geometry.yTicks.map(function(tick) {
            return (
              <g key={'y-' + tick.value}>
                <line
                  x1={geometry.padding.left}
                  y1={tick.y}
                  x2={geometry.width - geometry.padding.right}
                  y2={tick.y}
                  className="analysis-chart-grid"
                />
                <text x={geometry.padding.left - 10} y={tick.y + 4} textAnchor="end" className="analysis-chart-axis">
                  {COMPACT_FORMAT.format(tick.value)}
                </text>
              </g>
            );
          })}

          {geometry.xTicks.map(function(tick) {
            return (
              <text key={'x-' + tick.date} x={tick.x} y={geometry.height - 10} textAnchor="middle" className="analysis-chart-axis">
                {tick.label}
              </text>
            );
          })}

          <path d={geometry.area} fill="url(#analysisChartArea)" />
          <path d={geometry.line} className="analysis-chart-line" />

          {geometry.points.map(function(point, index) {
            var isPeak = index === peakIndex;
            var isLatest = index === latestIndex;
            return (
              <g key={point.date}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={isPeak || isLatest ? 5.5 : 3.5}
                  className={isPeak ? 'analysis-chart-point peak' : isLatest ? 'analysis-chart-point latest' : 'analysis-chart-point'}
                />
                {isPeak ? (
                  <g>
                    <line x1={point.x} y1={point.y - 8} x2={point.x} y2={geometry.padding.top - 2} className="analysis-chart-marker" />
                    <rect x={Math.max(geometry.padding.left, point.x - 72)} y={2} width="144" height="36" rx="14" className="analysis-chart-callout" />
                    <text x={point.x} y={17} textAnchor="middle" className="analysis-chart-callout-label">
                      Peak Month
                    </text>
                    <text x={point.x} y={30} textAnchor="middle" className="analysis-chart-callout-value">
                      {formatMonthLabel(point.date)} · {COMPACT_FORMAT.format(point.value)} m²
                    </text>
                  </g>
                ) : null}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

function AnalysisLegend(props) {
  var layer = props.layer;

  if (!layer) return null;

  if (layer.legend.type === 'categorical') {
    return (
      <div className="analysis-legend-categorical">
        {layer.legend.items.map(function(item) {
          return (
            <div key={item.label} className="analysis-legend-item">
              <span className="analysis-legend-swatch" style={{ background: item.color }}></span>
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="analysis-legend-gradient">
      <div className="analysis-legend-ramp" style={{ background: 'linear-gradient(90deg, ' + layer.legend.stops.join(', ') + ')' }}></div>
      <div className="analysis-legend-scale">
        <span>{layer.legend.minLabel}</span>
        <span>{layer.legend.maxLabel}</span>
      </div>
    </div>
  );
}

export default function AnalysisMapPane() {
  var dataState = useAnalysisData();
  var mapElementRef = useRef(null);
  var mapRef = useRef(null);
  var sceneBoundsRef = useRef(null);
  var overlaysRef = useRef({});
  var [activeBaseId, setActiveBaseId] = useState('');
  var [baseOpacity, setBaseOpacity] = useState(1);
  var [overlayVisibility, setOverlayVisibility] = useState({});
  var [overlayOpacity, setOverlayOpacity] = useState({});
  var [cursorText, setCursorText] = useState('Hover over the map to inspect coordinates.');

  var data = dataState.data;
  var layers = data ? data.layers : [];
  var baseLayers = layers.filter(function(layer) { return layer.group === 'base'; });
  var overlayLayers = layers.filter(function(layer) { return layer.group === 'overlay'; });
  var activeBaseLayer = baseLayers.find(function(layer) { return layer.id === activeBaseId; }) || baseLayers[0] || null;
  var visibleOverlayCount = overlayLayers.filter(function(layer) { return overlayVisibility[layer.id]; }).length;
  var chartRows = data ? data.chart.rows : [];
  var studyInsights = data ? buildStudyInsights(data) : [];

  useEffect(function seedStateFromData() {
    if (!data || activeBaseId) return;

    var initialBase = baseLayers.find(function(layer) { return layer.visibleByDefault; }) || baseLayers[0];
    var initialOverlayVisibility = {};
    var initialOverlayOpacity = {};

    overlayLayers.forEach(function(layer) {
      initialOverlayVisibility[layer.id] = Boolean(layer.visibleByDefault);
      initialOverlayOpacity[layer.id] = layer.defaultOpacity;
    });

    setActiveBaseId(initialBase ? initialBase.id : '');
    setBaseOpacity(initialBase ? initialBase.defaultOpacity : 1);
    setOverlayVisibility(initialOverlayVisibility);
    setOverlayOpacity(initialOverlayOpacity);
  }, [data, activeBaseId, baseLayers, overlayLayers]);

  useEffect(function initMapWhenReady() {
    if (!data || mapRef.current || !mapElementRef.current || !window.L) return;

    var L = window.L;
    var bounds = getLeafletBounds(data.scene.bounds);
    var map = L.map(mapElementRef.current, {
      zoomControl: true,
      attributionControl: true,
      minZoom: 12,
      maxZoom: 19,
      zoomSnap: 0.25,
    });

    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: 'Tiles © Esri',
        maxZoom: 19,
      }
    ).addTo(map);

    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 19,
        opacity: 0.72,
      }
    ).addTo(map);

    sceneBoundsRef.current = L.latLngBounds(bounds);
    map.fitBounds(sceneBoundsRef.current, { padding: [24, 24] });

    L.rectangle(sceneBoundsRef.current, {
      color: '#5eead4',
      weight: 1.2,
      dashArray: '6 6',
      fillOpacity: 0,
      opacity: 0.88,
    }).addTo(map);

    L.circleMarker(data.scene.center, {
      radius: 6,
      fillColor: '#0f9d84',
      fillOpacity: 0.92,
      color: '#ffffff',
      weight: 2,
    }).bindTooltip('King Lake analysis center', { direction: 'top' }).addTo(map);

    layers.forEach(function(layer) {
      overlaysRef.current[layer.id] = L.imageOverlay(assetUrl(layer.image), getLeafletBounds(layer.bounds), {
        opacity: 0,
        interactive: false,
      });
    });

    map.on('mousemove', function(event) {
      setCursorText(event.latlng.lat.toFixed(5) + '°N, ' + Math.abs(event.latlng.lng).toFixed(5) + '°W');
    });

    mapRef.current = map;
  }, [data, layers]);

  useEffect(function syncVisibleLayers() {
    if (!mapRef.current || !data) return;

    layers.forEach(function(layer) {
      var overlay = overlaysRef.current[layer.id];
      if (!overlay) return;

      var shouldShow = layer.group === 'base'
        ? layer.id === activeBaseId
        : Boolean(overlayVisibility[layer.id]);

      var opacity = layer.group === 'base'
        ? baseOpacity
        : overlayOpacity[layer.id] == null ? layer.defaultOpacity : overlayOpacity[layer.id];

      if (shouldShow) {
        if (!mapRef.current.hasLayer(overlay)) {
          overlay.addTo(mapRef.current);
        }
        overlay.setOpacity(opacity);
      } else if (mapRef.current.hasLayer(overlay)) {
        mapRef.current.removeLayer(overlay);
      }
    });
  }, [data, layers, activeBaseId, baseOpacity, overlayVisibility, overlayOpacity]);

  useEffect(function wireVisibilityRefresh() {
    function handleTabChange(event) {
      if (!mapRef.current || !event.detail || event.detail.tab !== 'analysis') return;

      window.setTimeout(function() {
        if (!mapRef.current || !sceneBoundsRef.current) return;
        mapRef.current.invalidateSize({ animate: false });
        mapRef.current.fitBounds(sceneBoundsRef.current, { padding: [24, 24] });
      }, 80);
    }

    window.addEventListener('lumora:case-tab-change', handleTabChange);
    return function cleanup() {
      window.removeEventListener('lumora:case-tab-change', handleTabChange);
    };
  }, []);

  useEffect(function cleanupMapOnUnmount() {
    return function destroyMap() {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  if (dataState.loading) {
    return (
      <div className="analysis-pane">
        <div className="analysis-loading">Preparing Earth Engine overlays and aquatic vegetation analytics…</div>
      </div>
    );
  }

  if (dataState.error || !data) {
    return (
      <div className="analysis-pane">
        <div className="analysis-loading analysis-loading-error">{dataState.error || 'Analysis data is unavailable.'}</div>
      </div>
    );
  }

  return (
    <div className="analysis-pane">
      <div className="analysis-shell">
        <div className="analysis-hero">
          <div className="analysis-hero-copy">
            <div className="panel-label">Earth Engine Analysis</div>
            <h2>Layered shoreline intelligence for King Lake</h2>
            <p>
              A dedicated analysis workspace built from the supplied GeoTIFF exports, with image overlays,
              layer-by-layer controls, and the monthly aquatic vegetation signal presented alongside the map.
            </p>
          </div>
          <div className="analysis-hero-metrics">
            <div className="analysis-hero-metric">
              <span>Raster Layers</span>
              <strong>{layers.length}</strong>
              <small>All supplied TIFF exports are represented</small>
            </div>
            <div className="analysis-hero-metric">
              <span>Peak Vegetation</span>
              <strong>{COMPACT_FORMAT.format(data.chart.summary.peakVegM2)} m²</strong>
              <small>{formatMonthLabel(data.chart.summary.peakDate)}</small>
            </div>
            <div className="analysis-hero-metric">
              <span>Current Window</span>
              <strong>{formatMonthLabel(data.chart.summary.latestDate)}</strong>
              <small>{formatArea(data.chart.summary.latestVegM2)}</small>
            </div>
          </div>
        </div>

        <div className="analysis-grid">
          <div className="analysis-main">
            <div className="analysis-card analysis-map-card">
              <div className="analysis-card-head">
                <div>
                  <div className="panel-label">Analysis Map</div>
                  <h3>{activeBaseLayer ? activeBaseLayer.label : 'Analysis Layer'}</h3>
                  <p>{activeBaseLayer ? activeBaseLayer.description : 'Select a layer to inspect the export.'}</p>
                </div>
                <div className="analysis-map-summary">
                  <span>{visibleOverlayCount} overlays active</span>
                  <strong>{cursorText}</strong>
                </div>
              </div>

              <div className="analysis-map-stage">
                <div ref={mapElementRef} className="analysis-map-canvas"></div>

                <div className="analysis-map-overlay analysis-map-overlay-top">
                  <div className="analysis-map-chip-group">
                    <span className="analysis-map-chip">EPSG:4326</span>
                    <span className="analysis-map-chip">{data.scene.acquisitionWindow}</span>
                    <span className="analysis-map-chip">{data.scene.location}</span>
                  </div>
                </div>

                <div className="analysis-map-overlay analysis-map-overlay-bottom">
                  <div className="analysis-map-legend-card">
                    <div className="analysis-map-legend-head">
                      <span>Active Layer</span>
                      <strong>{activeBaseLayer ? activeBaseLayer.label : 'n/a'}</strong>
                    </div>
                    <AnalysisLegend layer={activeBaseLayer} />
                  </div>
                </div>
              </div>
            </div>

            <AnalysisChart rows={chartRows} />

          </div>

          <aside className="analysis-sidebar">
            <div className="analysis-card">
              <div className="analysis-card-head compact">
                <div className="analysis-heading-with-help">
                  <div className="panel-label">Base Imagery</div>
                  <h3>Choose the active raster</h3>
                  <button type="button" className="analysis-help-trigger" aria-label="Explain raster layer names">
                    ?
                  </button>
                  <div className="analysis-help-tooltip" role="tooltip">
                    {LAYER_GLOSSARY.map(function(item) {
                      return (
                        <div key={item.key} className="analysis-help-item">
                          <strong>{item.key}</strong>
                          <span>{item.meaning}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="analysis-layer-list">
                {baseLayers.map(function(layer) {
                  return (
                    <button
                      key={layer.id}
                      type="button"
                      className={'analysis-layer-button' + (layer.id === activeBaseId ? ' active' : '')}
                      onClick={function() {
                        setActiveBaseId(layer.id);
                        setBaseOpacity(layer.defaultOpacity);
                      }}
                    >
                      <span className="analysis-layer-button-main">
                        <strong>{layer.label}</strong>
                        <small>{layer.sourceFiles.join(' + ')}</small>
                      </span>
                      <span className="analysis-layer-button-meta">{layer.legend.unit || 'Rendered'}</span>
                    </button>
                  );
                })}
              </div>

              <label className="analysis-range-field">
                <span>Base opacity</span>
                <input
                  type="range"
                  min="0.25"
                  max="1"
                  step="0.05"
                  value={baseOpacity}
                  onChange={function(event) { setBaseOpacity(Number(event.target.value)); }}
                />
                <strong>{Math.round(baseOpacity * 100)}%</strong>
              </label>
            </div>

            <div className="analysis-card">
              <div className="analysis-card-head compact">
                <div>
                  <div className="panel-label">Feature Overlays</div>
                  <h3>Toggle shoreline masks</h3>
                </div>
              </div>

              <div className="analysis-toggle-list">
                {overlayLayers.map(function(layer) {
                  var visible = Boolean(overlayVisibility[layer.id]);
                  var opacity = overlayOpacity[layer.id] == null ? layer.defaultOpacity : overlayOpacity[layer.id];

                  return (
                    <div key={layer.id} className="analysis-toggle-card">
                      <label className="analysis-toggle-row">
                        <input
                          type="checkbox"
                          checked={visible}
                          onChange={function(event) {
                            setOverlayVisibility(function(previous) {
                              return { ...previous, [layer.id]: event.target.checked };
                            });
                          }}
                        />
                        <span>
                          <strong>{layer.label}</strong>
                          <small>{layer.description}</small>
                        </span>
                      </label>

                      <label className="analysis-range-field inline">
                        <span>Opacity</span>
                        <input
                          type="range"
                          min="0.1"
                          max="1"
                          step="0.05"
                          value={opacity}
                          onChange={function(event) {
                            setOverlayOpacity(function(previous) {
                              return { ...previous, [layer.id]: Number(event.target.value) };
                            });
                          }}
                        />
                        <strong>{Math.round(opacity * 100)}%</strong>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

          </aside>
        </div>

        <div className="analysis-card analysis-insights-band">
          <div className="analysis-card-head compact">
            <div>
              <div className="panel-label">Study Insights</div>
              <h3>How this analysis supports the King Lake scope</h3>
              <p>Positioned around baseline water quality, LVI interpretation, QA/QC screening, and the final reporting story for Flatwoods Consulting.</p>
            </div>
          </div>

          <div className="analysis-insight-list">
            {studyInsights.map(function(item) {
              return (
                <article key={item.title} className="analysis-insight-card">
                  <div className="analysis-insight-top">
                    <strong>{item.title}</strong>
                    <span>{item.badge}</span>
                  </div>
                  <div className="analysis-insight-points">
                    {item.points.map(function(point, index) {
                      return <p key={item.title + '-' + index} dangerouslySetInnerHTML={{ __html: point }}></p>;
                    })}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
