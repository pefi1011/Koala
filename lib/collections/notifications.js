Notifications = new Meteor.Collection('notifications');

Notifications.allow({
  update: function(userId, doc, fieldNames) {
    return ownsDocument(userId, doc) &&
      fieldNames.length === 1 && fieldNames[0] === 'read';
  }
});

createCommentNotification = function(comment) {
  var item = Items.findOne(comment.itemId);
  if (comment.userId !== item.userId) {
    Notifications.insert({
      userId: item.userId,
      itemId: item._id,
      commentId: comment._id,
      commenterName: comment.author,
      read: false
    });
  }
};

createTearOffNotification = function(username, itemId) {
  var item = Items.findOne(itemId);
  //TODO

  Notifications.insert({
    userId: item.userId,
    itemId: item._id,
    commentId: 11111,
    commenterName: username,
    read: false
  });

};
