EzHeroApp.factory('RejetedService', [
    '$http', 'api', function ($http, api) {
        RejetedObj = {};
        RejetedObj.GetRejectedList = function (OrderDate, HeroId, Status) {
            var RejectedList;

            RejectedList = $http({ method: "Get", url: api + 'CustomerOrder/GetRejectedList?OrderDate=' + OrderDate + "&HeroId=" + HeroId + "&Status=" + Status }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return RejectedList;
        };


        return RejetedObj;
    }]);

EzHeroApp.controller('RejetedController', [
    '$scope', '$rootScope', '$location', 'RejetedService',
    function ($scope, $rootScope, $location, RejetedService) {

        $scope.UserId = $rootScope.HeroSignIn.UserId;

        $scope.GetRejectedList = function () {
            var date = new Date();
            $scope.FromDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
            RejetedService.GetRejectedList($scope.FromDate, $scope.UserId,1).then(function (result) {
                $scope.GetRejectedList = result.data.Data;
                RejetedService.GetRejectedList($scope.FromDate, $scope.UserId,1).then(function (result) {
                    $scope.RejetedBids = result.data.Data;


                })
            })
        }

        $scope.GetRejectedList();

    }]);
