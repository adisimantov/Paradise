/**
 * Created by adi on 27-Jun-16.
 */
'use strict';

var management = angular.module("managementApp", ['uiGmapgoogle-maps']);

management.controller("AuthorsCtrl", function ($scope, AuthorService, $mdDialog) {

    $scope.authors = [];
    function loadAuthors(filter) {
        if (!filter) {
            AuthorService.getAuthors(function (authors) {
                $scope.authors = authors;
            });
        }
        else{
            AuthorService.search(filter, function (authors) {
                $scope.authors = authors;
            });
        }
    }
    loadAuthors();

    $scope.showAdd = function ($event) {
        $mdDialog.show({
                targetEvent: $event,
                controller: "AuthorDialogController",
                clickOutsideToClose: true,
                templateUrl: 'views/authorAdminDialog.tmpl.html',
                locals: {title: "Add New Author", action:"add", author: {}},
                bindToController: true
            })
            .then(function (answer) {
                if (answer) {
                    loadAuthors();
                }
            });
    };

    $scope.details = function ($event, author) {
        $mdDialog.show({
                targetEvent: $event,
                controller: "AuthorDialogController",
                clickOutsideToClose: true,
                templateUrl: 'views/authorAdminDialog.tmpl.html',
                locals: {title: "Author Details", action:"details" , author: author},
                bindToController: true
            });
    }
    $scope.editAuthor = function ($event, author) {
        $mdDialog.show({
                targetEvent: $event,
                controller: "AuthorDialogController",
                clickOutsideToClose: true,
                templateUrl: 'views/authorAdminDialog.tmpl.html',
                locals: {title: "Update Author", action:"update" , author: author},
                bindToController: true
            })
            .then(function (answer) {
                if (answer) {
                    loadAuthors();
                }
            });
    }

    $scope.deleteAuthor = function ($event, author) {
        var confirm = $mdDialog.confirm()
            .title('Would you like to delete this author?')
            .textContent('are you sure you want to delete the author ' +
                author.firstName + ' ' + author.lastName + "? \n\r"+
                ' note that all books related to this author will be removed')
            .ariaLabel('Delete')
            .targetEvent($event)
            .ok('Delete!')
            .cancel('Cancel');
        $mdDialog.show(confirm).then(function () {
            AuthorService.deleteAuthor(author._id).then(function (status) {
                if (status) {
                    loadAuthors();
                }
            });
        });
    }

    $scope.searchAuthor = function (authorSearch) {
        loadAuthors(authorSearch);
    }
});


management.controller("AuthorDialogController", function ($scope,$q,$mdDialog, AuthorService, title, author, action) {

    $scope.title = title;
    $scope.author = angular.copy(author);
    $scope.countries = [];
    $scope.action = action;

    AuthorService.getAllCountries().
    success(function(data) {
        $scope.countries = data.RestResponse.result;
    });

    $scope.querySearch = function (query) {
        var results = query ? $scope.countries.filter( createFilterFor(query) ) :
            $scope.countries, deferred;
            return results;
    }

    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(country) {
            return (angular.lowercase(country.name).indexOf(lowercaseQuery) === 0);
        };
    }

    if (action == 'add') {
        $scope.manipulateAuthor = function (author) {
            author.country = author.country.name;
            AuthorService.addAuthor(author, function (data) {
                if (data.errmsg) {
                    $scope.errorMsg = data.errmsg;
                } else {
                    $mdDialog.hide(true);
                }
            })
        }
    } else if(action == 'update'){
        $scope.manipulateAuthor = function (author) {
            author.country = author.country.name;
            AuthorService.updateAuthor(author, function (data) {
                if (data.errmsg) {
                    $scope.errorMsg = data.errmsg;
                } else {
                    $mdDialog.hide(true);
                }
            })
        }
    }
    else if (action =='details'){
        $scope.map = { center: { latitude: 32, longitude: 40 }, zoom: 15 };
        $scope.marker = {
            id: 1};
        var geocoder = new google.maps.Geocoder();
            geocoder.geocode( { 'address':author.address }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                debugger;
                $scope.map.center.latitude = results[0].geometry.location.lat();
                $scope.map.center.longitude = results[0].geometry.location.lng();
                $scope.marker.coords = $scope.map.center;
            }
        });
    }

    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.errorMsg = "";
});


