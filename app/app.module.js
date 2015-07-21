(function (window) {
    'use strict';

    var angular = window.angular;

    angular.module('myhonorsApp', ['ui.router',
                                   'myhonorsApp.auth',
                                   'myhonorsApp.users',
                                   'myhonorsApp.storage',
                                   'myhonorsApp.clubs',
                                   'myhonorsApp.events',
                                   'myhonorsApp.citizenships',
                                   'myhonorsApp.careers']);



}(window));