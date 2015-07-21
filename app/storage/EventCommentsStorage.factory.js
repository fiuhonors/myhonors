(function () {
    'use strict';

    var angular = window.angular;

    angular
        .module('myhonorsApp.storage')
        .factory('EventCommentsStorageService', EventCommentsStorageService);

    EventCommentsStorageService.$inject = ['RootStorageService', 
                                           'StorageReferenceService'];

    function EventCommentsStorageService(RootStorageService, 
                                          StorageReferenceService) {

        var EventCommentsStorageServiceApi = 
            Object.create(RootStorageService);

        EventCommentsStorageServiceApi.$$storageRef = 
            StorageReferenceService.getRef().child('eventComments');

        return EventCommentsStorageServiceApi;

    }

}());