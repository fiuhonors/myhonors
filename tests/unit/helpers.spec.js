/*global describe, it, beforeEach, afterEach, expect */
(function (window) {
	'use strict';
	
	var angular = window.angular;
	
	/**
	*	@description Runs a series of tests on the states of a module provided the
	*		name of the module and an object that describes how each state within
	*		such a model is expected to be configured.
	*	@param {{name: string, url: string, controller:string, 
	*		template: string, abstract: boolean, authType: string[]}[]} 
	*		statesConfiguration An array of states and their supposed 
	*		configurations.
	*/
	function StateTester(statesConfiguration) {
		
		var $state,
			i,
			stateConfiguration;
		
		beforeEach(function () {
			angular.mock.module('myhonorsApp');
			angular.mock.inject(function (_$state_) {
				$state = _$state_;
			});
		});
		
		function individualStateTest(stateConfiguration) {
			
			describe('\'' + stateConfiguration.name + '\' state :', function () {
				
				var stateInfo;
				
				beforeEach(function () {
					stateInfo = $state.get(stateConfiguration.name);
				});
				
				afterEach(function () {
					stateInfo = null;
				});
				
				it('should exist', function () {
					expect(stateInfo).toBeNonEmptyObject();
				});
				
				if (stateConfiguration.abstract) {
					it('should be abstract', function () {
						expect(stateInfo.abstract).toBe(true);
					});
				} else {
					it('should be concrete', function () {
						if (stateInfo && stateInfo.abstract) {
							expect(stateInfo.abstract).toBe(false);
						} else {
							expect(stateInfo).not.toHaveMember('abstract');
						}
					});
				}
				
				it('should have correct auth mechanisms', function () {
					if (stateConfiguration.data && stateConfiguration.data.authType &&
							Array.isArray(stateConfiguration.authType)) {
						
						expect(stateInfo).toHaveMember('authType');
						
						stateConfiguration.forEach(function (authLevel) {
							expect(stateInfo.authType).toHaveMember(authLevel);
						});
					}
				});
				
				it('should have a correct template/partial', function () {
					if (stateConfiguration.template) {
						expect(stateInfo).toHaveMember('templateUrl');
						expect(stateInfo.templateUrl).toBe(stateConfiguration.template);
					} else {
						expect(stateInfo).toHaveMember('template');
						expect(stateInfo.template).toBe(stateConfiguration.template);
					}
				});
				
				it('should have a correct controller', function () {
					expect(stateInfo.controller).toBe(stateConfiguration.controller);
				});
				
				if (stateConfiguration.url) {
					it('should have a correct url structure', function () {
						expect(stateInfo.url).toBe(stateConfiguration.url);
					});
				}
				
			});
		}
		
		for (i = 0; i < statesConfiguration.length; i += 1) {
			stateConfiguration = statesConfiguration[i];
			individualStateTest(stateConfiguration);
		}
	
	}
	
	/**
	*	@description Runs a series of tests on a specific module - specifically
	*		checking if it is initialized and the modules it depends upon
	*		also exist and have also been initialized - provided the module
	*		in question's name and list of dependencies.
	*	@param {string} moduleName Name of module to whose existence, 
	*		initialization and dependencies are being checked
	*	@param {string[]} moduleDependencies Array of dependencies the 
	*		module, as identified by moduleName, depends on.
	*/
	function ModuleTester(moduleName, moduleDependencies) {
		
		describe('\'' + moduleName +  '\' module:', function () {
			
			var module;
			beforeEach(function () {
				module = angular.module(moduleName);
			});
			
			it('should be registered', function () {
				expect(module).toBeTruthy();
			});
			
			describe('Dependencies:', function () {
				
				var i;
				
				function hasModule(moduleDependency) {
					return angular.module(moduleName)
								.requires.indexOf(moduleDependency) >= 0;
				}
				
				function testModuleDependency(moduleDependency) {
					it('should have \'' + moduleDependency + '\' as a dependency',
					    function () {
							expect(angular.module(moduleDependency)).toBeTruthy();
							expect(hasModule(moduleDependency)).toBe(true);
						});
				}
				
				for (i = 0; i < moduleDependencies.length; i += 1) {
					testModuleDependency(moduleDependencies[i]);
				}
				
			});
		});
		
	}
	
	window.unitTestingHelpers = {
		statesTester: StateTester,
		moduleTester: ModuleTester
	};
	
}(window));