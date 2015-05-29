/*global describe */
(function (window) {
	'use strict';
	
	var angular = window.angular,
		unitTestingHelpers = window.unitTestingHelpers;
	
	describe('Testing Storage module', function () {
		
		var dependencies = [];
		
		unitTestingHelpers.moduleTester('myhonorsApp.storage', dependencies);
		
	});
	
	
}(window));