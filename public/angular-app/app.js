angular.module('meanhotel', ['ngRoute'])
    .config(config);

function config($routeProvider){
    $routeProvider
        .when ('/', {
            templateUrl: 'angular-app/hotel-list/hotels.html',
            controller: HotelsCtrl,
            controllerAs: 'vm'
        })
        .when('/hotel/:id', {
            templateUrl: 'angular-app/hotel-display/hotel-display.html',
            controller: HotelDisplayCtrl,
            controllerAs: 'vm'
        })
        .when('/register', {
            templateUrl:'angular-app/register/register.html',
            controller: RegisterCtrl,
            controllerAs: 'vm'
        });
}
