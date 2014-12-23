Template.itemEntry.helpers({
  ownItem: function() {
    return this.userId == Meteor.userId();
  },

  distance: function(){
    return calculateDistance(this.location);
  }

});
