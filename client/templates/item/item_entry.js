Template.itemEntry.helpers({
  ownItem: function() {
    return this.userId == Meteor.userId();
  },

  distance: function(){
    return calculateDistance(this.location);
  },

  interestedUsersCount : function() {
    var count = 0;
    var x = this;
    for (var i = 0; i < this.interestedUsers.length; i++){
      if(this.interestedUsers[i] === null){
        count++;
      }
    }
    return count;
  }

});
