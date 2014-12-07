Meteor.publish('items', function() {
  return Items.find();
});

Meteor.publish('comments', function() {
  return Comments.find();
});
