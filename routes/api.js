// Dependencies
var express = require('express');
var router = express.Router();

// Get models
var agents = require('../models/agents');
var aeroports = require('../models/aeroports');

router.get('/aeroports/:name', function(req, res)){
	res.send({type:'GET'});
}

// Return router
module.exports = router;