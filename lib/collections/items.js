Items = new Meteor.Collection('items');

Items.allow({
  update: function(userId, item) {return ownsDocument(userId, item); },
  remove: function(userId, item) {return ownsDocument(userId, item); }
});

Items.deny({
  update: function( userId, item, fieldNames) {
    // may only edit the follwing two fields:
    return (_.without(fieldNames, 'description', 'title', 'location', 'itemPhotos').length > 0);
  }
});

Meteor.methods({
  submitItem: function(itemAttributes) {

    // ensure the iser is logged in
    var user = Meteor.user();
    if (!user){
      throw new Meteor.Error(401, "You need to login to item new stories");
    }

    // ensure the item has a title
    if (!itemAttributes.title) {
      throw new Meteor.Error(422, 'Please fill in a headline');
    }

    // pick out the whitelisted keys
    var item = _.extend(_.pick(itemAttributes, 'description', 'location', 'tearoffs', 'itemPhotos'), {
      title: itemAttributes.title,
      userId: user._id,
      author: user.username,
      submitted: new Date().getTime(),
      commentsCount: 0
    });

    var itemId = Items.insert(item);

    return itemId;
  }
});
