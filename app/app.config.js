(function (window) {
	'use strict';
	
	var angular = window.angular,
		SETTINGS = window.SETTINGS;
	
	angular
		.module('myhonorsApp')
		.config(config);
	
	config.$inject = ['$stateProvider', '$compileProvider', '$httpProvider'];
	
	function config($stateProvider, $compileProvider, $httpProvider) {
		
		$stateProvider
			.state('app', {
				url: '',
				abstract: true,
				controller: 'AppController',
				templateUrl: 'app/app.partial.html'
			});
		
		// Turn off at production!
		$compileProvider
			.debugInfoEnabled(SETTINGS.COMPILE_PROVIDER.DEBUG_INFO_ENABLED);
		
		$httpProvider
			.useApplyAsync(SETTINGS.HTTP_PROVIDER.USE_APPLY_ASYNC);
		
	}
	
}(window));