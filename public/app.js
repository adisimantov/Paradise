var mainApp = angular
    .module('paradise', ['ngMaterial', 'ngMdIcons', 'ngRoute', 'catalogApp'])
    .controller('AppCtrl', function ($scope, $mdSidenav) {
        $scope.toggleSidenav = function () {
            $mdSidenav('sidenav').toggle();
        };
        $scope.menu = [
            {
                link: '#/catalog',
                title: 'Catalog',
                icon: 'dashboard'
            },
            {
                link: '',
                title: 'Friends',
                icon: 'group'
            },
            {
                link: '',
                title: 'Messages',
                icon: 'message'
            }
        ];
        $scope.admin = [
            {
                link: '',
                title: "books",
                icon: ''
            }
        ];
    });

mainApp.config(function ($mdThemingProvider, $routeProvider) {

    $routeProvider.
    when('/catalog', {
        templateUrl: 'bookCatalog.html',
        controller: 'catalogCtrl'
    }).
    otherwise({
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