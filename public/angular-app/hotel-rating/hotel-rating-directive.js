// angular.module('meanhotel').directive("hotelRating", hotelRating);
// // hotelRating will become <hotel-rating> in html code
//
// function hotelRating(){
//     return {
//         restrict: 'E',
//         template: '<span ng-repeat="star in vm.stars track by $index" class="glyphicon glyphicon-star">{{star}}</span>',
//         bindToController: true,
//         controller: 'HotelDisplayCtrl',
//         controllerAs: 'vm',
//         scope: { // we are using @ because stars is a number
//             stars : '@'
//         }
//     }
// }
// You can use components as well
angular.module('meanhotel').component("hotelRating", {
    // by default components are restricted by element
    binding: {
        stars: "m"
    },
    template: '<span ng-repeat="star in vm.stars track by $index" class="glyphicon glyphicon-star">{{star}}</span>',
    controller: 'HotelDisplayCtrl',
    controllerAs: 'vm',
});
