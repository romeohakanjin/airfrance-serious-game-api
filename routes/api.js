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
        gate: String,
        seats: {
              premiere: Number,
              business: Number,
              eco: Number
        },	
		escale: {
			departure_time: String,
			destination: String,
			arrival_time: String,
			place_departure: String
		},
		passenger: [{
			status: {
              wording: String
            },
            luggage: {
                number: Number
            },
            gp: {
              status: String,
            },
            incident: [{
              type: String,
              description: String
            }],
        	reference_number: Number,
    		last_name: String,
        	first_name: String,
        	address: String,
        	mobile: String,
        	mail: String,
            pax: {  
		      pax_status: String,
		      pax_type: String
		    }
        }],
        status: {
            wording: String
        }
	}
});

var Aeroports = mongoose.model('Aeroport', aeroportSchema);
var Agents = mongoose.model('Agent', agentsSchema);

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
//get all airports
router.route('/airports')
.get(function(req,res){ 
        Aeroports.find({'flight': { $exists: false }}, function(err, aeroports) {
        if (err)
            res.send(err);
        res.json(aeroports);
    });
});

// get aeroports by name
router.route('/airports/:name')
.get(function(req,res){ 
        Aeroports.find({"name": req.params.name}, function(err, aeroports) {
        if (err)
            res.send(err);
        res.json(aeroports);
    });
});

// get the list of only aeroports registred
//TODO: Voir si 'flight' peut être remplacer par "flight"
router.route('/airports/:name/:terminal')
.get(function(req,res){ 
        Aeroports.find({"name": req.params.name, "terminals.name": req.params.terminal, 'flight': { $exists: false }}, function(err, aeroports) {
        if (err)
            res.send(err);
        res.json(aeroports);
    });
});

// get the list of only registered airport for arrival
router.route('/flights/:destination/arrival')
.get(function(req,res){ 
        Aeroports.find({"flight.destination": req.params.destination, 'flight': { $exists: true }}, function(err, aeroports) {
        if (err)
            res.send(err);
        res.json(aeroports);
    });
});


// get flight infos
router.route('/flight/:flighttime/:destination/:flight/:boarding/:status')
.get(function(req,res){ 
        Aeroports.find({"flight.destination": req.params.destination, 'flight': { $exists: true }}, function(err, aeroports) {
        if (err)
            res.send(err);
        res.json(aeroports);
    });
});

// get the list of airport with flights registered
//TODO: Voir si 'flight' peut être remplacer par "flight"
router.route('/airports/flights/:name/:terminal')
.get(function(req,res){ 
        Aeroports.find({"name": req.params.name, "terminals.name": req.params.terminal, 'flight': { $exists: true }}, function(err, aeroports) {
        if (err)
            res.send(err);
        res.json(aeroports);
    });
});

/*// get count for passenger reserved pax status
router.route('/flight/:numflight/pax/reserved/count')
.get(function(req,res){ 
        Aeroports.count({"flight.num_flight" : req.params.numflight, "flight.passenger.pax.status": "reserved", 'flight': { $exists: true }}, function(err, aeroports) {
        if (err)
            res.send(err);
        res.json(aeroports);
    });
});

// get count for passenger registred pax status
router.route('/flight/:numflight/pax/registred/count')
.get(function(req,res){ 
        Aeroports.aggregate([{$group:{_id:"$flight.passenger.pax.status", count: {$sum: 1}}}], function(err, aeroports) {
        if (err)
            res.send(err);
        res.json(aeroports);
    });
});

// get count for passenger onboard pax status
router.route('/flight/:numflight/pax/onboard/count')
.get(function(req,res){ 
        Aeroports.count({"flight.num_flight" : req.params.numflight, "flight.passenger.pax.status": "onboard", 'flight': { $exists: true }}, function(err, aeroports) {
        if (err)
            res.send(err);
        res.json(aeroports);
    });
});*/

//////////////////////////////////////////
///////////PASSENGER QUERY////////////////
//////////////////////////////////////////

// get all passengers by num_flight
// Recherche bien avec le paramètre saisi, mais retourne tout l'objet aeoport
router.route('/passengers/:num_flight')
.get(function(req,res){ 
        Aeroports.find({"flight.num_flight": req.params.num_flight, 'flight.passenger': {$exists: true}}, function(err, aeroports) {
        if (err)
            res.send(err);
        res.json(aeroports);
    });
});

// get passenger by reference_number
// Recherche bien avec le paramètre saisi, mais retourne tout l'objet aeoport
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
router.route('/passenger/:last_name/:first_name')
.get(function(req,res){ 
        Aeroports.find({"flight.passenger.last_name": req.params.last_name, "flight.passenger.first_name": req.params.first_name}, function(err, aeroports) {
        if (err)
            res.send(err);
        res.json(aeroports);
    });
});

// update passenger incident
router.route('/passengerIncident/:reference_number')
.get(function(req,res){ 
        Aeroports.updateOne({ "reference_number" : req.params.reference_number }, { $set: {"first_name" : "Violette" }}, function(err, aeroports) {
        if (err)
            res.send(err);
        res.json(aeroports);
    });
});


// Recherche bien avec les paramètres saisi, mais retourne tout l'objet aeoport
router.route('/passengerIncidentTest/:reference_number')
    .post(function(req,res){
        Aeroports.find({"flight.passenger.reference_number": req.params.reference_number, "flight.num_flight": 548}, function (err, aeroport) {
            if (err)
                res.send(err);

            Aeroports.flight.passenger.incident.type = "type";
            Aeroports.flight.passenger.incident.description = "descr";

            // save the incident and check for errors
            Aeroport.save(function (err, aeroport2) {
                if (err)
                    res.json(err);
                res.json(aeroport);
            });
        });

    });
router.route('/getPAX/:reference_number')
    .get(function(req,res){
        Aeroports.find({"flight.passenger.reference_number": req.params.reference_number, "flight.num_flight": 548}, function (err, aeroport) {
            if (err)
                res.send(err);

            // save the incident and check for errors
            Aeroport.save(function (err, aeroport2) {
                if (err)
                    res.json(err);
                res.json(aeroport);
            });
        });

    });
// Return router
module.exports = router;
