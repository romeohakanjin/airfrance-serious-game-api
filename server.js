// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Connect to mongo database
mongoose.connect('mongodb://admin:admin123@ds143744.mlab.com:43744/discair');

// express
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Routes
//app.use('/', require('./routes/api'));
var aeroports = require('models/aeroports');
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

// Start the server
app.listen(process.env.PORT || 1000, () => console.log("Everything O.K"));
console.log('Server running on port : 1000');