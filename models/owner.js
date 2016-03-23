'use strict';

var mongoose = require('mongoose');

var ownerSchema = new mongoose.Schema({
	name: String,
	image: String,
	phone: String,
	address: String,
	pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet'}]
});

var Owner = mongoose.model('Owner', ownerSchema);

module.exports = Owner;