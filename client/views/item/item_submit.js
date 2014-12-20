Template.itemSubmit.rendered = function() {
  Session.set('itemPhotos', []);
};

Template.itemSubmit.helpers({

  'showFirstPic': function(){

      return true;
  },

  'showSecondPic': function(){

    var tempPhotos = Session.get('itemPhotos');

    // show second pic, if the first one exists or if the first two pics exist-->
    if(typeof tempPhotos !== 'undefined' && tempPhotos.length >= 1)
      return true;
    else
      return false;

  },

  'showThirdPic': function(){

    var tempPhotos = Session.get('itemPhotos');

    // show second pic, if the first two exist -->
    if(typeof tempPhotos !== 'undefined' && tempPhotos.length >= 2)
      return true;
    else
      return false;

  },

});

Template.itemSubmit.events({

  'submit form': function(e) {
    e.preventDefault();

    // get the data out of form
    var newItem = {
      title: $(e.target).find('[name=title]').val(),
      description: $(e.target).find('[name=description]').val(),
      location: Geolocation.latLng(),
      tearoffs: parseInt($(e.target).find('[name=tearoffs]').val())
    };

    // get photos
    var itemPhotos =  Session.get('itemPhotos');

    // call submitItem method to insert the item
    Meteor.call('submitItem', newItem, itemPhotos, function(error, id){

      // TODO finish error handling
      if (error) {
        return alert(error.reason);

      }
      else {
        // there where no errors, item was saved
        // so go to itemPage to see the item
        Router.go('itemPage', {
          _id: id
        });
      }

    });

    // clear session after submit item
    Session.set('itemPhotos', []);


  },

});
