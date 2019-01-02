//////////////////////////////////////////
//////////////DEPENDENCIES////////////////
//////////////////////////////////////////
var express = require('express');
var restful = require('node-restful');
var mongoose = require('mongoose');
var router = express.Router();

//////////////////////////////////////////
//////////////AGENTS SCHEMA///////////////
//////////////////////////////////////////
var agentsSchema = new mongoose.Schema({
	_id: String,
	first_name: String,
	last_name: String,
	registration_number: Number,
	password: Number
});

//////////////////////////////////////////
////////////AEROPORT SCHEMA///////////////
//////////////////////////////////////////
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

//////////////////////////////////////////
///////////PASSENGER SCHEMA///////////////
//////////////////////////////////////////
var passengersSchema = new mongoose.Schema({
    _id: String,
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
});

var Aeroports = mongoose.model('Aeroport', aeroportSchema);
var Agents = mongoose.model('Agent', agentsSchema);
var Passengers = mongoose.model('Aeroport', passengersSchema);

//////////////////////////////////////////
//////////////AGENTS QUERY////////////////
//////////////////////////////////////////

//get all agents
router.route('/agents')
.get(function(req,res){ 
    Agents.find(function(err, agents){
        if (err){
            res.send(err); 
        }
        res.json(agents); 
        
    }); 
});

//get agent with registration number and password
router.route('/agents/:registration_number/:password')
.get(function(req,res){ 
    Agents.find({"registration_number": req.params.registration_number, "password": req.params.password},function(err, agents){
        if (err){
            res.send(err); 
        }
        res.json(agents); 
        
    }); 
});

//////////////////////////////////////////
////////////AEROPORT QUERY////////////////
//////////////////////////////////////////

// get aeroports by name
router.route('/aeroports/:name')
.get(function(req,res){ 
        Aeroports.find({"name": req.params.name}, function(err, aeroports) {
        if (err)
            res.send(err);
        res.json(aeroports);
    });
});

// get the list of only aeroports registred
//TODO: Voir si 'flight' peut être remplacer par "flight"
router.route('/aeroports/:name/:terminal')
.get(function(req,res){ 
        Aeroports.find({"name": req.params.name, "terminals.name": req.params.terminal, 'flight': { $exists: false }}, function(err, aeroports) {
        if (err)
            res.send(err);
        res.json(aeroports);
    });
});

// get the list of aeroports with fligths registred
//TODO: Voir si 'flight' peut être remplacer par "flight"
router.route('/aeroports/flights/:name/:terminal')
.get(function(req,res){ 
        Aeroports.find({"name": req.params.name, "terminals.name": req.params.terminal, 'flight': { $exists: true }}, function(err, aeroports) {
        if (err)
            res.send(err);
        res.json(aeroports);
    });
});

//////////////////////////////////////////
///////////PASSENGER QUERY////////////////
//////////////////////////////////////////

// get all passengers
// Recherche bien avec le paramètre saisi, mais retourne tout l'objet aeoport
// Trouver comment recupere juste les passagers
router.route('/passengers/:num_flight')
.get(function(req,res){ 
        Aeroports.find({"flight.num_flight": req.params.num_flight}, function(err, aeroports) {
        if (err)
            res.send(err);
        res.json(aeroports);
    });
});

// get passenger by reference_number
// Recherche bien avec le paramètre saisi, mais retourne tout l'objet aeoport
// Trouver comment recupere juste le passager
router.route('/passenger/:reference_number')
.get(function(req,res){ 
        Aeroports.find({"flight.passenger.reference_number": req.params.reference_number}, function(err, aeroports) {
        if (err)
            res.send(err);
        res.json(aeroports);
    });
});

// get passenger by last_name and first_name
// Recherche bien avec les paramètres saisi, mais retourne tout l'objet aeoport
// Trouver comment recupere juste le passager
router.route('/passenger/:last_name/:first_name')
.get(function(req,res){ 
        Aeroports.find({"flight.passenger.last_name": req.params.last_name, "flight.passenger.first_name": req.params.first_name}, function(err, aeroports) {
        if (err)
            res.send(err);
        res.json(aeroports);
    });
});

// Return router
module.exports = router;

