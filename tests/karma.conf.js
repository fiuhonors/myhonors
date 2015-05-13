/*global module */

module.exports = function (config) {
	'use strict';
	
	config.set({
		basePath: '../',
		frameworks: ['jasmine'],
		singleRun: false,
		files: [
			'node_modules/jasmine-expect/dist/jasmine-matchers.js',
			'bower_components/angular/angular.js',
			'bower_components/angular-ui-router/release/angular-ui-router.min.js',
			'bower_components/firebase/firebase.js',
			'bower_components/mockfirebase/browser/mockfirebase.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'app/.config.js',
			'app/app.module.js',
			'app/app.config.js',
			'app/app.run.js',
			'app/**/module.js',
			'app/**/config.js',
			'app/**/run.js',
			'app/**/!(module|config|run|.config).js',
			'tests/unit/**/*.spec.js'
		],
		reporters: ['progress']
	});

};