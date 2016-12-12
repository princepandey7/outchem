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

app.controller('AdminCtrl', function($scope, myPageCtx, $http) {
  myPageCtx.headerUrl = 'admin-header.html';
  myPageCtx.footerUrl = 'admin-footer.html';

  $scope.person1 = {};
  $scope.person2 = {};
  $scope.person3 = {};

  $scope.submitData = function (person, resultVarName)
  {
    var config = {
      params: {
        person: person
      }
    };

    console.log(person);


    $http.post("http://staging.outchem.com/api/v1/contactus", null, config)
      .then(function (data, status, headers, config)
      {
        console.log(data);
        // $scope[resultVarName] = data;
      })
      .catch(function (data, status, headers, config)
      {
        $scope[resultVarName] = "SUBMIT ERROR";
      });
  };
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




app.controller('appController', ['$scope', function ($scope) {
    $scope.starRating1 = 4;
    $scope.starRating2 = 5;
    $scope.starRating3 = 2;
    $scope.hoverRating1 = $scope.hoverRating2 = $scope.hoverRating3 = 0;

    $scope.click1 = function (param) {
        console.log('Click(' + param + ')');
    };

    $scope.mouseHover1 = function (param) {
        console.log('mouseHover(' + param + ')');
        $scope.hoverRating1 = param;
    };

    $scope.mouseLeave1 = function (param) {
        console.log('mouseLeave(' + param + ')');
        $scope.hoverRating1 = param + '*';
    };

    $scope.click3 = function (param) {
        console.log('Click');
    };

    $scope.mouseHover3 = function (param) {
        console.log('mouseHover(' + param + ')');
        $scope.hoverRating3 = param;
    };

    $scope.mouseLeave3 = function (param) {
        console.log('mouseLeave(' + param + ')');
        $scope.hoverRating3 = param + '*';
    };
}]);

app.directive('starRating', function () {
    return {
        scope: {
            rating: '=',
            maxRating: '@',
            readOnly: '@',
            click: "&",
            mouseHover: "&",
            mouseLeave: "&"
        },
        restrict: 'EA',
        template:
            "<div style='display: inline-block; margin: 0px; padding: 0px; cursor:pointer;' ng-repeat='idx in maxRatings track by $index'> \
                    <img ng-src='{{((hoverValue + _rating) <= $index) && \"http://www.codeproject.com/script/ratings/images/star-empty-lg.png\" || \"http://www.codeproject.com/script/ratings/images/star-fill-lg.png\"}}' \
                    ng-Click='isolatedClick($index + 1)' \
                    ng-mouseenter='isolatedMouseHover($index + 1)' \
                    ng-mouseleave='isolatedMouseLeave($index + 1)'></img> \
            </div>",
        compile: function (element, attrs) {
            if (!attrs.maxRating || (Number(attrs.maxRating) <= 0)) {
                attrs.maxRating = '5';
            };
        },
        controller: function ($scope, $element, $attrs) {
            $scope.maxRatings = [];

            for (var i = 1; i <= $scope.maxRating; i++) {
                $scope.maxRatings.push({});
            };

            $scope._rating = $scope.rating;
            
            $scope.isolatedClick = function (param) {
                if ($scope.readOnly == 'true') return;

                $scope.rating = $scope._rating = param;
                $scope.hoverValue = 0;
                $scope.click({
                    param: param
                });
            };

            $scope.isolatedMouseHover = function (param) {
                if ($scope.readOnly == 'true') return;

                $scope._rating = 0;
                $scope.hoverValue = param;
                $scope.mouseHover({
                    param: param
                });
            };

            $scope.isolatedMouseLeave = function (param) {
                if ($scope.readOnly == 'true') return;

                $scope._rating = $scope.rating;
                $scope.hoverValue = 0;
                $scope.mouseLeave({
                    param: param
                });
            };
        }
    };
});




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

app.controller('Tab1Controller', ['$scope', function($scope) {
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


app.controller('dropdownCtrl', ['$scope','CustomerService', function($scope, CustomerService) {
  
  $scope.customer ={
    Name:'', 
    Country:'', 
    State: '', 
    City: ''
  };
  
  $scope.countries = CustomerService.getCountry();
    
  $scope.getCountryStates = function(){
    $scope.sates = CustomerService.getCountryState($scope.customer.Country);
    $scope.cities =[];
  }
  
  $scope.getStateCities = function(){
    debugger;
     $scope.cities = CustomerService.getStateCity($scope.customer.State);
  }
  


  $scope.submitBuyerData = function (person, resultVarName, $http)
  {
    var config = {
      params: {
        person: person
      }
    };
    console.log(person);
    $http.post("http://staging.outchem.com/api/v1/buyerinformation", null, config)
      .then(function (data, status, headers, config)
      {
        console.log(data);
        // $scope[resultVarName] = data;
      })
      .catch(function (data, status, headers, config)
      {
        $scope[resultVarName] = "SUBMIT ERROR";
      });
  };
 
}]);

app.factory("CustomerService", ['$filter', function($filter){
 var service = {};
  
  
  var countrylist = [
            { "id": 1, "country": "USA" },
            { "id": 2, "country": "Canada" },
            { "id": 3, "country": "India" },
    ];
  
  var statelist = [
    {"Id":1, "state":"Alaska", "countryId": 1},
    {"Id":2, "state":"California", "countryId": 1},
    {"Id":3, "state":"New York", "countryId": 1},
    {"Id":4, "state":"New Brunswick", "countryId": 2},
    {"Id":5, "state":"Manitoba", "countryId": 2},
    {"Id":6, "state":"Delhi", "countryId": 3},
    {"Id":7, "state":"Bombay", "countryId": 3},
    {"Id":8, "state":"Calcutta", "countryId": 3}
  ];
  
  var citylist = [
    {"Id":1, "city":"Anchorage", "stateId": 1},
    {"Id":2, "city":"Fairbanks", "stateId": 1},
    {"Id":3, "city":"Lakes", "stateId": 1},
    {"Id":4, "city":"Palmer", "stateId": 1},
    {"Id":5, "city":"Adelanto", "stateId": 2},
    {"Id":6, "city":"Artesia", "stateId": 2},
    {"Id":7, "city":"Benicia", "stateId": 2},
    {"Id":8, "city":"Clovis", "stateId": 2},
    {"Id":9, "city":"Dublin", "stateId": 2},
    {"Id":10, "city":"Manhattan", "stateId": 3},
    {"Id":11, "city":"Bronx", "stateId": 3},
    {"Id":12, "city":"Brooklyn", "stateId": 3},
    {"Id":13, "city":"Queens", "stateId": 3},
    {"Id":14, "city":"Staten Island", "stateId": 3},
    {"Id":15, "city":"Bathurst", "stateId": 4},
    {"Id":16, "city":"Campbellton", "stateId": 4},
    {"Id":17, "city":"Dieppe", "stateId": 4},
    {"Id":18, "city":"Edmundston", "stateId": 4},
    {"Id":19, "city":"Fredericton", "stateId": 4},
    {"Id":20, "city":"Miramichi", "stateId": 4},
    {"Id":21, "city":"Moncton", "stateId": 4},
    {"Id":22, "city":"Brandon", "stateId": 5},
    {"Id":23, "city":"Dauphin", "stateId": 5},
    {"Id":24, "city":"Flin Flon", "stateId": 5},
    {"Id":25, "city":"Morden", "stateId": 5},
    {"Id":26, "city":"Portage la Prairie", "stateId": 5},
    {"Id":27, "city":"Selkirk", "stateId": 5},
    {"Id":28, "city":"Steinbach", "stateId": 5},
    {"Id":29, "city":"Thompson", "stateId": 5},
    {"Id":30, "city":"Winkler", "stateId": 5},
    {"Id":31, "city":"South Delhi", "stateId": 6},
    {"Id":32, "city":"North Delhi", "stateId": 6},
    {"Id":33, "city":"East Delhi", "stateId": 6},
    {"Id":34, "city":"West Delhi", "stateId": 6},
    {"Id":35, "city":"Old Delhi", "stateId": 6},
    {"Id":36, "city":"New Delhi", "stateId": 6},
    {"Id":37, "city":"Yamuna Paar", "stateId": 6},
    {"Id":38, "city":"Chembur", "stateId": 7},
    {"Id":39, "city":"Borivali West", "stateId": 7},
    {"Id":40, "city":"Ghatkopar West", "stateId": 7},
    {"Id":41, "city":"Juhu", "stateId": 7},
    {"Id":42, "city":"Mira Road", "stateId": 7},
    {"Id":43, "city":"Powai", "stateId": 7},
    {"Id":44, "city":"Virar West", "stateId": 7},
    {"Id":45, "city":"Rajarhat", "stateId": 8},
    {"Id":46, "city":"Park Street", "stateId": 8},
    {"Id":47, "city":"Golpark", "stateId": 8},
    {"Id":48, "city":"Chandan Nagar", "stateId": 8}
];
  
  service.getCountry = function(){    
    return countrylist;
  };
  
  service.getCountryState = function(countryId){
    var states = ($filter('filter')(statelist, {countryId: countryId}));
    return states;
  };
  
  
  service.getStateCity = function(stateId){    
   
    var items = ($filter('filter')(citylist, {stateId: stateId}));      
    return items;
  };
  
  return service;
  
  
}]);





app.controller('buyerProfileController', ['$scope','CustomerService', function($scope, CustomerService) {
  $scope.submitBuyerData = function (person, resultVarName, $http)
  {
    var config = {
      params: {
        person: person
      }
    };
    console.log(person);
    $http.post("http://staging.outchem.com/api/v1/buyerinformation", null, config)
      .then(function (data, status, headers, config)
      {
        console.log(data);
        // $scope[resultVarName] = data;
      })
      .catch(function (data, status, headers, config)
      {
        $scope[resultVarName] = "SUBMIT ERROR";
      });
  };
 
}]);