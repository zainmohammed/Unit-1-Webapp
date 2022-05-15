EzDeliveryApp.factory('LoginService', [
    '$http', 'api', function ($http, api) {

        loginObj = {};

        loginObj.logiHero = function (UserName, Password) {
            var Login;

            Login = $http({ method: "Post", url: api + 'Login/DeliveryHeroLogin?UserName=' + UserName + '&Password=' + Password }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return Login;
        };


        return loginObj;
    }]);



EzDeliveryApp.controller('HeroLoginController', [
    '$scope', '$rootScope', '$location', 'LoginService',
    function ($scope, $rootScope, $location, LoginService) {
        $scope.login = {};


      



        $scope.Login = function (UserName, Password) {

            LoginService.logiHero(UserName, Password).then(function (result) {

                if (result.status === 500) {
                    $scope.serverErrorMsgs = [{ "0": result.data.ExceptionMessage }];
                }
                else


                    if (result.data.isSuccess) {
                        swal.fire("You are successfully logged in", "", "success");
                        $location.path('/DeliveryHeroDashboard');

                        $scope.Hero = result.data.Data;
                        $scope.errorMsgs = "";
                       
                        //$cookies.put("Authcust", "true");
                        //$rootScope.Authcust = $cookies.get("Authcust");


                        //$cookies.put("agentSignin", JSON.stringify($scope.agent));
                        //$rootScope.agentSignin = JSON.parse($cookies.get("agentSignin"));


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

        };





    }]);
