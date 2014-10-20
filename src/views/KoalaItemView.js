/*** KoalaItemView.js ***/

define(function(require, exports, module) {
  var View = require('famous/core/View');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');
  var HeaderFooter = require('famous/views/HeaderFooterLayout');
  var ImageSurface = require('famous/surfaces/ImageSurface');

  var KoalaItemPictureView = require('views/KoalaItemPictureView');
  var FlyerViewDisplay = require('views/FlyerViewDisplay');

  function KoalaItemView() {
    console.log('KoalaItemView: BEGIN construct');

    View.apply(this, arguments);

    _createLayout.call(this);
    _createHeader.call(this);
    _createBody.call(this);

    console.log('KoalaItemView: END construct');
  }

  KoalaItemView.prototype = Object.create(View.prototype);
  KoalaItemView.prototype.constructor = KoalaItemView;

  KoalaItemView.DEFAULT_OPTIONS = {
    headerSize: 44,
    edgeToPicDistance: 0.025,
    headerToPicDistance: 0.01,
    model: undefined
  };

  function _createLayout() {
    console.log('KoalaItemView: BEGIN _createLayout');

    this.layout = new HeaderFooter({
      headerSize: this.options.headerSize
    });

    var layoutModifier = new StateModifier({
      transform: Transform.translate(0, 0, 0.1)
    });

    this.add(layoutModifier).add(this.layout);

    console.log('KoalaItemView: END _createLayout');
  }

  function _createHeader() {
    console.log('KoalaItemView: BEGIN _createHeader');

    /*** header backround ***/
    var headerBackgroundSurface = new Surface({
      properties: {
        backgroundColor: 'black'
      }
    });
    var headerBackgroundModifier = new StateModifier({
      transform: Transform.behind
    });
    this.layout.header.add(headerBackgroundModifier).add(headerBackgroundSurface);

    /*** Back to KoalaSearchResult ***/
    this.hamburgerSurface = new ImageSurface({
      size: [44, 44],
      content: 'img/hamburger.png'
    });
    var hamburgerModifier = new StateModifier({
      origin: [0, 0.5],
      align: [0, 0.5]
    });
    this.layout.header.add(hamburgerModifier).add(this.hamburgerSurface);

    /*** Distance to KoalaItem ***/
    var searchSurface = new ImageSurface({
      size: [232, 44],
      content: 'img/search.png'
    });
    var searchModifier = new StateModifier({
      origin: [0.5, 0.5],
      align: [0.5, 0.5]
    });
    this.layout.header.add(searchModifier).add(searchSurface);


    /*** Koala Icon ***/
    var iconSurface = new ImageSurface({
      size: [44, 44],
      content: 'img/icon.png'
    });
    var iconModifier = new StateModifier({
      origin: [1, 0.5],
      align: [1, 0.5]
    });
    this.layout.header.add(iconModifier).add(iconSurface);

    console.log('KoalaItemView: END _createHeader');
  }

  function _createBody() {
    console.log('KoalaItemView: BEGIN _createBody');

    /*** body backround ***/
    var bodyBackgroundSurface = new ImageSurface({
      size: [undefined, undefined],
      content: 'img/treeTrunk.jpg',
      zIndex: -1
    });
    var bodyBackgroundModifier = new StateModifier({
      transform: Transform.behind,
      size:[undefined,undefined]
    });
    this.layout.content.add(bodyBackgroundModifier).add(bodyBackgroundSurface);

    _getItemPictures.call(this);
    _createFlyerViewDisplay.call(this);
    _createItemDiscription.call(this);

    console.log('KoalaItemView: END _createBody');
  }

  function _getItemPictures() {
    console.log('KoalaItemView: BEGIN _createItemPictures');

    var width = (window.innerWidth/3);

    /*** create pictures ***/
    var firstPic = new KoalaItemPictureView({
      pic: this.options.model.pic1,
      size: [width,width]
    });
    var secondPic = new KoalaItemPictureView({
      pic: this.options.model.pic2,
      size: [width,width]
    });
    var thirdPic = new KoalaItemPictureView({
      // pic: this.options.model.pic3
      size: [width,width]
    });

    /*** picutres positioning ***/
    var firstPicPositionMod = new StateModifier({
      origin: [0.01, this.options.headerToPicDistance],
      align: [0.01, this.options.headerToPicDistance],
    });
    var secondPicPositionMod = new StateModifier({
      origin: [0.5, this.options.headerToPicDistance],
      align: [0.5, this.options.headerToPicDistance]
    });
    var thirdPicPositionMod = new StateModifier({
      origin: [0.99, this.options.headerToPicDistance],
      align: [0.99, this.options.headerToPicDistance]
    });

    /*** add pictures to the render tree ***/
    this.layout.content.add(firstPicPositionMod).add(firstPic);
    this.layout.content.add(secondPicPositionMod).add(secondPic);
    this.layout.content.add(thirdPicPositionMod).add(thirdPic);

    console.log('KoalaItemView: END _createItemPictures');
  }

  function _createFlyerViewDisplay() {
    console.log('KoalaItemView: BEGIN _createFlyerViewDisplay');

    var width = (window.innerWidth/3);

console.log('HIER');
    console.log(this);

    var flyer = new FlyerViewDisplay({
      flyerItemNumber: this.options.model.maxNumberOfInterested,
      flyerItemContent: 'Ja :)',
    });

    var FlyerViewDisplayModifier = new StateModifier({
      origin: [0.5, 0.325],
      align: [0.5, 0.325]
    });

    this.layout.content.add(FlyerViewDisplayModifier).add(flyer);

    console.log('KoalaItemView: END _createFlyerViewDisplay');

  }

  function _createItemDiscription() {
    console.log('KoalaItemView: BEGIN _createItemDiscription');

    var width = 0.9 * window.innerWidth ;

    var discriptionSurface = new Surface({
      content: this.options.model.discription,
      size: [width,100],
      properties: {
        backgroundColor: 'white',
        textAlign: 'left',

      }
    });

    var discriptioPositionMod = new StateModifier({
      origin: [0.5, 0.9],
      align: [0.5, 0.9]
    });

    this.layout.content.add(discriptioPositionMod).add(discriptionSurface);


    console.log('KoalaItemView: END _createItemDiscription');
  }

  module.exports = KoalaItemView;
});
