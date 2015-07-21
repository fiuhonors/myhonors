(function () {
    'use strict';

    var angular = window.angular;

    angular
        .module('myhonorsApp.storage')
        .factory('VolunteerActivitiesStorageService', 
                 VolunteerActivitiesStorageService);

    VolunteerActivitiesStorageService.$inject = ['RootStorageService', 
                                                 'StorageReferenceService'];

    function VolunteerActivitiesStorageService(RootStorageService, 
                                                StorageReferenceService) {

        var VolunteerActivitiesStorageServiceApi = 
            Object.create(RootStorageService);

        VolunteerActivitiesStorageServiceApi.$$storageRef = 
            StorageReferenceService.getRef().child('volunteerActivities');

        return VolunteerActivitiesStorageServiceApi;

    }

}());