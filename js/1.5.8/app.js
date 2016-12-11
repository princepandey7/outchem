var app = angular.module("outChem", ['ngRoute']);

app.provider('myPageCtx', function() {
  
  var defaultCtx = {
    title: 'Default Title',
    headerUrl: 'default-header.html',
    footerUrl: 'default-footer.html'
  };
  
  var currentCtx = angular.copy(defaultCtx);
  return {
    $get: function($rootScope) { 
      $rootScope.$on('$locationChangeStart', function() {
        angular.extend(currentCtx, defaultCtx);
      }); 
      return currentCtx; 
    }
  };
  
});
app.controller('MainCtrl', function($scope, myPageCtx) {
  $scope.pageCtx = myPageCtx;
});

app.controller('AdminCtrl', function($scope, myPageCtx) {
  myPageCtx.headerUrl = 'admin-header.html';
  myPageCtx.footerUrl = 'admin-footer.html';
});

app.controller('ProfilerCtrl', function($scope, myPageCtx) {
  myPageCtx.headerUrl = 'profiler-header.html';
  myPageCtx.footerUrl = 'profiler-footer.html';
});

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


app.controller('topKeywordsController', function($scope){
    $scope.topKeywords = {
       keywords:[
          {keyword_name:'Keyword',categories:'Categories', rank:1,count:1500,price:10},
          {keyword_name:'Keyword',categories:'Categories', rank:1,count:1500,price:10},
          {keyword_name:'Keyword',categories:'Categories', rank:1,count:1500,price:10},
          {keyword_name:'Keyword',categories:'Categories', rank:1,count:1500,price:10},
          {keyword_name:'Keyword',categories:'Categories', rank:1,count:1500,price:10}
       ],
    };
});

app.controller('topCompanyController', function($scope){
    $scope.topCompany = {
       keywords:[
          {keyword_name:'Keyword',categories:'Categories', rank:1},
          {keyword_name:'Keyword',categories:'Categories', rank:1},
          {keyword_name:'Keyword',categories:'Categories', rank:1},
          {keyword_name:'Keyword',categories:'Categories', rank:1},
          {keyword_name:'Keyword',categories:'Categories', rank:1}
       ],
    };
});

app.controller('packageSummaryController', function($scope){
    $scope.packageSummary = {
       packages:[
          {package_name:'Keyword',package:'Package', days:180,location:'Canada'},
          {package_name:'Keyword',package:'Package', days:365,location:'India'},
          {package_name:'Keyword',package:'Package', days:365,location:'France'},
          {package_name:'Keyword',package:'Package', days:180,location:'Netherlands'},
          {package_name:'Keyword',package:'Package', days:120,location:'India'}
       ],
    };
});




app.directive('imageCheckbox', function(myService) {
  return {
    restrict: 'A',
    link: function(scope, el, attr) {
      scope.isSelected = el.find('input').val() == 'false';
      
      myService.getData().then(function(o){
        console.log(o);
        scope.bgCol = o.data[0].type.color;
      });
      el.on('click', function() {
        scope.isSelected = !scope.isSelected;
        if (scope.isSelected) scope.bgCol = '#ccc';
        else scope.bgCol = '#000';
        scope.$apply();
      });
    }
  }
})
