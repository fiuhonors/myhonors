/*global describe */
(function (window) {
    'use strict';

    var angular = window.angular,
        unitTestingHelpers = window.unitTestingHelpers;

    describe('Testing Clubs routes', function () {

        var states = [
            {
                name: 'app.clubs-view',
                url: '/clubs',
                controller: 'ClubsViewController',
                template: 'app/clubs/clubs-view.partial.html'
            },
            {
                name: 'app.club-view',
                url: '/club/:id',
                controller: 'ClubViewController',
                template: 'app/clubs/club-view.partial.html'
            },
            {
                name: 'app.club-edit',
                url: '/club/:id/edit',
                controller: 'ClubEditController',
                template: 'app/clubs/club-edit.partial.html'
            }
        ];

        unitTestingHelpers.statesTester(states);

    });

}(window));