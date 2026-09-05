/**
 * PRAVAHA - Section 1: Problem Statement Master Command
 * Sourced from SIH26082 Build Blueprint (Pages 1-5, 29-33).
 */

export function renderProblemStatement() {
  return `
    <div style="display: flex; flex-direction: column; gap: 28px;">
      <!-- Hero Header Banner -->
      <div class="glass-panel" style="padding: 36px; border-color: rgba(6, 182, 212, 0.3); background: linear-gradient(135deg, rgba(14, 19, 31, 0.85) 0%, rgba(18, 28, 48, 0.75) 100%);">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
          <span class="badge badge-cyan">SMART INDIA HACKATHON 2026</span>
          <span class="badge badge-purple">PROBLEM ID: SIH26082</span>
          <span class="badge badge-emerald">DISASTER MANAGEMENT</span>
        </div>
        <h1 style="font-size: 2.4rem; line-height: 1.2; margin-bottom: 14px;">
          Air Pollution–Weather <span class="gradient-text-cyan">Coupled Forecasting System</span>
          <span style="font-size: 1.5rem; display: block; color: var(--text-secondary); font-weight: 500; margin-top: 6px;">
            Delhi-NCR Focus: 72-Hour Physics-Informed Ventilation, Trapping & Feedback Architecture
          </span>
        </h1>
        <p style="font-size: 1.05rem; color: var(--text-secondary); max-width: 960px; margin-bottom: 24px;">
          Commissioned by the <strong style="color: #fff;">Ministry of Earth Sciences (MoES)</strong> & the <strong style="color: #fff;">National Centre for Medium Range Weather Forecasting (NCMRWF)</strong>. 
          PRAVAHA dismantles the false choice between impossible live numerical HPC models and naive black-box AI by deploying a 
          <strong style="color: #38bdf8;">scientifically vetted hybrid operational pipeline</strong> backed by verified 
          <strong style="color: #34d399;">WRF-Chem aerosol-radiation feedback evidence</strong>.
        </p>

        <!-- Quick Summary Stats -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
          <div class="glass-card" style="padding: 16px;">
            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Forecast Horizon</div>
            <div style="font-size: 1.6rem; font-weight: 800; color: #38bdf8;" class="font-mono">72 Hours</div>
            <div style="font-size: 0.8rem; color: var(--text-secondary);">Hourly multi-pollutant trajectory</div>
          </div>
          <div class="glass-card" style="padding: 16px;">
            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Spatial Domain</div>
            <div style="font-size: 1.6rem; font-weight: 800; color: #a855f7;" class="font-mono">NCR + Upwind</div>
            <div style="font-size: 0.8rem; color: var(--text-secondary);">Delhi, 14 Haryana, 8 UP, 2 Raj districts</div>
          </div>
          <div class="glass-card" style="padding: 16px;">
            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Coupling Mechanism</div>
            <div style="font-size: 1.6rem; font-weight: 800; color: #10b981;" class="font-mono">ARI / ACI</div>
            <div style="font-size: 0.8rem; color: var(--text-secondary);">Aerosol-Radiation Feedback test</div>
          </div>
          <div class="glass-card" style="padding: 16px;">
            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Decision Layer</div>
            <div style="font-size: 1.6rem; font-weight: 800; color: #f59e0b;" class="font-mono">CAQM GRAP</div>
            <div style="font-size: 0.8rem; color: var(--text-secondary);">Statutory Stages I through IV</div>
          </div>
        </div>
      </div>

      <!-- Two Column: Explicit Mandate vs Implicit Evaluator Expectations -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(460px, 1fr)); gap: 24px;">
        <!-- Left: Explicit Mandate -->
        <div class="glass-panel" style="padding: 28px;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
            <div style="width: 32px; height: 32px; border-radius: 8px; background: rgba(59, 130, 246, 0.2); display: flex; align-items: center; justify-content: center; color: #60a5fa;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div>
              <h2 style="font-size: 1.25rem;">Explicit Problem Mandate</h2>
              <p style="font-size: 0.8rem; color: var(--text-muted);">What the official MoES / NCMRWF statement directly requires</p>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 14px;">
            <div style="padding: 12px 16px; background: rgba(255,255,255,0.03); border-radius: 10px; border-left: 3px solid #38bdf8;">
              <div style="font-weight: 600; font-size: 0.92rem; color: #f8fafc; margin-bottom: 4px;">1. Continuous 72-Hour Lead Time</div>
              <p style="font-size: 0.84rem; color: var(--text-secondary);">
                Hourly forward predictions (H+1 to H+72) rather than a single static next-day number. Must capture nocturnal peak trapping and daytime solar convective dispersion.
              </p>
            </div>

            <div style="padding: 12px 16px; background: rgba(255,255,255,0.03); border-radius: 10px; border-left: 3px solid #10b981;">
              <div style="font-weight: 600; font-size: 0.92rem; color: #f8fafc; margin-bottom: 4px;">2. Multi-Pollutant Suite (Not Just PM2.5)</div>
              <p style="font-size: 0.84rem; color: var(--text-secondary);">
                Explicit forecasting of PM2.5, PM10, Ozone (O3), and Nitrogen Dioxide (NO2). Ozone photochemistry must be treated independently as it peaks inversely to particulate matter.
              </p>
            </div>

            <div style="padding: 12px 16px; background: rgba(255,255,255,0.03); border-radius: 10px; border-left: 3px solid #f59e0b;">
              <div style="font-weight: 600; font-size: 0.92rem; color: #f8fafc; margin-bottom: 4px;">3. PBL Height & Inversion Diagnostics</div>
              <p style="font-size: 0.84rem; color: var(--text-secondary);">
                Planetary Boundary Layer (PBL) mixing depth and thermal inversion lid strength (ΔT 925 hPa) must be visible first-class physical diagnostic variables, not hidden black-box weights.
              </p>
            </div>

            <div style="padding: 12px 16px; background: rgba(255,255,255,0.03); border-radius: 10px; border-left: 3px solid #ec4899;">
              <div style="font-weight: 600; font-size: 0.92rem; color: #f8fafc; margin-bottom: 4px;">4. Regional Stubble Plume Tracking</div>
              <p style="font-size: 0.84rem; color: var(--text-secondary);">
                Ingestion of satellite thermal hotspots (NASA FIRMS) converted into Fire Radiative Power (FRP) and routed via wind transport trajectories into the Delhi airshed.
              </p>
            </div>

            <div style="padding: 12px 16px; background: rgba(255,255,255,0.03); border-radius: 10px; border-left: 3px solid #a855f7;">
              <div style="font-weight: 600; font-size: 0.92rem; color: #f8fafc; margin-bottom: 4px;">5. Aerosol-Weather Feedback Demonstration</div>
              <p style="font-size: 0.84rem; color: var(--text-secondary);">
                Must demonstrate that high aerosol concentrations modify solar radiation, suppress surface temperatures, and collapse PBL height—proving true atmospheric two-way interaction.
              </p>
            </div>
          </div>
        </div>

        <!-- Right: Implicit Evaluator Expectations -->
        <div class="glass-panel" style="padding: 28px;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
            <div style="width: 32px; height: 32px; border-radius: 8px; background: rgba(168, 85, 247, 0.2); display: flex; align-items: center; justify-content: center; color: #c084fc;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            </div>
            <div>
              <h2 style="font-size: 1.25rem;">Implicit Evaluator Expectations</h2>
              <p style="font-size: 0.8rem; color: var(--text-muted);">What SIH jury members will rigorously test during defense</p>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 14px;">
            <div style="padding: 12px 16px; background: rgba(255,255,255,0.03); border-radius: 10px; border-left: 3px solid #60a5fa;">
              <div style="font-weight: 600; font-size: 0.92rem; color: #f8fafc; margin-bottom: 4px;">Zero Temporal Data Leakage</div>
              <p style="font-size: 0.84rem; color: var(--text-secondary);">
                Strict expanding-window time splits. Lag features must strictly use data <= forecast issue time T. Random cross-validation is an instant disqualifier in time-series evaluation.
              </p>
            </div>

            <div style="padding: 12px 16px; background: rgba(255,255,255,0.03); border-radius: 10px; border-left: 3px solid #34d399;">
              <div style="font-weight: 600; font-size: 0.92rem; color: #f8fafc; margin-bottom: 4px;">Honest Calibrated Uncertainty (P10/P50/P90)</div>
              <p style="font-size: 0.84rem; color: var(--text-secondary);">
                Evaluators know deterministic predictions at H+72 are physically impossible. Forecasts must include calibrated confidence intervals that widen naturally with lead time.
              </p>
            </div>

            <div style="padding: 12px 16px; background: rgba(255,255,255,0.03); border-radius: 10px; border-left: 3px solid #fbbf24;">
              <div style="font-weight: 600; font-size: 0.92rem; color: #f8fafc; margin-bottom: 4px;">Progressive Baselines (Skill Score)</div>
              <p style="font-size: 0.84rem; color: var(--text-secondary);">
                Proving skill over Persistence ($PM_{t+h} = PM_t$), Climatological Mean, and Weather-only models. An ML model without baseline benchmarks cannot prove scientific value.
              </p>
            </div>

            <div style="padding: 12px 16px; background: rgba(255,255,255,0.03); border-radius: 10px; border-left: 3px solid #f43f5e;">
              <div style="font-weight: 600; font-size: 0.92rem; color: #f8fafc; margin-bottom: 4px;">Delhi is a Receptor Airshed, Not a Closed Box</div>
              <p style="font-size: 0.84rem; color: var(--text-secondary);">
                The modeling domain must explicitly incorporate boundary inflow from Punjab, Haryana, Rajasthan, and western Uttar Pradesh. City-only models fail during trans-boundary events.
              </p>
            </div>

            <div style="padding: 12px 16px; background: rgba(255,255,255,0.03); border-radius: 10px; border-left: 3px solid #38bdf8;">
              <div style="font-weight: 600; font-size: 0.92rem; color: #f8fafc; margin-bottom: 4px;">Actionable CAQM GRAP Trigger Integration</div>
              <p style="font-size: 0.84rem; color: var(--text-secondary);">
                Translating raw concentrations into official statutory Graded Response Action Plan (GRAP) Stage I–IV advisories for District Magistrates and municipal agencies.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Critical Evaluator Red Flags & Trap Avoidance -->
      <div class="glass-panel" style="padding: 30px; border-color: rgba(244, 63, 94, 0.4); background: linear-gradient(135deg, rgba(30, 16, 22, 0.7) 0%, rgba(20, 12, 18, 0.8) 100%);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 36px; height: 36px; border-radius: 10px; background: rgba(244, 63, 94, 0.2); display: flex; align-items: center; justify-content: center; color: #fb7185;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <div>
              <h2 style="font-size: 1.3rem; color: #fb7185;">CRITICAL EVALUATOR TRAPS — What Disqualifies Teams</h2>
              <p style="font-size: 0.84rem; color: var(--text-secondary);">Common amateur claims that SIH judges immediately interrogate and penalize</p>
            </div>
          </div>
          <span class="badge badge-rose">MUST REVIEW BEFORE PITCH</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px;">
          <div style="background: rgba(0,0,0,0.4); padding: 14px 18px; border-radius: 10px; border: 1px solid rgba(244, 63, 94, 0.2);">
            <div style="color: #f87171; font-weight: 700; font-size: 0.88rem; margin-bottom: 4px;">❌ Trap 1: "Our ML is Two-Way Coupled"</div>
            <p style="font-size: 0.82rem; color: var(--text-secondary);">
              Passing wind and temperature into an ML model is <em>one-way offline forcing</em>. Coupling requires that predicted pollution alters the weather equations. PRAVAHA proves coupling via an actual WRF-Chem twin experiment (<code>aer_ra_feedback = 1 vs 0</code>).
            </p>
          </div>

          <div style="background: rgba(0,0,0,0.4); padding: 14px 18px; border-radius: 10px; border: 1px solid rgba(244, 63, 94, 0.2);">
            <div style="color: #f87171; font-weight: 700; font-size: 0.88rem; margin-bottom: 4px;">❌ Trap 2: "FIRMS Hotspots = PM2.5 Emissions"</div>
            <p style="font-size: 0.82rem; color: var(--text-secondary);">
              Hotspots are thermal pixel anomalies at satellite overpass, not emitted mass. PRAVAHA weights fires by Fire Radiative Power (FRP in Megawatts) and computes trajectory dispersion.
            </p>
          </div>

          <div style="background: rgba(0,0,0,0.4); padding: 14px 18px; border-radius: 10px; border: 1px solid rgba(244, 63, 94, 0.2);">
            <div style="color: #f87171; font-weight: 700; font-size: 0.88rem; margin-bottom: 4px;">❌ Trap 3: "Real-Time WRF-Chem on Laptop"</div>
            <p style="font-size: 0.82rem; color: var(--text-secondary);">
              A 3-km 72h WRF-Chem run takes 8+ hours on a 64-core cluster. Claiming live execution during a 36h hackathon is an instant fail. PRAVAHA honestly presents a precomputed verified research run + fast operational ML.
            </p>
          </div>

          <div style="background: rgba(0,0,0,0.4); padding: 14px 18px; border-radius: 10px; border: 1px solid rgba(244, 63, 94, 0.2);">
            <div style="color: #f87171; font-weight: 700; font-size: 0.88rem; margin-bottom: 4px;">❌ Trap 4: "Street-Level Forecasting" on 5km Grid</div>
            <p style="font-size: 0.82rem; color: var(--text-secondary);">
              Global models (CAMS 40km, GFS 25km) cannot resolve street canyons. PRAVAHA honestly defines its domain as a 5-km gridded physical-statistical fusion across Delhi-NCR.
            </p>
          </div>

          <div style="background: rgba(0,0,0,0.4); padding: 14px 18px; border-radius: 10px; border: 1px solid rgba(244, 63, 94, 0.2);">
            <div style="color: #f87171; font-weight: 700; font-size: 0.88rem; margin-bottom: 4px;">❌ Trap 5: "Stubble Burning Caused 40%"</div>
            <p style="font-size: 0.82rem; color: var(--text-secondary);">
              Quantitative percentage attribution requires chemical tagging or receptor modeling. PRAVAHA reports a scientifically sound "FRP-weighted Plume Influence Score (0-100)" rather than an unverified exact percentage.
            </p>
          </div>

          <div style="background: rgba(0,0,0,0.4); padding: 14px 18px; border-radius: 10px; border: 1px solid rgba(244, 63, 94, 0.2);">
            <div style="color: #f87171; font-weight: 700; font-size: 0.88rem; margin-bottom: 4px;">❌ Trap 6: Direct Prediction of "AQI" Target</div>
            <p style="font-size: 0.82rem; color: var(--text-secondary);">
              AQI is an artificial, non-linear regulatory max-subindex function. Training ML on AQI violates physical mass conservation. PRAVAHA trains separate models for PM2.5, PM10, NO2, and O3, then computes CPCB AQI.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}
