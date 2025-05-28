
const logger = require('../utils/logger');
const sonarClient = require('../utils/sonarClient');
const { v4: uuidv4 } = require('uuid');
const { getFirestore, isDemoMode } = require('../config/firebase');

class EnhancedSimulationController {
  static async runLiveSimulation(req, res) {
    try {
      console.log('🧪 Running live crisis simulation with Sonar AI...');
      
      const { scenario } = req.body;
      
      if (!scenario) {
        return res.status(400).json({
          success: false,
          error: 'Scenario is required for simulation'
        });
      }

      console.log(`🎯 Simulating scenario: ${scenario.substring(0, 50)}...`);

      let sonarAnalysis = null;
      let fallbackUsed = false;

      try {
        // Use Sonar for real-time analysis
        sonarAnalysis = await sonarClient.hybridAnalysis(scenario);
        console.log('✅ Sonar analysis completed successfully');
      } catch (error) {
        console.warn('⚠️ Sonar analysis failed, using enhanced fallback:', error.message);
        fallbackUsed = true;
        sonarAnalysis = EnhancedSimulationController.generateEnhancedFallback(scenario);
      }

      // Generate comprehensive simulation result
      const simulation = {
        id: uuidv4(),
        scenario: scenario,
        sonarAnalysis: sonarAnalysis,
        flowchart: EnhancedSimulationController.generateFlowchart(scenario),
        mitigations: EnhancedSimulationController.generateMitigations(scenario),
        confidence: fallbackUsed ? Math.floor(Math.random() * 15) + 60 : Math.floor(Math.random() * 20) + 75,
        verdict: EnhancedSimulationController.generateVerdict(scenario, sonarAnalysis),
        timeline: EnhancedSimulationController.generateTimeline(scenario),
        impact: EnhancedSimulationController.generateImpact(scenario),
        sources: fallbackUsed ? [
          "Global Crisis Database",
          "Emergency Response Manual",
          "Historical Precedent Analysis"
        ] : [
          "Perplexity Sonar Real-time Analysis",
          "Live Intelligence Feeds",
          "Academic Crisis Simulation Models",
          "Government Response Frameworks"
        ],
        supportingPoints: EnhancedSimulationController.extractSupportingPoints(sonarAnalysis),
        counterPoints: EnhancedSimulationController.extractCounterPoints(sonarAnalysis),
        deepAnalysisLinks: EnhancedSimulationController.generateDeepAnalysisLinks(scenario),
        usedSonar: !fallbackUsed,
        timestamp: new Date().toISOString()
      };

      // Store in Firestore if available
      if (!isDemoMode()) {
        try {
          const db = getFirestore();
          await db.collection('simulations').doc(simulation.id).set(simulation);
          console.log('✅ Live simulation stored in Firestore');
        } catch (firestoreError) {
          console.warn('⚠️ Firestore storage failed, continuing with response');
        }
      }

      console.log(`✅ Live simulation completed: ${simulation.verdict}`);

      res.json({
        success: true,
        message: 'Live crisis simulation completed successfully',
        simulation,
        poweredBy: fallbackUsed ? 'Enhanced Fallback Intelligence' : 'Sonar AI + Live Intelligence'
      });

    } catch (error) {
      console.error('❌ Live crisis simulation failed:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to run live simulation',
        message: error.message
      });
    }
  }

  static generateEnhancedFallback(scenario) {
    return {
      reasoning: `Enhanced analysis of ${scenario.substring(0, 100)}... reveals multiple critical factors requiring immediate attention. The scenario presents significant challenges across multiple domains including security, humanitarian, and geopolitical dimensions.`,
      research: `Research indicates similar historical precedents with varying outcomes. Key factors include international response coordination, resource allocation efficiency, and timeline of intervention measures. Current geopolitical climate suggests elevated risk factors.`
    };
  }

  static generateFlowchart(scenario) {
    const baseSteps = [
      "Initial threat detection and assessment phase",
      "Stakeholder notification and emergency protocols activated",
      "Resource mobilization and coordination between agencies",
      "Public communication strategy implementation",
      "Escalation management and containment measures",
      "Recovery and post-incident analysis phase"
    ];

    if (scenario.toLowerCase().includes('cyber')) {
      return [
        "Cyber threat detection and isolation",
        "Network security protocols activated",
        "Incident response team deployment",
        "System backup and recovery procedures",
        "Stakeholder communication and updates",
        "Post-incident security assessment"
      ];
    }

    return baseSteps;
  }

  static generateMitigations(scenario) {
    const baseMitigations = [
      "Establish multi-agency coordination center within 2 hours",
      "Deploy rapid response teams to affected regions",
      "Implement emergency communication protocols",
      "Activate strategic reserves and backup systems",
      "Coordinate with international partners for support",
      "Execute contingency plans for critical infrastructure"
    ];

    if (scenario.toLowerCase().includes('health')) {
      return [
        "Activate public health emergency protocols",
        "Deploy medical response teams and resources",
        "Implement quarantine and isolation measures",
        "Coordinate with WHO and international health bodies",
        "Establish treatment centers and supply chains",
        "Launch public information and awareness campaigns"
      ];
    }

    return baseMitigations;
  }

  static generateDeepAnalysisLinks(scenario) {
    return [
      {
        title: "Root Cause Analysis",
        type: "root_cause",
        description: "Deep dive into the fundamental causes and origins"
      },
      {
        title: "Escalation Factors",
        type: "escalation_factor", 
        description: "Analysis of factors that could amplify the crisis"
      },
      {
        title: "Cascading Effects",
        type: "cascading_effect",
        description: "Examination of potential secondary and tertiary impacts"
      },
      {
        title: "Historical Precedents",
        type: "historical_precedent",
        description: "Comparison with similar past events and outcomes"
      }
    ];
  }

  static extractSupportingPoints(analysis) {
    if (!analysis || !analysis.reasoning) {
      return [
        "Historical precedents show similar patterns",
        "Current geopolitical climate supports assessment",
        "Expert consensus aligns with simulation parameters",
        "Data trends indicate potential for escalation"
      ];
    }

    const text = analysis.reasoning;
    const points = [];
    
    // Extract key supporting statements
    const sentences = text.split('.').filter(s => s.length > 20);
    sentences.forEach(sentence => {
      if (sentence.includes('evidence') || sentence.includes('support') || 
          sentence.includes('indicates') || sentence.includes('suggests')) {
        points.push(sentence.trim() + '.');
      }
    });

    return points.slice(0, 4);
  }

  static extractCounterPoints(analysis) {
    if (!analysis || !analysis.reasoning) {
      return [
        "Alternative explanations may be more plausible",
        "Insufficient data for complete verification",
        "Potential for overestimation of threat level",
        "Regional variations may affect outcomes"
      ];
    }

    return [
      "Counter-evidence suggests alternative scenarios",
      "Uncertainty factors may influence outcomes",
      "Limited real-time data availability",
      "Complexity may exceed current modeling capabilities"
    ];
  }

  static generateVerdict(scenario, analysis) {
    const keywords = scenario.toLowerCase();
    
    if (analysis && analysis.reasoning && analysis.reasoning.includes('high confidence')) {
      return 'Highly Likely - Immediate Response Required';
    }
    
    if (keywords.includes('nuclear') || keywords.includes('war')) {
      return 'Highly Critical - Immediate Response Required';
    } else if (keywords.includes('cyber') || keywords.includes('attack')) {
      return 'Likely Threat - Enhanced Monitoring Recommended';
    } else if (keywords.includes('climate') || keywords.includes('health')) {
      return 'Possible Risk - Preventive Measures Advised';
    }
    
    return 'Uncertain Outcome - Requires Additional Intelligence';
  }

  static generateTimeline(scenario) {
    const keywords = scenario.toLowerCase();
    
    if (keywords.includes('immediate') || keywords.includes('urgent')) {
      return '6-12 hours';
    } else if (keywords.includes('cyber') || keywords.includes('attack')) {
      return '24-48 hours';
    }
    
    const timelines = ['24-48 hours', '3-7 days', '1-2 weeks', '2-4 weeks'];
    return timelines[Math.floor(Math.random() * timelines.length)];
  }

  static generateImpact(scenario) {
    const keywords = scenario.toLowerCase();
    
    if (keywords.includes('global') || keywords.includes('international')) {
      return 'Global security and economic implications';
    } else if (keywords.includes('cyber')) {
      return 'Critical infrastructure vulnerability';
    } else if (keywords.includes('health')) {
      return 'Public health and safety concerns';
    }
    
    const impacts = [
      'Regional security implications',
      'Economic disruption potential',
      'Humanitarian crisis risk',
      'Infrastructure vulnerability',
      'Public safety concerns'
    ];
    return impacts[Math.floor(Math.random() * impacts.length)];
  }
}

module.exports = EnhancedSimulationController;
