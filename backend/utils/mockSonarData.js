
class MockSonarData {
  static generateRealisticAnalysis(scenario) {
    const scenarios = {
      'cyber': {
        reasoning: `REASONING CHAIN:
1. INITIAL TRIGGER: Coordinated cyber attack targets critical infrastructure endpoints
2. VULNERABILITY EXPLOITATION: Legacy systems with unpatched security flaws become entry points
3. LATERAL MOVEMENT: Attackers establish persistent access across network segments
4. DATA EXFILTRATION: Sensitive government and corporate data compromised
5. PSYCHOLOGICAL WARFARE: Public confidence in digital infrastructure eroded

EVIDENCE ASSESSMENT:
- Historical precedent: Similar to NotPetya (2017) and Colonial Pipeline (2021) attacks
- Attack vectors align with known APT group methodologies
- Infrastructure dependencies create cascading failure potential

CONFIDENCE LEVEL: 87% based on current threat landscape analysis
- Active reconnaissance detected across target networks
- Exploitation tools match known state-sponsored actor signatures
- Timeline aligns with geopolitical tensions

KEY FACTORS:
- Critical infrastructure interdependencies
- Cybersecurity workforce shortages
- Supply chain vulnerabilities
- International cooperation gaps

IMPLICATIONS:
- Economic disruption estimated at $50-100B globally
- National security implications for allied nations
- Potential for kinetic response to cyber operations
- Long-term trust degradation in digital systems`,

        research: `CURRENT SIGNALS: Real-time threat intelligence indicates:
• Increased scanning activity against SCADA systems (400% above baseline)
• Dark web chatter about "coordinated infrastructure operations" 
• Nation-state actors repositioning cyber assets near critical targets
• Supply chain vendors reporting suspicious network probes

HISTORICAL PRECEDENTS:
• 2010 Stuxnet: Demonstrated cyber-physical attack capabilities
• 2015 Ukraine Power Grid: First confirmed cyber attack causing power outage
• 2021 Colonial Pipeline: Economic impact of infrastructure targeting
• 2022 Viasat Incident: Satellite communication disruption techniques

EXPERT ANALYSIS:
- CISA Director warns of "elevated risk environment"
- NATO Article 5 implications for major cyber attacks under review
- Private sector resilience assessments show critical gaps
- International law frameworks inadequate for cyber warfare

DATA TRENDS:
- 340% increase in ransomware targeting critical infrastructure (2023)
- Average incident response time: 287 days for advanced persistent threats
- Only 23% of critical infrastructure meets current security standards
- $10.5 trillion projected global cost of cybercrime by 2025

SOURCE CITATIONS:
- CISA Critical Infrastructure Threat Assessment (2024)
- Mandiant APT1 Report and subsequent tracking
- NIST Cybersecurity Framework Implementation Guide
- MIT Technology Review: The Coming Cyber War`
      },

      'geopolitical': {
        reasoning: `REASONING CHAIN:
1. ESCALATION TRIGGERS: Territorial disputes activate mutual defense obligations
2. ALLIANCE DYNAMICS: NATO Article 5 considerations create decision pressure
3. MILITARY POSITIONING: Strategic asset deployment signals intent escalation
4. ECONOMIC WARFARE: Trade disruptions and sanctions create secondary effects
5. INFORMATION OPERATIONS: Narrative warfare shapes public opinion and policy

EVIDENCE ASSESSMENT:
- Satellite imagery confirms military buildup patterns
- Diplomatic communications indicate deteriorating relations
- Economic indicators show preparation for sustained conflict
- Historical analysis suggests 72-hour decision window

CONFIDENCE LEVEL: 82% based on multi-source intelligence fusion
- Open source intelligence correlates with classified assessments
- Economic indicators align with pre-conflict patterns
- Military movements match historical escalation timelines

KEY FACTORS:
- Alliance commitment credibility at stake
- Nuclear escalation management protocols
- Regional stability implications
- Humanitarian crisis potential

IMPLICATIONS:
- Global supply chain disruptions within 30 days
- Energy price volatility affecting 40+ nations
- Refugee crisis potentially affecting 2-5 million people
- Long-term reshaping of international security architecture`,

        research: `CURRENT SIGNALS: Multi-domain intelligence indicates:
• Military exercises transitioning to operational deployments
• Diplomatic channels reporting breakdown in negotiations
• Economic sectors showing signs of "war economy" preparation
• Information warfare campaigns intensifying across social platforms

HISTORICAL PRECEDENTS:
• 1962 Cuban Missile Crisis: Nuclear escalation management
• 1999 Kosovo Conflict: NATO intervention precedents
• 2014 Crimea Annexation: Hybrid warfare methodology
• 2008 Georgia Conflict: Limited war objectives and outcomes

EXPERT ANALYSIS:
- RAND Corporation strategic assessments indicate high escalation risk
- Council on Foreign Relations warns of "sleepwalking into major conflict"
- Defense Intelligence Agency reports increased threat indicators
- United Nations peacekeeping forces on heightened alert status

DATA TRENDS:
- Military spending increased 47% in region over 24 months
- Cyber attacks on government targets up 230% in past quarter
- Economic sanctions affecting $1.2 trillion in global trade
- Refugee registration systems reporting 340% capacity strain

SOURCE CITATIONS:
- NATO Strategic Communications Centre of Excellence
- SIPRI Military Expenditure Database
- UN Office for the Coordination of Humanitarian Affairs
- Carnegie Endowment for International Peace Analysis`
      },

      'climate': {
        reasoning: `REASONING CHAIN:
1. ENVIRONMENTAL THRESHOLD: Critical climate tipping points approached
2. AGRICULTURAL COLLAPSE: Food security crisis triggers mass migration
3. RESOURCE CONFLICTS: Water scarcity creates regional tensions
4. ECONOMIC DISRUPTION: Climate adaptation costs exceed GDP capacity
5. SOCIAL INSTABILITY: Climate refugees destabilize receiving regions

EVIDENCE ASSESSMENT:
- Antarctic ice sheet collapse accelerating beyond projections
- Agricultural yield declines confirmed across multiple continents
- Water stress indicators reaching critical thresholds
- Climate migration already affecting 21.5 million people annually

CONFIDENCE LEVEL: 91% based on peer-reviewed climate science
- IPCC reports confirm accelerating trend convergence
- Real-time environmental monitoring validates projections
- Economic modeling shows adaptation cost escalation

KEY FACTORS:
- Irreversible feedback loops in climate systems
- Limited international cooperation on adaptation
- Insufficient climate finance mechanisms
- Technological solutions deployment lag

IMPLICATIONS:
- 1.2 billion climate migrants by 2050 (conservative estimate)
- $23 trillion annual adaptation costs by 2030
- Food system collapse affecting 40% of global population
- Potential for climate-driven interstate conflicts`,

        research: `CURRENT SIGNALS: Environmental monitoring networks report:
• Arctic sea ice minimum records broken for third consecutive year
• Permafrost thaw releasing methane at unprecedented rates
• Ocean acidification accelerating marine ecosystem collapse
• Extreme weather events causing $150B+ annual economic losses

HISTORICAL PRECEDENTS:
• 2003 European Heat Wave: 70,000 excess deaths, economic disruption
• 2012 US Drought: $30B agricultural losses, global food price spikes
• 2019-2020 Australian Bushfires: Ecosystem collapse, air quality crisis
• 2021 Pacific Northwest Heat Dome: Infrastructure failure, mass casualties

EXPERT ANALYSIS:
- NASA Goddard Institute confirms acceleration in key indicators
- World Bank estimates climate adaptation needs at $140-300B annually
- UNEP reports 40% of global conflicts linked to natural resources
- WHO projects 250,000 additional deaths annually from climate change

DATA TRENDS:
- Global temperature anomaly +1.48°C above pre-industrial baseline
- Extreme weather events increased 500% since 1980
- Climate adaptation funding gap: $2.8 trillion through 2030
- Renewable energy transition 15 years behind Paris Agreement targets

SOURCE CITATIONS:
- Intergovernmental Panel on Climate Change Sixth Assessment
- National Oceanic and Atmospheric Administration Climate Data
- World Meteorological Organization State of Climate Reports
- Nature Climate Change peer-reviewed research database`
      },

      'health': {
        reasoning: `REASONING CHAIN:
1. PATHOGEN EMERGENCE: Novel infectious agent with pandemic potential detected
2. TRANSMISSION ACCELERATION: Human-to-human spread confirmed with R₀ > 2.5
3. HEALTH SYSTEM STRAIN: Critical care capacity exceeded within 30 days
4. ECONOMIC LOCKDOWNS: Supply chain disruption and business closures
5. SOCIAL BREAKDOWN: Public health measures trigger civil unrest

EVIDENCE ASSESSMENT:
- WHO laboratory networks confirm novel pathogen characteristics
- Mathematical modeling predicts exponential growth phase
- Hospital capacity data shows critical resource shortages
- Economic indicators mirror early pandemic disruption patterns

CONFIDENCE LEVEL: 89% based on epidemiological evidence
- Genetic sequencing confirms human adaptation markers
- Contact tracing reveals sustained community transmission
- Healthcare utilization data validates severity projections

KEY FACTORS:
- Population immunity gaps from previous outbreaks
- Global travel patterns enable rapid geographic spread
- Healthcare system resilience varies by region
- Vaccine development timeline 12-18 months minimum

IMPLICATIONS:
- 2-15 million excess deaths in first wave (depending on mitigation)
- $8-12 trillion global economic impact over 24 months
- Healthcare system collapse in 40+ countries
- Long-term changes to social and economic structures`,

        research: `CURRENT SIGNALS: Global health surveillance indicates:
• Unusual respiratory illness clusters in multiple geographic regions
• Laboratory confirmation of novel coronavirus variant with enhanced transmissibility
• Healthcare worker infection rates exceeding PPE protection capacity
• Pharmaceutical supply chains showing early strain indicators

HISTORICAL PRECEDENTS:
• 1918 H1N1 Influenza: 50-100 million deaths, global economic disruption
• 2003 SARS Outbreak: Economic impact $40B, healthcare system stress
• 2009 H1N1 Pandemic: Rapid global spread, vaccine development challenges
• 2020-2023 COVID-19: Healthcare collapse, $16 trillion economic impact

EXPERT ANALYSIS:
- WHO Director-General declares Public Health Emergency consideration
- CDC epidemiologists confirm sustained human-to-human transmission
- Johns Hopkins Center for Health Security activates monitoring protocols
- Pharmaceutical industry reports accelerated vaccine development timelines

DATA TRENDS:
- Case doubling time: 3.2 days in active transmission zones
- Hospital ICU capacity utilization: 94% in affected regions
- Personal protective equipment reserves: 15-day supply remaining
- Economic indicators showing -2.3% GDP contraction in quarter

SOURCE CITATIONS:
- World Health Organization Disease Outbreak News
- Centers for Disease Control and Prevention Morbidity Reports
- The Lancet Infectious Diseases epidemiological studies
- New England Journal of Medicine clinical case series`
      }
    };

    // Determine scenario type
    const lowerScenario = scenario.toLowerCase();
    let scenarioType = 'geopolitical'; // default

    if (lowerScenario.includes('cyber') || lowerScenario.includes('hack') || lowerScenario.includes('digital')) {
      scenarioType = 'cyber';
    } else if (lowerScenario.includes('climate') || lowerScenario.includes('environment') || lowerScenario.includes('weather')) {
      scenarioType = 'climate';
    } else if (lowerScenario.includes('health') || lowerScenario.includes('pandemic') || lowerScenario.includes('disease')) {
      scenarioType = 'health';
    }

    return scenarios[scenarioType];
  }

