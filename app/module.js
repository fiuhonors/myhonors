(function (window) {
	'use strict';
	
	var angular = window.angular;
	
	angular.module('myhonorsApp', ['ui.router',
								   'myhonorsApp.auth',
								   'myhonorsApp.users',
								   'myhonorsApp.datastore',
								   'myhonorsApp.clubs',
								   'myhonorsApp.events',
								   'myhonorsApp.volunteerActivities',
								   'myhonorsApp.careers']);
	
	
	
}(window));