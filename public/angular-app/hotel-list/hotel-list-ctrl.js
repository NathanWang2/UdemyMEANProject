angular.module('meanhotel')
.controller('HotelsCtrl', HotelsCtrl);

function HotelsCtrl(hotelDataFactory){
    var  vm = this;
    hotelDataFactory.hotelList().then(function(response){
        // can add more properties api/hotels?count=10 etc.
        // console.log(response);
        vm.hotels = response;
    })
    vm.title = "MEAN hotel app";
}
