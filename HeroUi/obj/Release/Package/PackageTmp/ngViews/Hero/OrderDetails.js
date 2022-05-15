EzHeroApp.factory('OrderDetailService', [
    '$http', 'api', function ($http, api) {
        orderDetailObj = {};

        orderDetailObj.GetCustomerOrderDetails = function (CustomerOrderId) {
            var OrdersDetails;

            OrdersDetails = $http({ method: "Get", url: api + 'CustomerOrder/GetCustomerOrderDetails?CustomerOrderId=' + CustomerOrderId}).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return OrdersDetails;
        };


        orderDetailObj.DriverBidsOrder = function (obj) {
            var bids;
            bids = $http({ method: 'Post', url: api + 'CustomerOrder/DriverBidsOrder', data: obj  }).
                then(function (response) {

                    return response;

                }, function (error) {

                    return error;

                });
            return bids;
        };



        return orderDetailObj;
    }]);

EzHeroApp.controller('OrderDetailsController', [
    '$scope', '$rootScope', '$location', 'OrderDetailService','$routeParams',
    function ($scope, $rootScope, $location, OrderDetailService, $routeParams) {

        $scope.CustomerOrderId = $routeParams.CustomerOrderId;

        //$scope.UserId = $rootScope.HeroSignIn.UserId


        $scope.GetCustomerOrderDetails = function () {
            OrderDetailService.GetCustomerOrderDetails($scope.CustomerOrderId).then(function (result) {
                $scope.OrderDetails = result.data.Data;

            })
        }
        $scope.GetCustomerOrderDetails();


        //$scope.DriverBidsOrder = function (obj) {
        //    OrderDetailService.DriverBidsOrder(obj).then(function (result) {
        //        $scope.CustOrderDriverBidsList = result.data.Data;
        //    })
        //}
        $scope.DriverBidsOrder = function (OrderDetails) {

            $scope.OrderDetails.DriverId = $rootScope.HeroSignIn.UserId;
            $scope.OrderDetails.OrderDriverId = $rootScope.HeroSignIn.UserId;
            OrderDetailService.DriverBidsOrder($scope.OrderDetails).then(function (result) {

                if (result.data.isSuccess) {
                    
                    $scope.CustomerOrderDetails = result.data.Data;
                    swal.fire("Order Accepted  Succesfully", "", "success");
                    $location.path('/HeroDashboard');
                    //$window.location.reload();

                } else {
                    $scope.serverErrorMsgs = result.data.Message;
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: $scope.serverErrorMsgs
                    });
                }
            });

        }




    }]);