management.controller("BooksCtrl", function ($scope, BookService, AuthorService, $mdDialog) {

    $scope.books = [];

    //TODO: service!!
    $scope.authors = [];

    AuthorService.getAuthors(function(authors) {
        $scope.authors = authors;
    });

    $scope.querySearch = function (query) {
        var results = query ? $scope.authors.filter( createFilterFor(query) ) :
            $scope.authors, deferred;
        return results;
    }

    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(author) {
            return ((angular.lowercase(author.firstName).indexOf(lowercaseQuery) === 0) ||
            (angular.lowercase(author.lastName).indexOf(lowercaseQuery) === 0));
        };
    }

    function loadBooks(filter) {
        if (!filter) {
            BookService.getBooks(function (books) {
                $scope.books = books;
            });
        }
        else{
            if(filter.author){
                filter.authorId = filter.author._id;
            }
            BookService.search(filter, function (books) {
                $scope.books = books;
            });
        }
    }
    loadBooks();

    $scope.details = function ($event, book) {
        $mdDialog.show({
                targetEvent: $event,
                controller: "BookAdminDialogController",
                clickOutsideToClose: true,
                templateUrl: 'views/bookAdminDialog.tmpl.html',
                locals: {title: "Book Details", book: book, action:'details'},
                bindToController: true
            });
    }

    $scope.showAdd = function ($event) {
        $mdDialog.show({
                targetEvent: $event,
                controller: "BookAdminDialogController",
                clickOutsideToClose: true,
                templateUrl: 'views/bookAdminDialog.tmpl.html',
                locals: {title: "Add New Book", book: {}, action:'add'},
                bindToController: true
            })
            .then(function (answer) {
                if (answer) {
                    loadBooks();
                }
            });
    };

    $scope.editBook = function ($event, book) {
        $mdDialog.show({
                targetEvent: $event,
                controller: "BookAdminDialogController",
                clickOutsideToClose: true,
                templateUrl: 'views/bookAdminDialog.tmpl.html',
                locals: {title: "Update Book", book: book, action: 'update'},
                bindToController: true
            })
            .then(function (answer) {
                if (answer) {
                    loadBooks();
                }
            });
    }

    $scope.deleteBook = function ($event, book) {
        var confirm = $mdDialog.confirm()
            .title('Would you like to delete the book?')
            .textContent('are you sure you want to delete the book ' +
                book.title + ' by ' + book.author.firstName + ' ' + book.author.lastName + '?')
            .ariaLabel('Delete')
            .targetEvent($event)
            .ok('Delete!')
            .cancel('Cancel');
        $mdDialog.show(confirm).then(function () {
            BookService.deleteBook(book._id).then(function (status) {
                if (status) {
                    loadBooks();
                }
            });
        });
    }
    
    $scope.searchBook = function (bookSearch) {
        loadBooks(bookSearch);
    }
});


management.controller("BookAdminDialogController", function ($scope,$window, $mdDialog, AuthorService, BookService, title, book, action) {

    $scope.title = title;
    $scope.book = angular.copy(book);
    $scope.authors = [];
    $scope.action =action;

    AuthorService.getAuthors(function(authors) {
        $scope.authors = authors;
    });

    $scope.querySearch = function (query) {
        var results = query ? $scope.authors.filter( createFilterFor(query) ) :
            $scope.authors, deferred;
        return results;
    }
    $scope.goToAuthors = function (){
        $window.location.href = "#/authors"
        $mdDialog.hide(true);
    }

    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(author) {
            return ((angular.lowercase(author.firstName).indexOf(lowercaseQuery) === 0) ||
            (angular.lowercase(author.lastName).indexOf(lowercaseQuery) === 0));
        };
    }

    if (action == 'add') {
        $scope.manipulateBook = function (book) {
            BookService.addBook(book, function (data) {
                if (data.errmsg) {
                    $scope.errorMsg = data.errmsg;
                } else {
                    $mdDialog.hide(true);
                }
            })
        }
    } else if(action == 'update'){
        $scope.manipulateBook = function (book) {
            BookService.updateBook(book, function (data) {
                if (data.errmsg) {
                    $scope.errorMsg = data.errmsg;
                } else {
                    $mdDialog.hide(true);
                }
            })
        }
    }

    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.errorMsg = "";
});


management.factory("BookService", function ($http) {
        var serviceBase = '/api/',
            booksFactory = {};

        booksFactory.getBooks = function (callback) {
            return $http.get(serviceBase + 'books').then(function (response) {
                callback(response.data);
            });
        };
        booksFactory.addBook = function (book, callback) {
            return $http.post(serviceBase + 'addBook', book).then(function (response) {
                callback(response.data);
            });
        };
        booksFactory.updateBook = function (book, callback) {
            return $http.post(serviceBase + 'updateBook/' + book._id, book).then(function (response) {
                callback(response.data);
            });
        };

        booksFactory.getBook = function (id, callback) {
            return $http.get(serviceBase + 'getBook/' + id).then(function (response) {
                callback(response.data);
            });
        }

        booksFactory.deleteBook = function (id) {
            // $mdDialog.confirm();
            return $http.delete(serviceBase + 'deleteBook/' + id).then(function (response) {
                return response.data.status;
            });
        };

        booksFactory.search = function (bookFilters, callback) {
            return $http.get(serviceBase + 'searchBooks/', {params: bookFilters}).then(function (response) {
                callback(response.data);
            });
        }

        return booksFactory;

    }
);



management.factory("AuthorService", function ($http) {
    var serviceBase = '/api/',
        authorsFactory = {};

    authorsFactory.getAllCountries = function () {
        return $http.get('http://services.groupkt.com/country/get/all');
    }

    authorsFactory.getAuthors = function (callback) {
        return $http.get(serviceBase + 'authors').then(function (response) {
            callback(response.data);
        });
    };
    authorsFactory.addAuthor = function (author, callback) {
        return $http.post(serviceBase + 'addAuthor', author).then(function (response) {
            callback(response.data);
        });
    };
    authorsFactory.updateAuthor = function (author, callback) {
        return $http.post(serviceBase + 'updateAuthor/' + author._id, author).then(function (response) {
            callback(response.data);
        });
    };

    authorsFactory.getAuthor = function (id, callback) {
        return $http.get(serviceBase + 'getAuthor/' + id).then(function (response) {
            callback(response.data);
        });
    }

    authorsFactory.deleteAuthor = function (id) {
        // $mdDialog.confirm();
        return $http.delete(serviceBase + 'deleteAuthor/' + id).then(function (response) {
            return response.data.status;
        });
    };

    authorsFactory.search = function (authorFilters, callback) {
        return $http.get(serviceBase + 'searchAuthors/', {params: authorFilters}).then(function (response) {
            callback(response.data);
        });
    }

    return authorsFactory;

}
);

