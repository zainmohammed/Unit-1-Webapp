EzDeliveryApp.factory('agentLoginService', [
    '$http', 'api', function ($http, api) {

        loginObj = {};

        loginObj.loginagent = function (UserName, Password) {
            var Login;

            Login = $http({ method: "Post", url: api + 'Login/AgentLogin?UserName=' + UserName + '&Password=' + Password }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return Login;
        };


        return loginObj;
    }]);



EzDeliveryApp.controller('AgentLogin', [
    '$scope', '$rootScope', '$location', 'agentLoginService',
    function ($scope, $rootScope, $location, agentLoginService) {
        $scope.login = {};
 
      
        $scope.Login = function (UserName, Password) {
           
            agentLoginService.loginagent(UserName, Password).then(function (result) {

                    if (result.status === 500) {
                        $scope.serverErrorMsgs = [{ "0": result.data.ExceptionMessage }];
                    }
                    else


                        if (result.data.isSuccess) {
                            swal.fire("You are successfully login", "", "success");
                            $location.path('/AgentDashBoard');

                            $scope.agent = result.data.Data;
                            $scope.errorMsgs = "";

                            //$cookies.put("Authcust", "true");
                            //$rootScope.Authcust = $cookies.get("Authcust");


                            //$cookies.put("agentSignin", JSON.stringify($scope.agent));
                            //$rootScope.agentSignin = JSON.parse($cookies.get("agentSignin"));

                          
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
           
        };
    }]);
