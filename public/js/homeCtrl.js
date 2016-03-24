'use strict';

var app = angular.module('adoptApp');

app.controller('homeCtrl', function($scope, AdoptService, $rootScope) {
	$scope.$on('got-pet-details', args => $scope.pet = AdoptService.petDetail);
	$scope.$on('got-owner-details', args => $scope.owner = AdoptService.ownerDetail);

	$scope.editPet = false;
	$scope.editOwner = false;

	var petMsg = 'got-pets';
	var ownMsg = 'got-owners';

	$scope.createPet = () => {
		AdoptService.createNewPet($scope.newPet);
		$scope.newPet = {};
	};

	$scope.createOwner = () => {
		AdoptService.createNewOwner($scope.newOwner);
		$scope.newOwner = {};
	};

	$scope.removeOwner = () => AdoptService.removeOwner($scope.owner);
	$scope.removePet = () => AdoptService.removePet($scope.pet);

	$scope.submitAdoption = function() {
		$scope.pet.adopted = true;
		$scope.pet.owner = $scope.owner.name;
		AdoptService.submitAdoption($scope.pet, $scope.owner);
		AdoptService.updatePet($scope.pet, $scope.owner);
	};

	$scope.editPet = () => $scope.editPet = true;
	$scope.editOwner = () => $scope.editOwner = true;

	$scope.savePetEdit = function() {
		$scope.editPet = false;
		AdoptService.updatePet($scope.pet);
	};

	$scope.saveOwnerEdit = function() {
		$scope.editOwner = false;
		AdoptService.updateOwner($scope.owner);
	};

	$scope.toggleAdopt = function(pet) {
		console.log('pet ', pet);
		$scope.pet.adopted = !$scope.pet.adopted;
	};

});