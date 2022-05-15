
EzDeliveryApp.factory('CustomerRegisterService', [
    '$http', 'api', function ($http, api) {

        CustomerRegisterobj = {};

        CustomerRegisterobj.CreateCustomer = function (obj) {
            var customer;

            customer = $http({
                method: "POST", url: api + 'Agent/CreateCustomer', data: obj
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return customer;
        };

        CustomerRegisterobj.VerifyMobileNo = function (MobileNo) {
            var verify;

            verify = $http({ method: "POST", url: api + 'Agent/VerifyMobileNo?MobileNo=' + MobileNo }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return verify;
        };

        return CustomerRegisterobj;

    }]);

EzDeliveryApp.controller('CustomerRegisterController', ['$scope', '$rootScope', '$location', 'CustomerRegisterService', '$routeParams', '$window', '$cookies', '$timeout',

    function ($scope, $rootScope, $location, CustomerRegisterService, $routeParams, $window, $cookies, $timeout) {


        $scope.disableRegister = false;

        $scope.CreateCustomer = function (obj) {
            CustomerRegisterService.CreateCustomer(obj).then(function (result) {
                if (result.data.isSuccess) {
                    $scope.Customer = result.data.Data;

                    $cookies.put("AuthCust", true);
                    $rootScope.AuthCust = $cookies.get("AuthCust");


                    $cookies.put("CustomerSignin", JSON.stringify($scope.Customer));
                    $rootScope.CustomerSignin = JSON.parse($cookies.get("CustomerSignin"));

                    //swal.fire("Succesfully Register", "Success", "success");

                    $window.location.href = 'Home';

                } else {
                    $scope.serverErrorMsgs = result.data.Message;
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: $scope.serverErrorMsgs
                    });
                }
            });
        };


        $scope.VerifyMobileNo = function (obj,IsValid) {
            if (IsValid) {
                CustomerRegisterService.VerifyMobileNo(obj.MobileNo).then(function (result) {
                    if (result.data.isSuccess) {
                        $scope.OtpVerify = result.data.Data;
                        var btn = document.getElementById('OtpModelForReg');
                        btn.click();
                    } else {
                        $scope.serverErrorMsgs = result.data.Message;
                    }
                });
            }
        }
        $scope.closePopup = function () {
            $scope.disableRegister = false;

        }
    }]);



