
EzDeliveryApp.factory('VendorRegisterService', [
    '$http', 'api', function ($http, api) {

        VendorRegisterobj = {};

        VendorRegisterobj.CreateVendor = function (obj) {
            var vendor;

            vendor = $http({ method: "POST", url: api + 'Agent/CreateVendor', data: obj }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return vendor;
        };

        VendorRegisterobj.GetAllCategory = function (obj) {
            var Category;

            Category = $http({ method: "Get", url: api + 'Lookup/GetAllCategory', data: obj }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return Category;
        };

        return VendorRegisterobj;


    }]);

EzDeliveryApp.controller('VendorRegisterController', ['$scope', '$rootScope', '$location', 'VendorRegisterService', '$routeParams',

    function ($scope, $rootScope, $location, VendorRegisterService, $routeParams) {

        $scope.GetAllCategories = function () {
            VendorRegisterService.GetAllCategory().then(function (result) {
                $scope.Categories = result.data.Data;
            })
        }
        $scope.GetAllCategories();

        $scope.RegisterVendor = function (obj) {


            VendorRegisterService.CreateVendor(obj).then(function (result) {

                if (result.data.isSuccess) {
                    $scope.Vendor = result.data.Data;
                    swal.fire("Succesfully Register", "Success", "success");
                    $location.path("/AgentRegistration");
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
    }]);