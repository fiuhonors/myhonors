(function (window) {
	'use strict';
	
	var angular = window.angular,
		app = angular.module('myhonorsApp');
	
	function config($stateProvider) {
		
		$stateProvider
			.state('app', {
				url: '',
				abstract: true,
				controller: 'AppController',
				templateUrl: 'app/app.partial.html'
			});
		
	}
	config.$inject = ['$stateProvider'];
	
	app.config(config);
	
}(window));