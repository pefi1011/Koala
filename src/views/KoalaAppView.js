/*** KoalaAppView.js ***/

define(function(require, exports, module) {
  var View = require('famous/core/View');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');

  var PageView = require('views/PageView');
  var KoalaItemView = require('views/KoalaItemView');

  // should come from the backend
  var mockupModel = {

    owner: 'Musterman',
    name: 'Tisch',
    maxNumberOfInterested: 5,
    pic1: 'img/koalaPics/tPic1.jpg',
    pic2: 'img/koalaPics/tPic2.jpg',
    pic3: undefined,
    discription: 'Ikea Tisch zu verschenken..... Hat einige Gebrauchsspuren'
    /*
     ..and so on..
    */
  }


  /*** KoalaAppView constructor ***/

  function KoalaAppView() {
    View.apply(this, arguments);

  //  _createPageView.call(this);

    _createKoalaItemView.call(this);
  }

  KoalaAppView.prototype = Object.create(View.prototype);
  KoalaAppView.prototype.constructor = KoalaAppView;

  KoalaAppView.DEFAULT_OPTIONS = {};

  function _createPageView() {
    this.pageView = new PageView();
    this.pageModifier = new StateModifier();

    this.add(this.pageModifier).add(this.pageView);
  }

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
