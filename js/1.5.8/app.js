var app = angular.module("outChem", ['ngRoute']);
app.config(['$routeProvider',function($routeProvider) {
    $routeProvider.
   when('/register', {
        templateUrl : 'signupOpt.html'
    }).
	 when('/buyerRegistration', {
        templateUrl : 'buyerRegistration.html'
    }).
	when('/contrctrRegister', {
        templateUrl : 'contrctrRegister.html'
    }).
    otherwise({
		templateUrl: 'login.html'
	});
}]);

app.run(['$rootScope','$location', '$routeParams', function($rootScope, $location, $routeParams) {
    $rootScope.$on('$routeChangeSuccess', function(e, current, pre) {
      console.log('Current route name: ' + $location.path());
      console.log($routeParams);
    });
}]);

app.controller('TabController', ['$scope', function($scope) {
    $scope.tab = 1;
    $scope.setTab = function(newTab){
      $scope.tab = newTab;
    };
    $scope.isSet = function(tabNum){
      return $scope.tab === tabNum;
    };
}]);

