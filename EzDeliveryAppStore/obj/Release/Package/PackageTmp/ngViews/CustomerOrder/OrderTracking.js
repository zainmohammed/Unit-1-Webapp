
EzDeliveryApp.factory('OrderTrackingService', [
    '$http', 'api', function ($http, api) {

        OrderTracking = {};

        OrderTracking.TrackOrderStatus = function (CustomerOrderId) {
            var TopBidsList;
            TopBidsList = $http({ method: 'Get', url: api + 'CustomerOrder/TrackOrderStatus?CustomerOrderId=' + CustomerOrderId}).
                then(function (response) {

                    return response;

                }, function (error) {

                    return error;

                });
            return TopBidsList;
        };

        return OrderTracking;
    }]);


EzDeliveryApp.controller('OrderTracking', ['$scope', '$rootScope', '$location', 'OrderTrackingService', '$routeParams', '$window', '$cookies',

    function ($scope, $rootScope, $location, OrderTrackingService, $routeParams, $window, $cookies) {

        $scope.CustomerOrderId = $routeParams.CustomerOrderId;

        $scope.CustomerId = $rootScope.CustomerSignin.CustomerId

        var totalAmount = localStorage.getItem('countDown') || 0,
            timeloop;

        if (totalAmount) {
            timeSet()
        }

        function timeSet() {
            totalAmount--;
            // Refresh value in localStorage
            localStorage.setItem('countDown', totalAmount);

            // If countdown is over, then remove value from storage and clear timeout
            if (totalAmount < 0) {
                localStorage.removeItem('countDown');
                totalAmount = 0;
                clearTimeout(timeloop);
                return;
            }

            var minutes = parseInt(totalAmount / 60);
            var seconds = parseInt(totalAmount % 60);

            if (seconds < 10)
                seconds = "0" + seconds;

            $('#tminus').val(minutes + ":" + seconds);

            timeloop = setTimeout(timeSet, 1000);
        }

        $('.enterTime').click(function () {
            var reqVal = $('#request').val();
            var parAmt = parseInt(reqVal);

            if (timeloop) {
                clearTimeout(timeloop)
            }

            totalAmount = parAmt * 60;

            $('#request').val(" ");

            timeSet();
        })

        // Clear timeout and remove localStorage value when resetting form
        $('#countdown').on('reset', function () {
            totalAmount = 0;
            clearTimeout(timeloop);
            localStorage.removeItem('countDown');
        })


        $scope.TrackOrderStatus = function (CustomerOrderId) {
            OrderTrackingService.TrackOrderStatus(CustomerOrderId).then(function (result) {
                if (result.status === 500) {
                    $scope.serverErrorMsgs = [{ "0": result.data.ExceptionMessage }];
                }
                else
                    if (result.data.isSuccess) {
                        $scope.CustomerOrder = result.data.Data
                       // $window.location.href = 'OrderAccept' + result.data.CustomerOrderId;

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
        $scope.TrackOrderStatus($scope.CustomerOrderId);
       
    }]);