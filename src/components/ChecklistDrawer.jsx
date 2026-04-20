import React from 'react';
import PreviewTabButton from './PreviewTabButton.jsx';

export default function ChecklistDrawer() {
  return (
    <>
      <div id="checklist-overlay" onClick={() => window.closeChecklist && window.closeChecklist()}></div>
      <div id="checklist-drawer">
        <div id="cl-header">
          <div id="cl-title-row">
            <span id="cl-title">ESG Audit Readiness</span>
            <button id="cl-close" onClick={() => window.closeChecklist && window.closeChecklist()} title="Close">✕</button>
          </div>
          <div id="cl-readiness">
            <div id="cl-score-num">0%</div>
            <div id="cl-score-right">
              <div id="cl-score-label">Overall Audit Readiness — King Lake</div>
              <div id="cl-score-sub">GRI 305 · SASB RN-RE · TCFD · UN SDG 7/13/15</div>
              <div id="cl-readiness-bar-wrap"><div id="cl-readiness-bar"></div></div>
            </div>
          </div>
          <div id="cl-section-summary">
            <div className="cl-summary-pill compliant">
              <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="#00d4aa" /></svg>
              <span id="pill-compliant">0 Compliant</span>
            </div>
            <div className="cl-summary-pill in-progress">
              <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="#fbbf24" /></svg>
              <span id="pill-inprogress">0 In Progress</span>
            </div>
            <div className="cl-summary-pill not-started">
              <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="#f87171" /></svg>
              <span id="pill-notstarted">0 Not Started</span>
            </div>
          </div>
          <div id="cl-tabs">
            <PreviewTabButton
              className="cl-tab active"
              data-tab="env"
              previewVariant="list"
              previewTitle="Environmental checklist"
              previewCopy="Resource, wetlands, habitat, and compliance readiness items."
              onClick={() => window.switchTab && window.switchTab('env')}
            >
              Environmental
            </PreviewTabButton>
            <PreviewTabButton
              className="cl-tab"
              data-tab="soc"
              previewVariant="list"
              previewTitle="Social checklist"
              previewCopy="Community impact, jobs, safety, and engagement workstream."
              onClick={() => window.switchTab && window.switchTab('soc')}
            >
              Social
            </PreviewTabButton>
            <PreviewTabButton
              className="cl-tab"
              data-tab="gov"
              previewVariant="list"
              previewTitle="Governance checklist"
              previewCopy="Permits, interconnection, title, insurance, and controls."
              onClick={() => window.switchTab && window.switchTab('gov')}
            >
              Governance
            </PreviewTabButton>
            <PreviewTabButton
              className="cl-tab"
              data-tab="doc"
              previewVariant="analysis"
              previewTitle="Documentation checklist"
              previewCopy="Disclosure, studies, audit prep, and reporting deliverables."
              onClick={() => window.switchTab && window.switchTab('doc')}
            >
              Documentation
            </PreviewTabButton>
          </div>
        </div>
        <div id="cl-body"></div>
        <div id="cl-footer">
          <button id="cl-export-btn" onClick={() => window.exportChecklist && window.exportChecklist()}>
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v8M5 7l3 3 3-3M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Export PDF
          </button>
          <span id="cl-item-count"></span>
        </div>
      </div>
    </>
  );
}
