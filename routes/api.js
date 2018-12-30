// Dependencies
var express = require('express');
var router = express.Router();

// Get models
var agents = require('../models/agents');
var aeroports = require('../models/aeroports');

router.get('/aeroports/:name', function(req, res)){
	res.send({type:'GET'});
}

// Routes
agents.methods(['get', 'post', 'put', 'delete']);
agents.register(router, '/agents');

//aeroports
aeroports.methods(['get', 'post', 'put', 'delete']);
aeroports.register(router, '/aeroports');

// Return router
module.exports = router;