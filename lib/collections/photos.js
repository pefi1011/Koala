Photos = new Meteor.Collection('photos');


insertItemPhotos = function(itemId, itemPhotos){

  check(itemId,String);
  check(itemPhotos,Array);

  // insert each pic into database
  for(i=0;i<3;++i){

    // check if photo exists
    // maybe the user uploaded only one pic instead of 3
    if(itemPhotos[i]){

      Photos.insert({
          itemId: itemId,
          position: i,
          data: itemPhotos[i]
      });

    }
  }
};
