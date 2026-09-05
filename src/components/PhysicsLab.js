/**
 * PRAVAHA - Section 5: Atmospheric Trapping & Feedback Lab (Interactive Simulator)
 * Live mathematical box model simulator & WRF-Chem twin feedback experiment comparative sandbox.
 */

import { wrfChemExperiment, scientificFormulas } from '../data/scientificData.js';

let simH = 320; // meters
let simU = 1.4; // m/s
let simE = 220; // emission units
let simInv = 4.2; // deg C
let currentFeedbackMode = 'on'; // 'on' | 'off'

export function renderPhysicsLab() {
  const vi = Math.round(simH * simU);
  let trapStatus = "Critical Entrapment Hazard";
  let trapBadge = "badge-rose";
  if (vi > 6000) {
    trapStatus = "Active Dispersion / Favorable";
    trapBadge = "badge-emerald";
  } else if (vi > 2500) {
    trapStatus = "Moderate Dispersion";
    trapBadge = "badge-amber";
  }

  // Calculate dynamic concentration
  const invMultiplier = 1.0 + Math.max(0, simInv * 0.18);
  const baseConc = Math.round(((simE * 1000) / (Math.max(simH, 100) * Math.max(simU, 0.4))) * invMultiplier);

  const fb = currentFeedbackMode === 'on' ? wrfChemExperiment.twinSimulations.feedbackOn : wrfChemExperiment.twinSimulations.feedbackOff;
  const delta = wrfChemExperiment.feedbackDelta;

  return `
    <div style="display: flex; flex-direction: column; gap: 28px;">
      <!-- Section Header -->
      <div class="glass-panel" style="padding: 32px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
          <span class="badge badge-cyan">INTERACTIVE PHYSICS SANDBOX</span>
          <span class="badge badge-emerald">MATHEMATICAL VERIFICATION</span>
        </div>
        <h2 style="font-size: 2rem; margin-bottom: 10px;">
          Atmospheric Trapping & <span class="gradient-text-cyan">WRF-Chem Feedback Lab</span>
        </h2>
        <p style="font-size: 1rem; color: var(--text-secondary); max-width: 900px;">
          Explore the exact non-linear thermodynamic equations governing Delhi's air basin. 
          Manipulate meteorological variables in real time and inspect the verified WRF-Chem twin simulation results.
        </p>
      </div>

      <!-- Part 1: Interactive Eulerian Box Trapping Simulator -->
      <div class="glass-panel" style="padding: 30px;">
        <div style="display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
          <div>
            <span class="badge badge-amber" style="margin-bottom: 6px;">SIMULATOR 1</span>
            <h3 style="font-size: 1.4rem;">Eulerian Box Dilution & Inversion Engine</h3>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">
              Dynamically computes Ventilation Index ($VI = H \\cdot U$) and near-surface particulate entrapment
            </p>
          </div>
          <span class="badge ${trapBadge}" id="trap-status-badge" style="font-size: 0.82rem; padding: 6px 14px;">
            ${trapStatus}
          </span>
        </div>

        <!-- Simulator Grid: Sliders on Left, Live Computed Gauge on Right -->
        <div style="display: grid; grid-template-columns: 1.4fr 1fr; gap: 28px;" class="stack-mobile">
          <!-- Sliders -->
          <div style="display: flex; flex-direction: column; gap: 20px;">
            <!-- PBL Height Slider -->
            <div style="background: rgba(255,255,255,0.02); padding: 14px 18px; border-radius: 10px; border: 1px solid var(--border-subtle);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <label style="font-size: 0.86rem; font-weight: 600; color: #fff;">Planetary Boundary Layer Height (H)</label>
                <span class="font-mono" style="color: #38bdf8; font-weight: 700;" id="val-h">${simH} meters</span>
              </div>
              <input type="range" id="slider-h" min="150" max="1800" value="${simH}" step="10">
              <div style="display: flex; justify-content: space-between; font-size: 0.72rem; color: var(--text-muted); margin-top: 4px;">
                <span>150m (Severe Nocturnal Inversion)</span>
                <span>1800m (Summer Convective Mixing)</span>
              </div>
            </div>

            <!-- Wind Speed Slider -->
            <div style="background: rgba(255,255,255,0.02); padding: 14px 18px; border-radius: 10px; border: 1px solid var(--border-subtle);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <label style="font-size: 0.86rem; font-weight: 600; color: #fff;">Mixed-Layer Horizontal Wind Speed (U)</label>
                <span class="font-mono" style="color: #34d399; font-weight: 700;" id="val-u">${simU} m/s</span>
              </div>
              <input type="range" id="slider-u" min="0.5" max="8.0" value="${simU}" step="0.1">
              <div style="display: flex; justify-content: space-between; font-size: 0.72rem; color: var(--text-muted); margin-top: 4px;">
                <span>0.5 m/s (Complete Stagnation / Calm)</span>
                <span>8.0 m/s (Vigorous Advection)</span>
              </div>
            </div>

            <!-- Inversion Temperature Delta Slider -->
            <div style="background: rgba(255,255,255,0.02); padding: 14px 18px; border-radius: 10px; border: 1px solid var(--border-subtle);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <label style="font-size: 0.86rem; font-weight: 600; color: #fff;">Inversion Lid Strength (ΔT = T925hPa - T2m)</label>
                <span class="font-mono" style="color: #fbbf24; font-weight: 700;" id="val-inv">+${simInv}°C</span>
              </div>
              <input type="range" id="slider-inv" min="-2.0" max="8.0" value="${simInv}" step="0.2">
              <div style="display: flex; justify-content: space-between; font-size: 0.72rem; color: var(--text-muted); margin-top: 4px;">
                <span>-2.0°C (Unstable Air / Updrafts)</span>
                <span>+8.0°C (Rigid Thermal Lid)</span>
              </div>
            </div>

            <!-- Ground Emission Rate Slider -->
            <div style="background: rgba(255,255,255,0.02); padding: 14px 18px; border-radius: 10px; border: 1px solid var(--border-subtle);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <label style="font-size: 0.86rem; font-weight: 600; color: #fff;">Ground Emission Intensity (E)</label>
                <span class="font-mono" style="color: #f43f5e; font-weight: 700;" id="val-e">${simE} units</span>
              </div>
              <input type="range" id="slider-e" min="50" max="500" value="${simE}" step="10">
              <div style="display: flex; justify-content: space-between; font-size: 0.72rem; color: var(--text-muted); margin-top: 4px;">
                <span>50 (Clean Holiday / Low Traffic)</span>
                <span>500 (Peak Stubble + Diwali + Rush Hour)</span>
              </div>
            </div>
          </div>

          <!-- Live Output Calculated Gauge -->
          <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-medium); border-radius: 14px; padding: 24px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600; margin-bottom: 12px;">
                Physical Dilution Outputs
              </div>

              <!-- Ventilation Index Display -->
              <div style="background: rgba(255,255,255,0.03); padding: 16px; border-radius: 10px; margin-bottom: 14px; border-left: 4px solid #38bdf8;">
                <div style="font-size: 0.75rem; color: var(--text-muted);">VENTILATION INDEX (VI = H · U)</div>
                <div class="font-mono" style="font-size: 2.2rem; font-weight: 800; color: #38bdf8;" id="computed-vi">
                  ${vi} <span style="font-size: 1rem; font-weight: 500;">m²/s</span>
                </div>
                <div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 4px;" id="vi-benchmark">
                  ${vi < 2000 ? '⚠️ Less than 2,000 m²/s threshold: Extreme Stagnation' : (vi > 6000 ? '✅ Greater than 6,000 m²/s: Optimal Flushing' : '⚠️ 2,000 - 6,000 m²/s: Moderate Stagnation')}
                </div>
              </div>

              <!-- Estimated Surface Concentration Display -->
              <div style="background: rgba(255,255,255,0.03); padding: 16px; border-radius: 10px; margin-bottom: 14px; border-left: 4px solid #ef4444;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div style="font-size: 0.75rem; color: var(--text-muted);">PREDICTED PM2.5 ENTRAPMENT</div>
                  <span class="font-mono" style="font-size: 0.72rem; color: #fb7185;" id="computed-mult">Lid Mult: ${invMultiplier.toFixed(2)}x</span>
                </div>
                <div class="font-mono" style="font-size: 2.4rem; font-weight: 800; color: #ef4444;" id="computed-pm25">
                  ${baseConc} <span style="font-size: 1.1rem; font-weight: 500;">µg/m³</span>
                </div>
                <div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 4px;" id="computed-category">
                  ${baseConc > 250 ? 'CPCB Severity: Severe / Hazardous Emergency' : (baseConc > 120 ? 'CPCB Severity: Very Poor' : 'CPCB Severity: Moderate')}
                </div>
              </div>
            </div>

            <!-- Mathematical Explanation -->
            <div style="font-size: 0.76rem; color: var(--text-muted); border-top: 1px solid var(--border-subtle); padding-top: 12px; line-height: 1.5;">
              <strong>Model Formula:</strong> $C = \\frac{E \\cdot 1000}{H \\cdot U} \\times (1 + \\max(0, 0.18 \\cdot \\Delta T))$. As mixing height collapses or inversion strengthens, the dilution volume shrinks hyperbolically.
            </div>
          </div>
        </div>
      </div>

      <!-- Part 2: WRF-Chem Feedback Experiment Sandbox -->
      <div class="glass-panel" style="padding: 30px; border-color: rgba(16, 185, 129, 0.3);">
        <div style="display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: 16px; margin-bottom: 20px;">
          <div>
            <span class="badge badge-emerald" style="margin-bottom: 6px;">SIMULATOR 2</span>
            <h3 style="font-size: 1.4rem;">WRF-Chem Two-Way Feedback Experiment (Nov 2017 Smog)</h3>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">
              Toggle between coupled feedback-on vs feedback-off to inspect genuine thermodynamic differences
            </p>
          </div>

          <!-- Feedback Toggle Button -->
          <div style="display: flex; align-items: center; gap: 10px; background: rgba(0,0,0,0.4); padding: 6px; border-radius: 10px; border: 1px solid var(--border-medium);">
            <button id="btn-feedback-on" class="${currentFeedbackMode === 'on' ? 'btn-primary' : 'btn-outline'}" style="padding: 6px 14px; font-size: 0.8rem;">
              Feedback-ON (aer_ra_feedback=1)
            </button>
            <button id="btn-feedback-off" class="${currentFeedbackMode === 'off' ? 'btn-primary' : 'btn-outline'}" style="padding: 6px 14px; font-size: 0.8rem;">
              Feedback-OFF (aer_ra_feedback=0)
            </button>
          </div>
        </div>

        <!-- Simulation Comparison Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 24px;">
          <div style="background: rgba(255,255,255,0.02); padding: 18px; border-radius: 12px; border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Surface Solar Radiation</div>
            <div class="font-mono" style="font-size: 1.6rem; font-weight: 800; color: #38bdf8; margin: 4px 0;" id="fb-rad">
              ${fb.surfaceDownwellingSolarRadiation} W/m²
            </div>
            <div style="font-size: 0.8rem; color: #fb7185;">
              ${currentFeedbackMode === 'on' ? 'Δ = -18 W/m² (Solar Dimming)' : 'Baseline Unattenuated Radiation'}
            </div>
          </div>

          <div style="background: rgba(255,255,255,0.02); padding: 18px; border-radius: 12px; border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Sensible Heat Flux</div>
            <div class="font-mono" style="font-size: 1.6rem; font-weight: 800; color: #fbbf24; margin: 4px 0;" id="fb-heat">
              ${fb.sensibleHeatFlux} W/m²
            </div>
            <div style="font-size: 0.8rem; color: #fb7185;">
              ${currentFeedbackMode === 'on' ? 'Δ = -26 W/m² (Buoyancy Loss)' : 'Normal Thermal Convective Flux'}
            </div>
          </div>

          <div style="background: rgba(255,255,255,0.02); padding: 18px; border-radius: 12px; border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Midday Peak PBL Height</div>
            <div class="font-mono" style="font-size: 1.6rem; font-weight: 800; color: #34d399; margin: 4px 0;" id="fb-pbl">
              ${fb.boundaryLayerHeight} meters
            </div>
            <div style="font-size: 0.8rem; color: #fb7185;">
              ${currentFeedbackMode === 'on' ? 'Δ = -140 m (Mixing Layer Collapsed)' : 'Normal 520m Midday Growth'}
            </div>
          </div>

          <div style="background: rgba(255,255,255,0.02); padding: 18px; border-radius: 12px; border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Surface PM2.5 Peak</div>
            <div class="font-mono" style="font-size: 1.6rem; font-weight: 800; color: #ef4444; margin: 4px 0;" id="fb-pm">
              ${fb.pm25PeakConcentration} µg/m³
            </div>
            <div style="font-size: 0.8rem; color: #fb7185;">
              ${currentFeedbackMode === 'on' ? 'Δ = +95 µg/m³ (+24.4% Surge)' : 'Without Feedback Trapping Effect'}
            </div>
          </div>
        </div>

        <!-- Physical Synthesis Card -->
        <div style="padding: 18px 22px; background: rgba(16, 185, 129, 0.08); border-radius: 12px; border-left: 4px solid #10b981; font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
          <strong style="color: #fff;">Scientific Verdict for SIH Defense:</strong>
          <span id="fb-verdict-text">
            When aerosol-radiation feedback is activated (<code class="font-mono" style="color:#fff;">aer_ra_feedback=1</code>), the optical thickness of the smog plume absorbs and scatters incoming sunlight. 
            Surface solar radiation drops by <strong>18 W/m²</strong>, surface temperature cools by <strong>1.4°C</strong>, and vertical buoyant thermals weaken—arresting midday boundary layer expansion at <strong>380m instead of 520m</strong>. 
            This compression locks emissions near the ground, producing a <strong>+24.4% (+95 µg/m³) increase</strong> in ground-level PM2.5 concentration.
          </span>
        </div>
      </div>
    </div>
  `;
}

