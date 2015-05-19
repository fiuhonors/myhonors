/*global describe */
(function (window) {
	'use strict';
	
	var angular = window.angular,
		unitTestingHelpers = window.unitTestingHelpers;
	
	describe('Testing Citizenships module', function () {
		
		var dependencies = ['ui.router'];
		
		unitTestingHelpers.moduleTester('myhonorsApp.citizenships', dependencies);
		
	});
	
}(window));