(function (window) {
	'use strict';
	
	var angular = window.angular,
		app = angular.module('myhonorsApp');
	
	function config($stateProvider, $compileProvider) {
		
		$stateProvider
			.state('app', {
				url: '',
				abstract: true,
				controller: 'AppController',
				templateUrl: 'app/app.partial.html'
			});
		
		// Turn off at production!
		$compileProvider.debugInfoEnabled(true);
		
	}
	config.$inject = ['$stateProvider',
					  '$compileProvider'];
	
	app.config(config);
	
}(window));