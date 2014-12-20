// Items
Meteor.publish('items', function(options) {
  return Items.find({}, options);
});

Meteor.publish('singleItem', function(id) {
  return id && Items.find(id);
});


// Comments
Meteor.publish('comments', function(itemId) {
  return Comments.find({itemId: itemId});
});


// Notifications
Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId});
});

// Photos
Meteor.publish('photos', function(itemId) {
  return Photos.find({itemId: itemId});
});


Meteor.publish("userProfile",function(userId2){
  // try to find the user by username
  var user=Meteor.users.findOne({_id:userId2});
  // if we can't find it, mark the subscription as ready and quit
  if(!user){
    this.ready();
    return;
  }
  // if the user we want to display the profile is the currently logged in user...

    // then we return the corresponding full document via a cursor
    return Meteor.users.find(userId2);
});
