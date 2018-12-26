// dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// aeroports
var aeroportSchema = new mongoose.Schema({
    id: String,
    name: String,
    terminals: Array
});

// return models
module.exports = restful.model('aeroports', aeroportSchema);