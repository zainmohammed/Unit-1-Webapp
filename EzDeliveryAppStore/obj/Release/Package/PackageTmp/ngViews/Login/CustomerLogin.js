
EzDeliveryApp.factory('CustomerLoginService', [
    '$http', 'api', function ($http, api) {

        CustomerLoginobj = {};


        CustomerLoginobj.CustomerLogin = function (MobileNo) {
            var customerlogin;

            customerlogin = $http({ method: "Post", url: api + 'Login/CustomerLogin?MobileNo=' + MobileNo}).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return customerlogin;
        };



        return CustomerLoginobj;
    }]);

EzDeliveryApp.controller('CustomerLoginController', ['$scope', '$rootScope', '$location', 'CustomerLoginService', '$routeParams', '$cookies', '$window',

    function ($scope, $rootScope, $location, CustomerLoginService, $routeParams, $cookies, $window) {


        $scope.CustomerLogin = function (MobileNo, IsValid) {
            if (IsValid) {
                CustomerLoginService.CustomerLogin(MobileNo).then(function (result) {

                    if (result.status === 500) {
                        $scope.serverErrorMsgs = [{ "0": result.data.ExceptionMessage }];
                    }
                    else
                        if (result.data.isSuccess) {
                            swal.fire("You are successfully login", "", "success");

                            $scope.customer = result.data.Data;
                            $location.path('/Order');
                            $scope.errorMsgs = "You are successfully login";
                            $cookies.put("AuthCust", "true");
                            $rootScope.AuthCust = $cookies.get("AuthCust");
                            $cookies.put("CustomerSignin", JSON.stringify($scope.customer));
                            $rootScope.CustomerSignin = JSON.parse($cookies.get("CustomerSignin"));


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




