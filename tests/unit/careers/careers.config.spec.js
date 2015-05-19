/*global describe */
(function (window) {
	'use strict';
	
	var angular = window.angular,
		unitTestingHelpers = window.unitTestingHelpers;
	
	describe('Testing Careers Routes', function () {
		
		var states = [
				{
					name: 'app.careers-view',
					url: '/careers',
					controller: 'CareersViewController',
					template: 'app/careers/careers-view.partial.html'
				},
				{
					name: 'app.career-view',
					url: '/career/:id',
					controller: 'CareerViewController',
					template: 'app/careers/career-view.partial.html'
				},
				{
					name: 'app.career-edit',
					url: '/career/:id/edit',
					controller: 'CareerEditController',
					template: 'app/careers/career-edit.partial.html'
				},
				{
					name: 'app.career-add',
					url: '/career/add',
					controller: 'CareerAddController',
					template: 'app/careers/career-add.partial.html'
				}
			];
		
		unitTestingHelpers.statesTester(states);
		
	});
	
	
}(window));