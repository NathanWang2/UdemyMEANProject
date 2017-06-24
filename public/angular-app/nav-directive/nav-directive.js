angular.module('meanhotel').directive('meanNav', meanNav);

function meanNav() {
  return {
    restrict: 'E',
    templateUrl: 'angular-app/nav-directive/nav-directive.html'
  };
}
