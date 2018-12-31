// Dependencies
var express = require('express');
var restful = require('node-restful');
var mongoose = require('mongoose');
var router = express.Router();

// agents
var agentsSchema = new mongoose.Schema({
	_id: String,
	first_name: String,
	last_name: String,
	registration_number: Number,
	password: Number
});

// aeroports schema
var aeroportSchema = new mongoose.Schema({
    _id: String,
    name: String,
    terminals: [{
        name: String
    }],
    flight: {
		num_flight: Number,
		destination: String,
		departure_time: String,
		arrival_time: String,
		departure_date: String,
		terminal: String,
		escale: {
			departure_time: String,
			destination: String,
			arrival_time: String,
			place_departure: String
		},
		passenger: [{
    	reference_number: Number,
		last_name: String,
    	first_name: String,
    	address: String,
    	mobile: String,
    	mail: String,
      	status: {
          wording: String
        },
          luggage: {
            number: Number
          }
    }],
    incident: [{
      type: String,
      description: String
    }]
	}
});

var Aeroports = mongoose.model('Aeroport', aeroportSchema);
var Agents = mongoose.model('Agent', agentsSchema);

// agents query
router.route('/agents')
.get(function(req,res){ 
    Agents.find(function(err, agents){
        if (err){
            res.send(err); 
        }
        res.json(agents); 
        
    }); 
});

router.route('/agents/:registration_number/:password')
.get(function(req,res){ 
    Agents.find({"registration_number": req.params.registration_number, "password": req.params.password},function(err, agents){
        if (err){
            res.send(err); 
        }
        res.json(agents); 
        
    }); 
});

// aeroports query
router.route('/aeroports/:name')
.get(function(req,res){ 
        Aeroports.find({"name": req.params.name}, function(err, aeroports) {
        if (err)
            res.send(err);
        res.json(aeroports);
    });
});

router.route('/aeroports/:name/:terminal')
.get(function(req,res){ 
        Aeroports.find({"name": req.params.name, "terminals.name": req.params.terminal, 'flight': { $exists: false }}, function(err, aeroports) {
        if (err)
            res.send(err);
        res.json(aeroports);
    });
});

router.route('/aeroports/flights/:name/:terminal')
.get(function(req,res){ 
        Aeroports.find({"name": req.params.name, "terminals.name": req.params.terminal, 'flight': { $exists: true }}, function(err, aeroports) {
        if (err)
            res.send(err);
        res.json(aeroports);
    });
});

/**
* Passenger Query
**/
router.route('/aeroports/flights/passenger')
.get(function(req,res){ 
        Aeroports.find({'flight': { $exists: true }}, function(err, aeroports) {
        if (err)
            res.send(err);
        res.json(aeroports);
    });
});

router.route('/aeroports/flights/:num_flight')
.get(function(req,res){ 
        Aeroports.find({"flight": {"num_flight": req.params.num_flight}}, function(err, aeroports) {
        if (err)
            res.send(err);
        res.json(aeroports);
    });
});

// Return router
module.exports = router;