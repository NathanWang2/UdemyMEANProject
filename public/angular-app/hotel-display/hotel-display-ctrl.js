angular.module('meanhotel')
.controller('HotelDisplayCtrl', HotelDisplayCtrl);

function HotelDisplayCtrl(hotelDataFactory, $routeParams){
    var vm = this;
    var id = $routeParams.id
    hotelDataFactory.hotelDisplay(id).then(function(response){
        vm.hotel = response;
        vm.stars = _getStarRating(response.stars);
    })

    function _getStarRating (stars){
        return new Array(stars);
    }
}
