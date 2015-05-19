/*global describe */
(function (window) {
	'use strict';
	
	var angular = window.angular,
		unitTestingHelpers = window.unitTestingHelpers;
	
	describe('Testing Events Routes', function () {
		
		var states = [
				{
					name: 'app.events-view',
					url: '/events',
					controller: 'EventsViewController',
					template: 'app/events/events-view.partial.html'
				},
				{
					name: 'app.event-view',
					url: '/event/:id',
					controller: 'EventViewController',
					template: 'app/events/event-view.partial.html'
				},
				{
					name: 'app.event-edit',
					url: '/event/:id/edit',
					controller: 'EventEditController',
					template: 'app/events/event-edit.partial.html'
				},
				{
					name: 'app.event-add',
					url: '/event/add',
					controller: 'EventAddController',
					template: 'app/events/event-add.partial.html'
				}
			];
		
		unitTestingHelpers.statesTester(states);
		
	});
	
}(window));