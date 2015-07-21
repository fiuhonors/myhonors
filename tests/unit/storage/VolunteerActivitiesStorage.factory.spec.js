(function (window) {
    'use strict';

    var angular = window.angular,
        MockFirebase = window.MockFirebase,
        jasmine = window.jasmine;

    describe("VolunteerActivitiesStorage Factory:", function () {

        var VolunteerActivitiesStorageService,
            RootStorageService;

        beforeEach(function () {
            angular.mock.module("myhonorsApp.storage", function ($provide) {
                $provide.value("StorageReferenceService", {
                    getRef: function () {
                        return new MockFirebase("http://test.firebaseio.com");
                    }
                });
            });
            angular.mock.inject(function (_VolunteerActivitiesStorageService_,
                                           _RootStorageService_) {
                VolunteerActivitiesStorageService = 
                    _VolunteerActivitiesStorageService_;
                RootStorageService = _RootStorageService_;
            });
        });

        it("should have correct preliminary Firebase reference", function () {
            expect(VolunteerActivitiesStorageService.$$storageRef)
                .toEqual(jasmine.any(MockFirebase));
            expect(VolunteerActivitiesStorageService.$$storageRef.key())
                .toEqual("volunteerActivities");
        });

        it("should inherit from RootStorageService", function () {
            expect(Object.getPrototypeOf(VolunteerActivitiesStorageService))
                .toEqual(RootStorageService);
        });

    });

}(window));