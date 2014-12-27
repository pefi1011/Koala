// explicitly allow users to send push notifications from client-side.
Push.allow({
  send: function(userId, notification) {
    // Allow all users to send to everybody - For test only!
    return true;
  }
});


var optionsProduction = {
  gcm: {
    apiKey: 'AIzaSyDxn-_M3CXtqY1dj7XC9VGq_23QsXQxIh8',
    projectNumber: '420138116229'
  },
  // apn: {
  //   'passphrase': 'xxxxxxx',
  //   // Place the certificate files in /private
  //   'certData': Assets.getText('apnProdCert.pem'),
  //   'keyData': Assets.getText('apnProdKey.pem'),
  // },
  production: true
};

//This will log details about whats going on in the system.
Push.debug = true;

// Fire up the push notification server
Push.init(optionsProduction);
