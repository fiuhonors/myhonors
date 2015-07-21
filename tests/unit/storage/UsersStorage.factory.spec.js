(function (window) {
    'use strict';

    var angular = window.angular,
        MockFirebase = window.MockFirebase,
        jasmine = window.jasmine;

    describe("UsersStorage Factory:", function () {

        var UsersStorageService,
            RootStorageService;

        beforeEach(function () {
            angular.mock.module("myhonorsApp.storage", function ($provide) {
                $provide.value("StorageReferenceService", {
                    getRef: function () {
                        return new MockFirebase("http://test.firebaseio.com");
                    }
                });
            });
            angular.mock.inject(function (_UsersStorageService_,
                                           _RootStorageService_) {
                UsersStorageService = _UsersStorageService_;
                RootStorageService = _RootStorageService_;
            });
        });

        it("should have correct preliminary Firebase reference", function () {
            expect(UsersStorageService.$$storageRef)
                .toEqual(jasmine.any(MockFirebase));
            expect(UsersStorageService.$$storageRef.key())
                .toEqual("users");
        });

        it("should inherit from RootStorageService", function () {
            expect(Object.getPrototypeOf(UsersStorageService))
                .toEqual(RootStorageService);
        });

    });

}(window));