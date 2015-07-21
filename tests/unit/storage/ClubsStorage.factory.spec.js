(function (window) {
	'use strict';
	
	var angular = window.angular,
		MockFirebase = window.MockFirebase,
		jasmine = window.jasmine;
	
	describe("ClubsStorage Factory:", function () {
		
		var ClubsStorageService,
			RootStorageService;
		
		beforeEach(function () {
			angular.mock.module("myhonorsApp.storage", function ($provide) {
				$provide.value("StorageReferenceService", {
					getRef: function () {
						return new MockFirebase("http://test.firebaseio.com");
					}
				});
			});
			angular.mock.inject(function (_ClubsStorageService_,
										   _RootStorageService_) {
				ClubsStorageService = _ClubsStorageService_;
				RootStorageService = _RootStorageService_;
			});
		});
		
		it("should have correct preliminary Firebase reference", function () {
			expect(ClubsStorageService.$$storageRef)
				.toEqual(jasmine.any(MockFirebase));
			expect(ClubsStorageService.$$storageRef.key())
				.toEqual("clubs");
		});
		
		it("should inherit from RootStorageService", function () {
			expect(Object.getPrototypeOf(ClubsStorageService))
				.toEqual(RootStorageService);
		});
		
	});
	
}(window));