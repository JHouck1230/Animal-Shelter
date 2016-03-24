'use strict';

var app = angular.module('adoptApp');

app.controller('homeCtrl', function($scope, AdoptService) {
	$scope.$on('got-pet-details', args => $scope.pet = AdoptService.petDetail);
	$scope.$on('got-owner-details', args => $scope.owner = AdoptService.ownerDetail);
	$scope.editPet = false;
	$scope.editOwner = false;

	$scope.createPet = function() {
		AdoptService.createNewPet($scope.newPet);
		$scope.newPet = {};
	}

	$scope.createOwner = function() {
		AdoptService.createNewOwner($scope.newOwner);
		$scope.newOwner = {};
	}

	$scope.removeOwner = function() {
		AdoptService.removeOwner($scope.owner);
	}

	$scope.removePet = function() {
		AdoptService.removePet($scope.pet);
	}

	$scope.submitAdoption = function() {
		$scope.pet.adopted = true;
		$scope.pet.owner = owner.name;
		AdoptService.submitAdoption($scope.pet, $scope.owner);
		AdoptService.updatePet($scope.pet, $scope.owner);
	};

	$scope.editPet = function() {
		$scope.editPet = true;
	}

	$scope.savePetEdit = function() {
		$scope.editPet = false;
		AdoptService.updatePet($scope.pet);
	}

	$scope.editOwner = function() {
		$scope.editOwner = true;
	}

	$scope.saveOwnerEdit = function() {
		$scope.editOwner = false;
		AdoptService.updateOwner($scope.owner);
	}

});