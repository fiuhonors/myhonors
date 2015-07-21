(function (window) {
    'use strict';

    var angular = window.angular;

    angular
        .module('myhonorsApp.clubs')
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {

        $stateProvider
            .state('app.clubs-view', {
                url: '/clubs',
                controller: 'ClubsViewController',
                templateUrl: 'app/clubs/clubs-view.partial.html'
            })
            .state('app.club-view', {
                url: '/club/:id',
                controller: 'ClubViewController',
                templateUrl: 'app/clubs/club-view.partial.html'
            })
            .state('app.club-edit', {
                url: '/club/:id/edit',
                controller: 'ClubEditController',
                templateUrl: 'app/clubs/club-edit.partial.html'
            });

    }

}(window));