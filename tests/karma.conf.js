/*global module */

module.exports = function (config) {
	'use strict';
	
	config.set({
		basePath: '../',
		frameworks: ['jasmine'],
		singleRun: false,
		files: [
			'bower_components/angular/angular.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'app/**/*.js',
			'tests/unit/**/*.spec.js'
		],
		reporters: ['progress']
	});

};