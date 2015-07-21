/*global describe, it, beforeEach, expect */
(function (window) {
    'use strict';

    var angular = window.angular,
        unitTestingHelpers = window.unitTestingHelpers;

    describe('Testing Global Routes: ', function () {

        var states = [
            {
                name: 'app',
                abstract: true,
                controller: 'AppController',
                template: 'app/app.partial.html'
            }
        ];

        unitTestingHelpers.statesTester(states);

    });

}(window));