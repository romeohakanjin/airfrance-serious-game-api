// Dependencies
var express = require('express');
var restful = require('node-restful');
var mongoose = require('mongoose');
var router = express.Router();

// Get models
var agents = require('../models/agents');

// Routes
agents.methods(['get', 'post', 'put', 'delete']);
agents.register(router, '/agents');

//aeroports
//aeroports.methods(['get', 'post', 'put', 'delete']);
//aeroports.register(router, '/aeroports');

// aeroports schema
var aeroportSchema = new mongoose.Schema({
    _id: String,
    name: String,
    terminals: [{
        name: String
        }]
});

var Aeroports = mongoose.model('Aeroport', aeroportSchema);

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

router.route('/aeroports/:name')
.get(function(req,res){ 
            //Mongoose prévoit une fonction pour la recherche d'un document par son identifiant
   Ò         Aeroports.find({name: req.params.name}, function(err, aeroports) {
            if (err)
                res.send(err);
            res.json(aeroports);
        });
});

// Return router
module.exports = router;