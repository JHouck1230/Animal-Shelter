'use strict';

var app = angular.module('adoptApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('home', {
		url: '/',
		templateUrl: '/html/home.html',
		controller: 'homeCtrl',
		views: {
			'pets': {
				templateUrl: '/html/pets.html',
				controller: 'petsCtrl'
			},
			'owner': {
				templateUrl: '/html/owners.html',
				controller: 'ownersCtrl'
			}
		}
	})
	$urlRouterProvider.otherwise('/');
});