  static generateFlowchart(scenario) {
    const lowerScenario = scenario.toLowerCase();
    
    if (lowerScenario.includes('cyber')) {
      return [
        "Phase 1: Initial reconnaissance and vulnerability scanning (0-24 hours)",
        "Phase 2: Exploitation and lateral movement across network segments (24-72 hours)",
        "Phase 3: Persistence establishment and privilege escalation (3-7 days)",
        "Phase 4: Data exfiltration and operational technology targeting (1-2 weeks)",
        "Phase 5: Kinetic effects on critical infrastructure systems (2-4 weeks)",
        "Phase 6: Attribution investigation and international response coordination (1-3 months)"
      ];
    } else if (lowerScenario.includes('climate')) {
      return [
        "Phase 1: Environmental threshold breach and early warning activation (0-30 days)",
        "Phase 2: Ecosystem collapse triggers and agricultural impact assessment (1-6 months)",
        "Phase 3: Mass migration initiation and border pressure points (6-18 months)",
        "Phase 4: Resource conflict emergence and regional destabilization (1-3 years)",
        "Phase 5: International cooperation breakdown and adaptation failure (3-10 years)",
        "Phase 6: Civilizational restructuring and new equilibrium search (10+ years)"
      ];
    } else if (lowerScenario.includes('health')) {
      return [
        "Phase 1: Pathogen detection and initial containment measures (0-14 days)",
        "Phase 2: Community transmission confirmation and health system mobilization (2-6 weeks)",
        "Phase 3: Exponential growth phase and non-pharmaceutical interventions (6-12 weeks)",
        "Phase 4: Healthcare system strain and economic disruption onset (3-6 months)",
        "Phase 5: Vaccine development and distribution logistics preparation (6-18 months)",
        "Phase 6: Recovery phase planning and long-term resilience building (18+ months)"
      ];
    }
    
    // Default geopolitical scenario
    return [
      "Phase 1: Tension escalation and diplomatic communication breakdown (0-72 hours)",
      "Phase 2: Military positioning and alliance consultation activation (3-14 days)",
      "Phase 3: Limited conflict initiation and international response coordination (2-4 weeks)",
      "Phase 4: Escalation management and conflict limitation negotiations (1-3 months)",
      "Phase 5: Resolution framework development and ceasefire implementation (3-12 months)",
      "Phase 6: Post-conflict reconstruction and long-term stability mechanisms (1-5 years)"
    ];
  }

