(function (window) {
	'use strict';
	
	var angular = window.angular,
		MockFirebase = window.MockFirebase,
		jasmine = window.jasmine;
	
	describe("CareersStorage Factory:", function () {
		
		var CareersStorageService,
			RootStorageService;
		
		beforeEach(function () {
			angular.mock.module("myhonorsApp.storage", function ($provide) {
				$provide.value("StorageReferenceService", {
					getRef: function () {
						return new MockFirebase("http://test.firebaseio.com");
					}
				});
			});
			angular.mock.inject(function (_CareersStorageService_,
										   _RootStorageService_) {
				CareersStorageService = _CareersStorageService_;
				RootStorageService = _RootStorageService_;
			});
		});
		
		it("should have correct preliminary Firebase reference", function () {
			expect(CareersStorageService.$$storageRef)
				.toEqual(jasmine.any(MockFirebase));
			expect(CareersStorageService.$$storageRef.key())
				.toEqual("careers");
		});
		
		it("should inherit from RootStorageService", function () {
			expect(Object.getPrototypeOf(CareersStorageService))
				.toEqual(RootStorageService);
		});
		
	});
	
}(window));