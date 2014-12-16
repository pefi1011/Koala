Items = new Meteor.Collection('items');

Items.allow({
  // Everyone can update the item. We restrict this in items deny methods
  update: function(userId, item) {
     return true;},//ownsDocument(userId, item); },

  remove: function(userId, item) {return ownsDocument(userId, item); }
});

Items.deny({
  update: function( userId, item, fieldNames) {

    if(ownsDocument(userId, item)){ // when user is owner of the item

      // may only edit the follwing fields:
      return (_.without(fieldNames, 'description', 'title', 'itemPhotos').length > 0);

    } else { // when the user is not owner of the item

      // may only edit the follwing fields:
      return (_.without(fieldNames, 'tearoffs').length > 0);
    }
  }
});

Meteor.methods({
  submitItem: function(itemAttributes, itemPhotos) {

    // ensure the iser is logged in
    var user = Meteor.user();
    if (!user){
      throw new Meteor.Error(401, "Melde dich an um Artikel zu erstellen.");
    }

    // ensure the item has a title
    if (!itemAttributes.title) {
      throw new Meteor.Error(422, 'Please fill in a headline');
    }


    // TODO find out how to create a thumbnail
    // var thumbnail = createThumbnail(itemPhotos[0]);
    // 10 Dec 14 - do we need it at all bc the photos in the database
    // have size of 16KB (pictures taken by nexus 5 and mac book pro 2011 camera)

    // create thumbnail out of first pic
    var thumbnail = itemPhotos[0];


    // pick out the whitelisted keys
    var item = _.extend(
        _.pick(itemAttributes,
          'description', 'location',
          'tearoffs'),
      {
      title: itemAttributes.title,
      userId: user._id,
      author: user.username,
      submitted: new Date().getTime(),
      commentsCount: 0,
      thumbnail: thumbnail,
      interestedUsers: []
    });

    var itemId = Items.insert(item);

    // saves item's photos into database
    insertItemPhotos(itemId,itemPhotos);

    return itemId;
  },

  tearoffItem: function(itemId) {
    // ensure the user is logged in
    var user = Meteor.user();
    if (!user){
      throw new Meteor.Error(401, "Melde dih an um Zettel ebzureissen.");
    }

    var item = Items.findOne({_id: itemId});

    // Get the current interessted users
    var currentInterestedUsers = item.interestedUsers;

    // Check if the user has already torn off the item
    var containsUser = _.contains(currentInterestedUsers, user._id);
    if (containsUser){
      throw Meteor.Error(601, "Du hast schon Zettel abgerissen!");
    }

    // Check if the user is the one who posted the item
    if (item.userId == user._id){
      throw Meteor.Error(602, "Du hast diesen Artikel gepostet!");
    }

    currentInterestedUsers.push(user._id);

    // Update the item - decrease count of tearoff tabs and save the new array of users
    Items.update(itemId,
      {
        $set: {interestedUsers: currentInterestedUsers},
        $inc: {tearoffs: -1}
      },
      function(error){
      if(error){
        throw Meteor.Error(501, error.reason);
      }
    });

    //TODO Improove notifications
    createTearOffNotification(user.username, item._id);
  }

});
