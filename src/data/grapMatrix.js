/**
 * PRAVAHA - Commission for Air Quality Management (CAQM) GRAP Action Matrix
 * Statutory Graded Response Action Plan (GRAP) for Delhi-NCR (Revised framework).
 */

export const grapStages = [
  {
    stage: "Stage I",
    title: "Poor Air Quality",
    aqiThreshold: "AQI 201 – 300",
    color: "#f59e0b",
    severity: "Elevated Alert",
    regulatoryMandate: "Mandatory implementation across all NCR districts upon crossing AQI 200.",
    actions: {
      government: [
        "Enforce strict dust control at construction & demolition sites > 500 sq meters.",
        "Ensure mechanized road sweeping and water sprinkling along high-density traffic corridors.",
        "Ban open burning of municipal solid waste, biomass, and dry leaves with zero-tolerance spot fines.",
        "Strict vigilance on polluting vehicles (PUC compliance checking)."
      ],
      schools: [
        "Advise reduction of prolonged outdoor physical training during early morning peak smog hours.",
        "Ensure classroom ventilation filters are checked."
      ],
      transport: [
        "Synchronize traffic signals at major bottlenecks to avoid vehicle idling.",
        "Strictly enforce lane discipline for heavy freight vehicles."
      ],
      industry: [
        "Ensure strict compliance with approved fuel lists; ban unapproved coal and heavy furnace oils.",
        "Continuous monitoring of industrial emission stacks."
      ],
      publicAdvisory: [
        "Citizens with respiratory illnesses advised to limit intense outdoor exertion in morning hours.",
        "Encourage carpooling and use of public transit."
      ]
    }
  },
  {
    stage: "Stage II",
    title: "Very Poor Air Quality",
    aqiThreshold: "AQI 301 – 400",
    color: "#ef4444",
    severity: "High Alert",
    regulatoryMandate: "Proactive activation at least 48 to 72 hours prior to forecast breach based on coupled forecast warnings.",
    actions: {
      government: [
        "Augment frequency of mechanized sweeping and water sprinkling with dust suppressants.",
        "Enhance parking fees to discourage private vehicular movement.",
        "Augment CNG/electric bus and metro services by adding additional coaches and off-peak frequency.",
        "Ensure uninterrupted power supply to prevent reliance on diesel generator sets."
      ],
      schools: [
        "Suspend outdoor sports and morning assemblies in open grounds.",
        "Keep students with asthma and cardiovascular vulnerabilities indoors."
      ],
      transport: [
        "Deploy traffic police at 13 identified severe congestion hotspots in Delhi-NCR.",
        "Divert non-destined commercial interstate diesel trucks onto Eastern and Western Peripheral Expressways."
      ],
      industry: [
        "Strict regulatory inspection of brick kilns, stone crushers, and hot mix plants.",
        "Regulate operational hours for power-intensive manufacturing."
      ],
      publicAdvisory: [
        "Use public transport (Metro/buses); avoid unnecessary private car journeys.",
        "Avoid morning and late evening walks during thermal inversion peaks.",
        "Wear N95/N99 particulate masks when outdoors."
      ]
    }
  },
  {
    stage: "Stage III",
    title: "Severe Air Quality",
    aqiThreshold: "AQI 401 – 450",
    color: "#b91c1c",
    severity: "Emergency Alert",
    regulatoryMandate: "Enforced when forecast indicates sustained Severe conditions exceeding 400 AQI.",
    actions: {
      government: [
        "Strict ban on all construction and demolition activities across Delhi-NCR (excluding metro, railway, hospital, and national defense projects).",
        "Closure of all stone crushers and mining operations in NCR.",
        "Intensive water mist spraying from high-rise buildings and mobile anti-smog guns."
      ],
      schools: [
        "State governments may decide on closure of schools up to Class 5 and conduct classes in hybrid/online mode.",
        "Strict suspension of all outdoor school activities."
      ],
      transport: [
        "Strict ban on plying of BS-III Petrol and BS-IV Diesel 4-wheeler cars in NCT Delhi and adjoining districts (Gurugram, Faridabad, Ghaziabad, Gautam Budh Nagar).",
        "Ban entry of light commercial diesel vehicles registered outside Delhi (except essentials)."
      ],
      industry: [
        "Shut down operations of industrial units not running on approved clean PNG/biomass fuels.",
        "Stagger industrial working hours across manufacturing zones."
      ],
      publicAdvisory: [
        "High-risk individuals (elderly, children, pregnant women, asthmatics) must remain strictly indoors.",
        "Do not engage in outdoor running, jogging, or cycling.",
        "Air purifiers recommended for indoor living quarters."
      ]
    }
  },
  {
    stage: "Stage IV",
    title: "Severe+ / Hazardous Air Quality",
    aqiThreshold: "AQI > 450",
    color: "#7f1d1d",
    severity: "Critical Red Disaster Mode",
    regulatoryMandate: "Invoked immediately under disaster management powers when AQI surpasses 450.",
    actions: {
      government: [
        "Total ban on all construction and demolition activities, including linear public infrastructure projects.",
        "State governments to consider odd-even scheme for private four-wheeler vehicles.",
        "Decide on work-from-home (WFH) policy: 50% strength in public, municipal, and private offices.",
        "Central Government may consider appropriate decision on permitting work from home for central employees."
      ],
      schools: [
        "Mandatory closure of physical classes for all students up to Class 11; transition to 100% online learning.",
        "Only Class 10 and 12 board students permitted subject to localized school administration orders."
      ],
      transport: [
        "Total ban on entry of all medium and heavy diesel goods trucks into Delhi (except essential commodities like milk, vegetables, medical supplies).",
        "Ban on Delhi-registered diesel heavy vehicles (BS-IV and below)."
      ],
      industry: [
        "Complete shutdown of all non-essential polluting industrial activities across Delhi-NCR.",
        "Thermal power plant dispatch load curtailed in accordance with national grid contingency protocols."
      ],
      publicAdvisory: [
        "State of public health emergency declared. All citizens urged to minimize exposure.",
        "Continuous use of certified N95 masks mandatory when outside.",
        "Immediate medical consultation if experiencing chest tightness, wheezing, or eye stinging."
      ]
    }
  }
];
