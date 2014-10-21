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
    _getItemPictures.call(this);
    _createAddress.call(this);
    _createFlyerViewDisplay.call(this);

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
      content: 'img/backArrow.png'
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
      size: [undefined, undefined]
    });
    this.layout.content.add(bodyBackgroundModifier).add(bodyBackgroundSurface);


    console.log('KoalaItemView: END _createBody');
  }

  function _getItemPictures() {
    console.log('KoalaItemView: BEGIN _createItemPictures');

    this.picWidth = (window.innerWidth / 3);

    /*** create pictures ***/
    var firstPic = new KoalaItemPictureView({
      pic: this.options.model.pic1,
      size: [this.picWidth, this.picWidth]
    });
    var secondPic = new KoalaItemPictureView({
      pic: this.options.model.pic2,
      size: [this.picWidth, this.picWidth]
    });
    var thirdPic = new KoalaItemPictureView({
      // pic: this.options.model.pic3
      size: [this.picWidth, this.picWidth]
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

  function _createAddress() {

    console.log('KoalaItemView: BEGINN _createAddress');

    var moveDown = this.picWidth + 10;

    console.log('HIER');
    console.log(moveDown);
    var streetSurface = new Surface({
      size: [undefined, 10],
      content: this.options.model.address.street,
      properties: {
        color: 'white'
      }
    });

    var zipAndPlaceSurface = new Surface({
      size: [undefined, 10],
      content: this.options.model.address.zipCode + ' ' + this.options.model.address.place,
      properties: {
        color: 'white'
      }
    });

    var mapSurface = new ImageSurface({
      size: [38, 38],
      content: 'img/koalaPics/gMaps.jpg',
    });


    var addressPositionMod = new StateModifier({
      transform: Transform.translate(8,moveDown, 0)
    });
    var streetPositionMod = new StateModifier({
      transform: Transform.translate(45, 0, 0)
    });
    var zipAndPlacePositionMod = new StateModifier({
      transform: Transform.translate(45, 24, 0)
    });
    var mapPositionMod = new StateModifier({
      transform: Transform.translate(0, 3, 0)
    });

    var node = this.layout.content.add(addressPositionMod);
    node.add(streetPositionMod).add(streetSurface);
    node.add(zipAndPlacePositionMod).add(zipAndPlaceSurface);
    node.add(mapPositionMod).add(mapSurface);

    console.log('KoalaItemView: END _createAddress');
  }

  function _createFlyerViewDisplay() {
    console.log('KoalaItemView: BEGIN _createFlyerViewDisplay');

    var moveDown = this.picWidth + 10 + 38 + 15;

    console.log('HIER');
    console.log(this);

    var flyer = new FlyerViewDisplay({
      flyerSheetContent: this.options.model.discription,
      flyerItemNumber: this.options.model.maxNumberOfInterested,
      flyerItemContent: 'Ja :)',
      flyerItemPullOffYTranslation: 150
    });

    var FlyerViewDisplayModifier = new StateModifier({
      origin: [0.5, 0.0],
      align: [0.5, 0.0]
    });

    var moveDownFlyerViewDisplay = new StateModifier({
      transform: Transform.translate(0, moveDown, 0)

    });

    this.layout.content.add(FlyerViewDisplayModifier)
    .add(moveDownFlyerViewDisplay)
    .add(flyer);

    console.log('KoalaItemView: END _createFlyerViewDisplay');

  }

  module.exports = KoalaItemView;
});
