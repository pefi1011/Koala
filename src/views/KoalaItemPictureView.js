/*** KoalaItemPictureView.js ***/

define(function(require, exports, module) {
  var View = require('famous/core/View');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');
  var ImageSurface = require('famous/surfaces/ImageSurface');

  function KoalaItemPictureView() {
    View.apply(this, arguments);

    this.rootModifier = new StateModifier({
      size: this.options.size
    });

    this.mainNode = this.add(this.rootModifier);

    _createBackground.call(this);
    _createFilm.call(this);
    _createPhoto.call(this);
  }

  KoalaItemPictureView.prototype = Object.create(View.prototype);
  KoalaItemPictureView.prototype.constructor = KoalaItemPictureView;

  // setting the size property in default options here
  KoalaItemPictureView.DEFAULT_OPTIONS = {
    size: [200, 200],
    filmBorder: 2,
    photoBorder: 3,
    pic: 'img/koalaPics/noPic.jpg'
  };

  function _createBackground() {
    
    var background = new Surface({
      properties: {
        backgroundColor: '#FFFFF5',
        boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.5)'
      }
    });

    background.on('click', function() {
      console.log('TEEEST');
      background.setSize = [undefined, undefined];

    }.bind(this));

    this.mainNode.add(background);
  }

  function _createFilm() {
    this.options.filmSize = this.options.size[0] - 2 * this.options.filmBorder;

    var film = new Surface({
      size: [this.options.filmSize, this.options.filmSize],
      properties: {
        backgroundColor: '#222',
        zIndex: 1,
        pointerEvents: 'none'

      }
    });

    var filmModifier = new StateModifier({
      origin: [0.5, 0],
      align: [0.5, 0],
      transform: Transform.translate(0, this.options.filmBorder, 1)
    });

    this.mainNode.add(filmModifier).add(film);
  }

  function _createPhoto() {
    var photoSize = this.options.filmSize - 2 * this.options.photoBorder;

    var photo = new ImageSurface({
      size: [photoSize, photoSize],
      content: this.options.pic,
      properties: {
        zIndex: 2,
        pointerEvents: 'none'

      }
    });

    this.photoModifier = new StateModifier({
      origin: [0.5, 0],
      align: [0.5, 0],
      transform: Transform.translate(0, this.options.filmBorder + this.options.photoBorder, 2)
    });

    this.mainNode.add(this.photoModifier).add(photo);
  }

  module.exports = KoalaItemPictureView;
});
