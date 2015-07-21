(function (window) {
	'use strict';
	
	var angular = window.angular,
		MockFirebase = window.MockFirebase,
		jasmine = window.jasmine;
	
	describe("EventsStorage Factory:", function () {
		
		var EventsStorageService,
			RootStorageService;
		
		beforeEach(function () {
			angular.mock.module("myhonorsApp.storage", function ($provide) {
				$provide.value("StorageReferenceService", {
					getRef: function () {
						return new MockFirebase("http://test.firebaseio.com");	
					}
				});
			});
			angular.mock.inject(function (_EventsStorageService_,
										   _RootStorageService_) {
				EventsStorageService = _EventsStorageService_;
				RootStorageService = _RootStorageService_;
			});
		});
		
		it("should have correct preliminary Firebase reference", function () {
			expect(EventsStorageService.$$storageRef)
				.toEqual(jasmine.any(MockFirebase));
			expect(EventsStorageService.$$storageRef.key())
				.toEqual("events");
		});
		
		it("should inherit from RootStorageService", function () {
			expect(Object.getPrototypeOf(EventsStorageService))
				.toEqual(RootStorageService);
		});
		
	});
	
}(window));