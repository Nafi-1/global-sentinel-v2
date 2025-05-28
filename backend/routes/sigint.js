
const express = require('express');
const router = express.Router();

// Import SIGINT endpoints
const sigintEndpoints = require('./sigintEndpoints');

// Mount SIGINT test endpoints
router.use('/', sigintEndpoints);

module.exports = router;
