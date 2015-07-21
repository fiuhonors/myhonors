(function (window) {
    'use strict';

    var angular = window.angular;

    angular
        .module('myhonorsApp.storage')
        .factory('RootStorageService', RootStorageService);

    RootStorageService.$inject = ['$q',
                                  'StorageUtilityService',
                                  'StorageReferenceService'];

    /**
	* @ngdoc service
	* @name myhonorsApp.storage.service:RootStorageService
	* @description Handles storage/persistence layer CRUD operations
	*/
    function RootStorageService($q, 
                                 StorageUtilityService, 
                                 StorageReferenceService) {

        var RootStorageServiceApi = {
            push: push,
            set: set,
            update: update,
            get: get,
            listen: listen,
            delisten: delisten,
            remove: remove
        };
        // Prevent changes and "hide" $$storageRef/$$listeners at iteration 
        Object.defineProperty(RootStorageServiceApi, '$$storageRef', {
            value: StorageReferenceService.getRef(),
            writable: true
        });
        Object.defineProperty(RootStorageServiceApi, '$$listeners', {
            value: [],
            writable: true
        });

        return RootStorageServiceApi;

        /**
		* @ngdoc method
		* @name set
		* @methodOf myhonorsApp.storage.RootStorageService
		* @description Sets data at the appropriate location.
		*
		* @param {*} modelData Data to store
		* @param {string} relPath Location relative to $$storageRef where data 
		*	should be stored.
		* @returns {Object} Promise
		*/
        function set(modelData, relPath) {
            var relPathRef = 
                StorageUtilityService.constructPathRef(relPath, this);

            function execute(resolve, reject) {
                relPathRef
                    .set(modelData, function setComplete(error) {
                    if (error) {
                        StorageUtilityService.fireDigest(reject(error));
                    } else {
                        StorageUtilityService.fireDigest(resolve());
                    }
                });
            }

            return $q(execute);
        }

        /**
		* @ngdoc method
		* @name update
		* @methodOf myhonorsApp.storage.RootStorageService
		* @description Updates data at the appropriate location.
		*
		* @param {*} modelData Data to store
		* @param {string} relPath Location relative to $$storageRef where data 
		*	should be stored.
		* @returns {Object} Promise
		*/
        function update(modelData, relPath) {
            var relPathRef = 
                StorageUtilityService.constructPathRef(relPath, this);

            function execute(resolve, reject) {
                relPathRef
                    .update(modelData, function updateComplete(error) {
                    if (error) {
                        StorageUtilityService.fireDigest(reject(error));
                    } else {
                        StorageUtilityService.fireDigest(resolve());
                    }
                });
            }

            return $q(execute);
        }

        /**
		* @ngdoc method
		* @name push
		* @methodOf myhonorsApp.storage.RootStorageService
		* @description Pushes data at the appropriate location.
		*
		* @param {*} modelData Data to store
		* @param {string} relPath Location relative to $$storageRef where data 
		*	should be stored.
		* @returns {Object} Promise
		*/
        function push(modelData, relPath) {
            var relPathRef = 
                StorageUtilityService.constructPathRef(relPath, this),
                pushId;

            function execute(resolve, reject) {
                var pushRef = 
                    relPathRef
                .push(modelData, function pushComplete(error) {
                    if (error) {
                        StorageUtilityService.fireDigest(reject(error));
                    } else {
                        StorageUtilityService
                            .fireDigest(resolve(pushRef.key()));
                    }
                });
            }

            return $q(execute);
        }

        /**
		* @ngdoc method
		* @name getOnce
		* @methodOf myhonorsApp.storage.RootStorageService
		* @description Gets data at the appropriate location.
		*
		* @param {string} relPath Location relative to $$storageRef where data 
		*	should be obtained.
		* @returns {Object} Promise
		*/
        function get(relPath) {
            var relPathRef = 
                StorageUtilityService.constructPathRef(relPath, this);

            function execute(resolve, reject) {
                relPathRef
                    .once('value', function getSuccess(firebaseSnapshot) {
                    StorageUtilityService
                        .fireDigest(resolve(firebaseSnapshot.val()));
                }, function getFailure(error) {
                    StorageUtilityService
                        .fireDigest(reject(error));
                });
            }

            return $q(execute);
        }

        /**
		* @ngdoc method
		* @name listen
		* @methodOf myhonorsApp.storage.RootStorageService
		* @description Listens to data continously at the appropriate location.
		*
		* @param {function} callback Callback that should be continously 
		*	called when data is updated. Callback is given the most fresh data 
		*	and a copy of listener function that could be then used to 
		*	deregister the listener later on.
		* @param {string} relPath Location relative to $$storageRef where data 
		*	should be obtained.
		* @param {boolean} persistence Whether this listener should persist 
		*	for the lifetime of the app or not. Defaults to false.
		* @returns {function} A specific delistener function for a specific 
		*	generated listener.
		*/
        function listen(callback, relPath, persistence) {
            if (typeof callback !== "function") {
                throw new Error("Callback must be a function");	
            }

            var $this = this,
                relPathRef = 
                StorageUtilityService
            .constructPathRef(relPath, $this),
                persist = persistence || false;

            function getStreamSuccess(firebaseSnapshot) {
                StorageUtilityService
                    .fireDigest(callback(firebaseSnapshot.val()));
            }
            function getStreamFailure(error) {
                StorageUtilityService.fireDigest(callback(error));
            }
            relPathRef
                .on('value', getStreamSuccess, getStreamFailure);

            if (!$this.hasOwnProperty("$$listeners")) {
                $this.$$listeners = [];
            }

            $this.$$listeners.push([getStreamSuccess, relPath, persist]);

            // Deregister listener for this specific instance
            return function () {
                $this.delisten(relPath, getStreamSuccess);
            };
        }

        /**
		* @ngdoc method
		* @name delisten
		* @methodOf myhonorsApp.storage.RootStorageService
		* @description Deregisters the given callback that has been previously 
		*	assigned to listen at the appropriate location.
		*
		* @param {string} relPath Location relative to $$storageRef where a 
		*	listener/s should be deregistered.
		* @param {function} listenerInstance Listener function used to listen to
		*	changes that should be deregistered.
		*/
        function delisten(relPath, listenerInstance) {
            var $this = this,
                listenersRevised = [];

            if ($this.hasOwnProperty("$$listeners")) {
                angular.forEach($this.$$listeners, function (listener) {
                    var listenerFunction = listener[0],
                        listenerRelPath = listener[1],
                        listenerPersist = listener[2],
                        relPathRef = 
                        StorageUtilityService.constructPathRef(relPath, $this);

                    if (listenerFunction === listenerInstance) {
                        relPathRef
                            .off('value', listenerInstance);
                    } else if (listenerRelPath === relPath && 
                               !listenerPersist && 
                               typeof listenerFunction === "function") {
                        relPathRef
                            .off('value', listenerFunction);
                    } else {
                        listenersRevised.push(listener);
                    }
                });

                $this.$$listeners = listenersRevised;
            }
        }

        /**
		* @ngdoc method
		* @name remove
		* @methodOf myhonorsApp.storage.RootStorageService
		* @description Removes data at the appropriate location.
		*
		* @param {string} relPath Location relative to $$storageRef where 
		*	data should be stored.
		* @returns {Object} Promise
		*/
        function remove(relPath) {
            var relPathRef = 
                StorageUtilityService.constructPathRef(relPath, this);

            function execute(resolve, reject) {
                relPathRef
                    .remove(function removeComplete(error) {
                    if (error) {
                        StorageUtilityService.fireDigest(reject(error));
                    } else {
                        StorageUtilityService.fireDigest(resolve());
                    }
                });
            }

            return $q(execute);
        }

    }

}(window));