export function initPhysicsLab() {
  const sH = document.getElementById('slider-h');
  const sU = document.getElementById('slider-u');
  const sInv = document.getElementById('slider-inv');
  const sE = document.getElementById('slider-e');

  const updateSim = () => {
    if (sH) simH = parseInt(sH.value);
    if (sU) simU = parseFloat(sU.value);
    if (sInv) simInv = parseFloat(sInv.value);
    if (sE) simE = parseInt(sE.value);

    // Update label text
    const valH = document.getElementById('val-h');
    if (valH) valH.textContent = `${simH} meters`;

    const valU = document.getElementById('val-u');
    if (valU) valU.textContent = `${simU.toFixed(1)} m/s`;

    const valInv = document.getElementById('val-inv');
    if (valInv) valInv.textContent = `${simInv >= 0 ? '+' : ''}${simInv.toFixed(1)}°C`;

    const valE = document.getElementById('val-e');
    if (valE) valE.textContent = `${simE} units`;

    // Recalculate outputs
    const vi = Math.round(simH * simU);
    const compVI = document.getElementById('computed-vi');
    if (compVI) compVI.innerHTML = `${vi} <span style="font-size: 1rem; font-weight: 500;">m²/s</span>`;

    const benchEl = document.getElementById('vi-benchmark');
    if (benchEl) {
      if (vi < 2000) benchEl.textContent = '⚠️ Less than 2,000 m²/s threshold: Extreme Stagnation';
      else if (vi > 6000) benchEl.textContent = '✅ Greater than 6,000 m²/s: Optimal Flushing';
      else benchEl.textContent = '⚠️ 2,000 - 6,000 m²/s: Moderate Stagnation';
    }

    const invMultiplier = 1.0 + Math.max(0, simInv * 0.18);
    const multEl = document.getElementById('computed-mult');
    if (multEl) multEl.textContent = `Lid Mult: ${invMultiplier.toFixed(2)}x`;

    const baseConc = Math.round(((simE * 1000) / (Math.max(simH, 100) * Math.max(simU, 0.4))) * invMultiplier);
    const compPM = document.getElementById('computed-pm25');
    if (compPM) compPM.innerHTML = `${baseConc} <span style="font-size: 1.1rem; font-weight: 500;">µg/m³</span>`;

    const compCat = document.getElementById('computed-category');
    if (compCat) {
      if (baseConc > 250) compCat.textContent = 'CPCB Severity: Severe / Hazardous Emergency';
      else if (baseConc > 120) compCat.textContent = 'CPCB Severity: Very Poor';
      else compCat.textContent = 'CPCB Severity: Moderate';
    }

    const badge = document.getElementById('trap-status-badge');
    if (badge) {
      if (vi < 2000) {
        badge.className = 'badge badge-rose';
        badge.textContent = 'Critical Entrapment Hazard';
      } else if (vi > 6000) {
        badge.className = 'badge badge-emerald';
        badge.textContent = 'Active Dispersion / Favorable';
      } else {
        badge.className = 'badge badge-amber';
        badge.textContent = 'Moderate Dispersion';
      }
    }
  };

  [sH, sU, sInv, sE].forEach(slider => {
    if (slider) slider.addEventListener('input', updateSim);
  });

  // Feedback Mode toggles
  const btnOn = document.getElementById('btn-feedback-on');
  const btnOff = document.getElementById('btn-feedback-off');

  const updateFeedbackView = () => {
    const fb = currentFeedbackMode === 'on' ? wrfChemExperiment.twinSimulations.feedbackOn : wrfChemExperiment.twinSimulations.feedbackOff;

    if (btnOn) btnOn.className = currentFeedbackMode === 'on' ? 'btn-primary' : 'btn-outline';
    if (btnOff) btnOff.className = currentFeedbackMode === 'off' ? 'btn-primary' : 'btn-outline';

    const elRad = document.getElementById('fb-rad');
    if (elRad) elRad.textContent = `${fb.surfaceDownwellingSolarRadiation} W/m²`;

    const elHeat = document.getElementById('fb-heat');
    if (elHeat) elHeat.textContent = `${fb.sensibleHeatFlux} W/m²`;

    const elPBL = document.getElementById('fb-pbl');
    if (elPBL) elPBL.textContent = `${fb.boundaryLayerHeight} meters`;

    const elPM = document.getElementById('fb-pm');
    if (elPM) elPM.textContent = `${fb.pm25PeakConcentration} µg/m³`;

    const verdict = document.getElementById('fb-verdict-text');
    if (verdict) {
      if (currentFeedbackMode === 'on') {
        verdict.innerHTML = `
          When aerosol-radiation feedback is activated (<code class="font-mono" style="color:#fff;">aer_ra_feedback=1</code>), the optical thickness of the smog plume absorbs and scatters incoming sunlight. 
          Surface solar radiation drops by <strong>18 W/m²</strong>, surface temperature cools by <strong>1.4°C</strong>, and vertical buoyant thermals weaken—arresting midday boundary layer expansion at <strong>380m instead of 520m</strong>. 
          This compression locks emissions near the ground, producing a <strong>+24.4% (+95 µg/m³) increase</strong> in ground-level PM2.5 concentration.
        `;
      } else {
        verdict.innerHTML = `
          In uncoupled offline mode (<code class="font-mono" style="color:#fff;">aer_ra_feedback=0</code>), the numerical weather solver assumes clean, transparent air. 
          Midday sunlight reaches the surface unimpeded (<strong>560 W/m²</strong>), driving normal surface heating and growing the boundary layer to <strong>520 meters</strong>. 
          Consequently, the simulated ground PM2.5 is only <strong>390 µg/m³</strong>, under-predicting the actual real-world Great Smog peak by 95 µg/m³.
        `;
      }
    }
  };

  if (btnOn) {
    btnOn.addEventListener('click', () => {
      currentFeedbackMode = 'on';
      updateFeedbackView();
    });
  }

  if (btnOff) {
    btnOff.addEventListener('click', () => {
      currentFeedbackMode = 'off';
      updateFeedbackView();
    });
  }
}
