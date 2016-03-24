'use strict';

var app = angular.module('adoptApp', ['ui.router','ui.materialize']);

app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('home', {
		url: '/',
		views: {
			'': {
				templateUrl: 'html/home.html',
				controller: 'homeCtrl'
			},
			'pets@home': {
				templateUrl: '/html/pets.html',
				controller: 'petsCtrl'
			},
			'owners@home': {
				templateUrl: '/html/owners.html',
				controller: 'ownersCtrl'
			}
		}
	})
	$urlRouterProvider.otherwise('/');
});
app.run(function(AdoptService) {
	AdoptService.getPets();
	AdoptService.getOwners();
})