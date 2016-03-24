'use strict';

var app = angular.module('adoptApp');

app.controller('ownersCtrl', function($scope, AdoptService, $rootScope) {
	$scope.$on('got-owners', (events, args) => $scope.owners = AdoptService.owners);

	getOwners();
	function getOwners() {
		AdoptService.getOwners()
		.then(res => {
			$scope.owners = res.data;
			AdoptService.passOwners($scope.owners);
		}, err => console.error(err))
	};

	$scope.getOwnerDetail = function(owner) {
		AdoptService.getOwnerDetail(owner);
	};

});