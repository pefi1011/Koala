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
  },

  existStrip: function(index) {
    return this.interestedUsers[index] !== undefined;
  },

  // returns true if a flayer with the given index is torn off
  isTornOff: function(index) {
    return (this.interestedUsers[index] !== null);
  },

  // returns true if a flayer with the given index is torn off by the current user
  isTornOffByCurrentUser: function(index) {
    var currentUserId = Meteor.user()._id;
    var isSameUser = this.interestedUsers[index] == currentUserId;
    return (this.interestedUsers[index] !== null) && isSameUser;
  },

  // we use this to get the index of the tearoff flayer. There are also other ways but they mess up with the reactivity
  getTearOffIndex : function() {
    if(!this.indexingStarted){
      this.indexingStarted = true;
      this.tearoffIndex = 1;
    } else {
      this.tearoffIndex++;
    }

    return this.tearoffIndex;
  }

});

Template.itemPage.events({

  'click .tearoff-strip': function(event){
    var clickedElement = document.getElementById(event.target.id);
    var clickedElementId = clickedElement.id;

    // Delete the first 7 characters of the String (This will be "tearoff") so we can get the index of the tearoff strip
    tearoffStripIndex = clickedElementId.substr(7);

    Meteor.call('tearoffItem', this._id, tearoffStripIndex, function(error, id) {
      if (error){
          throwError(error.reason);
      } else {
        // add the class to theelement
        clickedElement.className += " tearoff-strip-torn";
      }
    });
  }

});
