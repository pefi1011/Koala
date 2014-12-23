Template.itemEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentItemId = this._id;

    var itemProperties = {
      title: $(e.target).find('[name=title]').val(),
      description: $(e.target).find('[name=description]').val()
    };

    Items.update(currentItemId, {$set: itemProperties}, function(error) {
      if(error) {
        // display the error to the user
        alert(error.reason);
      } else {
        Router.go('itemPage', {_id: currentItemId});
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this item?")) {
      var currentItemId = this._id;
      Items.remove(currentItemId);
      Router.go('itemsList');
    }
  }
});
