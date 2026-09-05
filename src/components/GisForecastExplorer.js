/**
 * PRAVAHA - Section 4: Interactive Delhi-NCR GIS & 72h Forecast Station Explorer
 * Leaflet map, synchronized 72-hour timeline scrubber, and Chart.js uncertainty curves.
 */

import { stationsData, ncrSummary } from '../data/stations.js';
import { forecast72h } from '../data/forecast72h.js';
import L from 'leaflet';
import Chart from 'chart.js/auto';

let mapInstance = null;
let chartInstance = null;
let currentHorizonHour = 1;
let selectedPollutant = 'pm25';
let selectedStationId = 'DEL-AV-01';
let stationMarkers = {};

export function renderGisForecastExplorer() {
  const currentF = forecast72h[currentHorizonHour - 1] || forecast72h[0];
  const selectedStation = stationsData.find(s => s.id === selectedStationId) || stationsData[0];

  return `
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <!-- Horizon Scrubber & Regional Alert Banner -->
      <div class="glass-panel" style="padding: 24px; border-color: rgba(6, 182, 212, 0.3);">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; margin-bottom: 20px;">
          <div>
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
              <span class="badge badge-cyan">SYNCHRONIZED 72-HOUR TIMELINE</span>
              <span class="badge ${currentF.aqi > 400 ? 'badge-rose' : 'badge-amber'}">${currentF.grapStage}</span>
            </div>
            <h2 style="font-size: 1.6rem;">
              Horizon: <span class="gradient-text-cyan font-mono">+${currentHorizonHour} Hours</span> 
              <span style="font-size: 1.1rem; color: var(--text-secondary); font-weight: 500;">(${currentF.timeStr})</span>
            </h2>
          </div>

          <!-- Diurnal & Atmospheric Trapping Diagnostics at Selected Horizon -->
          <div style="display: flex; gap: 14px; flex-wrap: wrap;">
            <div style="background: rgba(0,0,0,0.3); padding: 8px 14px; border-radius: 8px; border: 1px solid var(--border-subtle);">
              <div style="font-size: 0.72rem; color: var(--text-muted);">PBL HEIGHT</div>
              <div class="font-mono" style="font-size: 1.1rem; font-weight: 700; color: #38bdf8;">${currentF.pblHeight} m</div>
            </div>
            <div style="background: rgba(0,0,0,0.3); padding: 8px 14px; border-radius: 8px; border: 1px solid var(--border-subtle);">
              <div style="font-size: 0.72rem; color: var(--text-muted);">INVERSION LID</div>
              <div class="font-mono" style="font-size: 1.1rem; font-weight: 700; color: ${currentF.inversionStrength > 3 ? '#fb7185' : '#fbbf24'};">${currentF.inversionStrength}°C</div>
            </div>
            <div style="background: rgba(0,0,0,0.3); padding: 8px 14px; border-radius: 8px; border: 1px solid var(--border-subtle);">
              <div style="font-size: 0.72rem; color: var(--text-muted);">SURFACE WIND</div>
              <div class="font-mono" style="font-size: 1.1rem; font-weight: 700; color: #34d399;">${currentF.windSpeed} m/s (${currentF.windDir})</div>
            </div>
            <div style="background: rgba(0,0,0,0.3); padding: 8px 14px; border-radius: 8px; border: 1px solid var(--border-subtle);">
              <div style="font-size: 0.72rem; color: var(--text-muted);">REGIONAL AQI</div>
              <div class="font-mono" style="font-size: 1.1rem; font-weight: 700; color: ${currentF.aqi > 400 ? '#ef4444' : '#f59e0b'};">${currentF.aqi}</div>
            </div>
          </div>
        </div>

        <!-- Slider Bar -->
        <div style="margin-bottom: 8px;">
          <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono); margin-bottom: 8px;">
            <span>H+1 (Now)</span>
            <span>H+12</span>
            <span>H+24 (Day 1 Peak)</span>
            <span>H+36</span>
            <span>H+48 (Day 2 Stubble Inflow)</span>
            <span>H+60</span>
            <span>H+72 (Forecast Horizon)</span>
          </div>
          <input type="range" id="horizon-slider" min="1" max="72" value="${currentHorizonHour}" step="1" style="width: 100%; cursor: pointer;">
        </div>
      </div>

      <!-- Main GIS & Inspector Workspace Grid -->
      <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 24px;" class="stack-mobile">
        <!-- Left: Leaflet Map Container -->
        <div class="glass-panel" style="padding: 20px; display: flex; flex-direction: column;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span class="badge badge-cyan">GIS MAP</span>
              <span style="font-weight: 600; font-size: 0.95rem;">Delhi-NCR Continuous CAAQMS Network (42 Stations)</span>
            </div>

            <!-- Pollutant Toggle Pills -->
            <div style="display: flex; gap: 6px; background: rgba(0,0,0,0.3); padding: 4px; border-radius: 8px; border: 1px solid var(--border-subtle);">
              <button class="btn-pollutant ${selectedPollutant === 'pm25' ? 'active-pollutant' : ''}" data-pollutant="pm25" style="padding: 4px 10px; font-size: 0.75rem; border-radius: 6px; border: none; cursor: pointer;">PM2.5</button>
              <button class="btn-pollutant ${selectedPollutant === 'pm10' ? 'active-pollutant' : ''}" data-pollutant="pm10" style="padding: 4px 10px; font-size: 0.75rem; border-radius: 6px; border: none; cursor: pointer;">PM10</button>
              <button class="btn-pollutant ${selectedPollutant === 'no2' ? 'active-pollutant' : ''}" data-pollutant="no2" style="padding: 4px 10px; font-size: 0.75rem; border-radius: 6px; border: none; cursor: pointer;">NO2</button>
              <button class="btn-pollutant ${selectedPollutant === 'o3' ? 'active-pollutant' : ''}" data-pollutant="o3" style="padding: 4px 10px; font-size: 0.75rem; border-radius: 6px; border: none; cursor: pointer;">O3</button>
              <button class="btn-pollutant ${selectedPollutant === 'aqi' ? 'active-pollutant' : ''}" data-pollutant="aqi" style="padding: 4px 10px; font-size: 0.75rem; border-radius: 6px; border: none; cursor: pointer;">AQI</button>
            </div>
          </div>

          <!-- Map Element -->
          <div id="gis-map" style="height: 480px; width: 100%; border-radius: 12px; border: 1px solid var(--border-subtle);"></div>

          <!-- Map Legend -->
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-top: 14px; font-size: 0.75rem; color: var(--text-secondary);">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="width: 10px; height: 10px; border-radius: 50%; background: var(--aqi-good);"></span> Good (0-50)
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="width: 10px; height: 10px; border-radius: 50%; background: var(--aqi-satisfactory);"></span> Satisfactory (51-100)
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="width: 10px; height: 10px; border-radius: 50%; background: var(--aqi-moderate);"></span> Moderate (101-200)
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="width: 10px; height: 10px; border-radius: 50%; background: var(--aqi-poor);"></span> Poor (201-300)
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="width: 10px; height: 10px; border-radius: 50%; background: var(--aqi-very-poor);"></span> Very Poor (301-400)
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="width: 10px; height: 10px; border-radius: 50%; background: var(--aqi-severe);"></span> Severe (401+)
            </div>
          </div>
        </div>

        <!-- Right: Station Deep-Dive Inspector -->
        <div class="glass-panel" style="padding: 24px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 16px;">
              <div>
                <span class="badge badge-emerald" style="margin-bottom: 6px;">CAAQMS INSPECTOR</span>
                <h3 style="font-size: 1.35rem;" id="inspector-name">${selectedStation.name}</h3>
                <div style="font-size: 0.8rem; color: var(--text-muted);" id="inspector-operator">
                  ${selectedStation.city}, ${selectedStation.state} • Operated by ${selectedStation.operator}
                </div>
              </div>
              <div class="font-mono" style="background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.4); padding: 6px 12px; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.65rem; color: #f87171; text-transform: uppercase;">PREDICTED AQI</div>
                <div style="font-size: 1.4rem; font-weight: 800; color: #ef4444;" id="inspector-aqi">${selectedStation.currentAQI}</div>
              </div>
            </div>

            <div style="background: rgba(0,0,0,0.3); padding: 12px 16px; border-radius: 10px; margin-bottom: 20px; border: 1px solid var(--border-subtle);">
              <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 4px;">Station Characteristics</div>
              <div style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;" id="inspector-type">
                ${selectedStation.stationType}
              </div>
            </div>

            <!-- Pollutant Sub-Index Breakdown Grid -->
            <div style="font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600; margin-bottom: 8px;">
              Criteria Pollutants (H+${currentHorizonHour})
            </div>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 20px;">
              <div style="background: rgba(255,255,255,0.02); padding: 10px 12px; border-radius: 8px; border: 1px solid var(--border-subtle);">
                <div style="font-size: 0.72rem; color: var(--text-muted);">PM2.5 (Fine Particulate)</div>
                <div class="font-mono" style="font-size: 1.15rem; font-weight: 700; color: #f87171;" id="inspector-pm25">${selectedStation.pollutants.pm25} µg/m³</div>
              </div>
              <div style="background: rgba(255,255,255,0.02); padding: 10px 12px; border-radius: 8px; border: 1px solid var(--border-subtle);">
                <div style="font-size: 0.72rem; color: var(--text-muted);">PM10 (Coarse Particulate)</div>
                <div class="font-mono" style="font-size: 1.15rem; font-weight: 700; color: #fbbf24;" id="inspector-pm10">${selectedStation.pollutants.pm10} µg/m³</div>
              </div>
              <div style="background: rgba(255,255,255,0.02); padding: 10px 12px; border-radius: 8px; border: 1px solid var(--border-subtle);">
                <div style="font-size: 0.72rem; color: var(--text-muted);">NO2 (Nitrogen Dioxide)</div>
                <div class="font-mono" style="font-size: 1.15rem; font-weight: 700; color: #38bdf8;" id="inspector-no2">${selectedStation.pollutants.no2} µg/m³</div>
              </div>
              <div style="background: rgba(255,255,255,0.02); padding: 10px 12px; border-radius: 8px; border: 1px solid var(--border-subtle);">
                <div style="font-size: 0.72rem; color: var(--text-muted);">O3 (Photochemical Ozone)</div>
                <div class="font-mono" style="font-size: 1.15rem; font-weight: 700; color: #34d399;" id="inspector-o3">${selectedStation.pollutants.o3} µg/m³</div>
              </div>
            </div>

            <!-- Micro-Meteorology & Inversion Trap Metrics -->
            <div style="font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600; margin-bottom: 8px;">
              Coupled Local Meteorology
            </div>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 20px;">
              <div style="background: rgba(255,255,255,0.02); padding: 8px 10px; border-radius: 6px; text-align: center; border: 1px solid var(--border-subtle);">
                <div style="font-size: 0.7rem; color: var(--text-muted);">TEMP</div>
                <div class="font-mono" style="font-size: 0.95rem; font-weight: 600;" id="inspector-temp">${selectedStation.meteorology.temp}°C</div>
              </div>
              <div style="background: rgba(255,255,255,0.02); padding: 8px 10px; border-radius: 6px; text-align: center; border: 1px solid var(--border-subtle);">
                <div style="font-size: 0.7rem; color: var(--text-muted);">REL HUM</div>
                <div class="font-mono" style="font-size: 0.95rem; font-weight: 600;" id="inspector-rh">${selectedStation.meteorology.rh}%</div>
              </div>
              <div style="background: rgba(255,255,255,0.02); padding: 8px 10px; border-radius: 6px; text-align: center; border: 1px solid var(--border-subtle);">
                <div style="font-size: 0.7rem; color: var(--text-muted);">VENTILATION</div>
                <div class="font-mono" style="font-size: 0.95rem; font-weight: 600; color: #fb7185;" id="inspector-vi">
                  ${Math.round(selectedStation.meteorology.pblHeight * selectedStation.meteorology.windSpeed)} m²/s
                </div>
              </div>
            </div>
          </div>

          <!-- Station Telemetry & Freshness Tag -->
          <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted); padding-top: 12px; border-top: 1px solid var(--border-subtle);">
            <span>Station ID: <strong class="font-mono" style="color: #fff;" id="inspector-id">${selectedStation.id}</strong></span>
            <span>Reliability: <strong style="color: #34d399;" id="inspector-rel">${selectedStation.reliability}</strong></span>
            <span id="inspector-freshness">Updated ${selectedStation.lastUpdated}</span>
          </div>
        </div>
      </div>

      <!-- Bottom: Dynamic 72-Hour Horizon Forecast Chart (Chart.js) -->
      <div class="glass-panel" style="padding: 26px;">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 20px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <span class="badge badge-purple">QUANTILE PREDICTION (P10 / P50 / P90)</span>
              <span class="badge badge-cyan">CONFORMAL CALIBRATION (80% COVERAGE)</span>
            </div>
            <h3 style="font-size: 1.3rem;">
              Continuous 72-Hour Trajectory for <span id="chart-station-name" style="color: #38bdf8;">${selectedStation.name}</span>
            </h3>
            <p style="font-size: 0.82rem; color: var(--text-secondary);">
              The shaded uncertainty envelope widens naturally at longer forecast horizons (H+48 to H+72), reflecting atmospheric entropy.
            </p>
          </div>

          <div style="display: flex; align-items: center; gap: 16px; font-size: 0.8rem;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="width: 12px; height: 3px; background: #38bdf8; display: inline-block;"></span> P50 Median Forecast
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="width: 12px; height: 8px; background: rgba(56, 189, 248, 0.2); display: inline-block; border-radius: 2px;"></span> P10–P90 Conformal Envelope
            </div>
          </div>
        </div>

        <div style="position: relative; height: 320px; width: 100%;">
          <canvas id="forecast-chart"></canvas>
        </div>
      </div>
    </div>
  `;
}

