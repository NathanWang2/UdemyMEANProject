angular.module('meanhotel')
.controller('HotelDisplayCtrl', HotelDisplayCtrl);

function HotelDisplayCtrl(hotelDataFactory, $routeParams){
    var vm = this;
    var id = $routeParams.id
    hotelDataFactory.hotelDisplay(id).then(function(response){
        vm.hotel = response;
    })
}
