// dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// aeroports
var aeroportSchema = new mongoose.Schema({
    _id: String,
    name: String,
    terminals: {[
        name: String
        ]}
});

// return models
module.exports = restful.model('aeroports', aeroportSchema);