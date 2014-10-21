/*** KoalaAppView.js ***/

define(function(require, exports, module) {
  var View = require('famous/core/View');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');

  var KoalaItemView = require('views/KoalaItemView');

  // should come from the backend
  var mockupModel = {

    owner: 'Musterman',
    name: 'IKEA Tisch',
    maxNumberOfInterested: 3,
    pic1: 'img/koalaPics/tPic1.jpg',
    pic2: 'img/koalaPics/tPic2.jpg',
    pic3: undefined,
    discription: 'Ikea Tisch zu verschenken..... Hat einige Gebrauchsspuren',
    address: {
      zipCode: 45883,
      place: 'Gelsenkirchen',
      street: 'Melanchtonstraße',
      streetNumber: '49',
      streetAddition: 'b'
    }
    /*
     ..and so on..
    */
  }

  /*** KoalaAppView constructor ***/

  function KoalaAppView() {
    View.apply(this, arguments);

    _createKoalaItemView.call(this);
  }

  KoalaAppView.prototype = Object.create(View.prototype);
  KoalaAppView.prototype.constructor = KoalaAppView;

  KoalaAppView.DEFAULT_OPTIONS = {};

  /*** KoalaItemView.js ***/
  function _createKoalaItemView() {
    this.koalaItemView = new KoalaItemView({
      model: mockupModel
    });
    this.koalaItemModifier = new StateModifier();

    this.add(this.koalaItemModifier).add(this.koalaItemView);
  }

  module.exports = KoalaAppView;
});
