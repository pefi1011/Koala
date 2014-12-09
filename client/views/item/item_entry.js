Template.itemEntry.helpers({
  ownItem: function() {
    return this.userId == Meteor.userId();
  },

  distance: function(){
    var itemLocation = new google.maps.LatLng(this.location.lat, this.location.lng);
    var currentLocation = new google.maps.LatLng(Geolocation.latLng().lat, Geolocation.latLng().lng);
    var dist = google.maps.geometry.spherical.computeDistanceBetween (itemLocation, currentLocation) / 1000;
    var distRounded = round(dist, 0)
    debugger
    if (distRounded < 1) {
      return "< 1";
    }
    return distRounded;

  }

});
