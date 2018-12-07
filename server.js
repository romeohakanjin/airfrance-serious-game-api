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
app.use('/', require('./routes/api'));

// Start server
app.listen(process.env.PORT || 1000, () => console.log("Everything O.K"));
console.log('Server running on port : 1000');