(function (window) {
	'use strict';
	
	var angular = window.angular,
		app = angular.module('myhonorsApp.citizenships');
	
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
	config.$inject = ['$stateProvider'];
	
	app.config(config);
	
}(window));