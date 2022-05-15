//EzDeliveryApp.factory('heroservice', [
//    '$http', 'api', function ($http, api) {
//        heroobj = {};

//        heroobj.DriverRegister = function (obj) {
//            var hero;

//            hero = $http({ method: "POST", url: api + 'Agent/CreateDeliveryHero', data: obj }).
//                then(function (response) {
//                    return response;
//                }, function (error) {
//                    return error;
//                });
//            return hero;
//        };



//        return heroobj;
//    }]);

//EzDeliveryApp.controller('heroController', [
//    '$scope', '$rootScope', '$location', 'heroservice', 
//    function ($scope, $rootScope, $location, heroservice) {

//        $scope.$watch('uploadAdhar', function (upload) {
//            if (upload !== undefined) {
//                if (upload === null) {
//                    return;
//                }
//                var file = upload.split(';')[0];
//                var filetype = file.split('/')[1];
//                if (filetype === "png" || filetype === "jpeg") {
//                    var obj = "";
//                }

//            }
//        }, true);

//        $scope.$watch('uploadLicense', function (upload) {
//            if (upload !== undefined) {
//                if (upload === null) {
//                    return;
//                }
//                var file = upload.split(';')[0];
//                var filetype = file.split('/')[1];
//                if (filetype === "png" || filetype === "jpeg") {
//                    var obj = "";
//                }

//            }
//        }, true);

//        $scope.CreateDriver = function (obj) {
           

//                if ($scope.uploadAdhar === null || $scope.uploadAdhar === '' || $scope.uploadAdhar === undefined) {
//                    obj.AdharCard = null;
//                }
//                else {
//                    obj.AdharCard = $scope.uploadAdhar;
//                }

//                if ($scope.uploadLicense === null || $scope.uploadLicense === '' || $scope.uploadLicense === undefined) {
//                    obj.AdharCard = null;
//                }
//                else {
//                    obj.DrivingLicense = $scope.uploadLicense;
//                }

//                heroservice.DriverRegister(obj).then(function (result) {

//                    if (result.data.isSuccess) {
//                        $scope.Driver = result.data.Data;
//                        swal.fire("Succesfully Register", "Success", "success");

//                    } else {
//                        $scope.serverErrorMsgs = result.data.Message;
//                        Swal.fire({
//                            type: 'error',
//                            title: 'Oops...',
//                            text: $scope.serverErrorMsgs
//                        });
//                    }
//                });
            
//        };
//    }]);
