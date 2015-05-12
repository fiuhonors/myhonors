/*global describe, it, beforeEach, expect */
(function () {
	'use strict';
	
	var angular = window.angular;
	
	describe('Testing Modules', function () {
		
		describe('Global App Module:', function () {
			
			var module;
			beforeEach(function () {
				module = angular.module('myhonorsApp');
			});
			
			it('should be registered', function () {
				expect(module).toBeTruthy();
			});
			
			describe('Dependencies:', function () {
				
				var hasModule = function (moduleName) {
						return angular.module('myhonorsApp').requires.indexOf(moduleName) >= 0;
					};
				
				it('should have ui.router as a dependency', function () {
					expect(angular.module('ui.router')).toBeTruthy();
					expect(hasModule('ui.router')).toBe(true);
				});
				
				it('should have myhonorsApp.auth as a dependency', function () {
					expect(angular.module('myhonorsApp.auth')).toBeTruthy();
					expect(hasModule('myhonorsApp.auth')).toBe(true);
				});
				
				it('should have myhonorsApp.careers as a dependency', function () {
					expect(angular.module('myhonorsApp.careers')).toBeTruthy();
					expect(hasModule('myhonorsApp.careers')).toBe(true);
				});
				
				it('should have myhonorsApp.clubs as a dependency', function () {
					expect(angular.module('myhonorsApp.clubs')).toBeTruthy();
					expect(hasModule('myhonorsApp.clubs')).toBeTruthy();
				});
				
				it('should have myhonorsApp.datastore as a dependency', function () {
					expect(angular.module('myhonorsApp.datastore')).toBeTruthy();
					expect(hasModule('myhonorsApp.datastore')).toBe(true);
				});
				
				it('should have myhonorsApp.events as a dependency', function () {
					expect(angular.module('myhonorsApp.events')).toBeTruthy();
					expect(hasModule('myhonorsApp.events')).toBe(true);
				});
				
				it('should have myhonorsApp.users as a dependency', function () {
					expect(angular.module('myhonorsApp.users')).toBeTruthy();
					expect(hasModule('myhonorsApp.users')).toBeTruthy();
				});
				
				it('should have myhonorsApp.volunteerActivities as a dependency', function () {
					expect(angular.module('myhonorsApp.volunteerActivities')).toBeTruthy();
					expect(hasModule('myhonorsApp.volunteerActivities')).toBeTruthy();
				});
				
			});
		});
		
	});
	
}());