(function (window) {
	'use strict';
	
	var angular = window.angular,
		MockFirebase = window.MockFirebase,
		jasmine = window.jasmine;
	
	describe("CareerApplicationsStorage Factory:", function () {
		
		var CareerApplicationsStorageService,
			RootStorageService;
		
		beforeEach(function () {
			angular.mock.module("myhonorsApp.storage", function ($provide) {
				$provide.value("StorageReferenceService", {
					getRef: function () {
						return new MockFirebase("http://test.firebaseio.com");
					}
				});
			});
			angular.mock.inject(function (_CareerApplicationsStorageService_,
										   _RootStorageService_) {
				CareerApplicationsStorageService = 
					_CareerApplicationsStorageService_;
				RootStorageService = _RootStorageService_;
			});
		});
		
		it("should have correct preliminary Firebase reference", function () {
			expect(CareerApplicationsStorageService.$$storageRef)
				.toEqual(jasmine.any(MockFirebase));
			expect(CareerApplicationsStorageService.$$storageRef.key())
				.toEqual("careerApplications");
		});
		
		it("should inherit from RootStorageService", function () {
			expect(Object.getPrototypeOf(CareerApplicationsStorageService))
				.toEqual(RootStorageService);
		});
		
	});
	
}(window));