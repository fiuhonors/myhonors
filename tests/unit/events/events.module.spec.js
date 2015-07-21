/*global describe */
(function (window) {
    'use strict';

    var angular = window.angular,
        unitTestingHelpers = window.unitTestingHelpers;

    describe('Testing Events Module', function () {

        var dependencies = ['ui.router'];

        unitTestingHelpers.moduleTester('myhonorsApp.events', dependencies);

    });

}(window));