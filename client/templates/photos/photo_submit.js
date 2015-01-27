Template.photoSubmit.helpers({

  photo: function () {

    // get photos out of session
    var itemPhotos = Session.get("itemPhotos");

    // get photo that corresponds to templates param (photoIndex)
    // if photo exists pass it to template, so the template can show it
    if (itemPhotos && itemPhotos[this.photoIndex]) {
      return itemPhotos[this.photoIndex];
    }
    return null;
  },

});

Template.photoSubmit.events({

  'click .take-photo': function (e) {
    e.preventDefault();

    //this.photoIndex is the param that we passed
    //when we inlcuded the photo_submit template
    //in item_submit template
    var photoIndex = this.photoIndex;

    MeteorCamera.getPicture(function (error, data) {
      // we have a picture
      if (! error) {

        // get array of current photos
        var tempPhotos = Session.get('itemPhotos');
        tempPhotos[photoIndex] = data;
        Session.set('itemPhotos', tempPhotos );
      }
    });
  },

  'click .choose-photo': function (e) {
    e.preventDefault();

    //this.photoIndex is the param that we passed
    //when we inlcuded the photo_submit template
    //in item_submit template
    var photoIndex = this.photoIndex;

    MeteorCamera.getPicture(function (error, data) {
      // we have a picture
      if (! error) {

        // get array of current photos
        var tempPhotos = Session.get('itemPhotos');
        tempPhotos[photoIndex] = data;
        Session.set('itemPhotos', tempPhotos );
      } else {
        alert(error);
      }
    });
  },

  'click .retake-photo': function(e) {
    e.preventDefault();

    //this.photoIndex is the param that we passed
    //when we inlcuded the photo_submit template
    //in item_submit template
    var photoIndex = this.photoIndex;

    if (confirm("Wollen Sie das Bild erneut aufnehmen?")) {


      MeteorCamera.getPicture(function (error, data) {
        // we have a picture
        if (! error) {

          // get array of current photos
          var tempPhotos = Session.get('itemPhotos');
          tempPhotos[photoIndex] = (data);
          Session.set('itemPhotos', tempPhotos );
        }
      });

    }
  },

  'click .delete-photo': function(e) {
    e.preventDefault();

    //this.photoIndex is the param that we passed
    //when we inlcuded the photo_submit template
    //in item_submit template
    var photoIndex = this.photoIndex;


    if (confirm("Delete this Photo?")) {

      var tempPhotos = Session.get('itemPhotos');

      //  _.without removes deleted photo, i.e. tempPhotos[photoIndex]
      // out of photos, i.e. tempPhotos
      // and returns an array
      Session.set('itemPhotos', _.without(tempPhotos, tempPhotos[photoIndex]));

    }
  },

});
