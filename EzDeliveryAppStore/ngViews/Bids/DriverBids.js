
EzDeliveryApp.factory('CustomerOrderDriverBidsService', [
    '$http', 'api', function ($http, api) {

        DriverBidsOrder = {};

        DriverBidsOrder.DriverBidsOrder = function () {
            var bids;
            bids = $http({ method: 'Get', url: api + 'CustomerOrder/DriverBidsOrder' }).
                then(function (response) {

                    return response;

                }, function (error) {

                    return error;

                });
            return bids;
        };

        return DriverBidsOrder;
    }]);


EzDeliveryApp.controller('CustOrderDriverBidsController', ['$scope', '$rootScope', '$location', 'CustomerOrderDriverBidsService', '$routeParams', '$window',

    function ($scope, $rootScope, $location, CustomerOrderDriverBidsService, $routeParams, $window) {


        $scope.DriverBidsOrder = function () {
            CustomerOrderDriverBidsService.DriverBidsOrder().then(function (result) {
                $scope.CustOrderDriverBidsList = result.data.Data;
            })
        }
        $scope.DriverBidsOrder();
          

    }]);