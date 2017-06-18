angular.module('meanhotel')
.controller('RegisterCtrl', RegisterCtrl);

function RegisterCtrl ($http){
    var vm = this;
    console.log("This is the RegisterCtrl");
    vm.register = function(){
        console.log("We are in the register function");
        var user = {
            username: vm.username,
            password: vm.password
        };

        if (!vm.username || !vm.password){
            vm.error = 'Please Enter a Username and Password';
        } else {
            if (vm.password !== vm.passwordRepeat){
                vm.error = 'Passwords do not match';
            } else{
                $http.post('/api/users/register', user).then(function(result){
                    console.log(result);
                    vm.message = 'Successful Registration';
                    vm.error = '';
                }).catch(function(error){
                    console.log(error);
                });
            }
        }
    }
};
