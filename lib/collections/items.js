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
      throw new Meteor.Error(422, 'Gebe bitte den Titel an.');
    }

    // ensure the item has location
    if (!itemAttributes.location) {
      throw new Meteor.Error(422, 'Der Artikelstandort ist obligatorisch. Mache dein GPS an und lasse den Standort bestimmen.');
    }

    // ensure the item has at least on picture
    if (itemPhotos[0] === undefined) {
      throw new Meteor.Error(422, 'Mindestend ein Foto ist obligatorisch. Bitte schieße ein Foto oder wähle ein Foto aus deiner Galerie aus.');
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
      interestedUsers: new Array(itemAttributes.tearoffs)
    });

    var itemId = Items.insert(item);

    // saves item's photos into database
    insertItemPhotos(itemId,itemPhotos);

    return itemId;
  },

  tearoffItem: function(itemId, tearoffStripIndex) {
    // ensure the user is logged in
    var user = Meteor.user();
    if (!user){
      throw new Meteor.Error(401, "Melde dich an um Zettel abzureißen.");
    }

    var item = Items.findOne({_id: itemId});

    // Get the current interessted users
    var currentInterestedUsers = item.interestedUsers;

    // Check if the user has already torn off the item

    for (var i = 0; i<= currentInterestedUsers.length; i++) {
      var userObject = currentInterestedUsers[i];
      if (userObject !== null && userObject !== undefined && userObject._id == user._id) {
        throw Meteor.Error(601, "Du hast schon einen Zettel abgerissen!");
      }
    }

    // Check if the user is the one who posted the item
    if (item.userId === user._id){
      throw Meteor.Error(602, "Du hast diesen Artikel erstellt!");
    }

    currentInterestedUsers[tearoffStripIndex] = {_id:user._id,username:user.username};

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

    var currentInterestedItems = user.profile.interestedItems;
    currentInterestedItems = (currentInterestedItems) ? currentInterestedItems : [];
    currentInterestedItems.push(itemId);
    // Add the item to the current user array of interestedItems
    Meteor.users.update(user._id,
      {
        $set: {'profile.interestedItems': currentInterestedItems}
      },
      function(error){
      if(error){
        throw Meteor.Error(501, error.reason);
      }
    });

    // send push msg and regular notification
    sendNotification(user, item);

  }

});