  static generateMitigations(scenario) {
    const lowerScenario = scenario.toLowerCase();
    
    if (lowerScenario.includes('cyber')) {
      return [
        "Immediate: Activate national cyber defense operations center within 2 hours",
        "Short-term: Deploy incident response teams to critical infrastructure operators (24 hours)",
        "Medium-term: Implement network segmentation and air-gapping protocols (48-72 hours)",
        "Long-term: Establish cyber threat information sharing consortium (30 days)",
        "Strategic: Develop international cyber warfare rules of engagement (90 days)",
        "Recovery: Execute national cyber resilience enhancement program (12 months)"
      ];
    } else if (lowerScenario.includes('climate')) {
      return [
        "Immediate: Activate emergency climate adaptation funds and resources (24 hours)",
        "Short-term: Deploy disaster relief teams to affected regions (72 hours)",
        "Medium-term: Establish climate refugee processing and support centers (30 days)",
        "Long-term: Implement accelerated renewable energy transition programs (180 days)",
        "Strategic: Launch international climate security cooperation framework (12 months)",
        "Recovery: Execute ecosystem restoration and resilience building programs (5 years)"
      ];
    } else if (lowerScenario.includes('health')) {
      return [
        "Immediate: Activate national pandemic response protocols within 6 hours",
        "Short-term: Deploy emergency medical teams and establish treatment centers (48 hours)",
        "Medium-term: Implement contact tracing and quarantine systems (7 days)",
        "Long-term: Scale vaccine development and manufacturing capacity (60 days)",
        "Strategic: Establish global health security surveillance network (180 days)",
        "Recovery: Build pandemic-resilient healthcare infrastructure (24 months)"
      ];
    }
    
    // Default geopolitical scenario
    return [
      "Immediate: Activate crisis management team and secure communication channels (2 hours)",
      "Short-term: Deploy diplomatic envoys and activate alliance consultation mechanisms (24 hours)",
      "Medium-term: Position peacekeeping forces and establish humanitarian corridors (72 hours)",
      "Long-term: Implement economic sanctions and diplomatic isolation measures (30 days)",
      "Strategic: Develop conflict resolution framework and peace negotiation structure (90 days)",
      "Recovery: Execute post-conflict reconstruction and reconciliation programs (12 months)"
    ];
  }

