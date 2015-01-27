Notifications = new Meteor.Collection('notifications');

Notifications.allow({
  update: function(userId, doc, fieldNames) {
    return ownsDocument(userId, doc) &&
      fieldNames.length === 1 && fieldNames[0] === 'read';
  }
});

createCommentNotification = function(comment) {

  var item = Items.findOne(comment.itemId);
 debugger
  if (comment.userId !== item.userId) {
    Notifications.insert({
      userId: item.userId,
      itemId: item._id,
      commentId: comment._id,
      commenterName: comment.author,
      read: false,
      type: 'comment',
      itemTitle: item.title
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
    read: false,
    type: 'interest',
    itemTitle: item.title,
    // TODO Quickfix
    created: new Date().getTime()
  });

};

sendNotification = function(user, item, comment){

  // if comment param is not passed, its interest notification
  if(typeof comment === "undefined"){


    createTearOffNotification(user.username, item._id);

    // send a push notification to item's owner to inform him
    // that x user has torn off a flyer at its y item
    var tearOffPushMsg = user.profile.first_name + ' ' + user.profile.last_name + ' interessiert sich.';

    Push.send({
      from: 'Koala', // I dunno where user sees this information
      title: item.title +' - Interesse geäußert',
      text: tearOffPushMsg,
      createdBy:  '<SERVER>',
      query: {
        userId: item.userId // msg goes to item's owner
      },
      payload: { pushType: 'interest', itemId: item._id}
    });

  }
  else {
    // comment param is passed, so notify user that someone commented his item

      createCommentNotification(comment);

      // send a push notification to item's owner to inform him
      // that x user has comment its y item
      var commentPushMsg = user.profile.first_name + ' ' + user.profile.last_name + ' kommentierte ' + item.title;

      Push.send({
        from: 'Koala', // I dunno where user sees this information
        title: 'Neuer Kommentar',
        text: commentPushMsg,
        createdBy:  '<SERVER>',
        query: {
          userId: item.userId // msg goes to item's owner
        },
        payload: { pushType: 'comment', itemId: item._id}
      });

  }
};
