(function (window) {
	'use strict';
	
	var angular = window.angular;
	
	angular
		.module('myhonorsApp.storage')
		.factory('EventsStorageService', EventsStorageService);
	
	EventsStorageService.$inject = ['RootStorageService', 
									'StorageReferenceService'];
	
	function EventsStorageService(RootStorageService, StorageReferenceService) {
		
		var EventsStorageServiceApi = Object.create(RootStorageService);
		
		EventsStorageServiceApi.$$storageRef = 
			StorageReferenceService.getRef().child('events');
		
		return EventsStorageServiceApi;
		
	}
	
}(window));