  static generateSources(scenario) {
    const lowerScenario = scenario.toLowerCase();
    
    if (lowerScenario.includes('cyber')) {
      return [
        "CISA Cybersecurity and Infrastructure Security Agency",
        "NIST Cybersecurity Framework Documentation",
        "NATO Cooperative Cyber Defence Centre of Excellence",
        "Microsoft Threat Intelligence Center",
        "FireEye Mandiant Threat Research",
        "Symantec Internet Security Threat Report"
      ];
    } else if (lowerScenario.includes('climate')) {
      return [
        "IPCC Intergovernmental Panel on Climate Change",
        "NASA Goddard Institute for Space Studies",
        "NOAA National Oceanic and Atmospheric Administration",
        "UNEP United Nations Environment Programme",
        "Nature Climate Change Journal",
        "World Bank Climate Change Action Plan"
      ];
    } else if (lowerScenario.includes('health')) {
      return [
        "WHO World Health Organization",
        "CDC Centers for Disease Control and Prevention",
        "The Lancet Medical Journal",
        "Johns Hopkins Center for Health Security",
        "GAVI Global Alliance for Vaccines and Immunisation",
        "CEPI Coalition for Epidemic Preparedness Innovations"
      ];
    }
    
    // Default geopolitical sources
    return [
      "Council on Foreign Relations",
      "RAND Corporation Strategic Analysis",
      "Carnegie Endowment for International Peace",
      "NATO Strategic Communications Centre",
      "UN Office for the Coordination of Humanitarian Affairs",
      "International Crisis Group"
    ];
  }

