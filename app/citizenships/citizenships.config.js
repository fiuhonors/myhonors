(function (window) {
	'use strict';
	
	var angular = window.angular;
	
	angular
		.module('myhonorsApp.citizenships')
		.config(config);
	
	config.$inject = ['$stateProvider'];
	
	function config($stateProvider) {
		
		$stateProvider
			.state('app.citizenships-view', {
				url: '/citizenships',
				controller: 'CitizenshipsViewController',
				templateUrl: 'app/citizenships/citizenships-view.partial.html'
			})
			.state('app.citizenship-edit', {
				url: '/citizenship/:id/edit',
				controller: 'CitizenshipEditController',
				templateUrl: 'app/citizenships/citizenship-edit.partial.html'
			})
			.state('app.citizenship-add', {
				url: '/citizenship/add',
				controller: 'CitizenshipAddController',
				templateUrl: 'app/citizenships/citizenship-add.partial.html'
			});
			
		
	}
	
}(window));