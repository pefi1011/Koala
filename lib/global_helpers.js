// chech that the userId owns the documents
ownsDocument = function(userId, doc) {
  return doc && doc.userId === userId;
};

round = function(number, decimals) {
  return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

calculateDistance = function(location){
  if (Geolocation.latLng()) {
    var itemLocation = new google.maps.LatLng(location.lat, location.lng);
    var currentLocation = new google.maps.LatLng(Geolocation.latLng().lat, Geolocation.latLng().lng);
    var dist = google.maps.geometry.spherical.computeDistanceBetween (itemLocation, currentLocation) / 1000;
    var distRounded = round(dist, 0);
    if (distRounded < 1) {
      return "< 1";
    }
    return distRounded; 
  } else {
    return null;
  }
};
