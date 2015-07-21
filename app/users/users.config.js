(function (window) {
    'use strict';

    var angular = window.angular;

    angular
        .module('myhonorsApp.users')
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {

        $stateProvider
            .state('app.users-view', {
                url: '/users',
                controller: 'UsersViewController',
                templateUrl: 'app/users/users-view.partial.html'
            })
            .state('app.user-view', {
                url: '/user/:id',
                controller: 'UserViewController',
                templateUrl: 'app/users/user-view.partial.html'
            })
            .state('app.user-edit', {
                url: '/user/:id/edit',
                controller: 'UserEditController',
                templateUrl: 'app/users/user-edit.partial.html'
            });

    }

}(window));