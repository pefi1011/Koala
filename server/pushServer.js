// // When messages opens the app:
// Push.addListener('startup', function(notification) {
//   console.log('Payload', notification.payload);
// });
//
// // When messages arrives in app already open:
// Push.addListener('message', function(notification) {
//   console.log('Payload', notification.payload);
// });


// explicitly allow users to send push notifications from client-side.
Push.allow({
  send: function(userId, notification) {
    // Allow all users to send to everybody - For test only!
    return true;
  }
});


Push.debug = true;
