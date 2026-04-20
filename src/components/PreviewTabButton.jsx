import React from 'react';

function PreviewGraphic({ variant }) {
  if (variant === 'map') {
    return (
      <span className="tab-preview-image tab-preview-map" aria-hidden="true">
        <span className="tab-preview-map-hero"></span>
        <span className="tab-preview-map-card"></span>
        <span className="tab-preview-map-layers">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </span>
    );
  }

  if (variant === 'thesis') {
    return (
      <span className="tab-preview-image tab-preview-thesis" aria-hidden="true">
        <span className="tab-preview-title-row"></span>
        <span className="tab-preview-highlight"></span>
        <span className="tab-preview-split">
          <span></span>
          <span></span>
        </span>
        <span className="tab-preview-footer-row"></span>
      </span>
    );
  }

  if (variant === 'bars') {
    return (
      <span className="tab-preview-image tab-preview-bars" aria-hidden="true">
        <span className="tab-preview-title-row"></span>
        <span className="tab-preview-bar-stack">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </span>
    );
  }

  if (variant === 'chart') {
    return (
      <span className="tab-preview-image tab-preview-chart" aria-hidden="true">
        <span className="tab-preview-title-row"></span>
        <span className="tab-preview-chip-row">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <span className="tab-preview-graph">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </span>
    );
  }

  if (variant === 'split-chart') {
    return (
      <span className="tab-preview-image tab-preview-split-chart" aria-hidden="true">
        <span className="tab-preview-title-row"></span>
        <span className="tab-preview-dual-panels">
          <span></span>
          <span></span>
        </span>
      </span>
    );
  }

  if (variant === 'analysis') {
    return (
      <span className="tab-preview-image tab-preview-analysis" aria-hidden="true">
        <span className="tab-preview-title-row"></span>
        <span className="tab-preview-grid">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
        <span className="tab-preview-footer-row"></span>
      </span>
    );
  }

  if (variant === 'list') {
    return (
      <span className="tab-preview-image tab-preview-list" aria-hidden="true">
        <span className="tab-preview-title-row"></span>
        <span className="tab-preview-list-stack">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </span>
    );
  }

  return (
    <span className="tab-preview-image tab-preview-dashboard" aria-hidden="true">
      <span className="tab-preview-title-row"></span>
      <span className="tab-preview-chip-row">
        <span></span>
        <span></span>
        <span></span>
      </span>
      <span className="tab-preview-dual-panels">
        <span></span>
        <span></span>
      </span>
    </span>
  );
}

export default function PreviewTabButton({
  children,
  previewTitle,
  previewCopy,
  previewVariant = 'dashboard',
  className,
  ...props
}) {
  return (
    <button className={className} {...props}>
      <span className="tab-button-label">{children}</span>
      <span className="tab-preview-tooltip" role="tooltip" aria-hidden="true">
        <span className="tab-preview-frame">
          <PreviewGraphic variant={previewVariant} />
          <span className="tab-preview-content">
            <strong>{previewTitle}</strong>
            <span>{previewCopy}</span>
          </span>
        </span>
      </span>
    </button>
  );
}
