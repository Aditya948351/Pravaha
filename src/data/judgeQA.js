/**
 * PRAVAHA - 58 Judge Defense Q&As
 * Sourced directly from Section 48 of the SIH26082 Build Blueprint.
 * Categorized into 6 core battlegrounds for team preparation and evaluator defense.
 */

export const judgeQACategories = [
  { id: "all", name: "All 58 Questions" },
  { id: "physics", name: "1. Atmospheric Physics & Coupling (Q1-10)" },
  { id: "ml", name: "2. Machine Learning & Leakage (Q11-20)" },
  { id: "wrf", name: "3. WRF-Chem & Feedback Feasibility (Q21-30)" },
  { id: "data", name: "4. Data Ingestion & Satellites (Q31-40)" },
  { id: "ops", name: "5. Operational Engineering & Scale (Q41-50)" },
  { id: "traps", name: "6. Evaluator Traps & Hard Boundaries (Q51-58)" }
];

export const judgeQAs = [
  // Category 1: Scientific & Physics Mechanisms
  {
    id: 1,
    category: "physics",
    categoryLabel: "Atmospheric Physics",
    question: "What is two-way coupling?",
    answer: "Two-way coupling means meteorology transports and chemically transforms pollutants, while the pollutants simultaneously alter radiation, photolysis, surface temperature, and planetary boundary layer (PBL) development, which in turn dynamically alters pollutant dispersion. If chemistry doesn't alter weather equations, it is only one-way offline forcing.",
    trapToAvoid: "Never say 'our ML is two-way coupled because we input temperature and wind'. That is one-way forcing."
  },
  {
    id: 2,
    category: "physics",
    categoryLabel: "Atmospheric Physics",
    question: "Why does Planetary Boundary Layer (PBL) height matter?",
    answer: "PBL height represents the vertical depth of the turbulent mixing layer. By the box model principle (C ∝ E / (H · U)), when nocturnal cooling or winter stagnation suppresses PBL from 1,200m down to 200m, the same ground emission volume is trapped in 1/6th the vertical space, multiplying near-surface pollutant concentrations several-fold.",
    trapToAvoid: "Don't confuse PBL height with cloud base height; PBL is the turbulent thermal mixing layer."
  },
  {
    id: 3,
    category: "physics",
    categoryLabel: "Atmospheric Physics",
    question: "Why is Delhi not a closed box?",
    answer: "Delhi is a regional receptor within the Indo-Gangetic Plain. Boundary inflow carries upwind agricultural biomass plumes from Punjab/Haryana and desert dust from Rajasthan, while downwind advection sweeps pollutants into western Uttar Pradesh. Any city-only model without boundary flux fails during regional stagnation episodes.",
    trapToAvoid: "Never claim Delhi pollution is 100% local or 100% stubble burning. It is an interplay of regional inflow and local entrapment."
  },
  {
    id: 4,
    category: "physics",
    categoryLabel: "Atmospheric Physics",
    question: "Is a thermal inversion the same as low PBL height?",
    answer: "No. A thermal inversion is a negative lapse rate where temperature increases with altitude (dT/dz > 0), forming a buoyant lid that caps vertical mixing. Low PBL height is the depth of the active mixing layer. While strong surface inversions typically cause extremely shallow PBLs, they are distinct physical parameters.",
    trapToAvoid: "Don't use the terms interchangeably; explain that inversion acts as the capping lid defining the upper limit of the PBL."
  },
  {
    id: 5,
    category: "physics",
    categoryLabel: "Atmospheric Physics",
    question: "Is NASA FIRMS fire activity equal to emitted PM2.5?",
    answer: "No. A satellite thermal hotspot is an observation of radiative fire temperature at the moment of satellite overpass, not an emission inventory. To convert to emissions, you must weight hotspots by Fire Radiative Power (FRP), apply biomass consumption factors, and model atmospheric plume injection height.",
    trapToAvoid: "Never claim 'we had 1,500 hotspots so stubble burning emitted 1,500 tons of PM2.5'."
  },
  {
    id: 6,
    category: "physics",
    categoryLabel: "Atmospheric Physics",
    question: "Why include Ozone (O3) in an air quality forecast?",
    answer: "Ozone is a secondary photochemical oxidant formed by non-linear reactions between NOx and VOCs under solar radiation. It exhibits a severe diurnal anti-correlation with PM2.5: during daytime solar peaks when PM2.5 dilutes, Ozone peaks, frequently becoming the dominant CPCB AQI driver in summer and post-monsoon afternoons.",
    trapToAvoid: "Do not focus exclusively on PM2.5; CPCB AQI is defined by the maximum sub-index across all criteria pollutants."
  },
  {
    id: 7,
    category: "physics",
    categoryLabel: "Atmospheric Physics",
    question: "Why predict individual pollutants before calculating AQI?",
    answer: "AQI is a piecewise non-linear regulatory index determined by the worst sub-index among PM2.5, PM10, NO2, SO2, CO, and O3. Training an ML model directly on an aggregate AQI index destroys underlying atmospheric chemical conservation laws and conceals the physical driver of health deterioration.",
    trapToAvoid: "Never train ML directly on target 'AQI'; train on [PM2.5, PM10, NO2, O3] and apply the official CPCB linear interpolation formula."
  },
  {
    id: 8,
    category: "physics",
    categoryLabel: "Atmospheric Physics",
    question: "What is Secondary Aerosol formation?",
    answer: "Secondary inorganic aerosols (SIA) such as Ammonium Sulfate ((NH4)2SO4) and Ammonium Nitrate (NH4NO3) are formed in the atmosphere through chemical gas-to-particle reactions involving precursor gases (SO2 from industry, NOx from vehicles, NH3 from agriculture/sewage) under high relative humidity and low temperatures.",
    trapToAvoid: "Don't treat all particulate matter as tailpipe exhaust; in Delhi winter, secondary aerosols often constitute 40-60% of total PM2.5 mass."
  },
  {
    id: 9,
    category: "physics",
    categoryLabel: "Atmospheric Physics",
    question: "What is the limitation of your Inversion Index?",
    answer: "Our Inversion Trapping Score is derived from vertical temperature gradients (T_925hPa - T_2m) from ERA5/GFS grids and radiosondes. It operates as an operational proxy for atmospheric stability, not a continuous micro-meteorological sonic anemometer measurement at 1-meter vertical resolution.",
    trapToAvoid: "Admit the operational resolution honestly; evaluators respect transparency over exaggerated sensor claims."
  },
  {
    id: 10,
    category: "physics",
    categoryLabel: "Atmospheric Physics",
    question: "What proves your model is scientifically meaningful?",
    answer: "Three pillars of proof: (1) An ablation study showing that removing PBL height and Inversion features degrades 72-hour forecast skill by >18% RMSE; (2) A reproducible WRF-Chem experiment demonstrating quantifiable aerosol-radiation dimming; and (3) Physical consistency checks ensuring mass conservation.",
    trapToAvoid: "Never rely solely on a single R² number; show physical feature importance and meteorological sensitivity curves."
  },

  // Category 2: Machine Learning & Leakage
  {
    id: 11,
    category: "ml",
    categoryLabel: "Machine Learning",
    question: "Why LightGBM instead of deep Transformers or LSTMs?",
    answer: "Atmospheric tabular data exhibits heterogeneous physical regimes (wind speed, solar radiation, lag concentrations). Gradient-boosted decision trees (LightGBM) consistently outperform Transformers on tabular time-series benchmarks, train 100x faster, offer native pinball loss for quantile forecasting, and allow instant TreeSHAP explanations.",
    trapToAvoid: "Don't say 'we didn't have time for AI'; state that tree-based quantile ensembles represent the empirically validated state-of-the-art for tabular air-quality forecasts."
  },
  {
    id: 12,
    category: "ml",
    categoryLabel: "Machine Learning",
    question: "Why not use a Spatial-Temporal Graph Neural Network (ST-GNN)?",
    answer: "ST-GNNs are architecturally compelling for fixed sensor graphs, but in operational reality, Indian CAAQMS stations frequently suffer telemetry dropouts. If graph adjacency matrices fracture, GNN inference fails. LightGBM with spatial distance embeddings provides fault-tolerant inference even when 5 stations drop offline.",
    trapToAvoid: "Acknowledge ST-GNN as a valuable research baseline, while defending LightGBM's operational fault tolerance."
  },
  {
    id: 13,
    category: "ml",
    categoryLabel: "Machine Learning",
    question: "How do you mathematically prevent temporal data leakage?",
    answer: "We use strict expanding-window blocked temporal splits. For any forecast issued at issue time T, features only contain observations timestamped <= T. Lagged features (t-1 to t-24) are computed strictly backward. GFS weather inputs use only the forecast cycle available prior to T.",
    trapToAvoid: "Never do random train_test_split() on time-series data; evaluators will instantly disqualify the solution for data leakage."
  },
  {
    id: 14,
    category: "ml",
    categoryLabel: "Machine Learning",
    question: "What are your baseline comparison models?",
    answer: "We benchmark against four progressive baselines: (1) Persistence model (PM(t+h) = PM(t)); (2) Historical seasonal diurnal mean; (3) Weather-only LightGBM (meteorology without pollutant lags); and (4) Global CAMS raw forecast fields. PRAVAHA must prove positive skill score against all four.",
    trapToAvoid: "Never report an R² without comparing it to a simple 24-hour persistence baseline."
  },
  {
    id: 15,
    category: "ml",
    categoryLabel: "Machine Learning",
    question: "What if your model performance degrades at Lead Time H+72?",
    answer: "All numerical and statistical models experience skill decay as forecast horizons lengthen. We convey this transparently: our conformal prediction intervals naturally widen from ±25 µg/m³ at H+6 to ±85 µg/m³ at H+72, shifting decision support from deterministic numbers to probabilistic threshold alerts.",
    trapToAvoid: "Never claim 95% accuracy uniformly across all 72 hours; all physical forecasts experience entropy-driven uncertainty growth."
  },
  {
    id: 16,
    category: "ml",
    categoryLabel: "Machine Learning",
    question: "How does the model handle extreme, unprecedented smog peaks?",
    answer: "Standard MSE loss penalizes average errors and underpredicts extreme tail events. We mitigate this using asymmetric quantile loss (pinball loss) trained on upper percentiles (P90), paired with meteorological interaction features that flag simultaneous calm winds (<1 m/s) and severe nocturnal inversions.",
    trapToAvoid: "Don't claim the model predicts 1,000 µg/m³ out of sample; explain that quantile regression accurately captures the upper tail risk envelope."
  },
  {
    id: 17,
    category: "ml",
    categoryLabel: "Machine Learning",
    question: "How do you generate forecasts for unmonitored grid cells?",
    answer: "We employ a two-step spatial fusion: (1) A regional physical background grid derived from GFS weather and downscaled CAMS chemistry at 0.05° (~5 km); and (2) Residual spatial kriging / Inverse Distance Weighting of station-level ML bias corrections across the NCR bounding box.",
    trapToAvoid: "Never call simple point interpolation 'street-level forecasting'; call it a 5-km gridded physical-statistical fusion."
  },
  {
    id: 18,
    category: "ml",
    categoryLabel: "Machine Learning",
    question: "How do you explain a prediction to a government official?",
    answer: "We render TreeSHAP waterfall cards that decompose the predicted concentration into clear physical contributors: e.g., 'Predicted PM2.5: 380 µg/m³ (+110 from nocturnal inversion trapping, +65 from Punjab wind advection, +40 from baseline local traffic, -15 from residual humidity)'.",
    trapToAvoid: "Don't show raw coefficient weights or complex math to an administrator; translate SHAP values into physical narrative cards."
  },
  {
    id: 19,
    category: "ml",
    categoryLabel: "Machine Learning",
    question: "How do you calibrate uncertainty intervals?",
    answer: "We implement Split Conformal Prediction on a rolling 14-day holdout set. By computing non-conformity scores between quantile predictions (P10, P90) and ground-truth observations, we dynamically calibrate the interval width to guarantee an empirical 80% coverage guarantee.",
    trapToAvoid: "Don't just add an arbitrary '±15%' error bar; cite conformal prediction or quantile loss."
  },
  {
    id: 20,
    category: "ml",
    categoryLabel: "Machine Learning",
    question: "Why use multi-output individual models instead of a single scalar?",
    answer: "Because PM2.5, PM10, and Ozone respond to fundamentally conflicting atmospheric mechanisms: sunlight destroys particulate stagnation but generates Ozone; rainfall scavenges PM10 quickly but washes PM2.5 slower. Decoupled sub-models preserve distinct chemical response dynamics.",
    trapToAvoid: "Explain that each pollutant has a unique atmospheric lifetime and reaction rate."
  },

  // Category 3: WRF-Chem & Feedback Feasibility
  {
    id: 21,
    category: "wrf",
    categoryLabel: "WRF-Chem & Feedback",
    question: "Are you running WRF-Chem live in real-time during the hackathon?",
    answer: "No, and claiming so would be scientifically fraudulent. A fully coupled 3-nested WRF-Chem run at 3-km resolution over northern India requires 64+ HPC cores and takes 8-12 hours per 72-hour forecast cycle. We utilize precomputed, reproducible WRF-Chem hindcasts for the Nov 2017 episode to demonstrate aerosol-radiation feedback, while running a fast hybrid ML inference engine for operational real-time forecasting.",
    trapToAvoid: "NEVER claim live WRF-Chem on a laptop. Judges will ask to see your SLURM cluster and namelist.input immediately."
  },
  {
    id: 22,
    category: "wrf",
    categoryLabel: "WRF-Chem & Feedback",
    question: "Why can't numerical WRF-Chem be run live for emergency operations?",
    answer: "Operational numerical chemical transport models require massive input staging (boundary conditions from global models, emission inventories like EDGAR/HTAP, fire injection preprocessing). If any upstream satellite feed is delayed, the operational forecast cycle misses its deadline. A hybrid system decouples heavy physics into offline learning and fast online inference.",
    trapToAvoid: "Contrast HPC compile/execution latency with emergency response requirements."
  },
  {
    id: 23,
    category: "wrf",
    categoryLabel: "WRF-Chem & Feedback",
    question: "What is your operational fallback if weather models fail?",
    answer: "We implement an automatic tiered fallback: (1) If GFS 0.25° fails, fallback to IMD numerical forecasts; (2) If live forecast weather fails, fallback to a 5-year climatological diurnal weather profile; (3) The dashboard immediately flags data freshness as 'Degraded Mode' and widens uncertainty bands.",
    trapToAvoid: "Always have a graceful fallback; never let the dashboard crash with an unhandled exception."
  },
  {
    id: 24,
    category: "wrf",
    categoryLabel: "WRF-Chem & Feedback",
    question: "Which emissions inventory did you configure for WRF-Chem?",
    answer: "We configured the anthropogenic emissions from HTAPv3.1 / EDGAR-v5.0 downscaled to the Indo-Gangetic Plain, supplemented by FINN (Fire Inventory from NCAR) biomass burning emissions derived from MODIS/VIIRS fire detections.",
    trapToAvoid: "Don't say 'we didn't use emissions'; WRF-Chem cannot run without an emission input file (wrfchemi)."
  },
  {
    id: 25,
    category: "wrf",
    categoryLabel: "WRF-Chem & Feedback",
    question: "What is your exact Aerosol-Radiation Feedback test?",
    answer: "We executed twin WRF-Chem simulations for the Nov 6–13, 2017 Delhi Smog episode differing by only one parameter: `aer_ra_feedback = 1` (Feedback-ON) versus `aer_ra_feedback = 0` (Feedback-OFF). Comparing the outputs proved that aerosol backscattering reduced surface solar radiation by ~18 W/m², lowering surface temperature, suppressing midday PBL height by 140m, and increasing surface PM2.5 entrapment by 24%.",
    trapToAvoid: "This is your single biggest winning card: know `aer_ra_feedback = 1 vs 0` cold."
  },
  {
    id: 26,
    category: "wrf",
    categoryLabel: "WRF-Chem & Feedback",
    question: "What are the primary sources of error in WRF-Chem simulations?",
    answer: "The primary errors stem from outdated static emission inventories (which miss sudden construction or traffic changes), uncertainties in fire plume injection heights, and coarse representation of urban canopy roughness in the Noah land surface model.",
    trapToAvoid: "Acknowledge scientific limitations candidly; evaluators value rigorous honesty."
  },
  {
    id: 27,
    category: "wrf",
    categoryLabel: "WRF-Chem & Feedback",
    question: "What chemical mechanism was configured in WRF-Chem?",
    answer: "We configured the RADM2 (Regional Acid Deposition Model 2) photochemical mechanism coupled with MADE/SORGAM (Modal Aerosol Dynamics Model for Europe / Secondary Organic Aerosol Model) for aerosol dynamics.",
    trapToAvoid: "Have the chemical mechanism name ready (RADM2/MADE-SORGAM or MOZART/MOSAIC)."
  },
  {
    id: 28,
    category: "wrf",
    categoryLabel: "WRF-Chem & Feedback",
    question: "How do you validate Planetary Boundary Layer (PBL) height?",
    answer: "We validate model PBL height against available IMD radiosonde sounding launches at Aya Nagar (00:00 and 12:00 UTC) using the bulk Richardson number method, and against ERA5 reanalysis boundary layer diagnostics.",
    trapToAvoid: "Show you understand how meteorologists measure PBL height (radiosondes/micropulse lidars)."
  },
  {
    id: 29,
    category: "wrf",
    categoryLabel: "WRF-Chem & Feedback",
    question: "How do you validate stubble plume transport trajectories?",
    answer: "We correlate HYSPLIT backward trajectories with high-density NASA VIIRS fire clusters in Punjab/Haryana and cross-verify with downwind spatial increases in Sentinel-5P TROPOMI Carbon Monoxide (CO) and Aerosol Optical Depth (AOD) swaths.",
    trapToAvoid: "Use CO as a combustion tracer to corroborate fire plume transport."
  },
  {
    id: 30,
    category: "wrf",
    categoryLabel: "WRF-Chem & Feedback",
    question: "Why not use only HYSPLIT for forecasting?",
    answer: "HYSPLIT is a Lagrangian particle dispersion model that computes kinematics and advection pathways; it does not model non-linear secondary photochemical transformations, aerosol-radiation thermodynamics, or localized urban street-canyon stagnation.",
    trapToAvoid: "Distinguish trajectory tracing (HYSPLIT) from full photochemical transport."
  },

  // Category 4: Data Ingestion & Satellites
  {
    id: 31,
    category: "data",
    categoryLabel: "Data & Satellites",
    question: "Is CPCB CAAQMS data open and freely available?",
    answer: "CPCB provides real-time public dashboard feeds and the CCR (Central Control Room) portal. While live public data can be ingested for research and public-interest warning, bulk historical scraping requires session-handling, rate-limit throttling, and provenance documentation.",
    trapToAvoid: "Don't claim you have a private secret government database; explain your automated public ingestion pipeline."
  },
  {
    id: 32,
    category: "data",
    categoryLabel: "Data & Satellites",
    question: "Why use ERA5 Reanalysis instead of just raw station weather?",
    answer: "Station weather sensors frequently suffer calibration drift or lack upper-air observations. ERA5 provides a consistent, physics-constrained 4D atmospheric reanalysis covering vertical pressure levels (1000 to 700 hPa), giving us the vertical temperature profiles essential for inversion calculations.",
    trapToAvoid: "Explain that ground weather stations cannot measure vertical atmospheric temperature profiles aloft."
  },
  {
    id: 33,
    category: "data",
    categoryLabel: "Data & Satellites",
    question: "Why use GFS instead of ERA5 for operational forecasting?",
    answer: "ERA5 has a 5-day release latency (ERA5T), making it strictly a historical reanalysis dataset. For future 72-hour operational forecasting, we must use real-time NOAA GFS 0.25° or NCMRWF operational numerical forecast cycles.",
    trapToAvoid: "Never claim you forecast future weather using ERA5; ERA5 is strictly for historical training and hindcasts."
  },
  {
    id: 34,
    category: "data",
    categoryLabel: "Data & Satellites",
    question: "Why include CAMS global chemical forecasts?",
    answer: "Copernicus Atmospheric Monitoring Service (CAMS) provides regional background concentrations of dust, sea salt, organic matter, and sulfate entering northern India. This provides the essential boundary condition inflow that local Delhi models cannot calculate internally.",
    trapToAvoid: "Don't treat CAMS as a city forecast (it's 40km coarse); treat it as regional boundary inflow."
  },
  {
    id: 35,
    category: "data",
    categoryLabel: "Data & Satellites",
    question: "Why use satellite observations alongside ground stations?",
    answer: "Ground stations represent point measurements in urban centers with zero coverage across rural Punjab or Haryana agricultural fields. Satellites (VIIRS, MODIS, TROPOMI) provide regional spatial coverage of the entire upwind transport corridor.",
    trapToAvoid: "Highlight the complementary nature: ground stations = high temporal resolution, satellites = high spatial coverage."
  },
  {
    id: 36,
    category: "data",
    categoryLabel: "Data & Satellites",
    question: "How do you handle satellite cloud cover and data gaps?",
    answer: "During dense smog or overcast cloud cover, optical satellite sensors (MODIS AOD) suffer missing data gaps. We design satellite features as supplementary: if a satellite field is obscured, the model gracefully falls back to ground station persistence and numerical weather transport without throwing an error.",
    trapToAvoid: "Never let your inference pipeline break if a satellite granule has null values."
  },
  {
    id: 37,
    category: "data",
    categoryLabel: "Data & Satellites",
    question: "How do you handle duplicate or relocated CAAQMS stations?",
    answer: "We maintain a canonical station registry keyed by permanent alphanumeric Station ID and verified GPS coordinates, rather than relying on station string names that vary across CPCB and DPCC portals.",
    trapToAvoid: "Demonstrate that you built a clean station registry with geocoded coordinates."
  },
  {
    id: 38,
    category: "data",
    categoryLabel: "Data & Satellites",
    question: "What is the active station count in Delhi-NCR?",
    answer: "The accessible registry tracks 40+ continuous stations within NCT Delhi (operated by DPCC, CPCB, and IMD) and an additional 20+ across adjoining NCR districts (Ghaziabad, Noida, Gurugram, Faridabad, Sonipat). Our system monitors 42 high-reliability active stations.",
    trapToAvoid: "Give concrete numbers; don't guess vaguely."
  },
  {
    id: 39,
    category: "data",
    categoryLabel: "Data & Satellites",
    question: "Why do station counts differ across different government reports?",
    answer: "Different agencies count differently: some reports count only DPCC-owned stations (24), others include CPCB and IMD stations (totaling ~40 in NCT), while others count the entire National Capital Region (NCR) across three states.",
    trapToAvoid: "Clarify the administrative jurisdiction: NCT Delhi vs wider NCR."
  },
  {
    id: 40,
    category: "data",
    categoryLabel: "Data & Satellites",
    question: "Can all this data be deployed without licensing issues?",
    answer: "Yes. CPCB, NOAA GFS, NASA FIRMS, and Copernicus CAMS are open public-data initiatives. OpenStreetMap uses ODbL, and our dashboard provides full open-source attribution on all map canvases and data endpoints.",
    trapToAvoid: "Show that your solution respects open data licenses and provenance attribution."
  },

  // Category 5: Operational Engineering & Scale
  {
    id: 41,
    category: "ops",
    categoryLabel: "Operational Engineering",
    question: "What accuracy or error tolerance do you guarantee?",
    answer: "In atmospheric science, deterministic guarantees are scientifically improper. We guarantee an evaluated Mean Absolute Error (MAE) under 28 µg/m³ for 24-hour lead times, expanding to under 55 µg/m³ at 72 hours, with calibrated 80% conformal coverage intervals.",
    trapToAvoid: "Never say '100% accuracy' or 'zero error'. Atmospheric chaos prohibits deterministic perfection."
  },
  {
    id: 42,
    category: "ops",
    categoryLabel: "Operational Engineering",
    question: "What happens if CPCB API goes offline during a live demo?",
    answer: "The backend maintains a rolling local SQLite/Redis cache of the last 48 hours of observations. If the external CPCB endpoint fails to respond within 3 seconds, the system serves the cached sequence, flags 'Telemetry Fallback' on the UI, and proceeds seamlessly.",
    trapToAvoid: "Never let an external network outage kill your live demo."
  },
  {
    id: 43,
    category: "ops",
    categoryLabel: "Operational Engineering",
    question: "What happens if the numerical weather forecast (GFS) is wrong?",
    answer: "Weather forecast errors propagate into air quality. To insulate against this, we use multi-model ensemble averaging and widen the forecast confidence intervals proportionally to wind vector variance.",
    trapToAvoid: "Acknowledge that air quality forecasts are conditioned on numerical weather accuracy."
  },
  {
    id: 44,
    category: "ops",
    categoryLabel: "Operational Engineering",
    question: "How do you detect and handle seasonal model drift?",
    answer: "Delhi's pollution shifts radically between post-monsoon (stubble burning), winter (thermal inversion trapping), and summer (dust resuspension). We employ seasonal regime-based model retraining and track rolling 7-day MAE to trigger automatic model weight recalibration.",
    trapToAvoid: "Do not use a single winter-trained model for summer forecasting without retraining."
  },
  {
    id: 45,
    category: "ops",
    categoryLabel: "Operational Engineering",
    question: "How much storage is required for PRAVAHA?",
    answer: "The operational database for station telemetry and 72-hour forecast rasters requires approximately 15 GB/year. The WRF-Chem historical hindcast archive for selected research episodes requires ~250 GB.",
    trapToAvoid: "Provide concise, realistic storage figures."
  },
  {
    id: 46,
    category: "ops",
    categoryLabel: "Operational Engineering",
    question: "Can PRAVAHA run on standard laptop hardware?",
    answer: "Yes. The operational FastAPI backend, trained LightGBM inference engine, and interactive frontend run smoothly on a standard 8GB RAM quad-core laptop. Only the initial WRF-Chem numerical simulation required external multi-core Linux execution.",
    trapToAvoid: "Emphasize that the operational client and API are lightweight and portable."
  },
  {
    id: 47,
    category: "ops",
    categoryLabel: "Operational Engineering",
    question: "What components are live versus precomputed?",
    answer: "Live components: CPCB station ingestion, GFS weather fetching, LightGBM multi-horizon inference, 72h dynamic forecast rendering, GRAP alert engine. Precomputed components: WRF-Chem feedback experiment rasters, historical HYSPLIT dispersion archives.",
    trapToAvoid: "Total transparency on what is live vs precomputed is what earns top technical marks."
  },
  {
    id: 48,
    category: "ops",
    categoryLabel: "Operational Engineering",
    question: "How do you secure the backend API against abuse?",
    answer: "The FastAPI backend implements JWT-based token authentication for administrative and data ingestion endpoints, IP-based rate limiting (100 req/min), CORS whitelisting, and strict Pydantic input validation.",
    trapToAvoid: "Show standard production API security practices."
  },
  {
    id: 49,
    category: "ops",
    categoryLabel: "Operational Engineering",
    question: "How do you ensure auditable data provenance?",
    answer: "Every forecast point returned by the API contains an attached metadata envelope specifying: raw observation timestamp, numerical weather model cycle, model git commit SHA, and data quality check flags.",
    trapToAvoid: "Government evaluators require traceable provenance for legal compliance."
  },
  {
    id: 50,
    category: "ops",
    categoryLabel: "Operational Engineering",
    question: "What is your Minimum Credible Product (MCP)?",
    answer: "A multi-station Delhi-NCR 72-hour forecast for PM2.5, PM10, and Ozone powered by LightGBM with ERA5/GFS inputs, accompanied by an interactive Leaflet dashboard, uncertainty bands, and verified WRF-Chem feedback evidence.",
    trapToAvoid: "Define the core core value clearly without claiming unnecessary fluff."
  },

  // Category 6: Evaluator Traps & Hard Boundaries
  {
    id: 51,
    category: "traps",
    categoryLabel: "Evaluator Traps",
    question: "If weather features enter your ML model, why is that NOT two-way coupling?",
    answer: "Because information flows in one direction only: Weather -> Air Quality. The ML model predicts higher pollution, but that predicted pollution does not feed back into the radiative transfer equation to dim the sun or cool the surface in the weather model. True two-way coupling requires bidirectional thermodynamic feedback.",
    trapToAvoid: "This is the #1 trap judges use to expose fake claims. Nail this answer with pride."
  },
  {
    id: 52,
    category: "traps",
    categoryLabel: "Evaluator Traps",
    question: "If PM2.5 affects the ML-predicted PBL feature, is that coupling?",
    answer: "No. That is statistical proxy correlation, not dynamic thermodynamic coupling. It lacks the Navier-Stokes fluid dynamics and aerosol optical depth radiative feedback of a true coupled chemical transport model.",
    trapToAvoid: "Do not try to argue statistical correlation is physics."
  },
  {
    id: 53,
    category: "traps",
    categoryLabel: "Evaluator Traps",
    question: "Is a WRF-Chem screenshot or paper graphic enough to claim coupling?",
    answer: "No. A screenshot proves nothing. We demonstrate genuine coupling through a reproducible experiment with namelist files, netCDF output files, and a tangible delta comparison between aer_ra_feedback=1 vs 0.",
    trapToAvoid: "Show your actual simulation logs and netCDF extraction code."
  },
  {
    id: 54,
    category: "traps",
    categoryLabel: "Evaluator Traps",
    question: "Is Copernicus CAMS coupled?",
    answer: "CAMS Global integrates atmospheric chemistry with the ECMWF Integrated Forecasting System (IFS). While it has chemical assimilation, operational CAMS runs typically use one-way forcing or climatological aerosol feedback to conserve global operational HPC compute budgets.",
    trapToAvoid: "Don't assume all global models run full two-way feedback live."
  },
  {
    id: 55,
    category: "traps",
    categoryLabel: "Evaluator Traps",
    question: "Is HYSPLIT plus an ML correction two-way coupled?",
    answer: "No. HYSPLIT is purely Lagrangian kinematic trajectory advection. Adding an ML correction improves statistical accuracy, but it is not two-way aerosol-meteorology physical coupling.",
    trapToAvoid: "Never claim HYSPLIT is coupled."
  },
  {
    id: 56,
    category: "traps",
    categoryLabel: "Evaluator Traps",
    question: "What empirical result would disprove your feedback claim?",
    answer: "If running twin WRF-Chem simulations with feedback-on versus feedback-off produced zero statistically significant difference in surface solar radiation (W/m²), 2-meter temperature, or boundary layer height over Delhi-NCR.",
    trapToAvoid: "In science, a claim is only valid if it is falsifiable. Stating the disproof condition proves scientific integrity."
  },
  {
    id: 57,
    category: "traps",
    categoryLabel: "Evaluator Traps",
    question: "How do you prove your feedback results were not manually fabricated?",
    answer: "By providing the exact `namelist.input`, the WPS geographic configuration files, the input netCDF boundary files, and the open-source Python xarray extraction script that computes the delta grids directly from the raw simulation output.",
    trapToAvoid: "Keep code auditable and open."
  },
  {
    id: 58,
    category: "traps",
    categoryLabel: "Evaluator Traps",
    question: "Can your operational ML model claim two-way coupling?",
    answer: "No, and we explicitly do NOT claim our operational ML model is two-way coupled. We claim PRAVAHA is a hybrid operational system: it uses physics-informed features (PBL, Inversion) and is validated by a rigorous WRF-Chem two-way feedback hindcast experiment, providing the optimal balance of scientific truth and real-time operational speed.",
    trapToAvoid: "Delivering this honest, crystal-clear distinction is what separates SIH winners from disqualified teams."
  }
];
