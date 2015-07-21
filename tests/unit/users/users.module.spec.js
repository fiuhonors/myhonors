/*global describe */
(function (window) {
    'use strict';

    var angular = window.angular,
        unitTestingHelpers = window.unitTestingHelpers;

    describe('Testing Users Module', function () {

        var dependencies = ['ui.router'];

        unitTestingHelpers.moduleTester('myhonorsApp.users', dependencies);

    });

}(window));