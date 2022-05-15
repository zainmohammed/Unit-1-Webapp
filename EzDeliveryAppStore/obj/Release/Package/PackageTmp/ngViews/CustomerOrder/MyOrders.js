
EzDeliveryApp.factory('MyOrderService', [
    '$http', 'api', function ($http, api) {

        myOrder = {};

        myOrder.MyOrders = function (CustomerId) {
            var myorderList;
            myorderList = $http({ method: 'Get', url: api + 'CustomerOrder/MyOrders?CustomerId=' + CustomerId }).
                then(function (response) {

                    return response;

                }, function (error) {

                    return error;

                });
            return myorderList;
        };

        myOrder.CancelOrder = function (CustomerOrderId) {
            var orderCancel;
            orderCancel = $http({ method: 'Get', url: api + 'CustomerOrder/CancelOrder?CustomerOrderId=' + CustomerOrderId }).
                then(function (response) {

                    return response;

                }, function (error) {

                    return error;

                });
            return orderCancel;
        };

        return myOrder;
    }]);


EzDeliveryApp.controller('myOrderController', ['$scope', '$rootScope', '$location', 'MyOrderService', '$routeParams', '$window', '$cookies',

    function ($scope, $rootScope, $location, MyOrderService, $routeParams, $window, $cookies) {
      

        $scope.CustomerId = $routeParams.CustomerId;

        $scope.CustomerId = $rootScope.CustomerSignin.CustomerId


        //$rootScope.CustomerSignin = JSON.parse($cookies.get("CustomerSignin"));
        //$scope.CustomerId = $rootScope.CustomerSignin.CustomerId;
        //$scope.BranchId = $rootScope.CustomerSignin.BranchId;

        $scope.CancelOrder = function (CustomerOrderId) {
            MyOrderService.CancelOrder(CustomerOrderId).then(function (result) {
                $scope.Cancel = result.data.Data;
                    swal.fire("Order Cancel Successfully", "", "success");
                    $scope.MyOrders();
              
            })
        }


        $scope.MyOrders = function () {
            MyOrderService.MyOrders($scope.CustomerId).then(function (result) {
                $scope.myOrderLst = result.data.Data;
                
            })
        }
        $scope.MyOrders();


        $scope.CancelOrderCustomer = function (CustomerOrderId) {
            MyOrderService.CancelOrderCustomer(CustomerOrderId, 7).then(function (result) {
                $scope.ordercancel = result.data.Data;
                if (result.data.isSuccess) {
                    swal.fire("Order Cancel Successfully", "", "success");
                    $scope.CancelOrderCustomer();
                }
                else {
                    alert(result.data.Message);
                }
            })
        }

    }]);