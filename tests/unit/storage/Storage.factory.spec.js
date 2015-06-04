/*global describe, beforeEach, it, expect */
(function (window) {
	'use strict';
	
	var angular = window.angular,
		Firebase = window.Firebase,
		jasmine = window.jasmine;
	
	describe('Storage Factory:', function () {
		
		var Storage;
		
		beforeEach(function () {
			if (window.SETTINGS) {
				delete window.SETTINGS;	
			}
			angular.mock.module('myhonorsApp.storage');
			angular.mock.inject(function (_StorageService_) {
				Storage = _StorageService_;
			});
		});
		
		it('should return reference given correct config', function () {
			window.SETTINGS = {
				STORAGE: {
					FIREBASE: {
						BASE_URL: "http://somedatabase.firebaseio.com"	
					}
				}
			};
			var reference = Storage.getRef();
			
			expect(reference).toEqual(jasmine.any(Firebase));
		});
		
		it('should throw error if no app settings', function () {
			var appSettingsMissing = function () {
				Storage.getRef();
			};
			expect(appSettingsMissing).toThrowError("App settings" + 
				" must be set in .config.js");
		});
		
		it('should throw error if no storage (Firebase) is set', function () {
			window.SETTINGS = {	
			};
			
			var storageSettingsMissing = function () {
				Storage.getRef();
			};
			expect(storageSettingsMissing).toThrowError("Storage/Database" + 
				" settings must be set in .config.js");
		});
		
		
		
	});
	
}(window))