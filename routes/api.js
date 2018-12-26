// Dependencies
var express = require('express');
var router = express.Router();

// Get models
var agents = require('../models/agents');
var aeroports = require('../models/aeroports');

// Routes
agents.methods(['get', 'post', 'put', 'delete']);
agents.register(router, '/agents');

aeroports.methods(['get', 'post', 'put', 'delete']);
aeroports.register(router, '/aeroports');

// Return router
module.exports = router;