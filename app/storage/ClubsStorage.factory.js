(function () {
	'use strict';
	
	var angular = window.angular;
	
	angular
		.module('myhonorsApp.storage')
		.factory('ClubsStorageService', ClubsStorageService);
	
	ClubsStorageService.$inject = ['RootStorageService', 
								   'StorageReferenceService'];
	
	function ClubsStorageService(RootStorageService, 
								  StorageReferenceService) {
		
		var ClubsStorageServiceApi = 
			Object.create(RootStorageService);
		
		ClubsStorageServiceApi.$$storageRef = 
			StorageReferenceService.getRef().child('clubs');
		
		return ClubsStorageServiceApi;
		
	}
	
}());