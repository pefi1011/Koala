/*** FlyerItemView.js ***/


define(function(require, exports, module) {
  var View = require('famous/core/View');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');
  var Easing = require('famous/transitions/Easing');


  function FlyerItemView() {
    console.log('FlyerItemView: BEGIN construct')

    View.apply(this, arguments);

    this.rootModifier = new StateModifier({
      size: [this.options.flyerItemWidth, this.options.flyerItemHeight],
    });

    this.mainNode = this.add(this.rootModifier);

    _createFlyerItem.call(this);

    console.log('FlyerItemView: END construct')
  }

  FlyerItemView.prototype = Object.create(View.prototype);
  FlyerItemView.prototype.constructor = FlyerItemView;

  FlyerItemView.DEFAULT_OPTIONS = {
    flyerId: 0,
    flyerContent: 'Yes :)',
    flyerItemWidth: 35,
    flyerItemHeight: 70,
    borderStyle: '1px dashed black',
    flyerItemColor: '#f9ec98',
    isPulledOff: false,
    pullOffYTranslation: 200
  };

  FlyerItemView.prototype.pullOff = function() {
    console.log('FlyerItemView: BEGIN pullOff')

    this.rootModifier.setTransform(
      Transform.translate(10, this.options.pullOffYTranslation, 0), {
        duration: 1000,
        curve: Easing.outBounce
      }
    );

    this.options.isPulledOff = true;

    console.log('FlyerItemView: END pullOff')
  }

  FlyerItemView.prototype.putBack = function() {
    console.log('FlyerItemView: BEGIN putBack')

    this.rootModifier.setTransform(
      Transform.translate(0, 0, 0), {
        duration: 1000,
        curve: Easing.inBounce
      }
    );

    this.options.isPulledOff = false;

    console.log('FlyerItemView: END putBack')
  }

  function _createFlyerItem() {
    console.log('FlyerItemView: BEGIN _createFlyerItem')

    var flyerItem = new Surface({
      content: this.options.flyerContent,
      properties: {
        borderRight: this.options.borderStyle,
        borderLeft: this.options.borderStyle,
        borderBottom: this.options.borderStyle,
        lineHeight: this.options.flyerItemHeight + 'px',
        textAlign: 'center',
        backgroundColor: this.options.flyerItemColor,
        zIndex: 1
      }
    });

    this.mainNode.add(flyerItem);

    flyerItem.on('click', function() {
      console.log('FlyerItemView: BEGIN onClick')

      if (!this.options.isPulledOff)
        this._eventOutput.emit('pullOff', this.options.flyerId);
      else
        this._eventOutput.emit('putBack', this.options.flyerId);

      console.log('FlyerItemView: END onClick');

      // not working withouh bind(this)
      // no idea why not
    }.bind(this));

    console.log('FlyerItemView: END _createFlyerItem');
  }

  module.exports = FlyerItemView;
});
