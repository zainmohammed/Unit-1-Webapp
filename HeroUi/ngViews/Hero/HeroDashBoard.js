EzHeroApp.factory('heroservice', [
    '$http', 'api', function ($http, api) {
        heroobj = {};

        heroobj.GetCustomerOrderList = function (HeroId) {
            var hero;

            hero = $http({ method: "Get", url: api + 'CustomerOrder/GetCustomerOrderList?HeroId=' + HeroId}).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return hero;
        };

        heroobj.OrderStatusByHero = function (CustomerOrderId, OrderStatus) {
            var hero;

            hero = $http({ method: "Get", url: api + 'CustomerOrder/OrderStatusByHero?CustomerOrderId=' + CustomerOrderId + "&OrderStatus=" + OrderStatus }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return hero;
        };


        heroobj.GetAllAcceptedBid = function (OrderDate,HeroId, Status ) {
            var hero;

            hero = $http({ method: "Get", url: api + 'CustomerOrder/GetOrdersForHeroByStatus?OrderDate=' + OrderDate + "&HeroId=" + HeroId + "&Status=" + Status }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return hero;
        };


        return heroobj;
    }]);

EzHeroApp.controller('heroController', [
    '$scope', '$rootScope', '$location', 'heroservice', 
    function ($scope, $rootScope, $location, heroservice) {

        $scope.UserId = $rootScope.HeroSignIn.UserId;
        $scope.GetCustomerOrderList = function () {
            heroservice.GetCustomerOrderList($scope.UserId).then(function (result) {
                $scope.AllOrderList = result.data.Data;

            })
        }
        $scope.GetCustomerOrderList();


        $scope.GetAllAcceptedBid = function () {
            var date = new Date();
            $scope.FromDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
            heroservice.GetAllAcceptedBid($scope.FromDate,$scope.UserId,3).then(function (result) {
                $scope.AllAcceptedBid = result.data.Data;
                heroservice.GetAllAcceptedBid($scope.FromDate, $scope.UserId, 4).then(function (result) {
                    $scope.OnGoingBids = result.data.Data;
                    
                })
            })
        }
        $scope.GetAllAcceptedBid();


        $scope.StartJourney = function (CustomerOrderId) {
            heroservice.OrderStatusByHero(CustomerOrderId,4).then(function (result) {
                $scope.JourneyStart = result.data.Data;
                if (result.data.isSuccess) {
                    $scope.GetAllAcceptedBid();
                }
                else {
                    alert(result.data.Message);
                }
            })
        }

        $scope.EndJourney = function (CustomerOrderId) {
            heroservice.OrderStatusByHero(CustomerOrderId, 5).then(function (result) {
                $scope.JourneyEnd = result.data.Data;
                if (result.data.isSuccess) {
                    $location.path('/HeroDashboardComplate');
                }
                else {
                    alert(result.data.Message);
                }
            })
        }






    }]);
