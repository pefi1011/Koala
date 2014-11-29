Template.itemsList.helpers({
  items: function() {
    return Items.find({}, {sort: {submitted: -1}});
  }
});
