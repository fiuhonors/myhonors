(function () {
	'use strict';
	
	var angular = window.angular;
	
	angular
		.module('myhonorsApp.storage')
		.factory('CareersStorageService', CareersStorageService);
	
	CareersStorageService.$inject = ['RootStorageService',
									 'StorageReferenceService'];
	
	function CareersStorageService(RootStorageService, 
									StorageReferenceService) {
		
		var CareersStorageServiceApi = 
			Object.create(RootStorageService);
		
		CareersStorageServiceApi.$$storageRef = 
			StorageReferenceService.getRef().child('careers');
		
		return CareersStorageServiceApi;
		
	}
	
}());