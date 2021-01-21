
simply.location_map_from = {};
simply.jjCityInit = function(){

  //delhi
  var obj = {};
  obj.lat = 28.599836;
  obj.lng = 77.2246883;
  simply.jjCity['delhi'] = obj; 

  //Gurgaon
  var obj = {};
  obj.lat = 28.467448;
  obj.lng = 77.0796794;
  simply.jjCity['gurgaon'] = obj;

  //Indiranagar
  var obj = {};
  obj.lat = 12.9789002;
  obj.lng = 77.6409756;
  simply.jjCity['indiranagar'] = obj;

  //Koramangala
  var obj = {};
  obj.lat = 12.9351587;
  obj.lng = 77.6220761;
  simply.jjCity['koramangala'] = obj;

  //Vega
  var obj = {};
  obj.lat = 12.9073902;
  obj.lng = 77.598466;
  simply.jjCity['vega'] = obj;
};
simply.checkShortPath = function(from){

  var short = 10000000000;
  var desti = {};
  for(var key in simply.jjCity){
    var distance = simply.getDistanceFromLatLonInKm(from.lat,from.lng,simply.jjCity[key].lat,simply.jjCity[key].lng);
    distance = parseInt(distance);
    if(distance < short ){
      short = distance;
      desti.name = key;
      desti.lat = simply.jjCity[key].lat;
      desti.lng = simply.jjCity[key].lng;
    }
  }
  return desti;
};
simply.getDistanceFromLatLonInKm = function(lat1,lon1,lat2,lon2) {
  var p1 = new google.maps.LatLng(lat1, lon1);
  var p2 = new google.maps.LatLng(lat2, lon2);
  return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
};

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
simply.getClientLocation = function(){
  var msg; 
  if('geolocation' in navigator){
    // geolocation is supported :)
    requestLocation();
  }else{
    // no geolocation :(
    msg = "Sorry, looks like your browser doesn't support geolocation";
    alert(msg);
  }

  function requestLocation(){


    var options = {

      enableHighAccuracy: false,

      timeout: 5000,

      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(success, error, options); 

    function success(pos){
      var lng = pos.coords.longitude;
      var lat = pos.coords.latitude;

      simply.location_map_from.lat = lat;
      simply.location_map_from.lng = lng;
      msg = 'You appear to be at longitude: ' + lng + ' and latitude: ' + lat;
      var desti = simply.checkShortPath(simply.location_map_from);
      simply.initMap(simply.location_map_from,desti);
    }
    function error(err){
      // return the error message
      msg = 'Error: ' + err + ' :(';
//       $.fancybox(msg);
}  
} 

};
simply.calculateAndDisplayRoute = function(directionsService, directionsDisplay,from,desti) {

  directionsService.route({
    origin: {lat:from.lat, lng:from.lng},  // Haight.
    destination: {lat: desti.lat, lng:desti.lng},  // Ocean Beach.

    travelMode: google.maps.TravelMode['DRIVING']
  }, function(response, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
};

simply.initMap = function(from,desti) {
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var directionsService = new google.maps.DirectionsService;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: from.lat, lng: from.lng}
  });

  // Create the autocomplete object, restricting the search
  // to geographical location types.
  autocomplete = new google.maps.places.Autocomplete(
    /** @type {HTMLInputElement} */(document.getElementById('autocompleteLocation')),
    { types: ['geocode'] });
  google.maps.event.addListener(autocomplete, 'place_changed', function () {
    getAddressPlace();
  });
  function getAddressPlace() {
    from.lat = autocomplete.getPlace().geometry.location.lat();
    from.lng = autocomplete.getPlace().geometry.location.lng();
    var newdesti = simply.checkShortPath(from);
    simply.location_map_from = from;
    simply.calculateAndDisplayRoute(directionsService, directionsDisplay,from,newdesti);
  }  

  directionsDisplay.setMap(map);
  simply.calculateAndDisplayRoute(directionsService, directionsDisplay,from,desti);
};
$(document).ready(function(){
  simply.jjCity = {};
  simply.jjCityInit();
//   simply.getClientLocation();

});
$(".find_store").click(function(event) {
  $('html, body').animate({
    scrollTop: $('.product_store_locator').offset().top
  }, 1000);
});     