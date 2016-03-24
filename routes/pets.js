'use strict';

var express = require('express');
var router = express.Router();

var Pet = require('../models/pet');
var Owner = require('../models/owner');

router.get('/', function(req, res) {
	Pet.find({}, function(err, pets) {
		res.status(err ? 400 : 200).send(err || pets);
	});
});

router.get('/availablePets', function(req, res) {
	Pet.find({adopted: false}, function(err, pets) {
		res.status(err ? 400 : 200).send(err || pets);
	});
});

router.get('/:id', function(req, res) {
	Pet.findById(req.params.id, function(err, pet) {
		res.status(err ? 400 : 200).send(err || pet);
	})
})

router.post('/', function(req, res) {
	var pet = new Pet(req.body);
	pet.save(function(err, savedPet) {
		res.status(err ? 400 : 200).send(err || savedPet);
	});
});

router.put('/:id', function(req, res) {
	Pet.findByIdAndUpdate(req.params.id,
    { $set: req.body },
    { new: true },
    function(err, pet) {
      res.status(err ? 400 : 200).send(err || pet);
    });
});

router.delete('/:id', function(req, res) {
	var petId = req.params.id;
	Owner.findById(req.body.owner, function(err, owner) {
		if(err) res.status(400).send(err);
		if(owner) owner.pets.splice(owner.pets.indexOf(petId), 1);
		Pet.remove({_id: petId}, function(err) {
	    if(err) res.status(400).send(err);
	    if(owner) {
		    owner.save(function(err, savedOwner) {
					res.status(err ? 400 : 200).send(err || savedOwner);
		    });
		  }
		});
	});
});

module.exports = router;
