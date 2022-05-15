EzDeliveryApp.controller('HeaderController', ["$scope", "$rootScope",
    function ($scope, $rootScope) {

    }]

).directive('headerPage', function () {
    return {
        templateUrl: 'ngViews/Directives/Header/Header.html',
        controller: 'HeaderController'
    };
})