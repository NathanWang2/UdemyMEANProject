<<<<<<< HEAD
angular.module('meanhotel').controller('loginctrl', loginctrl);

function loginctrl($http, $location, $window, AuthFactory, jwtHelper){
=======
angular.module('meanhotel').controller('LoginCtrl', LoginCtrl);

function LoginCtrl($http, $location, $window, AuthFactory){
>>>>>>> 4e85dc675b60ad56ea5f287d878635c2ffa8acf0
    var vm = this;

    vm.isLoggedIn = function(){
        if (AuthFactory.isLoggedIn){
            return true;
        } else {
            return false;
        }
    };

    vm.login = function(){
        if(vm.username && vm.password){
            var user = {
                username: vm.username,
                password: vm.password
<<<<<<< HEAD
            }
=======
            };
>>>>>>> 4e85dc675b60ad56ea5f287d878635c2ffa8acf0

            $http.post('/api/users/login', user).then(function(response){
                if (response.data.success){
                    $window.sessionStorage.token = response.data.token;
                    AuthFactory.isLoggedIn = true;
<<<<<<< HEAD
                    var token = $window.sessionStorage.token;
                    var decodedToken = jwtHelper.decodeToken(token);
                    vm.loggedInUser = decodedToken.username;
=======
>>>>>>> 4e85dc675b60ad56ea5f287d878635c2ffa8acf0
                }

            }).catch(function(error){
                console.log(error);
            })

        }
    }

    vm.logout = function(){
<<<<<<< HEAD
        AuthFactory.isLoggedIn = false;
        delete $window.sessionStorage.token;
        vm.username='';
        vm.password='';
        $location.path('/');
=======
        
>>>>>>> 4e85dc675b60ad56ea5f287d878635c2ffa8acf0
    }

    vm.isActiveTab = function(url){
        var currentPath = $location.path().split('/')[1];
        return (url === currentPath ? 'active' : '');
    }
}
