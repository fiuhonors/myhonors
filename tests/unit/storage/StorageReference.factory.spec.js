/*global describe, beforeEach, it, expect */
(function (window) {
	'use strict';
	
	var angular = window.angular,
		Firebase = window.Firebase,
		jasmine = window.jasmine;
	
	describe('Storage Factory:', function () {
		
		var StorageReferenceService;
		
		beforeEach(function () {
			if (window.SETTINGS) {
				delete window.SETTINGS;	
			}
			angular.mock.module('myhonorsApp.storage');
			angular.mock.inject(function (_StorageReferenceService_) {
				StorageReferenceService = _StorageReferenceService_;
			});
		});
		
		it('should return storage reference given config', function () {
			window.SETTINGS = {
				STORAGE: {
					FIREBASE: {
						BASE_URL: "http://somedatabase.firebaseio.com"	
					}
				}
			};
			var reference = StorageReferenceService.getRef();
			
			expect(reference).toEqual(jasmine.any(Firebase));
		});
		
		it('should throw error if no app settings', function () {
			var appSettingsMissing = function () {
				StorageReferenceService.getRef();
			};
			expect(appSettingsMissing).toThrowError("App settings" + 
				" must be set in .config.js");
		});
		
		it('should throw error if no storage (Firebase) is set', function () {
			window.SETTINGS = {	
			};
			
			var storageSettingsMissing = function () {
				StorageReferenceService.getRef();
			};
			expect(storageSettingsMissing).toThrowError("Storage/Database" + 
				" settings must be set in .config.js");
		});
		
	});
	
}(window));