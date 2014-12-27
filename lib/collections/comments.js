Comments = new Meteor.Collection('comments');

Meteor.methods({
  comment: function(commentAttributes) {
    var user = Meteor.user();
    var item = Items.findOne(commentAttributes.itemId);
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to make comments");

    if (!commentAttributes.body)
      throw new Meteor.Error(422, 'Please write some content');

    if (!commentAttributes.itemId)
      throw new Meteor.Error(422, 'You must comment on an item');

    comment = _.extend(_.pick(commentAttributes, 'itemId', 'body'), {
      userId: user._id,
      author: user.username,
      submitted: new Date().getTime()
    });

    // update the item with the number of comments
    Items.update(comment.itemId, {$inc: {commentsCount: 1}});

    // create the comment, save the id
    comment._id = Comments.insert(comment);

    sendNotification(user,item,comment);

    return comment._id;
  }
});
