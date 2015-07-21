/*global describe */
(function (window) {
    'use strict';

    var angular = window.angular,
        unitTestingHelpers = window.unitTestingHelpers;

    describe('Testing Clubs module', function () {

        var dependencies = ['ui.router'];

        unitTestingHelpers.moduleTester('myhonorsApp.clubs', dependencies);

    });

}(window));