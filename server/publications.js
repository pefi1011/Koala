// Items
// Retuns all existing items
Meteor.publish('items', function(options) {
  return Items.find({}, options);
});

// Returns a Single Item for a given id
Meteor.publish('singleItem', function(id) {
  return id && Items.find(id);
});

// Returns items for given array of item ids
Meteor.publish('interestedItems', function(options, itemIds) {
  return Items.find({_id : { $in: itemIds }}, options);
});

// Returns own items for given user
Meteor.publish('myItems', function(options, currentUserId) {
  return Items.find({userId : currentUserId}, options);
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


Meteor.publish("userProfile",function(userId){
  // try to find the user by username
  var user=Meteor.users.findOne({_id:userId});
  // if we can't find it, mark the subscription as ready and quit
  if(!user){
    this.ready();
    return;
  }
  // if the user we want to display the profile is the currently logged in user...

    // then we return the corresponding full document via a cursor
    return Meteor.users.find(userId);
});