  static generateSupportingEvidence(scenario) {
    const lowerScenario = scenario.toLowerCase();
    
    if (lowerScenario.includes('cyber')) {
      return [
        "Industrial control systems showing 340% increase in unauthorized access attempts",
        "Dark web intelligence indicates coordination among state-sponsored threat actors",
        "Critical infrastructure operators reporting simultaneous reconnaissance activities",
        "Cybersecurity firms detecting novel malware variants targeting SCADA systems"
      ];
    } else if (lowerScenario.includes('climate')) {
      return [
        "Satellite data confirms accelerating ice sheet loss beyond IPCC projections",
        "Agricultural monitoring systems report crop yield declines across 23 countries",
        "Ocean temperature anomalies reach highest levels in 125,000 years",
        "Extreme weather frequency increased 400% compared to 20-year historical average"
      ];
    } else if (lowerScenario.includes('health')) {
      return [
        "Laboratory networks confirm novel pathogen with enhanced transmissibility markers",
        "Hospital utilization data shows ICU capacity approaching 95% in affected regions",
        "Contact tracing algorithms indicate exponential growth in community transmission",
        "Pharmaceutical supply chain monitoring reveals critical shortages in 15+ countries"
      ];
    }
    
    // Default geopolitical evidence
    return [
      "Satellite imagery confirms military asset positioning consistent with offensive operations",
      "Diplomatic communications analysis reveals breakdown in negotiation frameworks",
      "Economic indicators show war economy preparation in key regional actors",
      "Social media analysis indicates coordinated information warfare campaigns"
    ];
  }

  static generateCounterEvidence(scenario) {
    return [
      "Alternative intelligence assessments suggest lower probability of scenario actualization",
      "Historical precedent analysis indicates successful containment in 67% of similar cases",
      "Economic incentive structures favor de-escalation among key stakeholders",
      "International mediation mechanisms remain active and show engagement from all parties",
      "Technical mitigation capabilities have improved significantly since last comparable incident"
    ];
  }
}

module.exports = MockSonarData;
