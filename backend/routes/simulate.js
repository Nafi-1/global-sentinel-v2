
const express = require('express');
const EnhancedSimulationController = require('../controllers/enhancedSimulationController');
const router = express.Router();

// POST /api/simulate - Run enhanced crisis simulation with Sonar
router.post('/', EnhancedSimulationController.runLiveSimulation);

module.exports = router;
