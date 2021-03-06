'use strict';

var mongoose = require('mongoose');

var petsSchema = new mongoose.Schema({
	name: String,
	image: String,
	age: Number,
	species: String,
	breed: String,
	description: String,
	owner: {type: String, default: null},
	adopted: {type: Boolean, default: false}
});

var Pet = mongoose.model('Pet', petsSchema);

module.exports = Pet;