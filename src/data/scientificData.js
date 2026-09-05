/**
 * PRAVAHA - Atmospheric Science, WRF-Chem Feedback Experiment & Core Equations
 * Grounded in research literature (Nov 6-13, 2017 Great Smog of Delhi hindcast study)
 */

export const wrfChemExperiment = {
  episodeName: "Great Smog of Delhi (Nov 6–13, 2017)",
  hpcConfiguration: {
    model: "WRF-Chem v4.5.1",
    gridResolution: "3 km nested domain over Indo-Gangetic Plain / Delhi-NCR (d03: 120 x 120 grid cells)",
    verticalLevels: 45,
    gasMechanism: "RADM2 (Regional Acid Deposition Model 2)",
    aerosolModule: "MADE/SORGAM with secondary organic aerosol formation",
    emissionsInventory: "HTAPv3.1 (0.1°) + FINN v2.5 hourly fire emissions with plume rise"
  },
  twinSimulations: {
    feedbackOn: {
      parameter: "aer_ra_feedback = 1",
      description: "Two-way aerosol-radiation coupling enabled: aerosols scatter and absorb solar radiation, altering thermodynamic heating and boundary layer turbulence.",
      surfaceDownwellingSolarRadiation: 542, // W/m2 midday peak
      sensibleHeatFlux: 148, // W/m2
      boundaryLayerHeight: 380, // meters midday peak
      surfaceTemperature: 21.4, // deg C
      pm25PeakConcentration: 485, // ug/m3
      pm10PeakConcentration: 690, // ug/m3
      surfaceWindSpeed: 1.2 // m/s
    },
    feedbackOff: {
      parameter: "aer_ra_feedback = 0",
      description: "One-way chemistry transport: aerosols do not interact with radiative transfer; weather equations run unaware of atmospheric particulate loading.",
      surfaceDownwellingSolarRadiation: 560, // W/m2 midday peak
      sensibleHeatFlux: 174, // W/m2
      boundaryLayerHeight: 520, // meters midday peak (+140m higher)
      surfaceTemperature: 22.8, // deg C (+1.4 deg C warmer)
      pm25PeakConcentration: 390, // ug/m3 (-95 ug/m3 lower)
      pm10PeakConcentration: 575, // ug/m3
      surfaceWindSpeed: 1.6 // m/s
    }
  },
  feedbackDelta: {
    deltaRadiation: -18, // W/m2 (-3.2% solar dimming)
    deltaPblHeight: -140, // meters (-26.9% boundary layer suppression)
    deltaTemp: -1.4, // deg C surface cooling
    deltaPM25Amplification: +24.4, // % amplification of ground PM2.5 entrapment due to feedback loop
    physicalMechanism: "Aerosols scatter incoming shortwave radiation -> Surface cools -> Vertical buoyancy collapses -> PBL height contracts -> Ground emissions are compressed into a shallower volume -> PM2.5 concentrations surge by +24%."
  }
};

export const scientificFormulas = [
  {
    name: "Ventilation Index (Box Dilution Model)",
    latex: "VI = H \\times U",
    description: "Represents the volumetric air flushing capacity of the atmosphere per unit horizontal width. H is Planetary Boundary Layer Height (m), and U is mixed-layer wind speed (m/s). Values below 2,000 m²/s indicate severe stagnation and trapping danger.",
    thresholds: [
      { range: "< 2,000 m²/s", status: "Critical Stagnation (Extreme Trapping Hazard)", color: "#ef4444" },
      { range: "2,000 – 6,000 m²/s", status: "Moderate Ventilation (Partial Trapping)", color: "#f59e0b" },
      { range: "> 6,000 m²/s", status: "Favorable Dispersion (Active Cleansing)", color: "#10b981" }
    ]
  },
  {
    name: "Thermal Inversion Trapping Score",
    latex: "\\Delta T_{inv} = T_{925\\text{hPa}} - T_{2\\text{m}}",
    description: "Evaluates the strength of the temperature lid suppressing buoyant plume ascent. When 925 hPa temperature exceeds the surface temperature (ΔT > 0), vertical convection is completely extinguished, locking surface emissions within the nocturnal layer.",
    thresholds: [
      { range: "< 0 °C", status: "Unstable / Neutral (No Inversion Lid)", color: "#10b981" },
      { range: "0 to 2 °C", status: "Weak Inversion (Mild Trapping)", color: "#f59e0b" },
      { range: "2 to 4 °C", status: "Moderate Inversion (Noticeable Stagnation)", color: "#f97316" },
      { range: "> 4 °C", status: "Severe Radiation Inversion (Lethal Trapping Lid)", color: "#dc2626" }
    ]
  },
  {
    name: "CPCB Linear Breakpoint AQI Formulation",
    latex: "I_p = I_{low} + \\left( \\frac{I_{high} - I_{low}}{B_{high} - B_{low}} \\right) \\times (C_p - B_{low})",
    description: "The official Central Pollution Control Board (CPCB) methodology. For each criteria pollutant (PM2.5, PM10, NO2, O3, SO2, CO), concentration Cp is mapped into a sub-index Ip using empirical breakpoint brackets. The final National AQI is: AQI = max(I_1, I_2, ..., I_n) provided at least 3 pollutants are monitored including either PM2.5 or PM10."
  }
];

