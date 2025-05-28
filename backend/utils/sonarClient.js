
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// Force reload environment variables at the module level
const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log('🔧 SonarClient: Environment variables reloaded from:', envPath);
}

class SonarClient {
  constructor() {
    // Force reload environment variables again in constructor
    this.apiKey = process.env.OPENROUTER_API_KEY?.trim();
    this.baseURL = 'https://openrouter.ai/api/v1/chat/completions';
    
    console.log('🔑 SonarClient API Key Check:', this.apiKey ? `Found (${this.apiKey.substring(0, 15)}...)` : 'Missing');
    console.log('🔑 Full environment check:', {
      hasKey: !!this.apiKey,
      keyLength: this.apiKey?.length || 0,
      envPath: envPath,
      envExists: fs.existsSync(envPath)
    });
    
    if (!this.apiKey) {
      console.error('❌ OPENROUTER_API_KEY not found in environment variables');
      console.error('💡 Please check your .env file contains: OPENROUTER_API_KEY=your_key_here');
    }
  }

  async sonarReasoning(hypothesis, useCounter = false) {
    if (!this.apiKey) {
      throw new Error('OPENROUTER_API_KEY not found in environment variables');
    }

    try {
      console.log('🧠 Starting Sonar reasoning analysis...');
      
      const systemPrompt = useCounter 
        ? 'You are a critical analyst. Challenge the given hypothesis with counter-evidence and alternative explanations. Provide logical counter-arguments and contradictory evidence.'
        : 'You are a crisis reasoning specialist. Analyze the hypothesis and provide logical reasoning chains, causal relationships, and evidence-based implications.';

      const userPrompt = `${hypothesis}

Please provide:
1. REASONING CHAIN: Step-by-step logical progression
2. EVIDENCE ASSESSMENT: Supporting or contradicting evidence
3. CONFIDENCE LEVEL: Percentage confidence in the analysis
4. KEY FACTORS: Primary drivers and variables
5. IMPLICATIONS: Potential consequences and outcomes`;

      console.log('🔗 Making request to OpenRouter API...');
      
      const response = await axios.post(this.baseURL, {
        model: 'perplexity/sonar-reasoning',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: userPrompt
          }
        ],
        temperature: 0.3,
        max_tokens: 2500,
        top_p: 0.9
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://global-sentinel.ai',
          'X-Title': 'Global Sentinel Crisis Reasoning'
        }
      });

      console.log('✅ Sonar reasoning completed successfully');
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('🚨 Sonar Reasoning Error:', error.response?.status, error.response?.data || error.message);
      
      if (error.response?.status === 401) {
        console.error('❌ Authentication failed - check OPENROUTER_API_KEY');
        console.error('🔑 Current API Key:', this.apiKey ? `${this.apiKey.substring(0, 10)}...` : 'MISSING');
      }
      
      throw new Error(`Sonar reasoning failed: ${error.response?.data?.error?.message || error.message}`);
    }
  }

  async sonarDeepSearch(query, domains = [], citations = true) {
    if (!this.apiKey) {
      throw new Error('OPENROUTER_API_KEY not found in environment variables');
    }

    try {
      console.log('🔍 Starting Sonar deep search...');
      
      const searchPrompt = `${query}

Focus search on recent developments and credible sources. Include:
1. CURRENT SIGNALS: Recent events and indicators
2. HISTORICAL PRECEDENTS: Similar past occurrences
3. EXPERT ANALYSIS: Professional assessments and opinions
4. DATA TRENDS: Statistical patterns and projections
5. SOURCE CITATIONS: Credible references and links

${domains.length > 0 ? `Prioritize sources from: ${domains.join(', ')}` : ''}
${citations ? 'Include clickable source citations and references.' : ''}`;

      const response = await axios.post(this.baseURL, {
        model: 'perplexity/sonar-large-online',
        messages: [
          {
            role: 'system',
            content: 'You are an intelligence researcher conducting deep search analysis. Provide comprehensive research with credible sources and citations.'
          },
          {
            role: 'user',
            content: searchPrompt
          }
        ],
        temperature: 0.2,
        max_tokens: 3000,
        top_p: 0.9
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://global-sentinel.ai',
          'X-Title': 'Global Sentinel Deep Search'
        }
      });

      console.log('✅ Sonar deep search completed successfully');
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('🚨 Sonar Deep Search Error:', error.response?.status, error.response?.data || error.message);
      throw new Error(`Sonar deep search failed: ${error.response?.data?.error?.message || error.message}`);
    }
  }

  async hybridAnalysis(scenario) {
    try {
      console.log('🧠 Starting hybrid Sonar analysis for:', scenario.substring(0, 50) + '...');
      
      // Run both reasoning and deep search in parallel
      const [reasoningResult, searchResult] = await Promise.all([
        this.sonarReasoning(scenario),
        this.sonarDeepSearch(`Crisis signals and evidence for: ${scenario}`, [], true)
      ]);

      return {
        reasoning: reasoningResult,
        research: searchResult,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('🚨 Hybrid Analysis Error:', error);
      throw error;
    }
  }
}

module.exports = new SonarClient();
