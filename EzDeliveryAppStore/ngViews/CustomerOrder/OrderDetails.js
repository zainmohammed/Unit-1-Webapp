
EzDeliveryApp.factory('CustOrderDetailsService', [
    '$http', 'api', function ($http, api) {

        TopBids = {};

        TopBids.GetTopBidsByDrivers = function (CustomerOrderId) {
            var TopBidsList;
            TopBidsList = $http({ method: 'Get', url: api + 'CustomerOrder/GetTopBidsByDrivers?CustomerOrderId=' + CustomerOrderId}).
                then(function (response) {

                    return response;

                }, function (error) {

                    return error;

                });
            return TopBidsList;
        };

        TopBids.CustomerOrderDetails = function (CustomerOrderId) {
            var orderDetails;
            orderDetails = $http({ method: 'Get', url: api + 'CustomerOrder/GetCustomerOrderDetails?CustomerOrderId=' + CustomerOrderId }).
                then(function (response) {

                    return response;

                }, function (error) {

                    return error;

                });
            return orderDetails;
        };


        TopBids.CustomerAcceptsBid = function (CustomerOrderId, OrderDriverId) {
            var orderDetails;
            orderDetails = $http({ method: 'Post', url: api + 'CustomerOrder/CustomerAcceptsBid?CustomerOrderId=' + CustomerOrderId + "&OrderDriverId=" + OrderDriverId  }).
                then(function (response) {

                    return response;

                }, function (error) {

                    return error;

                });
            return orderDetails;
        };

        TopBids.CustomerRejectBid = function (CustomerOrderId, OrderDriverId) {
            var RejectBids;
            RejectBids = $http({ method: 'Post', url: api + 'CustomerOrder/CustomerRejectBid?CustomerOrderId=' + CustomerOrderId + "&OrderDriverId=" + OrderDriverId }).
                then(function (response) {

                    return response;

                }, function (error) {

                    return error;

                });
            return RejectBids;
        };


        TopBids.OrderStatusByHero = function (CustomerOrderId, OrderStatus) {
            var hero;

            hero = $http({ method: "Get", url: api + 'CustomerOrder/OrderStatusByHero?CustomerOrderId=' + CustomerOrderId + "&OrderStatus=" + OrderStatus }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return hero;
        };

        return TopBids;
    }]);


EzDeliveryApp.controller('CustomerDetailsController', ['$scope', '$rootScope', '$location', 'CustOrderDetailsService', '$routeParams', '$window', '$cookies',

    function ($scope, $rootScope, $location, CustOrderDetailsService, $routeParams, $window, $cookies) {

        $scope.CustomerOrderId = $routeParams.CustomerOrderId;

        $scope.CustomerId = $rootScope.CustomerSignin.CustomerId


        //$rootScope.CustomerSignin = JSON.parse($cookies.get("CustomerSignin"));
        //$scope.CustomerId = $rootScope.CustomerSignin.CustomerId;
        //$scope.BranchId = $rootScope.CustomerSignin.BranchId;


        $scope.GetTopBidsByDrivers = function () {
            CustOrderDetailsService.GetTopBidsByDrivers($scope.CustomerOrderId).then(function (result) {
                $scope.TopBidsLst = result.data.Data;
            })
        }
        $scope.GetTopBidsByDrivers();

        $scope.CustomerOrderDetails = function () {
            CustOrderDetailsService.CustomerOrderDetails($scope.CustomerOrderId).then(function (result) {
                $scope.CustomerDetails = result.data.Data;
            })
        }
        $scope.CustomerOrderDetails();

        $scope.CustomerAcceptsBid = function (CustomerOrderId, OrderDriverId) {
            CustOrderDetailsService.CustomerAcceptsBid(CustomerOrderId, OrderDriverId).then(function (result) {
                if (result.status === 500) {
                    $scope.serverErrorMsgs = [{ "0": result.data.ExceptionMessage }];
                }
                else
                    if (result.data.isSuccess) {

                        $scope.OrderDetail = result.data.Data;
                        swal.fire("Bid Accepted  Succesfully", "", "success");
                      
                        $location.path('/OrderDetails/' + $scope.OrderDetail.CustomerOrderId);
                      
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

        $scope.CustomerRejectBid = function (CustomerOrderId, OrderDriverId) {
            CustOrderDetailsService.CustomerRejectBid(CustomerOrderId, OrderDriverId).then(function (result) {
                if (result.status === 500) {
                    $scope.serverErrorMsgs = [{ "0": result.data.ExceptionMessage }];
                }
                else
                    if (result.data.isSuccess) {

                        swal.fire("Bid Rejeted  Succesfully", "", "success");
                        $window.location.href = 'MyOrder';
                        
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





    }]);