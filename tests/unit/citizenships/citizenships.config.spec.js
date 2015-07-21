/*global describe */
(function (window) {
    'use strict';

    var angular = window.angular,
        unitTestingHelpers = window.unitTestingHelpers;

    describe('Testing Citizenships Routes', function () {

        var states = [
            {
                name: 'app.citizenships-view',
                url: '/citizenships',
                controller: 'CitizenshipsViewController',
                template: 'app/citizenships/citizenships-view.partial.html'
            },
            {
                name: 'app.citizenship-edit',
                url: '/citizenship/:id/edit',
                controller: 'CitizenshipEditController',
                template: 'app/citizenships/citizenship-edit.partial.html'
            },
            {
                name: 'app.citizenship-add',
                url: '/citizenship/add',
                controller: 'CitizenshipAddController',
                template: 'app/citizenships/citizenship-add.partial.html'
            }
        ];

        unitTestingHelpers.statesTester(states);

    });


}(window));