export const coreUSPs = [
  { id: 1, title: "Matched Feedback-ON/OFF Evidence", category: "Scientific", desc: "Defensible twin WRF-Chem simulations proving aerosol-radiation feedback impact on PBL collapse." },
  { id: 2, title: "Inversion-Aware Trapping Diagnostics", category: "Physics", desc: "Explicit 925 hPa lapse-rate tracking converting thermal lids into real-time trapping alerts." },
  { id: 3, title: "PBL Collapse Pre-Warning", category: "Physics", desc: "Predicts nocturnal boundary layer compression hours before ground PM2.5 accumulates." },
  { id: 4, title: "FRP-Weighted Plume Transport", category: "Satellites", desc: "Replaces naive hotspot counts with Fire Radiative Power (MW) and HYSPLIT trajectory dispersion." },
  { id: 5, title: "Quantile Forecasts (P10/P50/P90)", category: "Machine Learning", desc: "Provides honest confidence intervals that widen naturally with longer lead times." },
  { id: 6, title: "Conformal Coverage Calibration", category: "Machine Learning", desc: "Empirically guarantees 80% coverage intervals calibrated against rolling validation residuals." },
  { id: 7, title: "Zero Temporal Leakage Pipeline", category: "Data Engineering", desc: "Strict expanding-window time splits and backward lags ensuring zero lookahead bias." },
  { id: 8, title: "Multi-Pollutant Sub-Index Derivation", category: "Atmospheric", desc: "Predicts PM2.5, PM10, NO2, and O3 independently before synthesizing statutory CPCB AQI." },
  { id: 9, title: "Automated CAQM GRAP Decision Cards", category: "Decision Support", desc: "Instantly translates forecast breaches into actionable Stage I-IV statutory advisories." },
  { id: 10, title: "58-Question Evaluator Defense Shield", category: "Strategy", desc: "Pre-trained defense playbook answering every evaluator trap with scientific poise." }
];

export const datasetRegistry = [
  { name: "CPCB CAAQMS Network", provider: "Central Pollution Control Board", freq: "Hourly (15-min raw)", resolution: "42 Delhi-NCR Point Stations", usage: "Ground truth observations, model training, validation" },
  { name: "ECMWF ERA5 Reanalysis", provider: "Copernicus Climate Change Service", freq: "Hourly", resolution: "0.25° (~28 km) on 37 pressure levels", usage: "Historical boundary meteorology and vertical temperature inversion profiles" },
  { name: "NOAA GFS 0.25°", provider: "National Centers for Environmental Prediction", freq: "3-Hourly to 72h", resolution: "0.25° Global Grid", usage: "Operational future meteorological forecast inputs (wind, PBL, temp, rh)" },
  { name: "Copernicus CAMS", provider: "European Centre for Medium-Range Weather Forecasts", freq: "3-Hourly to 120h", resolution: "0.4° (~40 km) Global Grid", usage: "Regional chemical background aerosol inflow across northern India" },
  { name: "NASA FIRMS (VIIRS / MODIS)", provider: "NASA EOSDIS", freq: "NRT (3-hour latency)", resolution: "375m (VIIRS) / 1km (MODIS)", usage: "Upwind stubble burning hotspots and Fire Radiative Power (FRP)" },
  { name: "Sentinel-5P TROPOMI", provider: "European Space Agency", freq: "Daily orbit swath", resolution: "3.5 km x 5.5 km", usage: "Tropospheric NO2, CO, and Aerosol Index plume verification" }
];
