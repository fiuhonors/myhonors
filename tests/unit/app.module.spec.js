/*global describe, it, beforeEach, expect */
(function () {
	'use strict';
	
	var angular = window.angular,
		unitTestingHelpers = window.unitTestingHelpers;
	
	describe('Testing Global Module', function () {
		
		var dependencies = ['ui.router',
						    'myhonorsApp.auth',
						   	'myhonorsApp.users',
						   	'myhonorsApp.datastore',
						   	'myhonorsApp.clubs',
						   	'myhonorsApp.events',
						   	'myhonorsApp.citizenships',
						   	'myhonorsApp.careers'];
		
		unitTestingHelpers.moduleTester('myhonorsApp', dependencies);
		
	});
	
}());