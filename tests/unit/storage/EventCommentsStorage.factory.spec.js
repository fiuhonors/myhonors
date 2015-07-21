(function (window) {
    'use strict';

    var angular = window.angular,
        MockFirebase = window.MockFirebase,
        jasmine = window.jasmine;

    describe("EventCommentsStorage Factory:", function () {

        var EventCommentsStorageService,
            RootStorageService;

        beforeEach(function () {
            angular.mock.module("myhonorsApp.storage", function ($provide) {
                $provide.value("StorageReferenceService", {
                    getRef: function () {
                        return new MockFirebase("http://test.firebaseio.com");
                    }
                });
            });
            angular.mock.inject(function (_EventCommentsStorageService_,
                                           _RootStorageService_) {
                EventCommentsStorageService = _EventCommentsStorageService_;
                RootStorageService = _RootStorageService_;
            });
        });

        it("should have correct preliminary Firebase reference", function () {
            expect(EventCommentsStorageService.$$storageRef)
                .toEqual(jasmine.any(MockFirebase));
            expect(EventCommentsStorageService.$$storageRef.key())
                .toEqual("eventComments");
        });

        it("should inherit from RootStorageService", function () {
            expect(Object.getPrototypeOf(EventCommentsStorageService))
                .toEqual(RootStorageService);
        });

    });

}(window));