import React from 'react';
import AnalysisMapPane from './AnalysisMapPane.jsx';
import PreviewTabButton from './PreviewTabButton.jsx';

export default function CaseStudyView() {
  return (
    <div id="view-casestudy" className="view">
      <div id="app">
        <header id="header">
          <button id="back-btn" onClick={() => window.showAtlas && window.showAtlas()}>
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
              <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Atlas
          </button>
          <div id="logo">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="9" stroke="#009e7d" strokeWidth="2" />
              <path d="M4 11 Q8 6 11 11 Q14 16 18 11" stroke="#009e7d" strokeWidth="1.5" fill="none" />
              <circle cx="11" cy="11" r="2" fill="#009e7d" />
            </svg>
            <span>Lumora Explorer</span>
          </div>
          <div id="breadcrumb">
            <span style={{ color: 'var(--text-muted)' }}>Lumora Explorer</span>
            <span className="bc-sep">&rsaquo;</span>
            <span style={{ color: 'var(--accent)', fontWeight: 600 }}>King Lake Portfolio Assessment</span>
          </div>
          <div id="header-meta">
            <span className="site-tag">King Lake</span>
            <span className="site-tag">Pasco County, FL</span>
            <span className="site-tag">28.29°N 82.29°W</span>
          </div>
          <div id="header-status">
            <button id="audit-btn" onClick={() => window.openChecklist && window.openChecklist()}>
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="1" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M5 5h6M5 8h6M5 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M5 3.5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Audit Checklist
            </button>
            <span id="data-status" className="status-dot live">LIVE DATA</span>
          </div>
        </header>

        <div id="case-view-tabs">
          <PreviewTabButton
            className="case-view-tab active"
            data-case-view="map"
            previewVariant="map"
            previewTarget="#map-container"
            previewSourceWidth={560}
            previewSourceHeight={316}
            previewTitle="Map workspace"
            previewCopy="Live site layers, hero signal, and active resource overlay."
            onClick={() => window.switchCasePanelTab && window.switchCasePanelTab('map')}
          >
            Map
          </PreviewTabButton>
          <PreviewTabButton
            className="case-view-tab"
            data-case-view="analysis"
            previewVariant="analysis"
            previewTarget="#case-pane-analysis"
            previewSourceWidth={680}
            previewSourceHeight={440}
            previewTitle="Earth Engine analysis"
            previewCopy="Multi-layer raster overlays, shoreline masks, and aquatic vegetation trend monitoring."
            onClick={() => window.switchCasePanelTab && window.switchCasePanelTab('analysis')}
          >
            Analysis Map
          </PreviewTabButton>
          <PreviewTabButton
            className="case-view-tab"
            data-case-view="overview"
            previewVariant="dashboard"
            previewTarget="#case-pane-overview"
            previewSourceWidth={640}
            previewSourceHeight={380}
            previewTitle="Overview dashboard"
            previewCopy="Core scorecards, KPI blocks, and monthly resource profiles."
            onClick={() => window.switchCasePanelTab && window.switchCasePanelTab('overview')}
          >
            Overview
          </PreviewTabButton>
          <PreviewTabButton
            className="case-view-tab"
            data-case-view="thesis"
            previewVariant="thesis"
            previewTarget="#case-pane-thesis"
            previewSourceWidth={640}
            previewSourceHeight={380}
            previewTitle="Investment thesis"
            previewCopy="Recommendation, scenarios, and near-term action path."
            onClick={() => window.switchCasePanelTab && window.switchCasePanelTab('thesis')}
          >
            Investment Thesis
          </PreviewTabButton>
        </div>

        <main id="main">
          <section id="case-pane-map" className="case-view-pane active">
            <div id="map-container">
              <div id="map"></div>
              <div id="site-hero">
                <div className="hero-eyebrow">Portfolio Signal</div>
                <div className="hero-topline">
                  <div className="hero-copy">
                    <div className="hero-title" id="hero-title">King Lake Hybrid Renewable Screening</div>
                    <div className="hero-subtitle" id="hero-subtitle">Blending ESG readiness, permitting friction, and resource quality into one development workspace.</div>
                  </div>
                  <div id="hero-grade-pill">
                    <strong id="hero-grade">B+</strong>
                    <span>Signal</span>
                  </div>
                </div>
                <div id="hero-kpis">
                  <div className="hero-kpi">
                    <span className="hero-kpi-label">Annual Output</span>
                    <span className="hero-kpi-value" id="hero-energy">6.29 GWh</span>
                    <div className="hero-kpi-copy" id="hero-energy-copy">Solar-led hybrid concept</div>
                  </div>
                  <div className="hero-kpi">
                    <span className="hero-kpi-label">Avoided Carbon</span>
                    <span className="hero-kpi-value" id="hero-carbon">1.72 kt</span>
                    <div className="hero-kpi-copy" id="hero-carbon-copy">Per year at current concept size</div>
                  </div>
                  <div className="hero-kpi">
                    <span className="hero-kpi-label">Readiness</span>
                    <span className="hero-kpi-value" id="hero-readiness">67%</span>
                    <div className="hero-kpi-copy" id="hero-readiness-copy">Audit checklist progress</div>
                  </div>
                  <div className="hero-kpi">
                    <span className="hero-kpi-label">Next 90 Days</span>
                    <span className="hero-kpi-value" id="hero-focus">4 moves</span>
                    <div className="hero-kpi-copy" id="hero-focus-copy">Wetlands, community, interconnection, field studies</div>
                  </div>
                </div>
              </div>
              <div id="layer-brief">
                <div className="panel-label">Active Layer</div>
                <div id="layer-brief-title">Solar Irradiance</div>
                <p id="layer-brief-copy">High incident radiation across upland parcels supports a solar-first phase while preserving the lake buffer.</p>
              </div>
              <div id="map-legend" className="hidden">
                <div id="legend-title">Legend</div>
                <div id="legend-scale"></div>
              </div>
              <div id="coords-display">28.2906°N, 82.2918°W · Elev ~31m</div>
            </div>

            <div id="layer-bar">
              <div id="layer-bar-label">LAYERS</div>
              <div id="layer-toggles">
                <button className="layer-btn active" data-layer="solar" aria-pressed="true">
                  <span className="layer-btn-dot" style={{ background: '#f59e0b' }}></span>
                  Solar Irradiance
                </button>
                <button className="layer-btn" data-layer="wind" aria-pressed="false">
                  <span className="layer-btn-dot" style={{ background: '#818cf8' }}></span>
                  Wind Speed
                </button>
                <button className="layer-btn" data-layer="soil" aria-pressed="false">
                  <span className="layer-btn-dot" style={{ background: '#34d399' }}></span>
                  Soil Moisture
                </button>
                <button className="layer-btn" data-layer="esg" aria-pressed="false">
                  <span className="layer-btn-dot" style={{ background: '#f87171' }}></span>
                  ESG Risk Zones
                </button>
              </div>
              <div id="layer-bar-right">
                <span id="active-layer-name">Solar Irradiance</span>
              </div>
            </div>
          </section>

          <section id="case-pane-analysis" className="case-view-pane case-content-pane">
            <AnalysisMapPane />
          </section>

          <section id="case-pane-overview" className="case-view-pane case-content-pane">
            <div className="case-scroll-shell">
              <div className="case-pane-actions">
                <button className="portfolio-pane-export" onClick={() => window.exportPortfolioBrief && window.exportPortfolioBrief()}>Download PDF</button>
              </div>
              <div id="case-panel-overview" className="case-section-stack"></div>
            </div>
          </section>

          <section id="case-pane-thesis" className="case-view-pane case-content-pane">
            <div className="case-scroll-shell">
              <div className="case-pane-actions">
                <button className="portfolio-pane-export" onClick={() => window.exportPortfolioBrief && window.exportPortfolioBrief()}>Download PDF</button>
              </div>
              <div id="case-panel-thesis" className="case-section-stack"></div>
            </div>
          </section>

          <div id="case-panel-source-bank" aria-hidden="true">
            <div id="panel-section-overview">
              <div className="panel-label">Investment Thesis</div>
              <div className="signal-card">
                <div className="signal-badge" id="signal-badge">Proceed with Hybrid Phasing</div>
                <div className="signal-title" id="signal-title">Solar should lead the first deployment tranche.</div>
                <div className="signal-copy" id="signal-copy">Resource quality is strongest on solar, ESG risk is manageable, and the open checklist shows a clear path to derisking permits and stakeholder work.</div>
                <div className="signal-grid">
                  <div className="signal-stat">
                    <div className="signal-stat-label">Primary Build</div>
                    <div className="signal-stat-value" id="signal-primary">1 MW solar</div>
                  </div>
                  <div className="signal-stat">
                    <div className="signal-stat-label">Expansion Path</div>
                    <div className="signal-stat-value" id="signal-expansion">2 MW wind</div>
                  </div>
                  <div className="signal-stat">
                    <div className="signal-stat-label">Permitting Heat</div>
                    <div className="signal-stat-value" id="signal-risk">Moderate</div>
                  </div>
                  <div className="signal-stat">
                    <div className="signal-stat-label">Checklist Open</div>
                    <div className="signal-stat-value" id="signal-open">11 items</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="panel-divider"></div>

            <div id="panel-section-score">
              <div className="panel-label panel-label-help">
                <span>ESG Score</span>
                <span className="score-help">
                  <button
                    id="score-help-trigger"
                    type="button"
                    className="score-help-trigger"
                    aria-label="How this ESG score was calculated"
                    aria-describedby="score-help-copy"
                  >
                    ?
                  </button>
                  <span id="score-help-copy" role="tooltip" className="score-help-tooltip">
                    Composite score details will appear here.
                  </span>
                </span>
              </div>
              <div id="score-summary">
                <div id="score-summary-copy">
                  <div id="score-headline">Balanced ESG profile with focused permitting work still ahead.</div>
                  <div id="score-subcopy">The composite score is strong enough to move into engineering scoping, but wetlands and community process remain the value unlocks.</div>
                </div>
                <div id="score-grade-chip">B+</div>
              </div>
              <div id="gauge-container">
                <svg id="gauge-svg" viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg">
                  <path id="gauge-track" d="M 20 110 A 80 80 0 0 1 180 110" fill="none" stroke="#dde4ec" strokeWidth="16" strokeLinecap="round" />
                  <path id="gauge-value" d="M 20 110 A 80 80 0 0 1 180 110" fill="none" stroke="#00d4aa" strokeWidth="16" strokeLinecap="round"
                    strokeDasharray="251.2" strokeDashoffset="251.2" />
                  <text id="gauge-number" x="100" y="100" textAnchor="middle" fontSize="38" fontWeight="700" fill="#111827">0</text>
                  <text x="100" y="122" textAnchor="middle" fontSize="11" fill="#7a94a8" letterSpacing="2">OUT OF 100</text>
                </svg>
              </div>

              <div id="score-breakdown">
                <div className="breakdown-item">
                  <span className="breakdown-label">Environmental</span>
                  <div className="breakdown-bar-wrap">
                    <div className="breakdown-bar" id="bar-env" style={{ width: '0%' }}></div>
                  </div>
                  <span className="breakdown-val" id="val-env">—</span>
                </div>
                <div className="breakdown-item">
                  <span className="breakdown-label">Social</span>
                  <div className="breakdown-bar-wrap">
                    <div className="breakdown-bar" id="bar-soc" style={{ width: '0%' }}></div>
                  </div>
                  <span className="breakdown-val" id="val-soc">—</span>
                </div>
                <div className="breakdown-item">
                  <span className="breakdown-label">Governance</span>
                  <div className="breakdown-bar-wrap">
                    <div className="breakdown-bar" id="bar-gov" style={{ width: '0%' }}></div>
                  </div>
                  <span className="breakdown-val" id="val-gov">—</span>
                </div>
              </div>
            </div>

            <div className="panel-divider"></div>

            <div id="panel-section-renewable">
              <div className="panel-label">Resource Stack</div>
              <div id="renewable-metrics">
                <div className="metric-card" id="metric-solar">
                  <div className="metric-icon">☀️</div>
                  <div className="metric-body">
                    <div className="metric-name">Solar GHI</div>
                    <div className="metric-value" id="mv-solar">—</div>
                    <div className="metric-unit">kWh/m²/day</div>
                  </div>
                  <div className="metric-rating" id="mr-solar">—</div>
                </div>
                <div className="metric-card" id="metric-wind">
                  <div className="metric-icon">💨</div>
                  <div className="metric-body">
                    <div className="metric-name">Wind Speed</div>
                    <div className="metric-value" id="mv-wind">—</div>
                    <div className="metric-unit">m/s @ 80m</div>
                  </div>
                  <div className="metric-rating" id="mr-wind">—</div>
                </div>
                <div className="metric-card" id="metric-soil">
                  <div className="metric-icon">🌱</div>
                  <div className="metric-body">
                    <div className="metric-name">Soil Moisture</div>
                    <div className="metric-value" id="mv-soil">—</div>
                    <div className="metric-unit">m³/m³</div>
                  </div>
                  <div className="metric-rating" id="mr-soil">—</div>
                </div>
              </div>
            </div>

            <div className="panel-divider"></div>

            <div id="panel-section-official">
              <div className="panel-label">Official Monthly Profiles</div>
              <p id="official-profile-note">Official site-centroid monthly climatology rendered from NASA POWER data. Use these charts for seasonal trend checks alongside the project-area map layers.</p>
              <div id="official-profile-kpis"></div>
              <div id="official-profiles"></div>
            </div>

            <div className="panel-divider"></div>

            <div id="panel-section-scenarios">
              <div className="panel-label">Deployment Scenarios</div>
              <div id="scenario-cards"></div>
            </div>

            <div className="panel-divider"></div>

            <div id="panel-section-actions">
              <div className="panel-label">Action Center</div>
              <div id="action-cards"></div>
            </div>

            <div className="panel-divider"></div>

            <div id="panel-section-insights">
              <div className="panel-label">Decision Intelligence</div>
              <div id="insights-list">
                <div className="insight-card" id="insight-0">
                  <div className="insight-dot"></div>
                  <p className="insight-text">Analyzing site conditions…</p>
                </div>
                <div className="insight-card" id="insight-1">
                  <div className="insight-dot"></div>
                  <p className="insight-text">Loading environmental data…</p>
                </div>
                <div className="insight-card" id="insight-2">
                  <div className="insight-dot"></div>
                  <p className="insight-text">Computing feasibility scores…</p>
                </div>
              </div>
            </div>

            <div className="panel-divider"></div>

            <div id="data-sources">
              <div className="panel-label">DATA SOURCES</div>
              <div className="source-tags">
                <span className="source-tag">NASA POWER Climatology</span>
                <span className="source-tag">NREL NSRDB</span>
                <span className="source-tag">NREL Wind Toolkit</span>
                <span className="source-tag">NASA SMAP L3</span>
                <span className="source-tag">USGS NHD</span>
                <span className="source-tag">EPA EnviroAtlas</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
