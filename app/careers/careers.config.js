(function (window) {
	'use strict';
	
	var angular = window.angular,
		app = angular.module('myhonorsApp.careers');
	
	function config($stateProvider) {
		
		$stateProvider
			.state('app.careers-view', {
				url: '/careers',
				controller: 'CareersViewController',
				templateUrl: 'app/careers/careers-view.partial.html'
			})
			.state('app.career-view', {
				url: '/career/:id',
				controller: 'CareerViewController',
				templateUrl: 'app/careers/career-view.partial.html'
			})
			.state('app.career-edit', {
				url: '/career/:id/edit',
				controller: 'CareerEditController',
				templateUrl: 'app/careers/career-edit.partial.html'
			})
			.state('app.career-add', {
				url: '/career/add',
				controller: 'CareerAddController',
				templateUrl: 'app/careers/career-add.partial.html'
			});
			
		
	}
	config.$inject = ['$stateProvider'];
	
	app.config(config);
	
}(window));