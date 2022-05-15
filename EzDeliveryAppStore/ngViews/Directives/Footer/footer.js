
EzDeliveryApp.controller('FooterController', ["$scope", "$rootScope",
    function ($scope, $rootScope) {

    }]

).directive('footerPage', function () {
    return {
        templateUrl: 'ngViews/Directives/footer/footer.html',
        controller: 'FooterController'
    };
})