// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

// Get models
var agents = require('../models/agents');
var aeroports = require('../models/aeroports');

// Routes
agents.methods(['get', 'post', 'put', 'delete']);
agents.register(router, '/agents');

//aeroports
//aeroports.methods(['get', 'post', 'put', 'delete']);
//aeroports.register(router, '/aeroports');

var Aeroports = mongoose.model('Aeroport', aeroports);
router.route('/aeroports')

// J'implémente les méthodes GET, PUT, UPDATE et DELETE
// GET
.get(function(req,res){ 
// Utilisation de notre schéma Piscine pour interrogation de la base
    Aeroports.find(function(err, aeroports){
        if (err){
            res.send(err); 
        }
        res.json(aeroports); 
        
    }); 
});

// Return router
module.exports = router;