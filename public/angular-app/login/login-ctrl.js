angular.module('meanhotel').controller('LoginCtrl', LoginCtrl);

function LoginCtrl($http, $location, $window, AuthFactory){
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
            };

            $http.post('/api/users/login', user).then(function(response){
                if (response.data.success){
                    $window.sessionStorage.token = response.data.token;
                    AuthFactory.isLoggedIn = true;
                }

            }).catch(function(error){
                console.log(error);
            })

        }
    }

    vm.logout = function(){
        
    }

    vm.isActiveTab = function(url){
        var currentPath = $location.path().split('/')[1];
        return (url === currentPath ? 'active' : '');
    }
}
