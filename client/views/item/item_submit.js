Template.itemSubmit.rendered = function() {
  Session.set('itemPhotos', []);
};

Template.itemSubmit.helpers({

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

  },

});
