Template.itemEntry.helpers({
  ownItem: function() {
    return this.userId == Meteor.userId();
  },

});
