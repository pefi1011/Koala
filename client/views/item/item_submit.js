
Template.itemSubmit.rendered = function() {
  Session.set('itemPhotos', []);
};

Template.itemSubmit.events({

  'click .take-photo': function () {
    MeteorCamera.getPicture(function (error, data) {
      // we have a picture
      if (! error) {

        // get array of current pictures
        var tempPhotos = Session.get('itemPhotos');
          tempPhotos.push(data);
          Session.set('itemPhotos', tempPhotos );
      }
    });
  },

  'submit form': function(e) {
    e.preventDefault();

    // get the data out of form
    var newItem = {
      title: $(e.target).find('[name=title]').val(),
      description: $(e.target).find('[name=description]').val(),
      location: $(e.target).find('[name=location]').val(),
      tearoffs: $(e.target).find('[name=tearoffs]').val(),
    };

    // get pictures
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

  'click .delete-photo1': function(e) {
    e.preventDefault();

    if (confirm("Delete this Photo?")) {
      var photosTemp = Session.get('itemPhotos');
      Session.set('itemPhotos', [photosTemp[1], photosTemp[2]]);
    }
  },

  'click .delete-photo2': function(e) {
    e.preventDefault();

    if (confirm("Delete this Photo?")) {
      var photosTemp = Session.get('itemPhotos');
      Session.set('itemPhotos', [photosTemp[0], photosTemp[2]]);
    }
  },

  'click .delete-photo3': function(e) {
    e.preventDefault();

    if (confirm("Delete this Photo?")) {
      var photosTemp = Session.get('itemPhotos');
      Session.set('itemPhotos', [photosTemp[0], photosTemp[1]]);
    }
  }
});

Template.itemSubmit.helpers({

  itemPhoto1: function () {
    var itemPhotos = Session.get("itemPhotos");
    if (itemPhotos && itemPhotos[0]) {
      return itemPhotos[0];
    }
    return null;
  },

  itemPhoto2: function () {
    var itemPhotos = Session.get("itemPhotos");
    if (itemPhotos && itemPhotos[1]) {
      return itemPhotos[1];
    }
    return null;
  },

  itemPhoto3: function () {
    var itemPhotos = Session.get("itemPhotos");
    if (itemPhotos && itemPhotos[2]) {
      return itemPhotos[2];
    }
    return null;
  },

  loc: function () {
    // return 0, 0 if the location isn't ready
    return Geolocation.latLng() || { lat: 35.6894875, lng: 139.69170639999993 };
  },
  error: Geolocation.error
});
