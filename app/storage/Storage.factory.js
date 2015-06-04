(function (window) {
	'use strict';
	
	var angular = window.angular,
		Firebase = window.Firebase;
	
	angular
		.module('myhonorsApp.storage')
		.factory('StorageService', StorageService);
	
	/**
	* @ngdoc service
	* @name myhonorsApp.storage.service:Storage
	* @description Handles creating references to storage/persistence layer
	*/
	function StorageService() {
		
		return {
			getRef: getRef	
		};
		
		/**
		* @ngdoc method
		* @name getRef
		* @methodOf myhonorsApp.storage.Storage
		* @description Constructs the proper absolute reference to
		*	the database/storage service of the app.
		*
		* @param {string} absolutePath Absolute location of the
		*	database/storage service of the app.
		*/
		function getRef(absolutePath) {
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