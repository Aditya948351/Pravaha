/**
 * PRAVAHA - Section 5: Atmospheric Trapping & Feedback Lab (Interactive Simulator)
 * Features live mathematical box model simulator, vertical atmospheric column SVG,
 * and WRF-Chem twin feedback experiment comparative sandbox.
 */

import { wrfChemExperiment } from '../data/scientificData.js';

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

  const invMultiplier = 1.0 + Math.max(0, simInv * 0.18);
  const baseConc = Math.round(((simE * 1000) / (Math.max(simH, 100) * Math.max(simU, 0.4))) * invMultiplier);

  const fb = currentFeedbackMode === 'on' ? wrfChemExperiment.twinSimulations.feedbackOn : wrfChemExperiment.twinSimulations.feedbackOff;

  // Normalized height percentage for the SVG column (150m = 85% depth, 1800m = 20% depth from ground)
  const pblPercent = Math.min(85, Math.max(18, Math.round((simH / 1800) * 80)));
  const lidY = 240 - (pblPercent * 2.2);

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

      <!-- Part 1: Interactive Eulerian Box Trapping Simulator + Graphical Column -->
      <div class="glass-panel" style="padding: 30px;">
        <div style="display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
          <div>
            <span class="badge badge-amber" style="margin-bottom: 6px;">SIMULATOR 1</span>
            <h3 style="font-size: 1.4rem;">Eulerian Box Dilution & Vertical Column Visualizer</h3>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">
              Dynamically computes Ventilation Index ($VI = H \\cdot U$) and renders the real-time atmospheric compression
            </p>
          </div>
          <span class="badge ${trapBadge}" id="trap-status-badge" style="font-size: 0.82rem; padding: 6px 14px;">
            ${trapStatus}
          </span>
        </div>

        <!-- 3-Column Grid: Sliders | Dynamic SVG Column | Live Numerical Readout -->
        <div style="display: grid; grid-template-columns: 1.2fr 1fr 1fr; gap: 20px;" class="stack-mobile">
          <!-- Sliders -->
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <!-- PBL Height Slider -->
            <div style="background: rgba(255,255,255,0.02); padding: 12px 16px; border-radius: 10px; border: 1px solid var(--border-subtle);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <label style="font-size: 0.84rem; font-weight: 600; color: #fff;">Planetary Boundary Layer (H)</label>
                <span class="font-mono" style="color: #38bdf8; font-weight: 700;" id="val-h">${simH} m</span>
              </div>
              <input type="range" id="slider-h" min="150" max="1800" value="${simH}" step="10">
              <div style="display: flex; justify-content: space-between; font-size: 0.7rem; color: var(--text-muted); margin-top: 2px;">
                <span>150m (Nocturnal Trap)</span>
                <span>1800m (Day Convection)</span>
              </div>
            </div>

            <!-- Wind Speed Slider -->
            <div style="background: rgba(255,255,255,0.02); padding: 12px 16px; border-radius: 10px; border: 1px solid var(--border-subtle);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <label style="font-size: 0.84rem; font-weight: 600; color: #fff;">Mixed-Layer Wind (U)</label>
                <span class="font-mono" style="color: #34d399; font-weight: 700;" id="val-u">${simU} m/s</span>
              </div>
              <input type="range" id="slider-u" min="0.5" max="8.0" value="${simU}" step="0.1">
              <div style="display: flex; justify-content: space-between; font-size: 0.7rem; color: var(--text-muted); margin-top: 2px;">
                <span>0.5 m/s (Calm Stagnation)</span>
                <span>8.0 m/s (Advective Flushing)</span>
              </div>
            </div>

            <!-- Inversion Temperature Delta Slider -->
            <div style="background: rgba(255,255,255,0.02); padding: 12px 16px; border-radius: 10px; border: 1px solid var(--border-subtle);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <label style="font-size: 0.84rem; font-weight: 600; color: #fff;">Inversion Lid (ΔT 925hPa)</label>
                <span class="font-mono" style="color: #fbbf24; font-weight: 700;" id="val-inv">+${simInv}°C</span>
              </div>
              <input type="range" id="slider-inv" min="-2.0" max="8.0" value="${simInv}" step="0.2">
              <div style="display: flex; justify-content: space-between; font-size: 0.7rem; color: var(--text-muted); margin-top: 2px;">
                <span>-2.0°C (Unstable Uplift)</span>
                <span>+8.0°C (Rigid Thermal Lid)</span>
              </div>
            </div>

            <!-- Ground Emission Rate Slider -->
            <div style="background: rgba(255,255,255,0.02); padding: 12px 16px; border-radius: 10px; border: 1px solid var(--border-subtle);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <label style="font-size: 0.84rem; font-weight: 600; color: #fff;">Ground Emissions (E)</label>
                <span class="font-mono" style="color: #f43f5e; font-weight: 700;" id="val-e">${simE} units</span>
              </div>
              <input type="range" id="slider-e" min="50" max="500" value="${simE}" step="10">
              <div style="display: flex; justify-content: space-between; font-size: 0.7rem; color: var(--text-muted); margin-top: 2px;">
                <span>50 (Clean Holiday)</span>
                <span>500 (Peak Smog Episode)</span>
              </div>
            </div>
          </div>

          <!-- Middle: Graphical Vertical Column SVG Diagram -->
          <div style="background: rgba(0,0,0,0.35); border: 1px solid var(--border-medium); border-radius: 12px; padding: 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative;">
            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; margin-bottom: 8px;">
              Vertical Column Profile (0 - 2,000m)
            </div>

            <svg viewBox="0 0 240 260" style="width: 100%; height: 210px; overflow: visible;">
              <defs>
                <linearGradient id="freeTroposphere" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#0284c7" stop-opacity="0.25"/>
                  <stop offset="100%" stop-color="#0369a1" stop-opacity="0.1"/>
                </linearGradient>
                <linearGradient id="smogTrap" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#78350f" stop-opacity="0.4"/>
                  <stop offset="100%" stop-color="#7f1d1d" stop-opacity="0.85"/>
                </linearGradient>
              </defs>

              <!-- Sky Column Background -->
              <rect x="35" y="10" width="170" height="230" rx="8" fill="url(#freeTroposphere)" stroke="rgba(255,255,255,0.1)"/>

              <!-- Trapped Boundary Layer Fill (Dynamic Height) -->
              <rect id="svg-trap-fill" x="35" y="${lidY}" width="170" height="${240 - lidY}" rx="0" fill="url(#smogTrap)"/>

              <!-- Inversion Lid Bar (Dynamic Y) -->
              <line id="svg-lid-line" x1="30" y1="${lidY}" x2="210" y2="${lidY}" stroke="#fbbf24" stroke-width="3.5" stroke-dasharray="6,3"/>
              
              <!-- Lid Label -->
              <text id="svg-lid-text" x="120" y="${Math.max(25, lidY - 6)}" fill="#fbbf24" font-size="10" font-family="JetBrains Mono" font-weight="700" text-anchor="middle">
                INVERSION LID (H: ${simH}m)
              </text>

              <!-- Elevation Ticks on Left -->
              <text x="5" y="24" fill="#64748b" font-size="9" font-family="JetBrains Mono">1800m</text>
              <text x="5" y="90" fill="#64748b" font-size="9" font-family="JetBrains Mono">1200m</text>
              <text x="5" y="160" fill="#64748b" font-size="9" font-family="JetBrains Mono">600m</text>
              <text x="5" y="235" fill="#64748b" font-size="9" font-family="JetBrains Mono">0m</text>

              <!-- Ground Base -->
              <rect x="30" y="240" width="180" height="8" rx="2" fill="#334155"/>
              <text x="120" y="254" fill="#94a3b8" font-size="9" font-family="Inter" text-anchor="middle">Ground Surface (Delhi Urban Basin)</text>

              <!-- Trapped Pollutants Visual Particle Bubbles -->
              <circle cx="65" cy="${Math.min(230, lidY + 30)}" r="4" fill="#f87171" opacity="0.8"/>
              <circle cx="110" cy="${Math.min(225, lidY + 45)}" r="5" fill="#ef4444" opacity="0.85"/>
              <circle cx="155" cy="${Math.min(235, lidY + 20)}" r="3.5" fill="#f97316" opacity="0.75"/>
              <circle cx="90" cy="${Math.min(230, lidY + 65)}" r="4.5" fill="#dc2626" opacity="0.9"/>
              <circle cx="140" cy="${Math.min(220, lidY + 55)}" r="5" fill="#b91c1c" opacity="0.8"/>
            </svg>

            <div style="font-size: 0.72rem; color: var(--text-muted); text-align: center; margin-top: 4px;">
              Yellow line indicates the thermodynamic capping inversion lid suppressing vertical dispersion.
            </div>
          </div>

          <!-- Right: Live Numerical Readout -->
          <div style="background: rgba(0,0,0,0.35); border: 1px solid var(--border-medium); border-radius: 12px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; margin-bottom: 10px;">
                Real-Time Physical Outputs
              </div>

              <!-- Ventilation Index -->
              <div style="background: rgba(255,255,255,0.03); padding: 14px; border-radius: 8px; margin-bottom: 12px; border-left: 4px solid #38bdf8;">
                <div style="font-size: 0.72rem; color: var(--text-muted);">VENTILATION CAPACITY</div>
                <div class="font-mono" style="font-size: 1.8rem; font-weight: 800; color: #38bdf8;" id="computed-vi">
                  ${vi} <span style="font-size: 0.9rem; font-weight: 500;">m²/s</span>
                </div>
                <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 2px;" id="vi-benchmark">
                  ${vi < 2000 ? '⚠️ < 2,000 m²/s: Severe Stagnation' : (vi > 6000 ? '✅ > 6,000 m²/s: Optimal Flushing' : '⚠️ 2,000 - 6,000 m²/s: Moderate')}
                </div>
              </div>

              <!-- Estimated Surface Concentration -->
              <div style="background: rgba(255,255,255,0.03); padding: 14px; border-radius: 8px; border-left: 4px solid #ef4444;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div style="font-size: 0.72rem; color: var(--text-muted);">SURFACE PM2.5 CONCENTRATION</div>
                  <span class="font-mono" style="font-size: 0.7rem; color: #fb7185;" id="computed-mult">${invMultiplier.toFixed(2)}x Lid Effect</span>
                </div>
                <div class="font-mono" style="font-size: 2rem; font-weight: 800; color: #ef4444;" id="computed-pm25">
                  ${baseConc} <span style="font-size: 1rem; font-weight: 500;">µg/m³</span>
                </div>
                <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 2px;" id="computed-category">
                  ${baseConc > 250 ? 'CPCB Severity: Severe / Emergency' : (baseConc > 120 ? 'CPCB Severity: Very Poor' : 'CPCB Severity: Moderate')}
                </div>
              </div>
            </div>

            <div style="font-size: 0.72rem; color: var(--text-muted); border-top: 1px solid var(--border-subtle); padding-top: 8px;">
              Formula: $C = \\frac{E \\cdot 1000}{H \\cdot U} \\times (1 + \\max(0, 0.18 \\cdot \\Delta T))$
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

        <!-- Physical Synthesis Card + Fortran Namelist Snippet -->
        <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 20px;" class="stack-mobile">
          <div style="padding: 18px 22px; background: rgba(16, 185, 129, 0.08); border-radius: 12px; border-left: 4px solid #10b981; font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
            <strong style="color: #fff;">Scientific Verdict for SIH Defense:</strong>
            <p id="fb-verdict-text" style="margin-top: 6px;">
              When aerosol-radiation feedback is activated (<code class="font-mono" style="color:#fff;">aer_ra_feedback=1</code>), the optical thickness of the smog plume absorbs and scatters incoming sunlight. 
              Surface solar radiation drops by <strong>18 W/m²</strong>, surface temperature cools by <strong>1.4°C</strong>, and vertical buoyant thermals weaken—arresting midday boundary layer expansion at <strong>380m instead of 520m</strong>. 
              This compression locks emissions near the ground, producing a <strong>+24.4% (+95 µg/m³) increase</strong> in ground-level PM2.5 concentration.
            </p>
          </div>

          <!-- WRF-Chem Namelist Terminal Box -->
          <div class="terminal-box">
            <div style="color: #94a3b8; font-size: 0.7rem; margin-bottom: 6px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 4px;">
              WRF-Chem v4.5.1 / namelist.input
            </div>
            <span style="color: #f59e0b;">&chem</span><br>
            &nbsp;chem_opt = 106, <span style="color: #64748b;">! RADM2 + MADE/SORGAM</span><br>
            &nbsp;bio_emiss_opt = 1,<br>
            &nbsp;biomass_burn_opt = 1, <span style="color: #64748b;">! FINN FRP fires</span><br>
            &nbsp;<strong style="color: #38bdf8;">aer_ra_feedback = ${currentFeedbackMode === 'on' ? '1' : '0'}</strong>, <span style="color: #34d399;">! ARI coupling</span><br>
            &nbsp;aer_op_opt = 1,<br>
            &nbsp;phot_opt = 2, <span style="color: #64748b;">! Fast-J photolysis</span><br>
            <span style="color: #f59e0b;">/</span>
          </div>
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
    if (valH) valH.textContent = `${simH} m`;

    const valU = document.getElementById('val-u');
    if (valU) valU.textContent = `${simU.toFixed(1)} m/s`;

    const valInv = document.getElementById('val-inv');
    if (valInv) valInv.textContent = `${simInv >= 0 ? '+' : ''}${simInv.toFixed(1)}°C`;

    const valE = document.getElementById('val-e');
    if (valE) valE.textContent = `${simE} units`;

    // Recalculate outputs
    const vi = Math.round(simH * simU);
    const compVI = document.getElementById('computed-vi');
    if (compVI) compVI.innerHTML = `${vi} <span style="font-size: 0.9rem; font-weight: 500;">m²/s</span>`;

    const benchEl = document.getElementById('vi-benchmark');
    if (benchEl) {
      if (vi < 2000) benchEl.textContent = '⚠️ < 2,000 m²/s: Severe Stagnation';
      else if (vi > 6000) benchEl.textContent = '✅ > 6,000 m²/s: Optimal Flushing';
      else benchEl.textContent = '⚠️ 2,000 - 6,000 m²/s: Moderate';
    }

    const invMultiplier = 1.0 + Math.max(0, simInv * 0.18);
    const multEl = document.getElementById('computed-mult');
    if (multEl) multEl.textContent = `${invMultiplier.toFixed(2)}x Lid Effect`;

    const baseConc = Math.round(((simE * 1000) / (Math.max(simH, 100) * Math.max(simU, 0.4))) * invMultiplier);
    const compPM = document.getElementById('computed-pm25');
    if (compPM) compPM.innerHTML = `${baseConc} <span style="font-size: 1rem; font-weight: 500;">µg/m³</span>`;

    const compCat = document.getElementById('computed-category');
    if (compCat) {
      if (baseConc > 250) compCat.textContent = 'CPCB Severity: Severe / Emergency';
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

    // Update SVG Column
    const pblPercent = Math.min(85, Math.max(18, Math.round((simH / 1800) * 80)));
    const lidY = 240 - (pblPercent * 2.2);

    const svgTrapFill = document.getElementById('svg-trap-fill');
    if (svgTrapFill) {
      svgTrapFill.setAttribute('y', lidY);
      svgTrapFill.setAttribute('height', 240 - lidY);
    }

    const svgLidLine = document.getElementById('svg-lid-line');
    if (svgLidLine) {
      svgLidLine.setAttribute('y1', lidY);
      svgLidLine.setAttribute('y2', lidY);
    }

    const svgLidText = document.getElementById('svg-lid-text');
    if (svgLidText) {
      svgLidText.setAttribute('y', Math.max(25, lidY - 6));
      svgLidText.textContent = `INVERSION LID (H: ${simH}m)`;
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
