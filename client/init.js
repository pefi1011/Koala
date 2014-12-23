Meteor.startup(function(){

  // vibrate for 500 when a notification is added
  Notifications.find({}).observe({

    added:function (doc) {
      if (Meteor.isCordova){
        navigator.notification.vibrate(500);
      }
    }

  });
});
