/**
 * Created by adi on 14-Aug-16.
 */
'use strict';

var view = angular.module("viewApp", []);

view.controller("ViewCrtl", function ($scope, ViewService, $mdDialog) {

    $scope.books = [];
    $scope.title = "All Books"
    function loadBooks(filter) {
        ViewService.books(function (books) {
            $scope.books = books;
        });
    }

    loadBooks();
    $scope.details = function ($event, book) {
        $mdDialog.show({
            targetEvent: $event,
            controller: "BookDialogController",
            clickOutsideToClose: true,
            templateUrl: 'views/bookViewDialog.tmpl.html',
            locals: {book:book},
            bindToController: true
        });
    }
});

view.controller("BookDialogController", function ($scope, $q, $mdDialog, book) {
    socket.emit('view', book);
    $scope.book = book;
    $scope.cancel = function () {
        $mdDialog.cancel();
    };

});


view.factory("ViewService", function ($http) {
        var serviceBase = '/api/',
            viewFactory = {};

        viewFactory.books = function (callback) {
            return $http.get(serviceBase + 'books').then(function (response) {
                callback(response.data);
            });
        };

        return viewFactory;
    }
);
