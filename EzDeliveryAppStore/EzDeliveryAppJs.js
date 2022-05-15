var EzDeliveryApp = angular.module('EzDeliveryApp', ['ngRoute', 'moment-picker', 'ngCookies', 'angularUtils.directives.dirPagination']);



EzDeliveryApp.run(function ($rootScope, $cookies, $http, $location) {
    if ($location.$$path != "/HeroLogin") {
        if ($cookies.get("AuthCust") === null || $cookies.get("AuthCust") === undefined) {
            $cookies.put("AuthCust", "false");
        }

    $rootScope.AuthCust = $cookies.get("AuthCust");
    if ($rootScope.AuthCust === 'false') {
        $location.path('/Home');
    }
}

    if ($rootScope.AuthCust === "true") {
        if ($cookies.get("CustomerSignin") != null || $cookies.get("CustomerSignin") != undefined) {
            $rootScope.CustomerSignin = JSON.parse($cookies.get("CustomerSignin"));
        }
        //else if ($cookies.get("HeroSignIn") != null || $cookies.get("HeroSignIn") != undefined) {
        //    $rootScope.HeroSignIn = JSON.parse($cookies.get("HeroSignIn"));
           
        //}
    }
    $http.defaults.headers.common['APICODE'] = "123456789";
    
});

EzDeliveryApp.directive('loading', ['$http', function ($http) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };
            scope.$watch(scope.isLoading, function (value) {
                if (value) {
                    element.removeClass('ng-hide');
                } else {
                    element.addClass('ng-hide');
                }
            });
        }
    };
}]);

EzDeliveryApp.directive("fileread", [
    function () {
        return {
            scope: {
                fileread: "="
            },
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            scope.fileread = loadEvent.target.result;
                        });
                    };
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        };
    }
]);

EzDeliveryApp.factory('myHttpInterceptor', function ($q, $window) {
    return {
        response: function (response) {
            return response;
        },
        responseError: function (response) {
            if (response.status === 500) {
                $window.alert(response.statusText);
            }
            return $q.reject(response);
        }
    };
});

EzDeliveryApp.config(function ($routeProvider, $httpProvider, $locationProvider) {
    $httpProvider.interceptors.push('myHttpInterceptor');
    $routeProvider.when('/Login', { templateUrl: 'ngViews/Login/Login.html', controller: 'AgentController' });
    $routeProvider.when('/AgentRegistration', { templateUrl: 'ngViews/AgentRegister/AgentRegistration.html', controller: 'AgentRegisterController' });
    $routeProvider.when('/CustomerRegister', { templateUrl: 'ngViews/CustomerRegister/CustomerRegistration.html', controller: 'CustomerRegisterController'});
    $routeProvider.when('/VendorRegistration', { templateUrl: 'ngViews/VendorRegistor/VendorRegistration.html', controller: 'VendorRegisterController' });
    $routeProvider.when('/AgentLogin', { templateUrl: 'ngViews/Login/AgentLogin.html', controller:'AgentLogin' });
    $routeProvider.when('/HeroLogin', { templateUrl: 'ngViews/Hero/HeroLogin.html', controller: 'heroLoginController'  });
    $routeProvider.when('/Login', { templateUrl: 'ngViews/Login/CustomerLogin.html', controller: 'CustomerLoginController' });
    $routeProvider.when('/Home', { templateUrl: 'ngViews/CustomerRegister/CustomerHome.html', controller: 'CustomerRegisterController' });
    $routeProvider.when('/Order', { templateUrl: 'ngViews/CustomerOrder/CustomerOrder.html', controller: 'CustomerOrderController' });
    $routeProvider.when('/DriverBidsOrder', { templateUrl: 'ngViews/Bids/DriverBids.html', controller: 'CustOrderDriverBidsController' });
    $routeProvider.when('/MyOrder', { templateUrl: 'ngViews/CustomerOrder/MyOrders.html', controller: 'myOrderController' });
    $routeProvider.when('/OrderDetails/:CustomerOrderId', { templateUrl: 'ngViews/CustomerOrder/OrderDetails.html', controller: 'CustomerDetailsController' });
    $routeProvider.when('/OrderAccept/:CustomerOrderId', { templateUrl: 'ngViews/CustomerOrder/OrderTracking.html', controller: 'OrderTracking'});

    $routeProvider.when('/Bids', { templateUrl: 'ngViews/Bids/DriverBids.html'});


    $routeProvider.when('/Logout', {
       
        resolve: {
            auth: function ($rootScope, $location, $cookies) {
                $cookies.put("AuthCust", "false");
                $rootScope.AuthCust = $cookies.get("AuthCust");

                $cookies.put("CustomerSignin", null);
                $rootScope.CustomerSignin = $cookies.get("CustomerSignin");
                $location.path('/Home');
            }
        }
    });
    








   
    $routeProvider.otherwise({
        redirectTo: '/Home', resolve: {
            auth: function ($rootScope, $location, $cookies) {
              
            }
        }
    });

   

  




    $locationProvider.html5Mode(true);
});


EzDeliveryApp.constant("api", "http://localhost:51108/api/");
EzDeliveryApp.constant("filePath", "http://localhost:51108");






//EzDeliveryApp.constant("api", "http://82.223.19.233:1001/api/");
//EzDeliveryApp.constant("filePath", "http://82.223.19.233:1001");