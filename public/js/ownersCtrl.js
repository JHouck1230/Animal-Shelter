'use strict';

var app = angular.module('adoptApp');

app.controller('ownersCtrl', function($scope, AdoptService, $rootScope) {
	$scope.$on('got-owners', (events, args) => $scope.owners = AdoptService.owners);
	// $scope.$watch(AdoptService.owners, function(newOwners) {
	// 	$scope.owners = AdoptService.owners;
	// });

	$scope.getOwnerDetail = function(owner) {
		AdoptService.getOwnerDetail(owner);
	};

});