angular.module('meanhotel').directive('meanhotelnav', meanhotelnav);

function meanhotelnav(){
    return {
        restrict: 'E',
        templateUrl: 'angular-app/navigation-directive/navigation-directive.html'
    };
}
