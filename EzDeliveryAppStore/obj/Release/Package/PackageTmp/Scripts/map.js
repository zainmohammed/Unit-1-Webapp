function initMap() {
    var myLatLng = { lat: 17.398995, lng: 78.424397 };

    var mapMarker = {
        url: "../assets/images/map-marker.png", // url
        scaledSize: new google.maps.Size(50, 50) // scaled size
    };

    var map = new google.maps.Map(document.getElementById('googleMap'), {
        zoom: 15,
        center: myLatLng
    });
    var image = '../assets/images/map-marker.png';
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Corpotate creations',
        icon: mapMarker
    });
}       


var template_params = {
    "reply_to":      "reply_to_value",
    "from_name":     "from_name_value",
    "contactName":   "contactName_value",
    "contactMsg":    "contactMsg_value",
    "contactNumber": "contactNumber_value",
    "contactEmail":  "contactEmail_value",
    "selectedProduct":  "selectedProduct_value"
}

var service_id = "default_service";
var template_id = "template_WbEuaGVk";

        