var app = angular.module("outChem", ['ngRoute']);
app.config(['$routeProvider',function($routeProvider) {
    $routeProvider.

    when('/buyerProfile', {
        templateUrl : 'buyerProfileView.html'
    }).
    when('/contractorProfile', {
        templateUrl : 'contractorProfileMain.html'
    }).
    when('/home1', {
        templateUrl : 'homePage1.html'
    }).
    when('/home2', {
        templateUrl : 'homePage2.html'
    }).
    when('/adminDashboard', {
        templateUrl : 'adminDashboard.html'
    }).
    when('/adminProfile', {
        templateUrl : 'adminProfile.html'
    }).
    when('/companyDashboard', {
        templateUrl : 'companyDashboard.html'
    }).
    // when('/contractorProfileMain', {
    //     templateUrl : 'contractorProfileMain.html'
    // }).

    otherwise({
		templateUrl: 'buyerProfileView.html'
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

