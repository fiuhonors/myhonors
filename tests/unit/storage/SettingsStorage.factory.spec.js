(function (window) {
	'use strict';
	
	var angular = window.angular,
		MockFirebase = window.MockFirebase,
		jasmine = window.jasmine;
	
	describe("SettingsStorage Factory:", function () {
		
		var SettingsStorageService,
			RootStorageService;
		
		beforeEach(function () {
			angular.mock.module("myhonorsApp.storage", function ($provide) {
				$provide.value("StorageReferenceService", {
					getRef: function () {
						return new MockFirebase("http://test.firebaseio.com");	
					}
				});
			});
			angular.mock.inject(function (_SettingsStorageService_,
										   _RootStorageService_) {
				SettingsStorageService = _SettingsStorageService_;
				RootStorageService = _RootStorageService_;
			});
		});
		
		it("should have correct preliminary Firebase reference", function () {
			expect(SettingsStorageService.$$storageRef)
				.toEqual(jasmine.any(MockFirebase));
			expect(SettingsStorageService.$$storageRef.key())
				.toEqual("settings");
		});
		
		it("should inherit from RootStorageService", function () {
			expect(Object.getPrototypeOf(SettingsStorageService))
				.toEqual(RootStorageService);
		});
		
	});
	
}(window));