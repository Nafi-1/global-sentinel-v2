
const EnhancedMockSonar = require('./enhancedMockSonar');
const MockSonarData = require('./mockSonarData');

class DemoSonarClient {
  constructor() {
    console.log('🎭 Demo Sonar Client initialized - Using enhanced mock intelligence');
  }

  async sonarReasoning(hypothesis, useCounter = false) {
    console.log('🧠 Demo Sonar reasoning analysis starting...');
    await new Promise(resolve => setTimeout(resolve, 1500)); // Realistic delay
    
    const analysis = await EnhancedMockSonar.generateComprehensiveAnalysis(hypothesis);
    console.log('✅ Demo Sonar reasoning completed successfully');
    
    return analysis.reasoning;
  }

  async sonarDeepSearch(query, domains = [], citations = true) {
    console.log('🔍 Demo Sonar deep search starting...');
    await new Promise(resolve => setTimeout(resolve, 1200)); // Realistic delay
    
    const analysis = await EnhancedMockSonar.generateComprehensiveAnalysis(query);
    console.log('✅ Demo Sonar deep search completed successfully');
    
    return analysis.research;
  }

  async hybridAnalysis(scenario) {
    console.log('🧠 Demo hybrid Sonar analysis starting for:', scenario.substring(0, 50) + '...');
    
    const analysis = await EnhancedMockSonar.generateComprehensiveAnalysis(scenario);
    
    console.log('✅ Demo hybrid analysis completed successfully');
    return analysis;
  }

  async verificationAnalysis(claim) {
    console.log('🔍 Demo verification analysis starting...');
    const result = await EnhancedMockSonar.generateVerificationAnalysis(claim);
    console.log('✅ Demo verification completed successfully');
    return result;
  }
}

module.exports = new DemoSonarClient();
