/**
 * PRAVAHA - Section 6: Regional Stubble Transport & CAQM GRAP Decision Hub
 * Satellite FRP ingestion, HYSPLIT trajectory corridors, and automated statutory emergency advisories.
 */

import { grapStages } from '../data/grapMatrix.js';

let selectedGrapStageIdx = 1; // Stage II default (Very Poor, current NCR condition)
let selectedSector = 'government'; // 'government' | 'schools' | 'transport' | 'industry' | 'publicAdvisory'

export function renderStubbleGrapHub() {
  const currentStage = grapStages[selectedGrapStageIdx];
  const sectorActions = currentStage.actions[selectedSector] || [];

  return `
    <div style="display: flex; flex-direction: column; gap: 28px;">
      <!-- Section Intro -->
      <div class="glass-panel" style="padding: 32px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
          <span class="badge badge-rose">DISASTER MANAGEMENT PROTOCOLS</span>
          <span class="badge badge-amber">CAQM STATUTORY FRAMEWORK</span>
        </div>
        <h2 style="font-size: 2rem; margin-bottom: 10px;">
          Regional Stubble Transport & <span class="gradient-text-fire">GRAP Decision Engine</span>
        </h2>
        <p style="font-size: 1rem; color: var(--text-secondary); max-width: 900px;">
          Bridges meteorological and chemical forecasts into statutory administrative action. 
          Monitors upwind Punjab/Haryana biomass burning plumes and automatically generates tailored emergency advisories.
        </p>
      </div>

      <!-- Upwind Satellite Fire & Plume Transport Card -->
      <div class="glass-panel" style="padding: 30px; border-color: rgba(245, 158, 11, 0.3);">
        <div style="display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: 16px; margin-bottom: 20px;">
          <div>
            <span class="badge badge-amber" style="margin-bottom: 6px;">TRANS-BOUNDARY CORRIDOR</span>
            <h3 style="font-size: 1.4rem;">NASA FIRMS FRP Tracking & HYSPLIT Dispersion</h3>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">
              Why PRAVAHA uses Fire Radiative Power (MW) instead of naive hotspot counts
            </p>
          </div>
          <div class="font-mono" style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); padding: 8px 16px; border-radius: 10px; color: #fbbf24; font-size: 0.95rem; font-weight: 700;">
            TRANSIT LAG: 14 – 32 HOURS
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 24px;">
          <div style="background: rgba(255,255,255,0.02); padding: 18px; border-radius: 12px; border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">ACTIVE FIRE CLUSTERS (PUNJAB/HARYANA)</div>
            <div class="font-mono" style="font-size: 1.8rem; font-weight: 800; color: #f97316; margin: 4px 0;">1,428 Hotspots</div>
            <div style="font-size: 0.82rem; color: var(--text-secondary);">NASA VIIRS 375m NRT overpass</div>
          </div>

          <div style="background: rgba(255,255,255,0.02); padding: 18px; border-radius: 12px; border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">CUMULATIVE FIRE RADIATIVE POWER</div>
            <div class="font-mono" style="font-size: 1.8rem; font-weight: 800; color: #ef4444; margin: 4px 0;">38,420 MW</div>
            <div style="font-size: 0.82rem; color: var(--text-secondary);">True thermal energy released into atmosphere</div>
          </div>

          <div style="background: rgba(255,255,255,0.02); padding: 18px; border-radius: 12px; border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">HYSPLIT FORWARD TRAJECTORY</div>
            <div class="font-mono" style="font-size: 1.8rem; font-weight: 800; color: #38bdf8; margin: 4px 0;">310° (NW Inflow)</div>
            <div style="font-size: 0.82rem; color: var(--text-secondary);">Direct alignment into Delhi air basin</div>
          </div>
        </div>

        <div style="background: rgba(245, 158, 11, 0.06); padding: 16px 20px; border-radius: 10px; border-left: 4px solid #f59e0b; font-size: 0.86rem; color: var(--text-secondary); line-height: 1.6;">
          <strong style="color: #fff;">Scientific Rigor Principle:</strong> 
          A hotspot pixel detection does not tell you if the farmer burned a small brush pile or a 50-acre paddy field. 
          By multiplying each hotspot by its <strong>Fire Radiative Power (FRP)</strong> and modeling atmospheric injection height (plume rise), PRAVAHA models real mass flux rather than asserting fictitious pinpoint percentages.
        </div>
      </div>

      <!-- Automated CAQM GRAP Statutory Decision Matrix -->
      <div class="glass-panel" style="padding: 30px;">
        <div style="display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
          <div>
            <span class="badge badge-rose" style="margin-bottom: 6px;">DECISION-SUPPORT SYSTEM</span>
            <h3 style="font-size: 1.4rem;">Statutory CAQM GRAP Early-Warning Engine</h3>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">
              Select any GRAP stage or predicted AQI threshold to generate actionable emergency advisories
            </p>
          </div>

          <!-- GRAP Stage Selector Buttons -->
          <div style="display: flex; gap: 8px; flex-wrap: wrap;" id="grap-stage-buttons">
            ${grapStages.map((stage, idx) => `
              <button class="grap-stage-btn ${selectedGrapStageIdx === idx ? 'active-grap' : ''}" data-stage-idx="${idx}" style="padding: 8px 16px; border-radius: 8px; font-weight: 700; font-size: 0.82rem; border: 1px solid var(--border-medium); cursor: pointer; background: ${selectedGrapStageIdx === idx ? stage.color : 'rgba(255,255,255,0.04)'}; color: #fff;">
                ${stage.stage}: ${stage.aqiThreshold}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Stage Meta Details Banner -->
        <div style="background: rgba(0,0,0,0.3); border-left: 4px solid ${currentStage.color}; padding: 18px 22px; border-radius: 10px; margin-bottom: 24px;">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 6px;">
            <div style="font-size: 1.2rem; font-weight: 700; color: #fff;">
              ${currentStage.stage} — ${currentStage.title}
            </div>
            <span class="badge" style="background: ${currentStage.color}22; color: ${currentStage.color}; border: 1px solid ${currentStage.color};">
              ${currentStage.severity}
            </span>
          </div>
          <p style="font-size: 0.86rem; color: var(--text-secondary);">
            <strong>Regulatory Mandate:</strong> ${currentStage.regulatoryMandate}
          </p>
        </div>

        <!-- Sector Filter Tabs -->
        <div style="display: flex; gap: 8px; margin-bottom: 20px; overflow-x: auto; padding-bottom: 6px;" id="sector-tabs">
          <button class="sector-tab-btn ${selectedSector === 'government' ? 'active-sector' : ''}" data-sector="government">
            🏛️ Government & Regulators
          </button>
          <button class="sector-tab-btn ${selectedSector === 'schools' ? 'active-sector' : ''}" data-sector="schools">
            🏫 Schools & Children
          </button>
          <button class="sector-tab-btn ${selectedSector === 'transport' ? 'active-sector' : ''}" data-sector="transport">
            🚗 Transport & Traffic
          </button>
          <button class="sector-tab-btn ${selectedSector === 'industry' ? 'active-sector' : ''}" data-sector="industry">
            🏭 Industry & Construction
          </button>
          <button class="sector-tab-btn ${selectedSector === 'publicAdvisory' ? 'active-sector' : ''}" data-sector="publicAdvisory">
            🏥 Public Health & Citizens
          </button>
        </div>

        <!-- Sector Actions Checklist Cards -->
        <div style="display: flex; flex-direction: column; gap: 12px;" id="sector-actions-container">
          ${sectorActions.map((action, i) => `
            <div style="display: flex; align-items: flex-start; gap: 14px; background: rgba(255,255,255,0.02); padding: 14px 18px; border-radius: 10px; border: 1px solid var(--border-subtle);">
              <div style="width: 24px; height: 24px; border-radius: 50%; background: ${currentStage.color}22; color: ${currentStage.color}; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700; flex-shrink: 0; margin-top: 2px;">
                ${i + 1}
              </div>
              <div style="font-size: 0.88rem; color: #f8fafc; line-height: 1.5;">
                ${action}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

export function initStubbleGrapHub(onRerender) {
  document.querySelectorAll('.grap-stage-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-stage-idx'));
      if (!isNaN(idx)) {
        selectedGrapStageIdx = idx;
        if (onRerender) onRerender();
      }
    });
  });

  document.querySelectorAll('.sector-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sec = btn.getAttribute('data-sector');
      if (sec) {
        selectedSector = sec;
        if (onRerender) onRerender();
      }
    });
  });
}
