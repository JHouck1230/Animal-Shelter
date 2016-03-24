'use strict';

var app = angular.module('adoptApp');

app.service('AdoptService', function($http, $rootScope) {
	this.pets = [];
	this.owners = [];
	this.petDetail;
	this.ownerDetail;

	this.getPets = () => {
		$http.get('/pets')
		.then(res => {
			this.pets = res.data;
			$rootScope.$broadcast('got-pets');
		}, err => console.error(err))
	};

	this.getOwners = () => {
		$http.get('/owners')
		.then(res => {
			this.owners = res.data;
			$rootScope.$broadcast('got-owners');
		}, err => console.error(err))
	};

	this.getPetDetail = pet => {
		$http.get(`/pets/${pet._id}`)
		.then(res => {
			this.petDetail = res.data;
			$rootScope.$broadcast('got-pet-details');
		}, err => console.error(err))
	};

	this.getOwnerDetail = owner => {
		$http.get(`/owners/${owner._id}`)
		.then(res => {
			this.ownerDetail = res.data;
			$rootScope.$broadcast('got-owner-details');
		}, err => console.error(err))
	};

	this.getAvailPets = () => {
		$http.get('/pets/availablePets')
		.then(res => {
			this.pets = res.data;
			$rootScope.$broadcast('got-pet-details');
		}, err => console.error(err))
	};

	this.createNewPet = newPet => {
		$http.post('/pets', newPet)
		.then(res => {
			this.pets.push(res.data);
			$rootScope.$broadcast('got-pets');
		}, err => console.error(err))
	};

	this.createNewOwner = newOwner => {
		$http.post('/owners', newOwner)
		.then(res => {
			this.owners.push(res.data)
			$rootScope.$broadcast('got-owners');
		}, err => console.error(err))
	};

	this.removeOwner = owner => {
		$http.delete(`/owners/${owner._id}`)
		.then(res => {
			this.owners = this.owners.map(own => own._id !== owner._id ? own : undefined);
			this.owners.splice(this.owners.indexOf(undefined), 1);
			$rootScope.$broadcast('got-owners');
		}, err => console.error(err));
	};

	this.removePet = pet => {
		$http.delete(`/pets/${pet._id}`, pet.owner)
		.then(res => {
			this.pets = this.pets.map(own => own._id !== pet._id ? own : undefined);
			this.pets.splice(this.pets.indexOf(undefined), 1);
			$rootScope.$broadcast('got-pets');
		}, err => console.error(err));
	};

	this.submitAdoption = (pet, owner) => {
		$http.put(`/owners/${owner._id}/addPets`, pet)
			.then(res => {
				this.owners.forEach(own => {
					if(own._id === owner._id) own.pets.push(pet._id)
				});
			$rootScope.$broadcast('got-pets');
			$rootScope.$broadcast('got-owners');
			$rootScope.$broadcast('got-pet-details');
			$rootScope.$broadcast('got-owner-details');
		}, err => console.error(err))
	};

	this.updatePet = (pet, owner) => {
		$http.put(`/pets/${pet._id}`, pet)
		.then(res => {
			this.pets.forEach(p => {
				if(p._id === pet._id) p.owner = pet.owner;
			}); 
			$rootScope.$broadcast('got-pets');
			$rootScope.$broadcast('got-pet-details');
		}, err => console.error(err))
	};

	this.updateOwner = owner => {
		$http.put(`/owners/${owner._id}`, owner)
		.then(res => {
			$rootScope.$broadcast('got-owners');
			$rootScope.$broadcast('got-owner-details');
		}, err => console.error(err))
	};

});