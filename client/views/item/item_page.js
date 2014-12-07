Template.itemPage.helpers({
  comments: function() {
    return Comments.find({itemId: this._id});
  }
});
