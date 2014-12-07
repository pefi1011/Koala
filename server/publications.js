Meteor.publish('items', function() {
  return Items.find();
});

Meteor.publish('comments', function(itemId) {
  return Comments.find({itemId: itemId});
});

Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId});
});

Meteor.publish('pictures', function() {
  return Pictures.find();
});
