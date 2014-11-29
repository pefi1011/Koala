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
  item: function(itemAttributes) {
    var user = Meteor.user();
    // itemWithSameLink = Items.findOne({url: itemAttributes.url});

    // ensure the iser is logged in
    if (!user){
      throw new Meteor.Error(401, "You need to login to item new stories");
    }

    // ensure the item has a title
    if (!itemAttributes.title) {
      throw new Meteor.Error(422, 'Please fill in a headline');
    }

    // check that there are no previous items with the same link
    // if (!itemAttributes.url && itemWithSameLink){
    //   throw new Meteor.Error(302, "The link has already been itemed", itemWithSameLink._id);
    // }

    // pick out the whitelisted keys
    var item = _.extend(_.pick(itemAttributes, 'description', 'location', 'tearoffs', 'itemPhotos'), {
      title: itemAttributes.title,
      userId: user._id,
      author: user.username,
      submitted: new Date().getTime()
    });

    var itemId = Items.insert(item);

    return itemId;
  }
});
