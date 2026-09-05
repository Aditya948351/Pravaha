/**
 * PRAVAHA - 72-Hour Physics-Informed Hourly Air Quality Forecast
 * Features P10, P50 (median), and P90 uncertainty bands from conformalized quantile regression,
 * matched with PBL height, Inversion Score, and GRAP escalation threshold markers.
 */

export const generate72HourForecast = () => {
  const forecast = [];
  const startTime = new Date(2026, 10, 8, 14, 0); // Simulated Nov 8, 14:00 IST peak smog episode

  for (let h = 1; h <= 72; h++) {
    const time = new Date(startTime.getTime() + h * 3600 * 1000);
    const hourOfDay = time.getHours();
    
    // Atmospheric diurnal cycles:
    // Nocturnal boundary layer collapse (22:00 to 07:00 IST) -> PBL drops to 200-350m, Inversion peaks
    // Daytime solar convection (11:00 to 16:00 IST) -> PBL expands to 800-1400m, Inversion breaks
    const isNight = hourOfDay >= 21 || hourOfDay <= 7;
    const isMidday = hourOfDay >= 11 && hourOfDay <= 16;
    
    let pbl = isMidday ? 1100 - Math.random() * 200 : (isNight ? 240 + Math.random() * 80 : 520 + Math.random() * 150);
    let invStrength = isNight ? 4.2 + (Math.random() * 1.5) : (isMidday ? 0.3 + (Math.random() * 0.4) : 1.8 + Math.random() * 0.8);
    let windSpeed = isNight ? 1.0 + Math.random() * 0.8 : 2.8 + Math.random() * 1.4;

    // Upwind stubble plume arrives in hours 18 to 44
    let plumeFactor = (h >= 18 && h <= 44) ? 1.45 : 1.0;
    
    // Base PM2.5 calculation using physical box model surrogate
    let basePM25 = ((260 / (pbl / 500)) * (2.0 / Math.max(windSpeed, 0.8))) * plumeFactor;
    basePM25 = Math.round(basePM25 * 0.7 + (h < 24 ? 280 : (h < 48 ? 360 : 310)) * 0.3);
    
    // Uncertainty widens with forecast horizon (conformal quantile spread)
    const uncertaintySpan = Math.round(15 + h * 0.95);
    const p50 = basePM25;
    const p10 = Math.max(45, p50 - uncertaintySpan);
    const p90 = p50 + Math.round(uncertaintySpan * 1.35);

    // Compute CPCB AQI from PM2.5 (standard CPCB formula: breakpoint linear interpolation)
    let aqi = 0;
    if (p50 <= 30) aqi = Math.round((50 / 30) * p50);
    else if (p50 <= 60) aqi = Math.round(50 + ((100 - 50) / (60 - 30)) * (p50 - 30));
    else if (p50 <= 90) aqi = Math.round(100 + ((200 - 100) / (90 - 60)) * (p50 - 60));
    else if (p50 <= 120) aqi = Math.round(200 + ((300 - 200) / (120 - 90)) * (p50 - 90));
    else if (p50 <= 250) aqi = Math.round(300 + ((400 - 300) / (250 - 120)) * (p50 - 120));
    else aqi = Math.round(400 + ((500 - 400) / (380 - 250)) * (Math.min(p50, 480) - 250));

    let category = "Good";
    if (aqi > 400) category = "Severe";
    else if (aqi > 300) category = "Very Poor";
    else if (aqi > 200) category = "Poor";
    else if (aqi > 100) category = "Moderate";
    else if (aqi > 50) category = "Satisfactory";

    forecast.push({
      horizonHour: h,
      timeStr: time.toLocaleString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }),
      hourOfDay,
      p10,
      p50,
      p90,
      pm10: Math.round(p50 * 1.55 + Math.random() * 20),
      no2: Math.round(55 + (isNight ? 28 : -10) + Math.random() * 12),
      o3: Math.round(isMidday ? 75 + Math.random() * 25 : 18 + Math.random() * 10),
      aqi,
      category,
      pblHeight: Math.round(pbl),
      inversionStrength: parseFloat(invStrength.toFixed(1)),
      windSpeed: parseFloat(windSpeed.toFixed(1)),
      windDir: h < 30 ? "NW" : (h < 55 ? "WNW" : "NNW"),
      dominantPollutant: p50 > 90 ? "PM2.5" : (isMidday ? "O3" : "PM10"),
      grapStage: aqi > 450 ? "Stage IV (Severe+)" : (aqi > 400 ? "Stage III (Severe)" : (aqi > 300 ? "Stage II (Very Poor)" : "Stage I (Poor)")),
      feedbackDeltaPM25: Math.round(p50 * 0.22) // Aerosol-radiation feedback contribution
    });
  }
  return forecast;
};

export const forecast72h = generate72HourForecast();
