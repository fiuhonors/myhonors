(function () {
    'use strict';

    var angular = window.angular;

    angular
        .module('myhonorsApp.storage')
        .factory('SettingsStorageService', SettingsStorageService);

    SettingsStorageService.$inject = ['RootStorageService', 
                                      'StorageReferenceService'];

    function SettingsStorageService(RootStorageService, 
                                     StorageReferenceService) {

        var SettingsStorageServiceApi = 
            Object.create(RootStorageService);

        SettingsStorageServiceApi.$$storageRef = 
            StorageReferenceService.getRef().child('settings');

        return SettingsStorageServiceApi;

    }

}());