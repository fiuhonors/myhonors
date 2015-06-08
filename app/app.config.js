(function (window) {
	'use strict';
	
	var angular = window.angular;
	
	angular
		.module('myhonorsApp')
		.config(config);
	
	config.$inject = ['$stateProvider',
					  '$compileProvider', 
					  '$httpProvider'];
	
	function config($stateProvider, $compileProvider, $httpProvider) {
		
		$stateProvider
			.state('app', {
				url: '',
				abstract: true,
				controller: 'AppController',
				templateUrl: 'app/app.partial.html'
			});
		
		// Turn off at production!
		$compileProvider.debugInfoEnabled(true);
		
		$httpProvider.useApplyAsync(true);
		
	}
	
}(window));