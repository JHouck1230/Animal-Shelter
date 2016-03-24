'use strict';

var app = angular.module('adoptApp');

app.controller('petsCtrl', function($scope, AdoptService) {
	$scope.$on('got-pets', args => $scope.pets = AdoptService.pets);
	// $scope.$watch(AdoptService.pets, function(newPets) {
	// 	$scope.pets = AdoptService.pets;
	// });

	$scope.getPetDetail = function(pet) {
		AdoptService.getPetDetail(pet);
	};

	$scope.getPets = function() {
		AdoptService.getPets();
	};

	$scope.getAvailPets = function() {
		AdoptService.getAvailPets();
	};

});