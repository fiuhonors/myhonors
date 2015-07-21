(function (window) {
    'use strict';

    var angular = window.angular,
        Firebase = window.Firebase;

    angular
        .module('myhonorsApp.storage')
        .factory('StorageReferenceService', StorageReferenceService);

    /**
	* @ngdoc service
	* @name myhonorsApp.storage.service:StorageReferenceService
	* @description Handles creating references to storage/persistence layer
	*/
    function StorageReferenceService() {

        return {
            getRef: getRef	
        };

        /**
		* @ngdoc method
		* @name getRef
		* @methodOf myhonorsApp.storage.StorageReferenceService
		* @description Constructs the proper absolute reference to
		*	the database/storage service of the app.
		*
		* @param {string} absolutePath Absolute location of the
		*	database/storage service of the app.
		*/
        function getRef(absolutePath) {
            if (!Firebase) {
                throw new Error("Firebase library is required.");
            }
            if (absolutePath) {
                return new Firebase(absolutePath);
            }

            if (!window.SETTINGS) {
                throw new Error("App settings must be set in .config.js");
            } else if (!window.SETTINGS.STORAGE || 
                       !window.SETTINGS.STORAGE.FIREBASE ||
                       !window.SETTINGS.STORAGE.FIREBASE.BASE_URL) {
                throw new Error("Storage/Database settings must" + 
                                " be set in .config.js");
            }
            return new Firebase(window.SETTINGS.STORAGE.FIREBASE.BASE_URL);
        }

    }

}(window));