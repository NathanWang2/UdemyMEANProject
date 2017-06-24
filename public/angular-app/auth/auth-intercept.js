angular.module('meanhotel').factory("AuthInterceptor", AuthInterceptor);

function AuthInterceptor($window, AuthFactory, $q, $location){
    return {
        request: request,
        response: response,
        responseError: responseError
    }

    function request(config){
<<<<<<< HEAD
        config.headers = config.headers || {};
=======
        config.headers = congif.headers || {};
>>>>>>> 4e85dc675b60ad56ea5f287d878635c2ffa8acf0
        if ($window.sessionStorage.token){ // This is to check if there is a token stored
            config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
        }
        return config;
    }

    function response(response){
        if (response.status === 200 && $window.sessionStorage.token
        && !AuthFactory.isLoggedIn){
            AuthFactory.isLoggedIn = true;
        }
        if (response.status === 401){
            AuthFactory.isLoggedIn = false;
        }

        return response || $q.when(response)
    }

    function responseError(rejection){
        if (rejection.status === 401 || rejection.status === 403){
            delete $window.sessionStorage.token;
            AuthFactory.isLoggedIn = false;
            $location.path = ('/');
        }
        return $q.reject(rejection);
    }
}
