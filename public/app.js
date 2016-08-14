var socket = io();
var mainApp = angular
    .module('paradise', ['ngMaterial', 'ngMdIcons', 'ngRoute', 'managementApp','statApp' ,'viewApp','authApp', 'ngAnimate', 'ui.bootstrap'])
    .controller('AppCtrl', function ($scope, $mdSidenav) {
        $scope.menu = [
            {
                link: '#/allBooks',
                title: 'All Books'
            },
            {
                link: '#/top10authors',
                title: 'TOP 10 AUTHORS'
            },
            {
                link: '#/top10books',
                title: 'TOP 10 BOOKS'
            }
        ];
        $scope.admin = [
            {
                link: '#/books',
                title: 'Books'
            },
            {
                link: '#/authors',
                title: 'Authors'
            }
        ];
    });

angular.module('paradise').controller('MainCtrl', function ($scope) {
    $scope.myInterval = 3000;
    var slides = $scope.slides = [{
        image: './content/carousel/1.jpg',
        text: 'Eragon',
        id: 0
    }, {
        image: './content/carousel/2.jpg',
        text: 'Percy Jackson',
        id: 1
    }, {
        image: './content/carousel/3.jpg',
        text: 'The Vampire Academy',
        id: 2
    }];
    $scope.active = slides[0].id;
    });

mainApp.run(function ($window, $rootScope) { //use run rather than config
    $rootScope.session = {};
    $rootScope.session.user = $window.sessionStorage.getItem('username');
});

mainApp.directive("drawing", function(){
    return {
        restrict: "A",
        link: function(scope, element){
            var ctx = element[0].getContext('2d');
            ctx.font = "28px Comic Sans MS";
            ctx.fillStyle = "#C8C8C8";
            ctx.fillText("paradise", 0, 20);
            ctx.restore();
            element.bind('mousedown', function(event){
                if(event.offsetX!==undefined){
                    lastX = event.offsetX;
                    lastY = event.offsetY;
                } else { // Firefox compatibility
                    lastX = event.layerX - event.currentTarget.offsetLeft;
                    lastY = event.layerY - event.currentTarget.offsetTop;
                }

                // begins new line
                ctx.beginPath();

                drawing = true;
            });
            element.bind('mousemove', function(event){
                if(drawing){
                    // get current mouse position
                    if(event.offsetX!==undefined){
                        currentX = event.offsetX;
                        currentY = event.offsetY;
                    } else {
                        currentX = event.layerX - event.currentTarget.offsetLeft;
                        currentY = event.layerY - event.currentTarget.offsetTop;
                    }

                    draw(lastX, lastY, currentX, currentY);

                    // set current coordinates to last one
                    lastX = currentX;
                    lastY = currentY;
                }

            });
            element.bind('mouseup', function(event){
                // stop drawing
                drawing = false;
            });

            // canvas reset
            function reset(){
                element[0].width = element[0].width;
            }

            function draw(lX, lY, cX, cY){
                // line from
                ctx.moveTo(lX,lY);
                // to
                ctx.lineTo(cX,cY);
                // color
                ctx.strokeStyle = "#4bf";
                // draw it
                ctx.stroke();
            }
        }
    };
});

mainApp.config(function ($mdThemingProvider, $routeProvider) {

    $routeProvider.when('/', {
        redirectTo: '/main'
    }).when('/books', {
        templateUrl: 'views/books.html',
        controller: 'BooksCtrl'
    }).when('/authors', {
        templateUrl: 'views/authors.html',
        controller: 'AuthorsCtrl'
    }).when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    }).when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCrtl'
    }).when('/allBooks', {
        templateUrl: 'views/allBooks.html',
        controller: 'ViewCrtl'
    }).when('/top10authors', {
        templateUrl: 'views/top10authors.html',
        controller: 'TopAuthorsCrtl'
    }).when('/top10books', {
        templateUrl: 'views/allBooks.html',
        controller: 'TopBooksCrtl'
    }).otherwise({
        redirectTo: '/'
    });

    var customBlueMap = $mdThemingProvider.extendPalette('light-blue', {
        'contrastDefaultColor': 'light',
        'contrastDarkColors': ['50'],
        '50': 'ffffff'
    });
    $mdThemingProvider.definePalette('customBlue', customBlueMap);
    $mdThemingProvider.theme('default')
        .primaryPalette('customBlue', {
            'default': '500',
            'hue-1': '50'
        })
        .accentPalette('pink');
    $mdThemingProvider.theme('input', 'default')
        .primaryPalette('grey');
});