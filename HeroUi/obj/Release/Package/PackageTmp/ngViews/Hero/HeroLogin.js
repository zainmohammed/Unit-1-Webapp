
EzHeroApp.factory('HeroLoginService', [
    '$http', 'api', function ($http, api) {

        HeroLoginObj = {};


        HeroLoginObj.DeliveryHeroLogin = function (MobileNo) {
            var heroLogin;

            heroLogin = $http({ method: "Post", url: api + 'Login/DeliveryHeroLogin?MobileNo=' + MobileNo  }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return heroLogin;
        };



        return HeroLoginObj;
    }]);

EzHeroApp.controller('heroLoginController', ['$scope', '$rootScope', '$location', 'HeroLoginService', '$routeParams', '$cookies', '$window',

    function ($scope, $rootScope, $location, HeroLoginService, $routeParams, $cookies, $window) {




        $scope.HeroLogin = function (MobileNo, IsValid) {
            if (IsValid) {
                HeroLoginService.DeliveryHeroLogin(MobileNo).then(function (result) {

                    if (result.status === 500) {
                        $scope.serverErrorMsgs = [{ "0": result.data.ExceptionMessage }];
                    }
                    else
                        if (result.data.isSuccess) {
                            swal.fire("You are successfully login", "", "success");

                            $scope.hero = result.data.Data;
                            $scope.errorMsgs = "You are successfully login";
                            $location.path('/HeroDashboard');

                            $cookies.put("AuthCust", "true");
                            $rootScope.AuthCust = $cookies.get("AuthCust");

                            $cookies.put("HeroSignIn", JSON.stringify($scope.hero));
                            $rootScope.HeroSignIn = JSON.parse($cookies.get("HeroSignIn"));
                        }
                        else {
                            $scope.serverErrorMsgs = result.data.Message;
                            swal.fire($scope.serverErrorMsgs);

                        }


                }, function (error) {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: error
                    });

                });
            }

            
        }

    }]);




