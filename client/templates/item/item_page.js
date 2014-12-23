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
    return calculateDistance(this.location);
  },

  // not logged in users are not allowed to tearoff
  isDisabled: function(){

    var userId = Meteor.userId();

    if (!userId) {
      return 'disabled';
    }
  }

});

Template.itemPage.events({

  'click .tearoff-strip': function(event){
    var item = document.getElementById(event.target.id);
    Meteor.call('tearoffItem', this._id, function(error, id) {
      if (error){
          throwError(error.reason);
      } else {
        // add the class to theelement
        item.className += " tearoff-strip-torn";
      }
    });
  }

});
