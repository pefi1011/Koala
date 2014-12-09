Template.notifications.helpers({
  notifications: function() {
    return Notifications.find({userId: Meteor.userId(), read: false});
  },
  notificationCount: function(){
    return Notifications.find({userId: Meteor.userId(), read: false}).count();
  }
});

Template.notification.helpers({
  notificationItemPath: function() {
    return Router.routes.itemPage.path({_id: this.itemId});
  }
});

Template.notification.events({
  'click .notification-entry': function() {
    Notifications.update(this._id, {$set: {read: true}});
  }
});


Meteor.startup(function(){
  Notifications.find({}).observe({
    added:function (doc) {
      if (Meteor.isCordova){
        navigator.notification.vibrate(500);
      }
    }
  });
});
