/**
 * PRAVAHA - Section 3: System Architecture & Data Catalogue
 * Sourced from SIH26082 Build Blueprint (Sections 13-16, 26, 37).
 */

import { datasetRegistry } from '../data/scientificData.js';

export function renderArchitectureView() {
  return `
    <div style="display: flex; flex-direction: column; gap: 28px;">
      <!-- Section Intro -->
      <div class="glass-panel" style="padding: 32px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
          <span class="badge badge-purple">SYSTEM BLUEPRINT</span>
          <span class="badge badge-cyan">4-TIER PIPELINE</span>
        </div>
        <h2 style="font-size: 2rem; margin-bottom: 10px;">
          PRAVAHA <span class="gradient-text-purple">System Architecture</span> & Data Engine
        </h2>
        <p style="font-size: 1rem; color: var(--text-secondary); max-width: 900px;">
          A hybrid physics-informed operational forecasting platform designed for low latency, zero temporal leakage, 
          fault-tolerant sensor dropouts, and multi-horizon calibrated uncertainty.
        </p>
      </div>

      <!-- 4-Tier Pipeline Architecture Visual -->
      <div class="glass-panel" style="padding: 30px;">
        <h3 style="font-size: 1.3rem; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
          <span style="width: 8px; height: 8px; border-radius: 50%; background: #a855f7;"></span>
          Four-Tier Operational Pipeline
        </h3>

        <div style="display: flex; flex-direction: column; gap: 16px;">
          <!-- Tier 1 -->
          <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 12px; padding: 20px;">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-bottom: 10px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span class="badge badge-cyan">TIER 1</span>
                <span style="font-weight: 700; font-size: 1.05rem; color: #fff;">Multi-Source Ingestion & Automated QC Engine</span>
              </div>
              <span class="font-mono" style="font-size: 0.78rem; color: var(--text-muted);">Python • xarray • Requests • SQLite Cache</span>
            </div>
            <p style="font-size: 0.86rem; color: var(--text-secondary); margin-bottom: 12px;">
              Continuous ingestion pipelines scraping 42 Delhi-NCR CAAQMS stations, streaming NOAA GFS 0.25° forecasts, ECMWF ERA5 vertical profiles, CAMS aerosol fields, and NASA FIRMS 375m fire hotspots.
            </p>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              <span class="badge" style="background: rgba(255,255,255,0.05); color: #cbd5e1;">Rate-of-Change QC Check</span>
              <span class="badge" style="background: rgba(255,255,255,0.05); color: #cbd5e1;">Stuck-Sensor Flagging</span>
              <span class="badge" style="background: rgba(255,255,255,0.05); color: #cbd5e1;">UTC-to-IST Clock Alignment</span>
              <span class="badge" style="background: rgba(255,255,255,0.05); color: #cbd5e1;">Data Provenance Ledger</span>
            </div>
          </div>

          <!-- Tier 2 -->
          <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 20px;">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-bottom: 10px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span class="badge badge-emerald">TIER 2</span>
                <span style="font-weight: 700; font-size: 1.05rem; color: #fff;">Physics-Informed Feature Store (Zero Leakage)</span>
              </div>
              <span class="font-mono" style="font-size: 0.78rem; color: var(--text-muted);">Polars • MetPy • NumPy • GeoPandas</span>
            </div>
            <p style="font-size: 0.86rem; color: var(--text-secondary); margin-bottom: 12px;">
              Constructs golden tabular features using expanding-window temporal splits: $t-1 \dots t-24$ autoregressive lags, vector wind decomposition ($u = -w \sin\theta, v = -w \cos\theta$), Ventilation Index ($VI = H \cdot U$), Inversion Lid Score ($\Delta T_{925-1000}$), and FRP-weighted upwind stubble centroid distance.
            </p>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              <span class="badge" style="background: rgba(255,255,255,0.05); color: #cbd5e1;">Strict Backward Lags Only</span>
              <span class="badge" style="background: rgba(255,255,255,0.05); color: #cbd5e1;">Ventilation Index VI</span>
              <span class="badge" style="background: rgba(255,255,255,0.05); color: #cbd5e1;">Inversion Score ΔT</span>
              <span class="badge" style="background: rgba(255,255,255,0.05); color: #cbd5e1;">Solar Zenith Angle</span>
            </div>
          </div>

          <!-- Tier 3 -->
          <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 12px; padding: 20px;">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-bottom: 10px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span class="badge badge-purple">TIER 3</span>
                <span style="font-weight: 700; font-size: 1.05rem; color: #fff;">Hybrid Operational Forecaster & Uncertainty Engine</span>
              </div>
              <span class="font-mono" style="font-size: 0.78rem; color: var(--text-muted);">LightGBM • MAPIE • Quantile Loss • FastAPI</span>
            </div>
            <p style="font-size: 0.86rem; color: var(--text-secondary); margin-bottom: 12px;">
              High-resolution regional physical background combined with LightGBM Quantile Regressors for Lead times H+1 to H+72. Predicts PM2.5, PM10, NO2, and O3 independently with conformal prediction intervals (P10, P50, P90) guaranteeing 80% empirical coverage.
            </p>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              <span class="badge" style="background: rgba(255,255,255,0.05); color: #cbd5e1;">Pinball Loss (α=0.1, 0.5, 0.9)</span>
              <span class="badge" style="background: rgba(255,255,255,0.05); color: #cbd5e1;">Rolling Conformal Calibration</span>
              <span class="badge" style="background: rgba(255,255,255,0.05); color: #cbd5e1;">TreeSHAP Feature Attribution</span>
              <span class="badge" style="background: rgba(255,255,255,0.05); color: #cbd5e1;">Sub-50ms REST API</span>
            </div>
          </div>

          <!-- Tier 4 -->
          <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 12px; padding: 20px;">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-bottom: 10px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span class="badge badge-amber">TIER 4</span>
                <span style="font-weight: 700; font-size: 1.05rem; color: #fff;">Decision-Support, Statutory GRAP & GIS Layer</span>
              </div>
              <span class="font-mono" style="font-size: 0.78rem; color: var(--text-muted);">Leaflet • Chart.js • CAQM GRAP Rules</span>
            </div>
            <p style="font-size: 0.86rem; color: var(--text-secondary); margin-bottom: 12px;">
              Computes official CPCB AQI using piecewise linear breakpoint interpolation. Automatically maps forecast breaches into CAQM GRAP Stage I through IV emergency advisories for Government, Schools, Transport, and Industry.
            </p>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              <span class="badge" style="background: rgba(255,255,255,0.05); color: #cbd5e1;">Official CPCB Sub-Index Formula</span>
              <span class="badge" style="background: rgba(255,255,255,0.05); color: #cbd5e1;">Automated GRAP Trigger Generator</span>
              <span class="badge" style="background: rgba(255,255,255,0.05); color: #cbd5e1;">Interactive Geospatial Map</span>
              <span class="badge" style="background: rgba(255,255,255,0.05); color: #cbd5e1;">Dominant Pollutant Detection</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Live vs Precomputed Strategy: The Winning Pitch Defense -->
      <div class="glass-panel" style="padding: 30px; border-color: rgba(59, 130, 246, 0.3);">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 16px;">
          <div>
            <h3 style="font-size: 1.3rem;">Why Hybrid Architecture? The Honest Scientific Defense</h3>
            <p style="font-size: 0.84rem; color: var(--text-secondary);">The key distinction that wins over MoES and atmospheric science evaluators</p>
          </div>
          <span class="badge badge-cyan">EVALUATOR RIGOR DEFENSE</span>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;" class="stack-mobile">
          <div style="background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.2); padding: 18px; border-radius: 12px;">
            <div style="font-weight: 700; color: #f87171; font-size: 0.95rem; margin-bottom: 8px;">⚠️ Why Live WRF-Chem in Real-Time is Flawed</div>
            <p style="font-size: 0.83rem; color: var(--text-secondary); line-height: 1.6;">
              A full 72-hour WRF-Chem run at 3-km grid resolution over northern India requires 64+ HPC cores and takes 8 to 12 hours. If an emergency occurs, waiting half a day for a simulation is unacceptable. Furthermore, if any upstream satellite emission input has a network glitch, the entire cluster run crashes.
            </p>
          </div>

          <div style="background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.2); padding: 18px; border-radius: 12px;">
            <div style="font-weight: 700; color: #34d399; font-size: 0.95rem; margin-bottom: 8px;">✅ PRAVAHA's Defensible Hybrid Solution</div>
            <p style="font-size: 0.83rem; color: var(--text-secondary); line-height: 1.6;">
              We demonstrate <strong>genuine aerosol-radiation feedback</strong> via reproducible WRF-Chem hindcasts of historical smog cases (Nov 2017 Great Smog), extracting exact physical parameters (solar dimming, PBL suppression). We then embed these physical constraints into an ultra-fast LightGBM inference engine that issues complete 72-hour forecasts in <strong>under 2 seconds</strong>.
            </p>
          </div>
        </div>
      </div>

      <!-- Dataset Catalogue Table -->
      <div class="glass-panel" style="padding: 30px;">
        <h3 style="font-size: 1.3rem; margin-bottom: 8px;">Open Data Catalogue & Provenance Registry</h3>
        <p style="font-size: 0.84rem; color: var(--text-secondary); margin-bottom: 20px;">
          All data utilized in PRAVAHA originates from certified public scientific and open-access repositories
        </p>

        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem;">
            <thead>
              <tr style="border-bottom: 1px solid var(--border-medium); text-align: left;">
                <th style="padding: 12px; color: var(--text-muted); font-weight: 600;">DATASET</th>
                <th style="padding: 12px; color: var(--text-muted); font-weight: 600;">PROVIDER</th>
                <th style="padding: 12px; color: var(--text-muted); font-weight: 600;">FREQUENCY</th>
                <th style="padding: 12px; color: var(--text-muted); font-weight: 600;">RESOLUTION</th>
                <th style="padding: 12px; color: var(--text-muted); font-weight: 600;">OPERATIONAL USE</th>
              </tr>
            </thead>
            <tbody>
              ${datasetRegistry.map(ds => `
                <tr style="border-bottom: 1px solid var(--border-subtle);">
                  <td style="padding: 12px; font-weight: 600; color: #f8fafc;">${ds.name}</td>
                  <td style="padding: 12px; color: #38bdf8;">${ds.provider}</td>
                  <td style="padding: 12px; color: var(--text-secondary);">${ds.freq}</td>
                  <td style="padding: 12px; font-family: var(--font-mono); color: #cbd5e1;">${ds.resolution}</td>
                  <td style="padding: 12px; color: var(--text-secondary);">${ds.usage}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}
