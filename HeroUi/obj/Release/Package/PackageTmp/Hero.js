

var EzHeroApp = angular.module('EzHeroApp', ['ngRoute', 'moment-picker', 'ngCookies', 'angularUtils.directives.dirPagination']);

EzHeroApp.run(function ($rootScope, $cookies, $http, $location) {
    if ($location.$$path != "/HeroLogin") {
        if ($cookies.get("AuthCust") === null || $cookies.get("AuthCust") === undefined) {
            $cookies.put("AuthCust", "false");
        }

        $rootScope.AuthCust = $cookies.get("AuthCust");
        if ($rootScope.AuthCust === 'false') {
            $location.path('/HeroLogin');
        }
    }

    if ($rootScope.AuthCust === "true") {
        if ($cookies.get("HeroSignIn") != null || $cookies.get("HeroSignIn") != undefined) {
            $rootScope.HeroSignIn = JSON.parse($cookies.get("HeroSignIn"));
        }
        //else if ($cookies.get("HeroSignIn") != null || $cookies.get("HeroSignIn") != undefined) {
        //    $rootScope.HeroSignIn = JSON.parse($cookies.get("HeroSignIn"));

        //}
    }
    $http.defaults.headers.common['APICODE'] = "123456789";

});

EzHeroApp.directive("fileread", [
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

EzHeroApp.factory('myHttpInterceptor', function ($q, $window) {
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

EzHeroApp.config(function ($routeProvider, $httpProvider, $locationProvider) {
    $httpProvider.interceptors.push('myHttpInterceptor');
    $routeProvider.when('/HeroLogin', { templateUrl: 'ngViews/Hero/HeroLogin.html', controller: 'heroLoginController' });
    $routeProvider.when('/HeroDashboard', { templateUrl: 'ngViews/Hero/HeroDashboard.html', controller: 'heroController' });
    $routeProvider.when('/HeroDashboardComplate', { templateUrl: 'ngViews/Hero/HeroDashboardComplete.html', controller: 'HeroDashboardComplete' });
    $routeProvider.when('/OrderDetails/:CustomerOrderId', { templateUrl: 'ngViews/Hero/OrderDetails.html', controller: 'OrderDetailsController' });
    $routeProvider.when('/RejectedList', { templateUrl: 'ngViews/Hero/RejectedList.html', controller:'RejetedController' });



    $routeProvider.when('/Logout', {
        resolve: {
            auth: function ($rootScope, $location, $cookies) {

                $cookies.put("AuthCust", "false");
                $rootScope.AuthCust = $cookies.get("AuthCust");

                $cookies.put("HeroSignIn", null);
                $rootScope.HeroSignIn = $cookies.get("HeroSignIn");
                $location.path('/HeroLogin');
            }
        }
    });












    $routeProvider.otherwise({
        redirectTo: '/HeroLogin', resolve: {
            auth: function ($rootScope, $location, $cookies) {

            }
        }
    });








    $locationProvider.html5Mode(true);
});
EzHeroApp.directive('loading', ['$http', function ($http) {
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

EzHeroApp.constant("api", "http://localhost:51108/api/");
EzHeroApp.constant("filePath", "http://localhost:51108");


//EzHeroApp.constant("api", "http://148.72.206.224:2002/api/");
//EzHeroApp.constant("filePath", "http://148.72.206.224:4003");

//EzHeroApp.constant("api", "http://82.223.19.233:1001/api/");
//EzHeroApp.constant("filePath", "http://82.223.19.233:1001");
