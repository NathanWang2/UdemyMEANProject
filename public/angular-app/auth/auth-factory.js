angular.module('meanhotel').factory('AuthFactory', AuthFactory);
// This is to keep track of whether we are logged in or not.
function AuthFactory(){
    return {
        auth: auth
<<<<<<< HEAD
    }
    var auth = {
        isLoggedIn: false
    }
=======
    };
    var auth = {
        isLoggedIn: false
    };
>>>>>>> 4e85dc675b60ad56ea5f287d878635c2ffa8acf0
}
