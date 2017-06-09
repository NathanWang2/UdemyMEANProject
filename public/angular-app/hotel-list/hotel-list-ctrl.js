angular.module('meanhotel')
.controller('HotelsCtrl', HotelsCtrl);

function HotelsCtrl($http){
    var  vm = this;
    $http.get('api/hotels').then(function(response){
        // can add more properties api/hotels?count=10 etc.
        //console.log(response);
        vm.hotels = response.data;
    })
    vm.title = "MEAN hotel app";
}
