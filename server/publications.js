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
