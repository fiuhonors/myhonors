(function (window) {
	'use strict';
	
	var angular = window.angular,
		app = angular.module('myhonorsApp.events');
	
	function config($stateProvider) {
		
		$stateProvider
			.state('app.events-view', {
				url: '/events',
				controller: 'EventsViewController',
				templateUrl: 'app/events/events-view.partial.html'
			})
			.state('app.event-view', {
				url: '/event/:id',
				controller: 'EventViewController',
				templateUrl: 'app/events/event-view.partial.html'
			})
			.state('app.event-edit', {
				url: '/event/:id/edit',
				controller: 'EventEditController',
				templateUrl: 'app/events/event-edit.partial.html'
			})
			.state('app.event-add', {
				url: '/event/add',
				controller: 'EventAddController',
				templateUrl: 'app/events/event-add.partial.html'
			});
		
	}
	config.$inject = ['$stateProvider'];
	
	app.config(config);
	
}(window));