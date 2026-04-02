import L from 'leaflet';
import { KING_LAKE_CENTER, KING_LAKE_BOUNDS, boundaryGeoJSON } from './data/boundary.js';

// Fix Leaflet default icon path (Vite asset handling)
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl:       markerIcon,
  shadowUrl:     markerShadow,
});

const BOUNDS = L.latLngBounds(
  [KING_LAKE_BOUNDS.south, KING_LAKE_BOUNDS.west],
  [KING_LAKE_BOUNDS.north, KING_LAKE_BOUNDS.east]
);

// Padding so map doesn't snap tight to boundary
const MAX_BOUNDS_PADDING = 0.012;
const MAX_BOUNDS = L.latLngBounds(
  [KING_LAKE_BOUNDS.south - MAX_BOUNDS_PADDING, KING_LAKE_BOUNDS.west - MAX_BOUNDS_PADDING],
  [KING_LAKE_BOUNDS.north + MAX_BOUNDS_PADDING, KING_LAKE_BOUNDS.east + MAX_BOUNDS_PADDING]
);

export function initMap() {
  const map = L.map('map', {
    center:         KING_LAKE_CENTER,
    zoom:           13,
    minZoom:        11,
    maxZoom:        16,
    maxBounds:      MAX_BOUNDS,
    maxBoundsViscosity: 1.0,
    zoomControl:    true,
    attributionControl: true,
  });

  // Dark basemap — CartoDB Dark Matter (no API key needed)
  L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
      subdomains:  'abcd',
      maxZoom:     20,
    }
  ).addTo(map);

  // Restrict initial fit to King Lake area
  map.fitBounds(BOUNDS, { padding: [20, 20] });

  // Draw project boundary
  _addBoundary(map);

  // Prevent pan outside bounds
  map.on('drag', () => map.panInsideBounds(MAX_BOUNDS, { animate: false }));

  return map;
}

function _addBoundary(map) {
  const projectFeature = boundaryGeoJSON.features[0];
  const lakeFeature    = boundaryGeoJSON.features[1];

  // Outer project boundary — dashed outline
  L.geoJSON(projectFeature, {
    style: {
      color:       '#00d4aa',
      weight:       2,
      opacity:      0.7,
      fillColor:   '#00d4aa',
      fillOpacity:  0.03,
      dashArray:   '6 4',
      className:   'king-lake-boundary',
    },
  })
    .bindTooltip('King Lake Project Area · Cullman County, AL', {
      permanent: false,
      direction: 'top',
      className: 'boundary-tooltip',
    })
    .addTo(map);

  // Lake water body — blue fill
  L.geoJSON(lakeFeature, {
    style: {
      color:       '#3b82f6',
      weight:       1.5,
      opacity:      0.8,
      fillColor:   '#1d4ed8',
      fillOpacity:  0.45,
    },
  })
    .bindTooltip(
      '<strong>King Lake</strong><br/>312 acres · Cullman Co., AL<br/>Mulberry Fork watershed · HUC8 03140301',
      { direction: 'top' }
    )
    .addTo(map);

  // Site marker
  L.circleMarker(KING_LAKE_CENTER, {
    radius:      6,
    fillColor:  '#00d4aa',
    fillOpacity: 0.9,
    color:      '#ffffff',
    weight:      2,
  })
    .bindTooltip(
      '<strong>King Lake Site</strong><br/>34.1547°N, 86.8503°W<br/>Elev. ~247m AMSL',
      { direction: 'top', permanent: false }
    )
    .addTo(map);
}
