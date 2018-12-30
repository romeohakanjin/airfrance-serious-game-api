// dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// agents
var agentsSchema = new mongoose.Schema({
	_id: String,
	first_name: String,
	last_name: String,
	registration_number: Number,
	password: Number
});

// return models
module.exports = restful.model('agents', agentsSchema);