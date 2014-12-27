Push.init({
  // Google Cloud Messaging
  gcm: {
    apiKey: 'AIzaSyDxn-_M3CXtqY1dj7XC9VGq_23QsXQxIh8'
  },
  // apple push notification
  // apn: {
  //   // setting this on client throws security error
  //   passphrase: 'xxx',
  //   // pem files are placed in the app private folder
  //   certData: Assets.getText('apnProdCert.pem'),
  //   keyData: Assets.getText('apnProdKey.pem'),
  // },
  production: false, // use production server or sandbox
});
