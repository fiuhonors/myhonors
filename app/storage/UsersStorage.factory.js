(function (window) {
    'use strict';

    var angular = window.angular;

    angular
        .module('myhonorsApp.storage')
        .factory('UsersStorageService', UsersStorageService);

    UsersStorageService.$inject = ['RootStorageService', 
                                   'StorageReferenceService'];

    function UsersStorageService(RootStorageService, StorageReferenceService) {

        var UsersStorageServiceApi = Object.create(RootStorageService);

        UsersStorageServiceApi.$$storageRef = 
            StorageReferenceService.getRef().child('users');

        return UsersStorageServiceApi;

    }

}(window));