'use strict';

var app = angular.module('adoptApp');

app.service('AdoptService', function($http, $rootScope) {
	this.pets = [];
	this.owners = [];
	this.petDetail;
	this.ownerDetail;

	var petMsg = 'got-pets';
	var ownMsg = 'got-owners';
	var petDetMsg = 'got-pet-details';
	var ownDetMsg = 'got-owner-details';

	this.getPets = () => {
		$http.get('/pets')
		.then(res => {
			this.pets = res.data;
			broadcast(petMsg);
		}, err => console.error(err))
	};

	this.getAvailPets = () => $http.get('/pets/availablePets');
	this.getOwners = () => $http.get('/owners');

	this.createNewPet = newPet =>	{
		$http.post('/pets', newPet)
		.then(res => {
				this.pets.push(res.data);
				broadcast(petMsg);
			}, err => console.error(err))
	};

	this.createNewOwner = newOwner => {
		$http.post('/owners', newOwner)
		.then(res => {
			this.owners.push(res.data);
			broadcast(ownMsg);
		}, err => console.error(err))
	};

	this.removeOwner = owner => {
		$http.delete(`/owners/${owner._id}`)
		.then(res => {
			this.owners = this.owners.map(own => own._id !== owner._id ? own : undefined);
			this.owners.splice(this.owners.indexOf(undefined), 1);
			broadcast(ownMsg);
		}, err => console.error(err))
	};

	this.removePet = pet => {
		$http.delete(`/pets/${pet._id}`, pet.owner)
		.then(res => {
			this.pets = this.pets.map(p => p._id !== pet._id ? p : undefined);
			this.pets.splice(this.pets.indexOf(undefined), 1);
			broadcast(petMsg);
		}, err => console.error(err))
	};

	this.submitAdoption = (pet, owner) => {
		$http.put(`/owners/${owner._id}/addPets`, pet)
		.then(res => {
			this.owners.forEach(own => {
				if(own._id === owner._id) own = res.data;
			});
			broadcast(ownDetMsg);
		}, err => console.error(err))
	};

	this.updatePet = (pet, owner) => {
		$http.put(`/pets/${pet._id}`, pet)
			.then(resp => {
				this.pets.forEach(p => {
					if(p._id === pet._id) p = resp.data;
				});
				this.petDetail = resp.data;
				broadcast(petDetMsg);
			}, err => console.error(err));
	};

	this.updateOwner = owner =>	{
		$http.put(`/owners/${owner._id}`, owner)
		.then(res => {
			this.owners.forEach(own => {
				if(own._id === owner._id) own = res.data;
			});
			broadcast(ownDetMsg);
		}, err => console.error(err))
	};

	this.getPetDetail = pet => {
		$http.get(`/pets/${pet._id}`)
		.then(res => {
			this.petDetail = res.data;
			broadcast(petDetMsg);
		}, err => console.error(err))
	};

	this.getOwnerDetail = owner => {
		$http.get(`/owners/${owner._id}`)
		.then(res => {
			this.ownerDetail = res.data;
			broadcast(ownDetMsg);
		}, err => console.error(err))
	};

	this.passPets = pets => {
		this.pets = pets;
		broadcast(petMsg);
	};

	this.passOwners = owners => {
		this.owners = owners;
		broadcast(ownMsg);
	};

	function broadcast(msg) {
		$rootScope.$broadcast(msg);
	}

});