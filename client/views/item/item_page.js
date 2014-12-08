Template.itemPage.helpers({

  comments: function() {
    return Comments.find({itemId: this._id});
  },

  photos: function(){

    return Pictures.find({itemId: this._id});
  },

  submittedText: function() {
    return new Date(this.submitted).toString();
  }
});
