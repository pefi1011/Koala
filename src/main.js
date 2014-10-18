/*** main.js - entry point for famous apps ***/

define(function(require, exports, module) {
  var Engine = require('famous/core/Engine');
  var KoalaAppView = require('views/KoalaAppView');

  var mainContext = Engine.createContext();
  var koalaAppView = new KoalaAppView();

  mainContext.add(koalaAppView);
});
