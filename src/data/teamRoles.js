/**
 * PRAVAHA - 6-Person Work Breakdown Structure (WBS) & Role Matrix
 * Extracted directly from Section 36 & 37 of the SIH26082 Build Blueprint.
 */

export const teamRoles = [
  {
    roleId: "P1",
    title: "Person 1: ML / AI Lead",
    badge: "Core Forecaster",
    avatarColor: "#3b82f6",
    primaryMandate: "Multi-horizon LightGBM forecasters, Quantile Loss (P10/P50/P90), Conformal calibration, and SHAP feature explainability.",
    dependencies: "Consumes cleaned hourly feature matrix from Person 3; receives physical background and inversion index definitions from Person 2.",
    coreDeliverables: [
      "LightGBM Quantile Regressors for Lead times H+1 to H+72.",
      "Multi-pollutant individual models for PM2.5, PM10, NO2, O3 before AQI derivation.",
      "Rolling conformal prediction wrapper providing honest 80% coverage intervals.",
      "TreeSHAP waterfall explanations showing top meteorological vs emission drivers for each forecast timestep.",
      "Benchmarking suite comparing against Persistence, Seasonal Climatology, and Weather-only baselines."
    ],
    techStack: ["Python", "LightGBM", "scikit-learn", "MAPIE / ConformalPy", "SHAP", "PyTorch (TCN baseline)"],
    sprintTimeline: {
      day1Morning: "Train Persistence and Climatology baselines; verify cross-validation without temporal leakage.",
      day1Afternoon: "Train Multi-horizon LightGBM regressors with lag features and ERA5/GFS inputs.",
      day1Night: "Implement Quantile Regression (alpha = 0.1, 0.5, 0.9) and calibrate conformal residual bounds.",
      day2Morning: "Generate SHAP feature attribution matrices and package forecast inference pipeline for API.",
      day2Afternoon: "Conduct validation checks against Nov 2017 historical smog holdout and finalize error metrics."
    },
    evaluatorQuestionsDefended: [
      "Why LightGBM instead of a Transformer or LSTM?",
      "How do you mathematically guarantee zero temporal data leakage?",
      "What if your forecast error widens at 72 hours?",
      "Why predict individual pollutant sub-indices before calculating AQI?"
    ]
  },
  {
    roleId: "P2",
    title: "Person 2: Atmospheric Science & Physics Lead",
    badge: "Domain Scientist",
    avatarColor: "#10b981",
    primaryMandate: "Atmospheric coupling mechanics, WRF-Chem feedback experiment (ARI/ACI), Planetary Boundary Layer (PBL) diagnostics, and thermal inversion formulation.",
    dependencies: "Defines scientifically defensible feature formulations for Person 1; prepares netCDF hindcast data slices for Person 3.",
    coreDeliverables: [
      "Precomputed WRF-Chem simulation of Nov 6–13, 2017 Delhi Smog comparing Feedback-ON vs Feedback-OFF.",
      "Thermal Inversion Trapping Score algorithm using 925 hPa and 2m potential temperature gradient.",
      "Planetary Boundary Layer (PBL) height collapse diagnostic and Ventilation Index ($VI = H \\cdot U$).",
      "HYSPLIT/FLEXPART backward trajectory analysis linking Punjab stubble burning plumes to Delhi air basin.",
      "Photochemical Ozone titration cycle formulation ($NO + O_3 \\leftrightarrow NO_2 + O_2$)."
    ],
    techStack: ["WRF-Chem v4.5", "WPS", "MetPy", "xarray", "NetCDF4", "PySplit / FLEXPART", "ERA5 Pressure Levels"],
    sprintTimeline: {
      day1Morning: "Extract pressure-level temperature profiles and configure Inversion Trapping Score index.",
      day1Afternoon: "Run HYSPLIT ensemble forward/backward dispersion trajectories for fire transit corridor.",
      day1Night: "Process WRF-Chem Feedback-ON vs Feedback-OFF output grids; compute Delta-Radiation and Delta-PBL.",
      day2Morning: "Validate aerosol radiative forcing numbers (-18 W/m² surface dimming, -140m PBL suppression).",
      day2Afternoon: "Act as scientific defense shield during judge evaluations; prevent 'fake 2-way coupling' claims."
    },
    evaluatorQuestionsDefended: [
      "What is the exact physical mechanism of Two-Way Aerosol-Radiation Feedback?",
      "Why is Delhi not an isolated box? What is the regional inflow/outflow boundary?",
      "Why can't you run WRF-Chem live on a laptop during the 36-hour hackathon?",
      "What is the physical difference between a low nocturnal PBL and a surface inversion?"
    ]
  },
  {
    roleId: "P3",
    title: "Person 3: Data Engineering & Provenance Lead",
    badge: "Pipeline Architect",
    avatarColor: "#f59e0b",
    primaryMandate: "Continuous ingestion pipelines, CPCB CAAQMS scraping, NASA FIRMS FRP, ERA5/GFS weather grids, UTC-to-IST synchronization, and data QC.",
    dependencies: "Supplies the golden canonical feature store to Person 1 and Person 2; provides real-time data feeds to Person 4.",
    coreDeliverables: [
      "Robust scraper and parser for 40+ Delhi-NCR CAAQMS continuous monitoring stations.",
      "NASA FIRMS VIIRS (375m) & MODIS hotspot ingestion pipeline with Fire Radiative Power (FRP) aggregation.",
      "Automated Quality Control (QC) engine: range checks, rate-of-change flags, stuck-sensor detection, spatial outlier filters.",
      "Timezone normalizer guaranteeing strict UTC-to-IST conversion and timestamp discipline.",
      "Data Provenance ledger tracking source URLs, timestamps, licensing, and latency for every record."
    ],
    techStack: ["Python", "Polars / Pandas", "BeautifulSoup / Playwright", "xarray", "Zarr", "GeoPandas", "Shapely"],
    sprintTimeline: {
      day1Morning: "Build CPCB CAAQMS ingestion adapter with outlier trimming and missing-data imputation.",
      day1Afternoon: "Ingest NASA FIRMS VIIRS/MODIS fire hotspots and calculate FRP-weighted regional cluster centroids.",
      day1Night: "Fetch GFS 0.25° forecast grids and downscale boundary condition parameters for NCR domain.",
      day2Morning: "Build canonical feature table with explicit temporal lag columns ($t-1$ to $t-24$) ensuring zero lookahead.",
      day2Afternoon: "Implement offline cache fallback in case external CPCB or weather APIs experience rate-limits."
    },
    evaluatorQuestionsDefended: [
      "How do you handle missing or stuck station sensors?",
      "How do you prevent data leakage in time-series features?",
      "Is satellite hotspot count equivalent to PM2.5 emissions?",
      "What is your fallback if CPCB API goes offline during the demo?"
    ]
  },
  {
    roleId: "P4",
    title: "Person 4: Backend & MLOps Lead",
    badge: "System Engineer",
    avatarColor: "#8b5cf6",
    primaryMandate: "FastAPI REST microservices, PostgreSQL/PostGIS spatial storage, Redis caching layer, scheduler workers, and Docker deployment.",
    dependencies: "Consumes ML inference pipelines from Person 1 and data tables from Person 3; provides REST API endpoints to Person 5 and Person 6.",
    coreDeliverables: [
      "High-performance FastAPI service with sub-50ms response times for 72-hour forecast queries.",
      "PostgreSQL + PostGIS database housing station geometry, regional district boundaries, and forecast rasters.",
      "Redis memory cache for real-time station metrics, reducing database load during live demonstrations.",
      "Celery/Background scheduler executing hourly pipeline runs and data freshness monitors.",
      "Containerized Docker setup with Nginx reverse proxy, CORS security, and comprehensive `/health` endpoints."
    ],
    techStack: ["FastAPI", "Uvicorn", "PostgreSQL / PostGIS", "Redis", "SQLAlchemy", "Celery", "Docker / Compose"],
    sprintTimeline: {
      day1Morning: "Set up PostgreSQL schemas with PostGIS spatial indexes for NCR stations and district polygons.",
      day1Afternoon: "Develop FastAPI REST endpoints: `/api/v1/stations`, `/api/v1/forecast/72h`, `/api/v1/alerts`.",
      day1Night: "Integrate Redis caching for instant query response; wire Person 1's ML model runner.",
      day2Morning: "Build `/api/v1/health` and data provenance metadata endpoints with uptime trackers.",
      day2Afternoon: "Deploy Docker container, stress test endpoint latency, and prepare backup local mock server."
    },
    evaluatorQuestionsDefended: [
      "How much compute and memory does the backend require?",
      "Can this architecture scale to pan-India (100+ cities)?",
      "How do you maintain data provenance and auditable outputs?",
      "What security measures protect the public forecasting API?"
    ]
  },
  {
    roleId: "P5",
    title: "Person 5: GIS & Frontend Lead",
    badge: "UI/UX Architect",
    avatarColor: "#ec4899",
    primaryMandate: "Spatial visualization, MapLibre/Leaflet map rendering, interactive particle wind streamlines, synchronized 72-hour timeline slider, and responsive UX.",
    dependencies: "Consumes FastAPI endpoints from Person 4; works with Person 2 on meteorological color maps and plume trajectories.",
    coreDeliverables: [
      "Interactive Delhi-NCR Geospatial Station Explorer with CPCB-compliant color-coding.",
      "Synchronized 72-hour temporal scrubber with smooth map and chart transitions.",
      "Animated atmospheric wind streamlines and stubble smoke plume vector overlay.",
      "Interactive Trapping & WRF-Chem Feedback Simulator sandbox.",
      "High-contrast dark-mode scientific dashboard adhering to MoES/NCMRWF aesthetic standards."
    ],
    techStack: ["Vite", "Vanilla CSS Design System", "Leaflet / MapLibre GL", "Chart.js", "Canvas2D Animation", "Lucide Icons"],
    sprintTimeline: {
      day1Morning: "Construct master layout, CSS tokens, glassmorphism containers, and station map canvas.",
      day1Afternoon: "Bind 40+ CAAQMS station markers with interactive tooltips, popups, and pollutant filters.",
      day1Night: "Build synchronized 72-hour horizon timeline slider and Chart.js uncertainty quantile curves.",
      day2Morning: "Implement Interactive Physics Trapping Lab and WRF-Chem Feedback-ON/OFF split visualizer.",
      day2Afternoon: "Polish micro-interactions, responsive mobile views, and cross-browser performance."
    },
    evaluatorQuestionsDefended: [
      "Why is a 5-km grid better than global 40-km CAMS products for city decision-making?",
      "How does the UI convey forecast uncertainty to non-technical users?",
      "How do you visualize wind and plume dispersion without lagging the browser?",
      "How accessible is the interface for government district magistrates?"
    ]
  },
  {
    roleId: "P6",
    title: "Person 6: Product, Android & Defense Lead",
    badge: "Pitch & Strategy Lead",
    avatarColor: "#06b6d4",
    primaryMandate: "CAQM GRAP Stage I–IV automated advisory engine, mobile alert personas, pitch presentation flow, and mastering the 58 Judge Defense Q&As.",
    dependencies: "Synthesizes outputs from all 5 members into a compelling, scientifically unassailable narrative for evaluators.",
    coreDeliverables: [
      "Automated GRAP Decision-Support Matrix generating tailored advisories for Government, Schools, Transport, and Industry.",
      "Multi-stakeholder persona workflow (District Magistrate, Municipal Commissioner, School Principal, Citizen).",
      "Master pitch slide deck structure adhering to SIH PPT evaluation rubrics.",
      "Mastery of the 58 Judge Defense Q&As, ensuring no team member falls into common hackathon traps.",
      "Defensible impact assessment and cost model proving operational scalability under ₹5,000/month."
    ],
    techStack: ["GRAP Action Rule Engine", "Figma / Pitch Deck", "Markdown / Documentation", "Android Wireframes / Notifications"],
    sprintTimeline: {
      day1Morning: "Map official CAQM GRAP Stage I-IV statutory guidelines to predicted AQI threshold triggers.",
      day1Afternoon: "Draft user stories and persona decision cards for emergency response teams.",
      day1Night: "Assemble SIH PowerPoint presentation with honest hybrid architecture framing.",
      day2Morning: "Conduct mock judge defense drills with the team using the 58 Q&A question bank.",
      day2Afternoon: "Deliver flawless 8-minute pitch and anchor the judge Q&A session with scientific poise."
    },
    evaluatorQuestionsDefended: [
      "What is the societal and economic return on investment (ROI)?",
      "Does this system replace existing government frameworks like SAFAR or CPCB?",
      "How do you handle false alarms in extreme pollution alerts?",
      "What legal and jurisdictional barriers exist between Delhi and neighboring states?"
    ]
  }
];

export const hackathonMilestones = [
  {
    time: "Hours 00 - 06",
    title: "Foundation & Ingestion Sprint",
    focus: "Data pipelines operational, baseline ML models trained, PostGIS schema created, UI shell initialized."
  },
  {
    time: "Hours 06 - 16",
    title: "Atmospheric Physics & Core ML",
    focus: "WRF-Chem feedback experiment integrated, LightGBM quantile regression trained, 72h forecast API active."
  },
  {
    time: "Hours 16 - 24",
    title: "GIS & Simulator Integration",
    focus: "Leaflet station map live, 72h slider linked to uncertainty charts, interactive physics trapping lab functional."
  },
  {
    time: "Hours 24 - 30",
    title: "GRAP Decision Engine & Replay",
    focus: "Nov 2017 historical smog replay working, automated GRAP alert generator complete, mobile alert cards styled."
  },
  {
    time: "Hours 30 - 36",
    title: "Stress Testing & Judge Defense Drills",
    focus: "End-to-end rehearsal, stress testing API fallbacks, reviewing 58 Q&A defense answers, locking slide deck."
  }
];
