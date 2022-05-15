
EzDeliveryApp.factory('AgentRegisterService', [
    '$http', 'api', function ($http, api) {

        AgentRegisterobj = {};

        AgentRegisterobj.agentRegister = function (obj) {
            var Agent;

            Agent = $http({ method: "POST", url: api + 'Agent/CreateAgent', data: obj }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return Agent;
        };


        return AgentRegisterobj;


    }]);

EzDeliveryApp.controller('AgentRegisterController', ['$scope', '$rootScope', '$location', 'AgentRegisterService', '$routeParams',
   
    function ($scope, $rootScope, $location, AgentRegisterService, $routeParams) {


        $scope.$watch('uploadme', function (upload) {
            if (upload !== undefined) {
                if (upload === null) {
                    return;
                }
                var file = upload.split(';')[0];
                var filetype = file.split('/')[1];
                if (filetype === "png" || filetype === "jpeg") {
                    var obj = "";
                }

            }
        }, true);

        $scope.CreateAgent = function (obj) {

            if ($scope.uploadme === null || $scope.uploadme === '' || $scope.uploadme === undefined) {
                obj.AdharCard = null;
            }
            else {
                obj.AdharCard = $scope.uploadme;
            }

            AgentRegisterService.agentRegister(obj).then(function (result) {


                if (result.data.isSuccess) {
                    $scope.agent = result.data.Data;
                    if ($rootScope.EzSignin.Roles === "Agent") {
                        $location.path('/AgentDashBoard');
                    }
                    swal.fire("Succesfully Register", "Success", "success");
                   
                } else {

                    $scope.serverErrorMsgs = result.data.Message;
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: $scope.serverErrorMsgs
                    });
                }

            });


        };

       



    }]);