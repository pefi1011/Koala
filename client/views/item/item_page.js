Template.itemPage.helpers({

  comments: function() {
    return Comments.find({itemId: this._id});
  },

  photos: function(){

    return Photos.find({itemId: this._id});
  },

  submittedText: function() {
    return new Date(this.submitted).toString();
  },

  ownItem: function() {
    return this.userId == Meteor.userId();
  },
});
