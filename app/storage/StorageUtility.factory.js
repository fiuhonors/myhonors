(function (window) {
	'use strict';
	
	var angular = window.angular;
	
	angular
		.module('myhonorsApp.storage')
		.factory('StorageUtilityService', StorageUtilityService);
	
	StorageUtilityService.$inject = ['$rootScope', 
									 'StorageReferenceService'];
	
	/**
	* @ngdoc service
	* @name myhonorsApp.storage.service:StorageUtilityService
	* @description Utility functions for storage/persistence layer
	*/
	function StorageUtilityService($rootScope, StorageReferenceService) {
		
		return {
			constructPathRef: constructPathRef,
			fireDigest: fireDigest
		};
		
		/**
		* @ngdoc method
		* @name constructPath
		* @methodOf myhonorsApp.storage.StorageUtilityService
		* @description Constructs the correct reference to a storage
		*	path, relative to the base reference of the storage layer 
		*	(base reference can change based on context).
		*
		* @param {string} relativePath Location in the storage relative 
		*	to the base reference (which is either $$storageRef property 
		*	of context param, if set, or StorageReferenceService.getRef(), 
		*	if $$storageRef is not set).
		* @param {Object=} context Object whose $$storageRef property will
		*	be used as the base reference.
		* @returns {Object} Reference to the storage path based on the
		*	provided base reference and relative location to that base
		*	reference.
		*/
		function constructPathRef(relativePath, context) {
			var constructedPathRef = context.$$storageRef;
			if (!relativePath || !angular.isString(relativePath)) {
				return constructedPathRef;
			}
			if (constructedPathRef) {
				constructedPathRef = constructedPathRef.child(relativePath);
			} else {
				constructedPathRef = StorageReferenceService
					.getRef().child(relativePath);
			}
			return constructedPathRef;
		}

		/**
		* @ngdoc method
		* @name fireDigest
		* @methodOf myhonorsApp.storage.StorageUtilityService
		* @description Fires Angular's Digest cycle if one hasn't been 
		*	scheduled, or if one is already scheduled, batches the passed 
		*	expression to be evaluated to that upcoming scheduled digest 
		*	cycle.
		*
		* @param {(function|string)=} digestExp Function or String to evaluate
		*	on an Angular digest cycle.
		* @returns {*} Result of evaluating the expression in the "Angular
		*	world".
		*/
		function fireDigest(digestExp) {
			var isValidDigestExp =
				typeof digestExp === "function" ||
				typeof digestExp === "string";

			if (digestExp && isValidDigestExp) {
				return $rootScope.$evalAsync(digestExp);
			} else {
				return $rootScope.$evalAsync(function () {
				});
			}
		}
	}
	
}(window));