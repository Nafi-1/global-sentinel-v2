
const express = require('express');
const router = express.Router();

// Test RSS scraping endpoint
router.post('/test-rss-scrape', async (req, res) => {
  try {
    console.log('📡 Testing RSS scraping...');
    
    // Simulate RSS scraping
    const threatsFound = Math.floor(Math.random() * 10) + 1;
    
    res.json({
      success: true,
      message: 'RSS scraping test completed',
      data: {
        threatsFound,
        sources: ['BBC RSS', 'Reuters RSS', 'AP News RSS']
      }
    });
  } catch (error) {
    console.error('❌ RSS scraping test failed:', error);
    res.status(500).json({
      success: false,
      error: 'RSS scraping test failed'
    });
  }
});

// Test API scraping endpoint
router.post('/test-api-scrape', async (req, res) => {
  try {
    console.log('🔗 Testing API scraping...');
    
    // Simulate API scraping
    const threatsFound = Math.floor(Math.random() * 8) + 1;
    
    res.json({
      success: true,
      message: 'API scraping test completed',
      data: {
        threatsFound,
        sources: ['GDELT API', 'World Bank API', 'WHO API']
      }
    });
  } catch (error) {
    console.error('❌ API scraping test failed:', error);
    res.status(500).json({
      success: false,
      error: 'API scraping test failed'
    });
  }
});

// Test HTML scraping endpoint
router.post('/test-html-scrape', async (req, res) => {
  try {
    console.log('🕸️ Testing HTML scraping...');
    
    // Simulate HTML scraping
    const threatsFound = Math.floor(Math.random() * 6) + 1;
    
    res.json({
      success: true,
      message: 'HTML scraping test completed',
      data: {
        threatsFound,
        sources: ['News Websites', 'Government Sites', 'Research Portals']
      }
    });
  } catch (error) {
    console.error('❌ HTML scraping test failed:', error);
    res.status(500).json({
      success: false,
      error: 'HTML scraping test failed'
    });
  }
});

// Test Reddit scraping endpoint
router.post('/test-reddit-scrape', async (req, res) => {
  try {
    console.log('🟠 Testing Reddit scraping...');
    
    // Simulate Reddit scraping
    const threatsFound = Math.floor(Math.random() * 12) + 1;
    
    res.json({
      success: true,
      message: 'Reddit scraping test completed',
      data: {
        threatsFound,
        sources: ['r/worldnews', 'r/geopolitics', 'r/security']
      }
    });
  } catch (error) {
    console.error('❌ Reddit scraping test failed:', error);
    res.status(500).json({
      success: false,
      error: 'Reddit scraping test failed'
    });
  }
});

module.exports = router;
