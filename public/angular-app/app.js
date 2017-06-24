angular.module('meanhotel', ['ngRoute', 'angular-jwt'])
    .config(config).run(run);
// run block is exec after injector is created and used to kickstart app
function config($routeProvider, $httpProvider){
    $httpProvider.interceptors.push('AuthInterceptor');

    $routeProvider
        .when('/', {
            templateUrl: 'angular-app/main/main.html',
<<<<<<< HEAD
            access: {
                restricted: false
            }
=======
>>>>>>> 4e85dc675b60ad56ea5f287d878635c2ffa8acf0
        })
        .when ('/hotels', {
            templateUrl: 'angular-app/hotel-list/hotels.html',
            controller: HotelsCtrl,
            controllerAs: 'vm',
            access: {
                restricted: false
            }
        })
        .when('/hotel/:id', {
            templateUrl: 'angular-app/hotel-display/hotel-display.html',
            controller: HotelDisplayCtrl,
            controllerAs: 'vm',
            access: {
                restricted: false
            }
        })
        .when('/register', {
            templateUrl:'angular-app/register/register.html',
            controller: RegisterCtrl,
<<<<<<< HEAD
            controllerAs: 'vm',
            access: {
                restricted: false
            }
        })
        .when('/profile', {
            templateUrl: 'angular-app/profile/profile.html',
            access: {
                restricted: true
            }
        })
        .otherwise({
            redirectTo: '/'
=======
            controllerAs: 'vm'
        })
        .otherwise({
            redirect: '/'
>>>>>>> 4e85dc675b60ad56ea5f287d878635c2ffa8acf0
        });

}

function run($rootScope, $location, $window, AuthFactory){
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute){
        if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn){
            event.preventDefault();
            $location.path('/');
        };

    })
}
