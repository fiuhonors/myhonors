/*global module */

module.exports = function (config) {
	'use strict';
	
	config.set({
		basePath: '../',
		frameworks: ['jasmine'],
		singleRun: false,
		files: [
			'bower_components/angular/angular.js',
			'bower_components/angular-ui-router/release/angular-ui-router.min.js',
			'bower_components/firebase/firebase.js',
			'bower_components/mockfirebase/browser/mockfirebase.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'app/**/config.js',
			'app/**/module.js',
			'app/**/!(module,config).js',
			'tests/unit/**/*.spec.js'
		],
		reporters: ['progress']
	});

};