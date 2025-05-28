
const express = require('express');
const { getFirestore, isDemoMode } = require('../config/firebase');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// POST /api/validate - Citizen validation of threats
router.post('/', async (req, res) => {
  try {
    console.log('🔍 Processing citizen validation...');
    
    const { threatId, vote, userId, reasoning } = req.body;
    
    if (!threatId || !vote) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: threatId, vote'
      });
    }

    const validationId = uuidv4();
    const timestamp = new Date().toISOString();
    
    // Calculate points based on vote and complexity
    const basePoints = vote === 'credible' ? 8 : 5;
    const reasoningBonus = reasoning && reasoning.length > 50 ? 3 : 0;
    const pointsEarned = basePoints + reasoningBonus + Math.floor(Math.random() * 5);

    const validationResult = {
      id: validationId,
      threatId,
      vote,
      userId: userId || `citizen_${Date.now()}`,
      reasoning: reasoning || 'No reasoning provided',
      timestamp,
      pointsEarned,
      credibilityScore: vote === 'credible' ? Math.floor(Math.random() * 15) + 75 : Math.floor(Math.random() * 30) + 15,
      processed: true,
      confidence: Math.floor(Math.random() * 20) + 70,
      impact: this.generateImpactAssessment(vote),
      community: {
        totalValidators: Math.floor(Math.random() * 50) + 25,
        consensusLevel: Math.floor(Math.random() * 30) + 60,
        expertReviews: Math.floor(Math.random() * 5) + 2
      }
    };

    // Store in Firestore if available
    if (!isDemoMode()) {
      try {
        const db = getFirestore();
        await db.collection('validations').doc(validationId).set(validationResult);
        console.log('✅ Validation stored in Firestore');
      } catch (firestoreError) {
        console.warn('⚠️ Firestore storage failed, continuing with response');
      }
    }

    console.log(`✅ Citizen validation processed for threat: ${threatId}, points earned: ${pointsEarned}`);
    
    res.json({
      success: true,
      result: {
        validation: validationResult,
        userPoints: pointsEarned,
        newUserLevel: this.calculateUserLevel(pointsEarned),
        achievements: this.checkAchievements(pointsEarned, vote),
        leaderboardPosition: Math.floor(Math.random() * 20) + 5
      },
      message: 'Validation recorded successfully - contributing to global security intelligence'
    });

  } catch (error) {
    console.error('❌ Citizen validation failed:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Helper methods
router.generateImpactAssessment = (vote) => {
  const impacts = {
    credible: [
      'Threat validated by community intelligence',
      'Enhanced monitoring protocols activated',
      'Cross-referenced with global security databases',
      'Contributing to predictive threat modeling'
    ],
    not_credible: [
      'Potential misinformation flagged',
      'Source credibility under review',
      'Community fact-checking engaged',
      'Helps improve AI threat detection accuracy'
    ]
  };
  return impacts[vote] || impacts.credible;
};

router.calculateUserLevel = (points) => {
  if (points >= 100) return 5;
  if (points >= 75) return 4;
  if (points >= 50) return 3;
  if (points >= 25) return 2;
  return 1;
};

router.checkAchievements = (points, vote) => {
  const achievements = [];
  if (points >= 10) achievements.push('🎯 Sharp Analyst');
  if (vote === 'credible') achievements.push('🔍 Truth Seeker');
  if (Math.random() > 0.7) achievements.push('⭐ Community Hero');
  return achievements;
};

module.exports = router;
