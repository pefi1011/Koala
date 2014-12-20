

Template.userProfile.helpers({

  userName: function() {
    var user = Meteor.user();
    return user.username;
    //return Comments.find({itemId: this._id});
  }

});
