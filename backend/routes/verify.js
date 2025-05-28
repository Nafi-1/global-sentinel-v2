
const express = require('express');
const { getFirestore, isDemoMode } = require('../config/firebase');
const demoSonarClient = require('../utils/demoSonarClient');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// POST /api/verify - Live threat verification with demo intelligence
router.post('/', async (req, res) => {
  try {
    console.log('🔍 Processing DEMO threat verification...');
    
    const { threatId, claim, userId } = req.body;
    
    if (!claim) {
      return res.status(400).json({
        success: false,
        error: 'Claim is required for verification'
      });
    }

    console.log(`🎯 Demo verifying claim: ${claim.substring(0, 50)}...`);

    // Use demo Sonar client for verification
    const verificationAnalysis = await demoSonarClient.verificationAnalysis(claim);
    console.log('✅ Demo verification analysis completed');

    const verificationId = uuidv4();
    const timestamp = new Date().toISOString();
    
    // Calculate points based on analysis quality
    const basePoints = 15;
    const qualityBonus = verificationAnalysis.confidence > 80 ? 10 : 5;
    const detailBonus = claim.length > 100 ? 5 : 0;
    const pointsEarned = basePoints + qualityBonus + detailBonus + Math.floor(Math.random() * 8);

    const verificationResult = {
      id: verificationId,
      threatId,
      claim,
      userId: userId || `citizen_${Date.now()}`,
      timestamp,
      pointsEarned,
      processed: true,
      
      // Demo verification results
      verdict: verificationAnalysis.verdict,
      confidence: verificationAnalysis.confidence,
      reasoning: verificationAnalysis.reasoning,
      supportingEvidence: verificationAnalysis.supportingEvidence,
      challengingEvidence: verificationAnalysis.challengingEvidence,
      keyInsights: verificationAnalysis.keyInsights,
      evidenceQuality: verificationAnalysis.evidenceQuality,
      sourceCredibility: verificationAnalysis.sourceCredibility,
      sources: verificationAnalysis.sources,
      
      // Gamification elements
      newUserLevel: this.calculateUserLevel(pointsEarned),
      achievements: this.generateAchievements(pointsEarned, verificationAnalysis),
      leaderboardPosition: Math.floor(Math.random() * 15) + 3,
      expertisePoints: {
        analysis: Math.floor(Math.random() * 25) + 10,
        research: Math.floor(Math.random() * 20) + 15,
        verification: Math.floor(Math.random() * 30) + 20
      }
    };

    // Store in Firestore if available
    if (!isDemoMode()) {
      try {
        const db = getFirestore();
        await db.collection('verifications').doc(verificationId).set(verificationResult);
        console.log('✅ Demo verification stored in Firestore');
      } catch (firestoreError) {
        console.warn('⚠️ Firestore storage failed, continuing with response');
      }
    }

    console.log(`✅ Demo verification completed: ${verificationAnalysis.verdict}, points: ${pointsEarned}`);
    
    res.json({
      success: true,
      verification: verificationResult,
      userStats: {
        pointsEarned,
        newLevel: verificationResult.newUserLevel,
        achievements: verificationResult.achievements,
        leaderboardRank: verificationResult.leaderboardPosition
      },
      message: 'DEMO: Advanced AI verification completed successfully',
      poweredBy: 'Global Sentinel Intelligence Engine (Demo Mode)'
    });

  } catch (error) {
    console.error('❌ Demo verification failed:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to run demo verification',
      message: error.message
    });
  }
});

// Helper methods
router.calculateUserLevel = (points) => {
  if (points >= 50) return 'Expert Analyst';
  if (points >= 35) return 'Senior Validator';
  if (points >= 25) return 'Verified Analyst';
  if (points >= 15) return 'Junior Validator';
  return 'Citizen Analyst';
};

router.generateAchievements = (points, analysis) => {
  const achievements = [];
  
  if (points >= 30) achievements.push('🎯 Elite Intelligence Analyst');
  if (analysis.confidence >= 85) achievements.push('🔍 Truth Seeker Supreme');
  if (analysis.evidenceQuality === 'High') achievements.push('📊 Evidence Master');
  if (Math.random() > 0.6) achievements.push('⭐ Community Guardian');
  if (analysis.sources.length >= 5) achievements.push('🌐 Source Network Expert');
  
  return achievements;
};

module.exports = router;
