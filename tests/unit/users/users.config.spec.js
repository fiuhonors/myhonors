/*global describe */
(function (window) {
    'use strict';

    var angular = window.angular,
        unitTestingHelpers = window.unitTestingHelpers;

    describe('Testing Users Routes', function () {

        var states = [
            {
                name: 'app.users-view',
                url: '/users',
                controller: 'UsersViewController',
                template: 'app/users/users-view.partial.html'
            },
            {
                name: 'app.user-view',
                url: '/user/:id',
                controller: 'UserViewController',
                template: 'app/users/user-view.partial.html'
            },
            {
                name: 'app.user-edit',
                url: '/user/:id/edit',
                controller: 'UserEditController',
                template: 'app/users/user-edit.partial.html'
            }
        ];

        unitTestingHelpers.statesTester(states);

    });

}(window));