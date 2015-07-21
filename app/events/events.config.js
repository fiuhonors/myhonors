(function (window) {
    'use strict';

    var angular = window.angular;

    angular
        .module('myhonorsApp.events')
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {

        $stateProvider
            .state('app.events-view', {
                url: '/events',
                controller: 'EventsViewController',
                templateUrl: 'app/events/events-view.partial.html'
            })
            .state('app.event-view', {
                url: '/event/:id',
                controller: 'EventViewController',
                templateUrl: 'app/events/event-view.partial.html'
            })
            .state('app.event-edit', {
                url: '/event/:id/edit',
                controller: 'EventEditController',
                templateUrl: 'app/events/event-edit.partial.html'
            })
            .state('app.event-add', {
                url: '/event/add',
                controller: 'EventAddController',
                templateUrl: 'app/events/event-add.partial.html'
            });

    }

}(window));