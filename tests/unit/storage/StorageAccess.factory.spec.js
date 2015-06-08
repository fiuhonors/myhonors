/*global describe, beforeEach, it, expect */
(function (window) {
	'use strict';
	
	var angular = window.angular,
		MockFirebase = window.MockFirebase,
		jasmine = window.jasmine;
	
	describe('Storage Access Factory:', function () {
		
		var StorageAccess,
			$timeout;
		
		function flushAll() {
			StorageAccess.$$storageRef.flush();
			try {
				$timeout.flush();
			} catch (e) {}
		}
		
		beforeEach(function () {
			angular.mock.module('myhonorsApp.storage', function ($provide) {
				$provide.value("StorageService", {
					getRef: function () {
						return new MockFirebase("http://test.firebaseio.com");
					}
				});
			});
			angular.mock.inject(function (_StorageAccessService_, _$timeout_) {
				StorageAccess = _StorageAccessService_;
				$timeout = _$timeout_;
			});
		});
		
		it('should have correct preliminary Firebase reference', function () {
			expect(StorageAccess.$$storageRef).toBeTruthy();
			expect(StorageAccess.$$storageRef)
				.toEqual(jasmine.any(MockFirebase));
		});
		
		describe('Set method:', function () {
			
			it('should store data at base reference', function (done) {
				var testModel = {
						testProp: "someValue",
						testObject: {
							anotherTestProp: "someAnotherValue"	
						}
					},
					storageRef = StorageAccess.$$storageRef;
				
				StorageAccess.set(testModel).then(function () {
					expect(storageRef.getData()).toEqual(testModel);
					done();
				}, function () {
					done.fail("Data not set at base reference.");
				});
				flushAll();
			});
			
			it('should store data at relative reference', function (done) {
				var testModel = {
						testProp: "someValue"
					},
					storageRef = StorageAccess.$$storageRef.child("childPath");
				
				StorageAccess.set(testModel, "childPath").then(function () {
					expect(storageRef.getData()).toEqual(testModel);
					done();
				}, function () {
					done.fail("Data not set at relative reference");
				});
				flushAll();
			});
			
			it('should wipe out any previous data', function (done) {
				var preliminaryData = {
						preliminaryProp: "someOtherValue"
					},
					testModel = {
						testProp: "someValue"
					},
					storageRef = StorageAccess.$$storageRef;
				
				storageRef.set(preliminaryData);
				flushAll();
				
				StorageAccess.set(testModel).then(function () {
					expect(storageRef.getData()).toEqual(testModel);
					done();
				}, function () {
					done.fail("Data not set");
				});
				flushAll();
			});
			
		});
		
		describe('Update method:', function () {
			
			it('should store data at base reference', function (done) {
				var testModel = {
						testProp: "someValue"
					},
					storageRef = StorageAccess.$$storageRef;
				
				StorageAccess.update(testModel).then(function () {
					expect(storageRef.getData()).toEqual(testModel);
					done();
				}, function () {
					done.fail("Data not set at base reference");
				});
				flushAll();
			});
			
			it('should store data at relative reference', function (done) {
				var testModel = {
						testProp: "someValue"
					},
					storageRef = StorageAccess.$$storageRef.child("childPath");
				
				StorageAccess.update(testModel, "childPath").then(function () {
					expect(storageRef.getData()).toEqual(testModel);
					done();
				}, function () {
					done.fail("Data not set at relative reference");
				});
				flushAll();
			});
			
			it('should only update explicit data properties', function (done) {
				var preliminaryData = {
						preliminaryProp: "someOtherValue"
					},
					testModel = {
						testProp: "someValue"
					},
					storageRef = StorageAccess.$$storageRef;
				
				storageRef.set(preliminaryData);
				flushAll();
				
				StorageAccess.update(testModel).then(function () {
					var combinedData = {};
					angular.extend(combinedData, preliminaryData);
					angular.extend(combinedData, testModel);
					
					expect(storageRef.getData()).toEqual(combinedData);
					done();
				}, function () {
					done.fail("Data not updated");
				});
				flushAll();
			});
			
		});
		
		describe('Push method:', function () {
			
			it('should push data at base reference', function (done) {
				var testModel = {
						testProp: "someValue"
					},
					storageRef = StorageAccess.$$storageRef;
				
				StorageAccess.push(testModel).then(function () {
					expect(storageRef.getData()).not.toEqual(testModel);
					expect(storageRef.getData()).toBeNonEmptyObject();
					done();
				}, function () {
					done.fail("Data not pushed at base reference");
				});
				flushAll();
			});
			
			it('should push data at relative reference', function (done) {
				var testModel = {
						testProp: "someValue"
					},
					storageRef = StorageAccess.$$storageRef.child("childPath");
				
				StorageAccess.push(testModel, "childPath").then(function () {
					expect(storageRef.getData()).not.toEqual(testModel);
					expect(storageRef.getData()).toBeNonEmptyObject();
					done();
				}, function () {
					done.fail("Data not pushed at relative reference");
				});
				flushAll();
			});
			
		});
		
		describe('Get method:', function () {
			
			it('should get data at base reference', function (done) {
				var preliminaryData = {
						testProp: "someValue"
					},
					storageRef = StorageAccess.$$storageRef;
				
				storageRef.set(preliminaryData);
				flushAll();
				
				StorageAccess.get().then(function (data) {
					expect(data).toEqual(storageRef.getData());
					done();
				}, function () {
					done.fail("Data not obtained at base reference");
				});
				flushAll();
			});
			
			it('should get data at relative reference', function (done) {
				var preliminaryData = {
						testProp: "someValue"
					},
					storageRef = StorageAccess.$$storageRef.child("childPath");
				
				storageRef.set(preliminaryData);
				flushAll();
				
				StorageAccess.get("childPath").then(function (data) {
					expect(data).toEqual(storageRef.getData());
					done();
				}, function () {
					done.fail("Data not obtained at relative reference");
				});
				flushAll();
			});
			
		});
		
		describe('Listen method:', function () {
			
			it('should listen to data at base reference', function (done) {
				var preliminaryData = {
						testProp: "someValue"
					},
					secondaryData = {
						newTestProp: "someOtherValue"	
					},
					storageRef = StorageAccess.$$storageRef,
					fireCount = 0;
				
				storageRef.set(preliminaryData);
				flushAll();
				
				// Storage Access should be fired twice - 2 set operations
				StorageAccess.listen(function (data) {
					fireCount++;
					expect(data).toEqual(storageRef.getData());
					if (fireCount === 2) {
						done();	
					}
				});
				flushAll();
				
				storageRef.set(secondaryData);
				flushAll();
			});
			
			it('should listen to data at relative reference', function (done) {
				var preliminaryData = {
						testProp: "someValue"
					},
					secondaryData = {
						newTestProp: "someOtherValue"	
					},
					storageRef = StorageAccess.$$storageRef.child("childPath"),
					fireCount = 0;
				
				storageRef.set(preliminaryData);
				flushAll();
				
				// Storage Access should be fired twice - 2 set operations
				StorageAccess.listen(function (data) {
					fireCount++;
					expect(data).toEqual(storageRef.getData());
					if (fireCount === 2) {
						expect(fireCount).toEqual(2);
						done();	
					}
				}, "childPath");
				flushAll();
				
				storageRef.set(secondaryData);
				flushAll();
			});
			
			it('should throw if a non-function is given', function () {
				var stringCallback = function () {
						StorageAccess.listen('callback');
					}, 
					objectCallback = function () {
						StorageAccess.listen({});	
					},
					arrayCallback = function () {
						StorageAccess.listen([]);	
					},
					booleanCallback = function () {
						StorageAccess.listen(true);	
					},
					numberCallback = function () {
						StorageAccess.listen(1);	
					};
				
				expect(stringCallback).toThrowError();
				expect(objectCallback).toThrowError();
				expect(arrayCallback).toThrowError();
				expect(booleanCallback).toThrowError();
				expect(numberCallback).toThrowError();
			});
			
			it('should be able to delisten itself', function () {
				var preliminaryData = {
						testProp: "someValue"
					},
					secondaryData = {
						newTestProp: "someOtherValue"
					},
					storageRef = StorageAccess.$$storageRef,
					fireCount = 0;
				
				var unwatch = StorageAccess.listen(function () {
						fireCount++;
					});
				
				flushAll();
				expect(fireCount).toEqual(1);
				
				storageRef.set(preliminaryData);
				flushAll();
				
				expect(fireCount).toEqual(2);
				
				unwatch();
				
				storageRef.set(secondaryData);
				flushAll();
				
				expect(fireCount).toEqual(2);
			});
		});
		
		describe('Delisten method:', function () {
			
			it('should deregister specific listener', function (done) {
				var preliminaryData = {
						testProp: "someValue"
					},
					secondaryData = {
						newTestProp: "someOtherValue"	
					},
					storageRef = StorageAccess.$$storageRef.child("childPath"),
					fireCount1 = 0,
					fireCount2 = 0;
				
				// This StorageAccess listener should be fired 2 times
				// initial load + 1 set operation
				// second set operation ignored because of delisten()
				StorageAccess.listen(function () {
					fireCount1++;
					if (fireCount1 === 2) {
						StorageAccess.delisten("childPath");
						
						// This should be ignored because of delisten()
						storageRef.set(secondaryData);
						flushAll();
						
						expect(fireCount1).toEqual(2);
					} else if (fireCount1 > 2) {
						done.fail();
					}
				}, "childPath");
				
				// This StorageAccess listener should be fired 3 times
				// initial load + 2 set operations
				// 4th set operation ignored because of delisten()
				StorageAccess.listen(function () {
					fireCount2++;
					if (fireCount2 === 3) {
						StorageAccess.delisten();
						
						// This should be ignored because of delisten()
						storageRef.set(secondaryData);
						flushAll();
						
						expect(fireCount2).toEqual(3);
						done();
					}
				});
				
				storageRef.set(preliminaryData);
				flushAll();
			});
			
			it('should throw if a non-function is given', function () {
				var stringCallback = function () {
						StorageAccess.listen('callback');
					}, 
					objectCallback = function () {
						StorageAccess.listen({});	
					},
					arrayCallback = function () {
						StorageAccess.listen([]);	
					},
					booleanCallback = function () {
						StorageAccess.listen(true);	
					},
					numberCallback = function () {
						StorageAccess.listen(1);	
					};
				
				expect(stringCallback).toThrowError();
				expect(objectCallback).toThrowError();
				expect(arrayCallback).toThrowError();
				expect(booleanCallback).toThrowError();
				expect(numberCallback).toThrowError();
			});
			
		});
		
		describe('Remove method:', function () {
			
			it('should remove data at base reference', function (done) {
				var preliminaryData = {
						testProp: "someValue"
					},
					storageRef = StorageAccess.$$storageRef;
				
				storageRef.set(preliminaryData);
				flushAll();
				expect(storageRef.getData()).toBeTruthy();
				
				StorageAccess.remove().then(function () {
					expect(storageRef.getData()).toBeFalsy();
					done();
				});
				flushAll();
			});
			
			it('should remove data at relative reference', function (done) {
				var preliminaryData = {
						testProp: "someValue"
					},
					storageRef = StorageAccess.$$storageRef.child("childPath");
				
				storageRef.set(preliminaryData);
				flushAll();
				expect(storageRef.getData()).toBeTruthy();
				
				StorageAccess.remove().then(function () {
					expect(storageRef.getData()).toBeFalsy();
					done();
				});
				flushAll();
			});
			
		});
		
	});
	
}(window));