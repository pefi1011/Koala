Meteor.publish('items', function() {
  return Items.find();
});

Meteor.publish('comments', function(itemId) {
  return Comments.find({itemId: itemId});
});
