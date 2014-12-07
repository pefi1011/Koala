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

    return Comments.insert(comment);
  }
});
