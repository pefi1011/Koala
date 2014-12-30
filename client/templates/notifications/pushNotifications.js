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

    //TODO implement
    alert('not implemented yet');
  }
});


// // When messages arrives in app already open:
Push.addListener('message', function(notification) {

  alert('Message listener');
  // Router.go('itemPage', {
  //   _id: notification.payload.itemId
  // });

  // if(notification.payload.title === 'Neuer Kommentar'){
  //
  //   Router.go('itemPage', {
  //     _id: id
  //   });
  // }
});
