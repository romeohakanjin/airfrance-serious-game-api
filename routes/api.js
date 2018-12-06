// Dependencies
var express = require('express');
var router = express.Router();

// Get models
var agents = require('../models/agents');

// Routes
agents.methods(['get', 'post', 'put', 'delete']);
agents.register(router, '/agents');
agents.register(router, '/checkAgentsSession');

// Return router
module.exports = router;