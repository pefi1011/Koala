Template.itemEntry.helpers({
  ownItem: function() {
    return this.userId == Meteor.userId();
  },
  // description: function() {
  //   var a = document.createElement('a');
  //   a.href = this.url;
  //   return a.hostname;
  // }

  itemPhoto1: function() {
    var photos = this.itemPhotos;
    if (photos && photos[0]){
      return photos[0];
    }
    return null;
  }
  
});
