(function (window) {
	'use strict';
	
	var angular = window.angular,
		unitTestingHelpers = window.unitTestingHelpers;
	
	describe('Testing Careers Module', function () {
		
		var dependencies = ['ui.router'];
		
		unitTestingHelpers.moduleTester('myhonorsApp.careers', dependencies);
		
	});
	
}(window));