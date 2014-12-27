Meteor.startup(function(){

  // Fire up push asap
  Push.init({
    gcm: {
      projectNumber: '420138116229'
    }
  });

});
