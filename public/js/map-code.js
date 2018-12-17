var map, infoWindow;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 13
  });
  infoWindow = new google.maps.InfoWindow;

  //Try HTML5 geolocation
  if (navigator.geolocation) {
  	navigator.geolocation.getCurrentPosition(function(position) {
  		var pos = {
  			lat: position.coords.latitude,
  			lng: position.coords.longitude
  		};

  		infoWindow.setPosition(pos);
  		infoWindow.setContent('Você está aqui.');
  		infoWindow.open(map);
  		map.setCenter(pos);
  	}, function() {
  		handleLocationError(true, infoWindow, map.getCenter());
  	});
  } else {
  	// Browser doesn't support Geolocation
  	handleLocationError(false, infoWindow, map.getCenter());
  }

  map.addListener('click', function(e) {
    placeMarker(e.latLng, map);
  });
  
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
		                    'Error: The Geolocation service failed.' :
		                    'Error: Your browser does\'t support geolocation.');
	infoWindow.open(map);
}

function placeMarker(position, map) {
  var marker = new google.maps.Marker({
    position: position,
    map: map
  });

  var infowindow = new google.maps.InfoWindow({
    content: '<div>Hello world!</div>'
  })

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  })

  // Make AJAX to save the point to Database
  map.panTo(position);
}