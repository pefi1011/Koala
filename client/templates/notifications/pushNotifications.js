//When messages opens the app:
Push.addListener('startup', function(notification) {

  // notification has been sent because someone commented an item
  if(notification.payload.pushType === 'comment'){

    // go to items page because there are the comments
    Router.go('itemPage', {
      _id: notification.payload.itemId
    });
  }
  else if(notification.payload.pushType === 'interest'){

    Router.go('itemPage', {
      _id: notification.payload.itemId
    });
  }
});


// // When messages arrives in app already open:
Push.addListener('message', function(notification) {

  // notification has been sent because someone commented an item
  if(notification.payload.pushType === 'comment'){

    // go to items page because there are the comments
    Router.go('itemPage', {
      _id: notification.payload.itemId
    });
  }
  else if(notification.payload.pushType === 'interest'){

    Router.go('itemPage', {
      _id: notification.payload.itemId
    });
  }
});
