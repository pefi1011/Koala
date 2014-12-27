
Meteor.startup(function(){

  // Fire up push asap
  Push.init({
    gcm: {
      projectNumber: '420138116229'
    }
  });


  // vibrate for 500 when a notification is added
  Notifications.find({}).observe({

    added:function (doc) {
      if (Meteor.isCordova){
        navigator.notification.vibrate(500);
      }
    }

  });
});
//
// Push.send({
//   from: 'Koala',
//   title: 'Interesse geäußert',
//   text: 'Filip Perisic interessiert sich für Ihren "Schrank" Artikel',
//   count: 2,
//   query: {
//     userId: 'pKt8Qj2HBH7MmnCsF'
//   }
// });
