Template.itemEntry.helpers({
  ownItem: function() {
    return this.userId == Meteor.userId();
  },

  itemPhoto1: function() {
    // var photos = this.itemPhotos;
    // if (photos && photos[0]){
    //   return photos[0];
    // }
    // return null;

    var photo = Pictures.findOne().data;
    return photo;

  }

});
