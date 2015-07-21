(function () {
    'use strict';

    var angular = window.angular;

    angular
        .module('myhonorsApp.storage')
        .factory('CareerApplicationsStorageService', 
                 CareerApplicationsStorageService);

    CareerApplicationsStorageService.$inject = ['RootStorageService', 
                                                'StorageReferenceService'];

    function CareerApplicationsStorageService(RootStorageService, 
                                               StorageReferenceService) {

        var CareerApplicationsStorageServiceApi = 
            Object.create(RootStorageService);

        CareerApplicationsStorageServiceApi.$$storageRef = 
            StorageReferenceService.getRef().child('careerApplications');

        return CareerApplicationsStorageServiceApi;

    }

}());