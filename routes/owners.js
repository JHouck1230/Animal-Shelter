'use strict';

var express = require('express');
var router = express.Router();

var Owner = require('../models/owner');
var Pet = require('../models/pet');

router.get('/', function(req, res) {
	Owner.find({}, function(err, owners) {
		res.status(err ? 400 : 200).send(err || owners);
	});
});

router.get('/newOwners', function(req, res) {
	Owner.find({pets: []}, function(err, owners) {
		res.status(err ? 400 : 200).send(err || owners);
	});
});

router.get('/:id', function(req, res) {
	Owner.findById(req.params.id)
		.populate('pets')
		.exec(function(err, owner) {
		res.status(err ? 400 : 200).send(err || owner);
	})
})

router.post('/', function(req, res) {
	var owner = new Owner(req.body);
	owner.save(function(err, savedOwner) {
		res.status(err ? 400 : 200).send(err || savedOwner);
	});
});

router.put('/:ownerId/addPets', function(req, res) {
	console.log(req.body);
	Owner.findById(req.params.ownerId, function(err, owner) {
		if(err || !owner) return res.status(400).send(err || 'Owner not found.');
		Pet.find({_id: req.body._id}, function(err, pets) {
			if(err) return res.status(400).send(err);
			var petIds = pets.map(pet => pet._id);
			owner.pets = owner.pets.concat(petIds);
			owner.save(function(err, savedOwner) {
				res.status(err ? 400 : 200).send(err || savedOwner);
			});
		});
	});
});

router.put('/:id', function(req, res) {
	Owner.findByIdAndUpdate(req.params.id,
    { $set: req.body },
    { new: true },
    function(err, owner) {
      res.status(err ? 400 : 200).send(err || owner);
    });
});

router.delete('/:id', function(req, res) {
	Owner.remove({_id: req.params.id}, function(err) {
    if(err) return res.status(400).send(err);
    res.send();
	});
});

module.exports = router;
