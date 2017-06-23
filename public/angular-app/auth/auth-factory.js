angular.module('meanhotel').factory('AuthFactory', AuthFactory);
// This is to keep track of whether we are logged in or not.
function AuthFactory(){
    return {
        auth: auth
    };
    var auth = {
        isLoggedIn: false
    };
}
