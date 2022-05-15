
EzDeliveryApp.factory('CustomerOrderService', [
    '$http', 'api', function ($http, api) {

        customerOrderObj = {};

        customerOrderObj.GetAllCategory = function () {
            var category;
            category = $http({ method: 'Get', url: api + 'Lookup/GetAllCategory' }).
                then(function (response) {

                    return response;

                }, function (error) {

                    return error;

                });
            return category;
        };

        customerOrderObj.CreateOrder = function (obj) {
            var order;
            order = $http({
                method: 'Post', url: api + 'CustomerOrder/CreateOrder', data: obj
            }).
                then(function (response) {

                    return response;

                }, function (error) {

                    return error;

                });
            return order;
        };



        return customerOrderObj;
    }]);

EzDeliveryApp.controller('CustomerOrderController', ['$scope', '$rootScope', '$location', 'CustomerOrderService', '$routeParams', '$window',

    function ($scope, $rootScope, $location, CustomerOrderService, $routeParams, $window) {

        $scope.CustomerId = $rootScope.CustomerSignin.CustomerId;
        $scope.FromNumber = $rootScope.CustomerSignin.MobileNo;

        $scope.uploadme = null;

        var lat = null;
        var lng = null;
        var map = null;
        var geocoder = null;
        var markerP = null;
        var markerD = null;
        var myListener = null;
        var directionsDisplay = null;
        var directionsService = null;

        $scope.latP = 0;
        $scope.longP = 0;
        $scope.latD = 0;
        $scope.longD = 0;

        $scope.objGvtId = {
            Documents: "",
            FilePath: "",
            FileType: ""
        };

        //$scope.$watch('ProductPic', function (upload) {
        //    if (upload !== undefined) {
        //        if (upload === null) {
        //            return;
        //        }
        //        var file = upload.split(';')[0];
        //        var filetype = file.split('/')[1];
        //        if (filetype === "png" || filetype === "jpeg") {
        //            var obj = "";
        //        }

        //    }
        //}, true);



        $scope.$watch('ProductPic', function (upload) {
            if (upload !== undefined) {
                if (upload === null) {
                    return;
                }
                var file = upload.split(';')[0];
                var filetype = file.split('/')[1];
                if (filetype === "png" || filetype === "jpeg" || filetype === "jpg" || filetype === "pdf") {

                    var document = JSON.stringify(upload);

                    $scope.objGvtId = {
                        Documents: document,
                        FilePath: upload,
                        FileType: filetype
                    };
                }
                else {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: "Can only accept .png or .jpeg or .pdf files"
                    });
                }
            }
        }, true);






        $scope.CreateOrder = function (obj) {
        

                if ($scope.ProductPic === null || $scope.ProductPic === '' || $scope.ProductPic === undefined) {
                    obj.ProductPic = null;
                }
                else {
                    obj.ProductPic = $scope.ProductPic;
                }
            
        }

        $scope.GetAllCategory = function () {
            CustomerOrderService.GetAllCategory().then(function (result) {
                $scope.Category = result.data.Data;

            })
        }
        $scope.GetAllCategory();





        $scope.CreateCustomerOrder = function (IsValid) {
            if (IsValid) {

                $scope.CustOrder = {

                    CustomerOrder: {
                        "PickupPoint": $scope.PickupPoint,
                        "DeliveryPoint": $scope.DeliveryPoint,
                        "ProductPic": $scope.ProductPic,
                        "ValueOfGood": $scope.ValueOfGood,
                        "Weight": $scope.Weight,
                        "Size": $scope.Size,
                        "OrderDetailVoice": $scope.OrderDetailVoice,
                        "OrderDetailText": $scope.OrderDetailText,
                        "CategoryId": $scope.CategoryId,
                        "CustomerId": $scope.CustomerId,
                        "FromNumber": $scope.FromNumber,
                        "ToNumber": $scope.ToNumber,
                        "LandMark": $scope.LandMark
                    },

                    PickupPoint:
                    {
                        "Lat": $scope.latP,
                        "Long": $scope.longP,
                        "StreetName": $scope.StreetName,
                        "AreaName": $scope.AreaName,
                        "Zipcode": $scope.Zipcode,
                        "Address": $scope.PickupPoint,
                        "CustomerId": $scope.CustomerId
                    },

                    DeliveryPoint:
                    {
                        "Lat": $scope.latD,
                        "Long": $scope.longD,
                        "StreetName": $scope.StreetName,
                        "AreaName": $scope.AreaName,
                        "Zipcode": $scope.Zipcode,
                        "Address": $scope.DeliveryPoint,
                        "CustomerId": $scope.CustomerId
                    }
                };
            }

                console.log($scope.CustOrder);
                CustomerOrderService.CreateOrder($scope.CustOrder).then(function (result) {

                    if (result.data.isSuccess) {
                        //$scope.customerOrderDetails = result.data.Data;
                        //swal.fire("Order Created  Succesfully", "Sucess", "success");

                        $scope.customerOrderDetails = result.data.Data;
                        swal.fire("Order Created  Succesfully", "", "success");
                        $location.path('/OrderDetails/' + $scope.customerOrderDetails.CustomerOrderId);
                       

                    } else {
                        $scope.serverErrorMsgs = result.data.Message;
                        Swal.fire({
                            type: 'error',
                            title: 'Please Enter Valid...',
                            //text: $scope.serverErrorMsgs
                        });
                    }
                });
            
        }
        //Google map code start

        var defaultBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(17.38714, 78.49168),
            new google.maps.LatLng(17.4399, 78.4983)
        )

        var options = {
            bounds: defaultBounds
        }

        google.maps.event.addDomListener(window, 'load', function () {
            var places = new google.maps.places.Autocomplete(document.getElementById('gmap'), options);
            google.maps.event.addListener(places, 'place_changed', function () {
                var place = places.getPlace();
                $scope.pickupaddress = place.formatted_address;

            });
        });
        $scope.getPickupAddress = function () {
            var places = new google.maps.places.Autocomplete(document.getElementById('gmap'), options);
            google.maps.event.addListener(places, 'place_changed', function () {
                var place = places.getPlace();
                console.log(place);
                $scope.PickupPoint = place.formatted_address;

                codeAddress();
                map.setZoom(12);
                return false;
            });
        }

        $scope.getDestinationAddress = function () {
            var places = new google.maps.places.Autocomplete(document.getElementById('Dmap'), options);
            google.maps.event.addListener(places, 'place_changed', function () {
                var place = places.getPlace();
                console.log(place);
                $scope.DeliveryPoint = place.formatted_address;

                destAddress();
                map.setZoom(12);
                return false;

            });
        }


        $scope.initMap = function () {
            geocoder = new google.maps.Geocoder();
            var latLng = new google.maps.LatLng(17.3850, 78.4867);
            var myOptions = {
                center: latLng,
                zoom: 3,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(document.getElementById("map"), myOptions);
            markerP = new google.maps.Marker({
                map: map,
                draggable: true
            });
            markerD = new google.maps.Marker({
                map: map,
                draggable: true
            });
            google.maps.event.addListener(markerP, 'dragend', function () {
                map.setZoom(12);
            });
            google.maps.event.addListener(markerD, 'dragend', function () {
                map.setZoom(12);
            });


            directionsDisplay = new google.maps.DirectionsRenderer;
            directionsService = new google.maps.DirectionsService;

        }

        function updatePosition(latLng) {
            var latlng = new google.maps.LatLng(latLng.lat(), latLng.lng());
            $scope.latP = latLng.lat();
            $scope.longP = latLng.lng();
            var geocoder = geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        $scope.googlemapaddress = results[1].formatted_address;
                        document.getElementById("gmap").value = results[1].formatted_address;
                        //calculateAndDisplayRoute(directionsService, directionsDisplay);
                    }
                }
            });
        }

        function updatePositionDest(latLng) {
            var latlng = new google.maps.LatLng(latLng.lat(), latLng.lng());
            $scope.latD = latLng.lat();
            $scope.longD = latLng.lng();
            var geocoder = geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        $scope.googlemapaddress = results[1].formatted_address;
                        document.getElementById("Dmap").value = results[1].formatted_address;
                        //calculateAndDisplayRoute(directionsService, directionsDisplay);
                    }
                }
            });
        }

        function codeAddress() {
            var address = document.getElementById("gmap").value;
            geocoder.geocode({
                'address': address
            }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location);
                    markerP.setPosition(results[0].geometry.location);
                    updatePosition(results[0].geometry.location);

                    google.maps.event.addListener(markerP, 'dragend', function () {
                        updatePosition(markerP.getPosition());
                    });
                }
            });
        }

        function destAddress() {
            var Daddress = document.getElementById("Dmap").value;
            geocoder.geocode({
                'address': Daddress
            }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location);
                    markerD.setPosition(results[0].geometry.location);
                    updatePositionDest(results[0].geometry.location);

                    google.maps.event.addListener(markerD, 'dragend', function () {
                        updatePositionDest(markerD.getPosition());
                    });
                }
            });
        }

        $scope.initMap();



        function calculateAndDisplayRoute(directionsService, directionsDisplay) {
            debugger;
            if ($scope.latP == 0) {
                return;
            }
            if ($scope.latD == 0) {
                return;
            }
            directionsService.route({
                origin: { lat: $scope.latP, lng: $scope.longP },  // Haight.
                destination: { lat: $scope.latD, lng: $scope.longD },  // Ocean Beach.
                // Note that Javascript allows us to access the constant
                // using square brackets and a string value as its
                // "property."
                travelMode: google.maps.TravelMode["DRIVING"]
            }, function (response, status) {
                if (status == 'OK') {
                    directionsDisplay.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
        }

         // Google map code end
         // Google map code end





    }]);

