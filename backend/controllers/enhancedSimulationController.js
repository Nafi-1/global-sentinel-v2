const logger = require('../utils/logger');
const demoSonarClient = require('../utils/demoSonarClient'); // Demo client for hackathon
const MockSonarData = require('../utils/mockSonarData');
const { v4: uuidv4 } = require('uuid');
const { getFirestore, isDemoMode } = require('../config/firebase');

class EnhancedSimulationController {
  static async runLiveSimulation(req, res) {
    try {
      console.log('🧪 Running DEMO crisis simulation with enhanced mock intelligence...');
      
      const { scenario } = req.body;
      
      if (!scenario) {
        return res.status(400).json({
          success: false,
          error: 'Scenario is required for simulation'
        });
      }

      console.log(`🎯 Demo simulating scenario: ${scenario.substring(0, 50)}...`);

      // Use demo Sonar client instead of real one
      const sonarAnalysis = await demoSonarClient.hybridAnalysis(scenario);
      console.log('✅ Demo Sonar analysis completed successfully');

      // Generate comprehensive simulation result
      const simulation = {
        id: uuidv4(),
        scenario: scenario,
        sonarAnalysis: sonarAnalysis,
        flowchart: MockSonarData.generateFlowchart(scenario),
        mitigations: MockSonarData.generateMitigations(scenario),
        confidence: sonarAnalysis.confidence,
        verdict: EnhancedSimulationController.generateVerdict(scenario, sonarAnalysis),
        timeline: EnhancedSimulationController.generateTimeline(scenario),
        impact: EnhancedSimulationController.generateImpact(scenario),
        sources: MockSonarData.generateSources(scenario),
        supportingPoints: MockSonarData.generateSupportingEvidence(scenario),
        counterPoints: MockSonarData.generateCounterEvidence(scenario),
        deepAnalysisLinks: EnhancedSimulationController.generateDeepAnalysisLinks(scenario),
        usedSonar: true, // Demo mode still shows as "Sonar powered"
        timestamp: new Date().toISOString()
      };

      // Store in Firestore if available
      if (!isDemoMode()) {
        try {
          const db = getFirestore();
          await db.collection('simulations').doc(simulation.id).set(simulation);
          console.log('✅ Demo simulation stored in Firestore');
        } catch (firestoreError) {
          console.warn('⚠️ Firestore storage failed, continuing with response');
        }
      }

      console.log(`✅ Demo simulation completed: ${simulation.verdict}`);

      res.json({
        success: true,
        message: 'DEMO: Live crisis simulation completed successfully',
        simulation,
        poweredBy: 'Global Sentinel Intelligence Engine (Demo Mode)'
      });

    } catch (error) {
      console.error('❌ Demo crisis simulation failed:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to run demo simulation',
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
        description: "Deep dive into fundamental systemic vulnerabilities"
      },
      {
        title: "Escalation Dynamics",
        type: "escalation_factor", 
        description: "Analysis of amplification and acceleration mechanisms"
      },
      {
        title: "Cascading Effects",
        type: "cascading_effect",
        description: "Multi-domain impact assessment and propagation analysis"
      },
      {
        title: "Historical Intelligence",
        type: "historical_precedent",
        description: "Precedent analysis and pattern recognition assessment"
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
    const confidence = analysis?.confidence || 75;
    
    if (confidence > 85) {
      if (keywords.includes('nuclear') || keywords.includes('war')) {
        return 'Extremely High Confidence - Critical Threat Level Alpha';
      } else if (keywords.includes('cyber') || keywords.includes('attack')) {
        return 'High Confidence - Immediate Response Protocol Activated';
      } else if (keywords.includes('climate') || keywords.includes('health')) {
        return 'High Confidence - Emergency Coordination Required';
      }
      return 'High Confidence - Enhanced Monitoring Recommended';
    } else if (confidence > 75) {
      return 'Moderate Confidence - Precautionary Measures Advised';
    } else {
      return 'Developing Situation - Continuous Assessment Required';
    }
  }

  static generateTimeline(scenario) {
    const keywords = scenario.toLowerCase();
    
    if (keywords.includes('immediate') || keywords.includes('urgent') || keywords.includes('breaking')) {
      return '0-6 hours (Critical Window)';
    } else if (keywords.includes('cyber') || keywords.includes('attack')) {
      return '6-48 hours (Active Threat)';
    } else if (keywords.includes('health') || keywords.includes('pandemic')) {
      return '2-14 days (Incubation Period)';
    } else if (keywords.includes('climate') || keywords.includes('environment')) {
      return '30-90 days (Environmental Lag)';
    }
    
    return '48-168 hours (Standard Assessment)';
  }

  static generateImpact(scenario) {
    const keywords = scenario.toLowerCase();
    
    if (keywords.includes('global') || keywords.includes('international') || keywords.includes('nuclear')) {
      return 'Global security architecture destabilization';
    } else if (keywords.includes('cyber') || keywords.includes('digital')) {
      return 'Critical digital infrastructure compromise';
    } else if (keywords.includes('health') || keywords.includes('pandemic')) {
      return 'Multi-domain public health emergency';
    } else if (keywords.includes('climate') || keywords.includes('environment')) {
      return 'Ecosystem collapse with cascading effects';
    } else if (keywords.includes('economic') || keywords.includes('financial')) {
      return 'Systemic economic disruption potential';
    }
    
    return 'Regional stability and security implications';
  }
}

module.exports = EnhancedSimulationController;
