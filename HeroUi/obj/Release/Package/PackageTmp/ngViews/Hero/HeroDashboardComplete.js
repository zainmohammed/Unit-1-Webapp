EzHeroApp.factory('heroCompleteservice', [
    '$http', 'api', function ($http, api) {
        heroobj = {};

        heroobj.GetcompleteCustomerOrderListByUserId = function (OrderDriverId) {
            var hero;
            hero = $http({ method: "Get", url: api + 'CustomerOrder/GetcompleteCustomerOrderListByUserId?OrderDriverId=' + OrderDriverId}).
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

EzHeroApp.controller('HeroDashboardComplete', [
    '$scope', '$rootScope', '$location', 'heroCompleteservice', 
    function ($scope, $rootScope, $location, heroCompleteservice) {

        $scope.UserId = $rootScope.HeroSignIn.UserId;

        $scope.GetcompleteCustomerOrderListByUserId = function () {
            heroCompleteservice.GetcompleteCustomerOrderListByUserId($scope.UserId).then(function (result) {
                $scope.AllOrder = result.data.Data;

            })
        }
        $scope.GetcompleteCustomerOrderListByUserId();






        $scope.GetAllAcceptedBid = function () {
            var date = new Date();
            $scope.FromDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
            $scope.UserId = $rootScope.HeroSignIn.UserId;

            heroCompleteservice.GetAllAcceptedBid($scope.FromDate,$scope.UserId,5).then(function (result) {
                $scope.AllAcceptedBid = result.data.Data;
                heroCompleteservice.GetAllAcceptedBid($scope.FromDate, $scope.UserId, 5).then(function (result) {
                    $scope.OnGoingBids = result.data.Data;
                    
                })
            })
        }
        $scope.GetAllAcceptedBid();


        $scope.StartJourney = function (CustomerOrderId) {
            heroCompleteservice.OrderStatusByHero(CustomerOrderId,4).then(function (result) {
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
            heroCompleteservice.OrderStatusByHero(CustomerOrderId, 5).then(function (result) {
                $scope.JourneyEnd = result.data.Data;
                if (result.data.isSuccess) {
                    $scope.GetAllAcceptedBid();
                }
                else {
                    alert(result.data.Message);
                }
            })
        }

      

    }]);