export function initGisForecastExplorer() {
  // Initialize Leaflet Map
  const mapEl = document.getElementById('gis-map');
  if (mapEl && !mapInstance) {
    mapInstance = L.map('gis-map', {
      center: [28.625, 77.22],
      zoom: 10,
      zoomControl: true
    });

    // Dark tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(mapInstance);

    // Plot station markers
    plotStations();
  }

  // Initialize Chart.js
  initForecastChart();

  // Slider change listener
  const slider = document.getElementById('horizon-slider');
  if (slider) {
    slider.addEventListener('input', (e) => {
      currentHorizonHour = parseInt(e.target.value);
      updateHorizonViews();
    });
  }

  // Pollutant pill listeners
  document.querySelectorAll('.btn-pollutant').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-pollutant').forEach(b => b.classList.remove('active-pollutant'));
      btn.classList.add('active-pollutant');
      selectedPollutant = btn.getAttribute('data-pollutant');
      plotStations();
      updateForecastChart();
    });
  });
}

function getAQIColor(aqi) {
  if (aqi <= 50) return '#10b981';
  if (aqi <= 100) return '#84cc16';
  if (aqi <= 200) return '#eab308';
  if (aqi <= 300) return '#f97316';
  if (aqi <= 400) return '#ef4444';
  return '#991b1b';
}

