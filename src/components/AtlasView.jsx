import React from 'react';

// View 1 — Lumora Explorer (USA / Global Solar Atlas)
// Preserves original DOM IDs/classes so the embedded JS (see src/app-logic.js)
// can keep driving the Leaflet map, search bar, and right-panel updates.
export default function AtlasView() {
  return (
    <div id="view-atlas" className="view active">
      <div id="atlas-app">
        {/* Atlas Header */}
        <header id="atlas-header">
          <div id="logo">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="9" stroke="#009e7d" strokeWidth="2" />
              <path d="M4 11 Q8 6 11 11 Q14 16 18 11" stroke="#009e7d" strokeWidth="1.5" fill="none" />
              <circle cx="11" cy="11" r="2" fill="#009e7d" />
            </svg>
            <span>Lumora Explorer</span>
          </div>
          <div id="header-meta" style={{ marginLeft: 8 }}>
            <span className="site-tag">NREL Solar Resource Data</span>
            <span className="site-tag">Contiguous United States</span>
            <span className="site-tag">8 Resource Regions</span>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
            <button id="case-study-btn" onClick={() => window.showCaseStudy && window.showCaseStudy()}>
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="8" cy="8" r="2" fill="currentColor" />
                <path d="M8 2v1M8 13v1M2 8h1M13 8h1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              King Lake Portfolio Assessment
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="status-dot live">LIVE DATA</span>
          </div>
        </header>

        {/* Atlas Main */}
        <div id="atlas-main">
          {/* US Map */}
          <div id="us-map-container">
            <div id="us-map"></div>
            {/* Search bar overlay */}
            <div id="atlas-search-wrap">
              <div id="atlas-search-box">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, color: 'var(--text-muted)' }}>
                  <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <input id="atlas-search-input" type="text" placeholder="Search city, address, or coordinates…" autoComplete="off" spellCheck="false" />
                <button id="atlas-search-clear" style={{ display: 'none' }} title="Clear search">&#x2715;</button>
              </div>
              <div id="atlas-search-results"></div>
            </div>
            {/* Floating CTA */}
            <button id="atlas-cta-btn" onClick={() => window.showCaseStudy && window.showCaseStudy()}>
              View King Lake Portfolio Assessment &rarr;
            </button>
            {/* Floating legend */}
            <div id="atlas-legend-overlay">
              <div className="legend-title">Solar GHI + Wind Resource</div>
              <div id="atlas-legend-items"></div>
              <div style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 8, fontStyle: 'italic' }}>
                Source: NREL NSRDB
              </div>
            </div>
            {/* Region info panel */}
            <div id="atlas-info-panel"></div>
          </div>

          {/* Atlas Right Panel */}
          <aside id="atlas-panel">
            {/* Selected Location — shown on map click */}
            <div id="atlas-location-section">
              <div className="ap-section">
                <div className="panel-label">SELECTED LOCATION</div>
                <div id="aloc-name">
                  <span className="aloc-loading"><span className="aip-spinner"></span>Locating…</span>
                </div>
                <div id="aloc-coords"></div>
                <div id="aloc-key-metrics"></div>
                <div id="aloc-meta"></div>
                <div id="aloc-ai-insights"></div>
              </div>
              <div className="panel-divider"></div>
            </div>

            {/* Global Renewable Resources — tabbed solar / wind by region */}
            <div className="ap-section">
              <div className="panel-label">GLOBAL RENEWABLE RESOURCES</div>
              <div id="resource-filters" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
                <select id="continent-filter" style={{ padding: '6px 8px', border: '1px solid var(--border)', borderRadius: 8, background: 'var(--bg-card)', fontSize: 11 }}></select>
                <select id="country-filter" style={{ padding: '6px 8px', border: '1px solid var(--border)', borderRadius: 8, background: 'var(--bg-card)', fontSize: 11 }}></select>
              </div>
              {/* Tab bar */}
              <div className="ap-res-tabs">
                <button className="ap-res-tab active" id="tab-solar" onClick={() => window.switchResTab && window.switchResTab('solar')}>☀️ Solar GHI</button>
                <button className="ap-res-tab" id="tab-wind" onClick={() => window.switchResTab && window.switchResTab('wind')}>💨 Wind @ 80m</button>
              </div>

              {/* Solar panel */}
              <div id="ap-res-solar">
                <div className="ap-res-header-row">
                  <span className="ap-res-col-state">State</span>
                  <span className="ap-res-col-bar"></span>
                  <span className="ap-res-col-val">GHI</span>
                  <span className="ap-res-col-cap">Installed</span>
                </div>
                <div className="ap-res-row">
                  <span className="ap-res-state">AZ</span>
                  <div className="ap-res-bar-wrap"><div className="ap-res-bar-solar" style={{ width: '100%' }}></div></div>
                  <span className="ap-res-val">6.10</span>
                  <span className="ap-res-cap">16.4 GW</span>
                </div>
                <div className="ap-res-row">
                  <span className="ap-res-state">NV</span>
                  <div className="ap-res-bar-wrap"><div className="ap-res-bar-solar" style={{ width: '96.6%' }}></div></div>
                  <span className="ap-res-val">5.89</span>
                  <span className="ap-res-cap">12.7 GW</span>
                </div>
                <div className="ap-res-row">
                  <span className="ap-res-state">NM</span>
                  <div className="ap-res-bar-wrap"><div className="ap-res-bar-solar" style={{ width: '94.8%' }}></div></div>
                  <span className="ap-res-val">5.78</span>
                  <span className="ap-res-cap">4.2 GW</span>
                </div>
                <div className="ap-res-row">
                  <span className="ap-res-state">CA</span>
                  <div className="ap-res-bar-wrap"><div className="ap-res-bar-solar" style={{ width: '91.0%' }}></div></div>
                  <span className="ap-res-val">5.55</span>
                  <span className="ap-res-cap">50.8 GW</span>
                </div>
                <div className="ap-res-row">
                  <span className="ap-res-state">TX</span>
                  <div className="ap-res-bar-wrap"><div className="ap-res-bar-solar" style={{ width: '86.9%' }}></div></div>
                  <span className="ap-res-val">5.30</span>
                  <span className="ap-res-cap">52.0 GW</span>
                </div>
                <div className="ap-res-cite">
                  GHI: NREL NSRDB PSM v3.2 (2022 vintage, state-wide annual avg)
                  <br />
                  Installed capacity: EIA Electric Power Monthly, Feb 2025
                </div>
              </div>

              {/* Wind panel */}
              <div id="ap-res-wind" style={{ display: 'none' }}>
                <div className="ap-res-header-row">
                  <span className="ap-res-col-state">State</span>
                  <span className="ap-res-col-bar"></span>
                  <span className="ap-res-col-val">m/s</span>
                  <span className="ap-res-col-cap">Installed</span>
                </div>
                <div className="ap-res-row">
                  <span className="ap-res-state">ND</span>
                  <div className="ap-res-bar-wrap"><div className="ap-res-bar-wind" style={{ width: '100%' }}></div></div>
                  <span className="ap-res-val">8.40</span>
                  <span className="ap-res-cap">5.4 GW</span>
                </div>
                <div className="ap-res-row">
                  <span className="ap-res-state">WY</span>
                  <div className="ap-res-bar-wrap"><div className="ap-res-bar-wind" style={{ width: '92.9%' }}></div></div>
                  <span className="ap-res-val">7.80</span>
                  <span className="ap-res-cap">3.9 GW</span>
                </div>
                <div className="ap-res-row">
                  <span className="ap-res-state">KS</span>
                  <div className="ap-res-bar-wrap"><div className="ap-res-bar-wind" style={{ width: '90.5%' }}></div></div>
                  <span className="ap-res-val">7.60</span>
                  <span className="ap-res-cap">9.8 GW</span>
                </div>
                <div className="ap-res-row">
                  <span className="ap-res-state">SD</span>
                  <div className="ap-res-bar-wrap"><div className="ap-res-bar-wind" style={{ width: '89.3%' }}></div></div>
                  <span className="ap-res-val">7.50</span>
                  <span className="ap-res-cap">4.0 GW</span>
                </div>
                <div className="ap-res-row">
                  <span className="ap-res-state">TX</span>
                  <div className="ap-res-bar-wrap"><div className="ap-res-bar-wind" style={{ width: '84.5%' }}></div></div>
                  <span className="ap-res-val">7.10</span>
                  <span className="ap-res-cap">43.0 GW</span>
                </div>
                <div className="ap-res-cite">
                  Wind speed: NREL Wind Toolkit (WTK), 80m hub height, 2014–2022 avg
                  <br />
                  Installed capacity: EIA Electric Power Monthly, Feb 2025
                </div>
              </div>
            </div>

            <div className="panel-divider"></div>

            <div className="ap-section">
              <div className="panel-label">PORTFOLIO ASSESSMENTS</div>
              <div className="ap-case-list">
                <div className="ap-case-item" onClick={() => window.showCaseStudy && window.showCaseStudy()}>
                  <div className="ap-case-dot"></div>
                  <div className="ap-case-body">
                    <div className="ap-case-name">King Lake, Florida</div>
                    <div className="ap-case-meta">ESG Score: 79/100 &middot; GHI: 5.35 kWh/m&sup2;/day</div>
                  </div>
                  <div className="ap-case-arrow">&rarr;</div>
                </div>
              </div>
            </div>

            <div className="panel-divider"></div>

            <div className="ap-section">
              <div className="panel-label">DATA SOURCES</div>
              <div className="source-tags">
                <span className="source-tag">NREL NSRDB</span>
                <span className="source-tag">NASA POWER</span>
                <span className="source-tag">Open-Meteo</span>
                <span className="source-tag">Global Wind Atlas</span>
                <span className="source-tag">USGS</span>
                <span className="source-tag">EPA</span>
              </div>
            </div>
          </aside>
        </div>

        {/* Atlas Bottom Bar */}
        <div id="atlas-bar">
          <span id="layer-bar-label">SOLAR &amp; WIND RESOURCE</span>
          <button id="atlas-wind-toggle" onClick={() => window.toggleAtlasWind && window.toggleAtlasWind()}>
            &#128168; Show Wind Layer
          </button>
          <span style={{ fontSize: 11, color: 'var(--text-secondary)', marginLeft: 4 }}>
            Click anywhere on map for live solar &amp; wind data &middot; Click King Lake marker to open portfolio assessment
          </span>
          <div style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text-muted)' }}>
            NASA POWER &middot; Open-Meteo ERA5 &middot; NREL NSRDB
          </div>
        </div>
      </div>

      {/* Location popup */}
      <div id="location-popup-overlay" onClick={() => window.closeLocationPopup && window.closeLocationPopup()}></div>
      <div id="location-popup" role="dialog" aria-modal="true" aria-label="Location analysis popup">
        <div className="lp-header">
          <div className="lp-main">
            <div className="lp-title" id="lp-title">Location analysis</div>
            <div className="lp-sub" id="lp-sub">Select a point on the map to load details.</div>
          </div>
          <button className="lp-close" onClick={() => window.closeLocationPopup && window.closeLocationPopup()}>✕</button>
        </div>
        <div className="lp-body">
          <div className="lp-left">
            <div className="lp-left-label">Selected Point</div>
            <div id="lp-coords" style={{ fontFamily: 'monospace', fontSize: 12, marginTop: 6 }}>—</div>
            <div id="lp-mini-map" aria-label="Selected location map snapshot"></div>
          </div>
          <div className="lp-right">
            <div className="lp-tabs">
              <button className="lp-tab active" data-lp-tab="solar" onClick={() => window.switchLocationPopupTab && window.switchLocationPopupTab('solar')}>Solar Profile</button>
              <button className="lp-tab" data-lp-tab="wind" onClick={() => window.switchLocationPopupTab && window.switchLocationPopupTab('wind')}>Wind Profile</button>
              <button className="lp-tab" data-lp-tab="profiles" onClick={() => window.switchLocationPopupTab && window.switchLocationPopupTab('profiles')}>Wind & Solar Profiles</button>
              <button className="lp-tab" data-lp-tab="analysis" onClick={() => window.switchLocationPopupTab && window.switchLocationPopupTab('analysis')}>Location Analysis</button>
            </div>
            <div id="lp-solar" className="lp-panel active"></div>
            <div id="lp-wind" className="lp-panel"></div>
            <div id="lp-profiles" className="lp-panel"></div>
            <div id="lp-analysis" className="lp-panel"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
