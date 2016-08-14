/**
 * Created by adi on 12-Aug-16.
 */

'use strict';

var auth = angular.module("authApp", []);

auth.controller("LogoutCrtl", function ($scope, $window, $location, $rootScope) {
    $scope.logout = function () {
        socket.emit('logout');
    }

    socket.on('loggedout', function () {
        $window.sessionStorage.removeItem('username');
        $rootScope.session.user = undefined;
        $window.location.href = "#/"

    });
});


auth.controller("LoginCrtl", function ($scope, $window, $location, $rootScope) {

    if ($window.sessionStorage.getItem('username') || $rootScope.session.user){
        $window.location.href = "#/"
    }

    $scope.login = function (user) {
        socket.emit('login', user);
    }

    socket.on('loggedin', function (user) {
        $window.sessionStorage.setItem('username', user.username);
        $rootScope.session.user = user.username;
        $window.location.href = "#/"

    });
});

