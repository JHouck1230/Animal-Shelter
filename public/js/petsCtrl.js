'use strict';

var app = angular.module('adoptApp');

app.controller('petsCtrl', function($scope, AdoptService) {
	$scope.$on('got-pets', (events, args) => $scope.pets = AdoptService.pets);
	
	$scope.getPets = () => AdoptService.getPets();

	$scope.getPetDetail = (pet) => AdoptService.getPetDetail(pet);

	$scope.getAvailPets = function() {
		AdoptService.getAvailPets()
		.then(res => {
			$scope.pets = res.data;
		}, err => console.error(err))
	};

});