(function (window) {
	'use strict';
	
	var angular = window.angular,
		_ = window._;
	
	angular
		.module('myhonorsApp.auth')
		.factory('AuthService', AuthService);
	
	AuthService.$inject = ['$q', '$http', '$rootScope'];
	
	/**
	* @ngdoc service
	* @name myhonorsApp.auth.service:AuthService
	* @description Handles authentication of users and allowing/blocking 
	*	users in certain routes.
	*/
	function AuthService($q, $http, $rootScope) {
		
		var user = {
				id: null,
				name: null,
				permissions: []
			},
			loggedIn = false;
		
		return {
			isLoggedIn: isLoggedIn,
			login: login,
			logout: logout,
			getUserId: getUserId,
			getUserPermissions: getUserPermissions
		};
		
		function _resetAuth() {
			user = {
				id: null,
				name: null,
				permissions: []
			};
			loggedIn = false;
		}
		
		function isLoggedIn() {
			
		}
		
		/**
		* @ngdoc method
		* @name login
		* @methodOf myhonorsApp.auth.AuthService
		* @description Logs the user provided
		*
		* @returns {Object} Promise
		*/
		function login(id, password) {
			function promiseExecutor(resolve, reject) {
				
			}
			
			return $q(promiseExecutor);
		}
		
		/**
		* @ngdoc method
		* @name logout
		* @methodOf myhonorsApp.auth.AuthService
		* @description Logs the currently user out
		*
		* @returns {Object} Promise
		*/
		function logout() {
			function revokeSuccess(response) {
				user.id = null;
				user.permissions = [];
				
				loggedIn = false;
			}
			
		}
		
		/**
		* @ngdoc method
		* @name getUserId
		* @methodOf myhonorsApp.auth.AuthService
		* @description Gets the unique ID of the currently logged in user
		*
		* @returns {?string} Unique ID of the currently logged in user
		*/
		function getUserId() {
			if (user.id) {
				return String(user.id);
			}
			
			return null;
		}
		
		/**
		* @ngdoc method
		* @name getUserPermissions
		* @methodOf myhonorsApp.auth.AuthService
		* @description Gets the permissions of the currently logged in user
		*
		* @returns {?array} Permissions of the currently logged in user
		*/
		function getUserPermissions() {
			if (user.permissions && _.isArray(user.permissions)) {
				return _.clone(user.permissions);
			}
			
			return null;
		}
		
	}
	
}(window));