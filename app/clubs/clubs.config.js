(function (window) {
	'use strict';
	
	var angular = window.angular,
		app = angular.module('myhonorsApp.clubs');
	
	function config($stateProvider) {
		
		$stateProvider
			.state('app.clubs-view', {
				url: '/clubs',
				controller: 'ClubsViewController',
				templateUrl: 'app/clubs/clubs-view.partial.html'
			})
			.state('app.club-view', {
				url: '/club/:id',
				controller: 'ClubViewController',
				templateUrl: 'app/clubs/club-view.partial.html'
			})
			.state('app.club-edit', {
				url: '/club/:id/edit',
				controller: 'ClubEditController',
				templateUrl: 'app/clubs/club-edit.partial.html'
			});
		
	}
	config.$inject = ['$stateProvider'];
	
	app.config(config);
	
}(window));