import React, { useRef, useState } from 'react';

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

function stripPreviewCloneIds(root) {
  if (!root || root.nodeType !== 1) return;
  root.removeAttribute('id');
  root.removeAttribute('aria-labelledby');
  root.removeAttribute('aria-describedby');
  root.querySelectorAll('[id]').forEach(function(el) { el.removeAttribute('id'); });
  root.querySelectorAll('.tab-preview-tooltip').forEach(function(el) { el.remove(); });
}

function mountLivePreview(source, mount, sourceWidth, sourceHeight, viewportWidth, viewportHeight) {
  if (!source || !mount) return false;

  mount.innerHTML = '';

  var clone = source.cloneNode(true);
  stripPreviewCloneIds(clone);
  clone.classList.add('tab-preview-live-clone');
  clone.style.display = 'block';
  clone.style.visibility = 'visible';
  clone.style.opacity = '1';
  clone.style.pointerEvents = 'none';
  clone.style.position = 'relative';
  clone.style.left = 'auto';
  clone.style.top = 'auto';
  clone.style.right = 'auto';
  clone.style.bottom = 'auto';
  clone.style.maxWidth = 'none';
  clone.style.maxHeight = 'none';
  clone.style.minWidth = '0';
  clone.style.minHeight = '0';
  clone.style.margin = '0';
  clone.style.transformOrigin = 'top left';

  if (sourceWidth) {
    clone.style.width = sourceWidth + 'px';
  }
  if (sourceHeight) {
    clone.style.height = sourceHeight + 'px';
    clone.style.overflow = 'hidden';
  }

  mount.appendChild(clone);

  var measuredWidth = Math.max(
    sourceWidth || 0,
    Math.ceil(clone.scrollWidth || 0),
    Math.ceil(clone.getBoundingClientRect().width || 0),
    viewportWidth
  );
  var measuredHeight = Math.max(
    sourceHeight || 0,
    Math.ceil(clone.scrollHeight || 0),
    Math.ceil(clone.getBoundingClientRect().height || 0),
    viewportHeight
  );

  if (!measuredWidth || !measuredHeight) {
    mount.innerHTML = '';
    return false;
  }

  clone.style.width = measuredWidth + 'px';
  clone.style.height = measuredHeight + 'px';

  var scale = viewportWidth / measuredWidth;
  mount.style.width = viewportWidth + 'px';
  mount.style.height = viewportHeight + 'px';
  clone.style.transform = 'scale(' + scale + ')';
  return true;
}

export default function PreviewTabButton({
  children,
  previewTitle,
  previewCopy,
  previewVariant = 'dashboard',
  previewTarget,
  previewSourceWidth = 520,
  previewSourceHeight = 300,
  previewViewportWidth = 208,
  previewViewportHeight = 126,
  className,
  onMouseEnter,
  onFocus,
  ...props
}) {
  var livePreviewRef = useRef(null);
  var [hasLivePreview, setHasLivePreview] = useState(false);

  function refreshPreview() {
    if (!previewTarget || typeof document === 'undefined') {
      if (livePreviewRef.current) livePreviewRef.current.innerHTML = '';
      setHasLivePreview(false);
      return;
    }

    var source = document.querySelector(previewTarget);
    var mounted = mountLivePreview(
      source,
      livePreviewRef.current,
      previewSourceWidth,
      previewSourceHeight,
      previewViewportWidth,
      previewViewportHeight
    );
    if (!mounted && livePreviewRef.current) livePreviewRef.current.innerHTML = '';
    setHasLivePreview(mounted);
  }

  function handleMouseEnter(event) {
    refreshPreview();
    if (onMouseEnter) onMouseEnter(event);
  }

  function handleFocus(event) {
    refreshPreview();
    if (onFocus) onFocus(event);
  }

  return (
    <button className={className} onMouseEnter={handleMouseEnter} onFocus={handleFocus} {...props}>
      <span className="tab-button-label">{children}</span>
      <span className="tab-preview-tooltip" role="tooltip" aria-hidden="true">
        <span className="tab-preview-frame">
          <span className="tab-preview-media">
            <span
              ref={livePreviewRef}
              className={'tab-preview-live' + (hasLivePreview ? ' is-live' : '')}
              aria-hidden="true"
            ></span>
            {!hasLivePreview ? <PreviewGraphic variant={previewVariant} /> : null}
          </span>
          <span className="tab-preview-content">
            <strong>{previewTitle}</strong>
            <span>{previewCopy}</span>
          </span>
        </span>
      </span>
    </button>
  );
}
