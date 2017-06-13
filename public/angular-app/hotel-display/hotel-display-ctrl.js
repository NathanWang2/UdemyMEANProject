angular.module('meanhotel')
.controller('HotelDisplayCtrl', HotelDisplayCtrl);

function HotelDisplayCtrl(hotelDataFactory, $routeParams, $route){
    var vm = this;
    var id = $routeParams.id
    hotelDataFactory.hotelDisplay(id).then(function(response){
        vm.hotel = response;
        vm.stars = _getStarRating(response.stars);
    })

    function _getStarRating (stars){
        return new Array(stars);
    }

    vm.addReview = function(){
        // First collect the data
        var postData = {
            name: vm.name,
            rating: vm.rating,
            review: vm.review
        }

        vm.isSubmitted = false;

        if  (vm.reviewForm.$valid){
            hotelDataFactory.postReview(id, postData).then(function(response){
                if (response.status = 200){
                    // If post is successful, reload the root
                    $route.reload();
                }
            }).catch(function(error){
                console.log(error);
            })
        } else {
            vm.isSubmitted = true;
        }
    }
}
