/**
 * Created by adi on 13-Aug-16.
 */

'use strict';

var stat = angular.module("statApp", []);

stat.controller("TopBooksCrtl", function ($scope, StatService) {
    $scope.books = [];
    $scope.title = "TOP 10 BOOKS!";
    $scope.top10 = true;

    function loadBooks() {
        StatService.getTop10Books(function (books) {
            $scope.books = books;
        });
    }
    loadBooks();
});


stat.controller("TopAuthorsCrtl", function ($scope, StatService) {
    $scope.authors = [];

    function loadAuthors() {
        StatService.getTop10Authors(function (authors) {
            $scope.authors = authors;
        });
    }
    loadAuthors();
});

stat.factory("StatService", function ($http) {
        var serviceBase = '/api/',
            statFactory = {};

        statFactory.getTop10Books = function (callback) {
            return $http.get(serviceBase + 'top10Books').then(function (response) {
                callback(response.data);
            });
        };
        statFactory.getTop10Authors = function (callback) {
            return $http.get(serviceBase + 'top10Authors').then(function (response) {
                callback(response.data);
            });
        };

        return statFactory;
    }
);