function plotStations() {
  if (!mapInstance) return;

  // Clear previous markers
  Object.values(stationMarkers).forEach(m => mapInstance.removeLayer(m));
  stationMarkers = {};

  const currentF = forecast72h[currentHorizonHour - 1] || forecast72h[0];

  stationsData.forEach(st => {
    // Dynamically adjust station pollutant by regional forecast delta
    const ratio = currentF.p50 / 280;
    const pm25Val = Math.round(st.pollutants.pm25 * ratio);
    const aqiVal = Math.round(st.currentAQI * ratio);

    let displayVal = pm25Val;
    if (selectedPollutant === 'pm10') displayVal = Math.round(st.pollutants.pm10 * ratio);
    else if (selectedPollutant === 'no2') displayVal = Math.round(st.pollutants.no2 * (0.85 + Math.random() * 0.3));
    else if (selectedPollutant === 'o3') displayVal = Math.round(st.pollutants.o3 * (currentF.hourOfDay >= 11 && currentF.hourOfDay <= 16 ? 1.8 : 0.6));
    else if (selectedPollutant === 'aqi') displayVal = aqiVal;

    const color = getAQIColor(aqiVal);

    const customIcon = L.divIcon({
      className: 'custom-station-marker',
      html: `<div style="width: 32px; height: 32px; border-radius: 50%; background: ${color}; display: flex; align-items: center; justify-content: center; font-weight: 700; color: #fff; font-size: 10px; border: 2px solid #fff; box-shadow: 0 0 12px ${color};">${displayVal}</div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    const marker = L.marker([st.lat, st.lng], { icon: customIcon }).addTo(mapInstance);
    
    marker.bindPopup(`
      <div style="font-family: var(--font-body); padding: 4px;">
        <div style="font-weight: 700; font-size: 1rem; color: #fff; margin-bottom: 2px;">${st.name}</div>
        <div style="font-size: 0.75rem; color: #94a3b8; margin-bottom: 8px;">${st.city} • ${st.operator}</div>
        <div style="display: flex; gap: 8px; margin-bottom: 8px;">
          <span style="background: ${color}; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 700;">AQI ${aqiVal}</span>
          <span style="background: rgba(255,255,255,0.1); color: #38bdf8; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">PM2.5: ${pm25Val}</span>
        </div>
        <button id="popup-inspect-${st.id}" style="width: 100%; padding: 6px; border-radius: 6px; background: #0284c7; color: #fff; border: none; font-size: 0.75rem; font-weight: 600; cursor: pointer;">
          Select Station for Deep Inspection
        </button>
      </div>
    `);

    marker.on('click', () => {
      selectStation(st.id);
    });

    marker.on('popupopen', () => {
      const inspectBtn = document.getElementById(`popup-inspect-${st.id}`);
      if (inspectBtn) {
        inspectBtn.addEventListener('click', () => selectStation(st.id));
      }
    });

    stationMarkers[st.id] = marker;
  });
}

function selectStation(stationId) {
  selectedStationId = stationId;
  const st = stationsData.find(s => s.id === stationId);
  if (!st) return;

  const currentF = forecast72h[currentHorizonHour - 1] || forecast72h[0];
  const ratio = currentF.p50 / 280;

  // Update inspector DOM
  const nameEl = document.getElementById('inspector-name');
  if (nameEl) nameEl.textContent = st.name;

  const opEl = document.getElementById('inspector-operator');
  if (opEl) opEl.textContent = `${st.city}, ${st.state} • Operated by ${st.operator}`;

  const aqiEl = document.getElementById('inspector-aqi');
  if (aqiEl) aqiEl.textContent = Math.round(st.currentAQI * ratio);

  const typeEl = document.getElementById('inspector-type');
  if (typeEl) typeEl.textContent = st.stationType;

  const pm25El = document.getElementById('inspector-pm25');
  if (pm25El) pm25El.textContent = `${Math.round(st.pollutants.pm25 * ratio)} µg/m³`;

  const pm10El = document.getElementById('inspector-pm10');
  if (pm10El) pm10El.textContent = `${Math.round(st.pollutants.pm10 * ratio)} µg/m³`;

  const no2El = document.getElementById('inspector-no2');
  if (no2El) no2El.textContent = `${Math.round(st.pollutants.no2 * (0.85 + Math.random() * 0.3))} µg/m³`;

  const o3El = document.getElementById('inspector-o3');
  if (o3El) o3El.textContent = `${Math.round(st.pollutants.o3 * (currentF.hourOfDay >= 11 && currentF.hourOfDay <= 16 ? 1.8 : 0.6))} µg/m³`;

  const tempEl = document.getElementById('inspector-temp');
  if (tempEl) tempEl.textContent = `${st.meteorology.temp}°C`;

  const rhEl = document.getElementById('inspector-rh');
  if (rhEl) rhEl.textContent = `${st.meteorology.rh}%`;

  const viEl = document.getElementById('inspector-vi');
  if (viEl) viEl.textContent = `${Math.round(st.meteorology.pblHeight * st.meteorology.windSpeed)} m²/s`;

  const idEl = document.getElementById('inspector-id');
  if (idEl) idEl.textContent = st.id;

  const relEl = document.getElementById('inspector-rel');
  if (relEl) relEl.textContent = st.reliability;

  const chartNameEl = document.getElementById('chart-station-name');
  if (chartNameEl) chartNameEl.textContent = st.name;

  updateForecastChart();
}

function updateHorizonViews() {
  const currentF = forecast72h[currentHorizonHour - 1] || forecast72h[0];
  plotStations();
  selectStation(selectedStationId);
}

function initForecastChart() {
  const canvas = document.getElementById('forecast-chart');
  if (!canvas) return;

  const labels = forecast72h.map(f => `+${f.horizonHour}h`);
  const p50Data = forecast72h.map(f => f.p50);
  const p10Data = forecast72h.map(f => f.p10);
  const p90Data = forecast72h.map(f => f.p90);
  const pblData = forecast72h.map(f => f.pblHeight);

  chartInstance = new Chart(canvas, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'P50 Median PM2.5 (µg/m³)',
          data: p50Data,
          borderColor: '#38bdf8',
          backgroundColor: 'transparent',
          borderWidth: 2.5,
          tension: 0.35,
          pointRadius: 0,
          pointHoverRadius: 6,
          yAxisID: 'y'
        },
        {
          label: 'P90 Pessimistic (Upper 90%)',
          data: p90Data,
          borderColor: 'transparent',
          backgroundColor: 'rgba(56, 189, 248, 0.15)',
          fill: '+1',
          tension: 0.35,
          pointRadius: 0,
          yAxisID: 'y'
        },
        {
          label: 'P10 Optimistic (Lower 10%)',
          data: p10Data,
          borderColor: 'transparent',
          backgroundColor: 'transparent',
          tension: 0.35,
          pointRadius: 0,
          yAxisID: 'y'
        },
        {
          label: 'PBL Height (m)',
          data: pblData,
          borderColor: 'rgba(16, 185, 129, 0.6)',
          borderWidth: 1.5,
          borderDash: [4, 4],
          pointRadius: 0,
          tension: 0.35,
          yAxisID: 'yPBL'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      scales: {
        x: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: {
            color: '#94a3b8',
            maxTicksLimit: 12,
            font: { family: 'JetBrains Mono', size: 11 }
          }
        },
        y: {
          type: 'linear',
          position: 'left',
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: {
            color: '#38bdf8',
            font: { family: 'JetBrains Mono', size: 11 }
          },
          title: {
            display: true,
            text: 'PM2.5 Concentration (µg/m³)',
            color: '#38bdf8',
            font: { size: 12, weight: 'bold' }
          }
        },
        yPBL: {
          type: 'linear',
          position: 'right',
          grid: { drawOnChartArea: false },
          ticks: {
            color: '#34d399',
            font: { family: 'JetBrains Mono', size: 11 }
          },
          title: {
            display: true,
            text: 'PBL Mixing Depth (m)',
            color: '#34d399',
            font: { size: 12, weight: 'bold' }
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          titleColor: '#fff',
          bodyColor: '#cbd5e1',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1,
          padding: 12,
          displayColors: true
        }
      }
    }
  });
}

function updateForecastChart() {
  if (!chartInstance) return;
  const st = stationsData.find(s => s.id === selectedStationId) || stationsData[0];
  const factor = st.pollutants.pm25 / 280;

  chartInstance.data.datasets[0].data = forecast72h.map(f => Math.round(f.p50 * factor));
  chartInstance.data.datasets[1].data = forecast72h.map(f => Math.round(f.p90 * factor));
  chartInstance.data.datasets[2].data = forecast72h.map(f => Math.round(f.p10 * factor));
  chartInstance.update();
}
