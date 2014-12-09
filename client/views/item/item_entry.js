Template.itemEntry.helpers({
  ownItem: function() {
    return this.userId == Meteor.userId();
  },

  distance: function(){
    var dist = google.maps.geometry.spherical.computeDistanceBetween (this.location, Geolocation.latLng());
    debugger
    return dist;
  }

});
