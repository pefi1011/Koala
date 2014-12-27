Meteor.startup(function(){

  //Fire up push asap
  Push.init({
    gcm: {
      projectNumber: '420138116229' // probably is this the way how gcm pairs app and server
    }
  });

});
