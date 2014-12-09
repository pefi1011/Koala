Template.itemPage.helpers({

  comments: function() {
    return Comments.find({itemId: this._id});
  },

  noComments: function(){
    var count = Comments.find({itemId: this._id}).count();
    return (count === 0);
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

  distance: function(){
    return calctulateDistance(this.location);
  }
});

Template.itemPage.events({

  'click .tearoff': function () {

    Meteor.call('tearoffItem', this._id, function(error, id) {
      if (error){
        throwError(error.reason);
      } else {
        // nothing to do
      }
    });
  }


});
