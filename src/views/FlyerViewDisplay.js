/*** FlyerViewDisplay.js ***/

define(function(require, exports, module) {
  var View = require('famous/core/View');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');
  var ImageSurface = require('famous/surfaces/ImageSurface');

  var FlyerItemView = require('views/FlyerItemView');


  function FlyerViewDisplay() {
    console.log('FlyerViewDisplay: BEGIN construct..');

    View.apply(this, arguments);

    this.rootModifier = new StateModifier({
      size: [this.options.flyerSheetWidth, this.options.flyerSheetHeight],
    });

    this.mainNode = this.add(this.rootModifier);

    _createFlyerSheet.call(this);
    _createFlyerItems.call(this);

    console.log('FlyerViewDisplay: END construct..');
  }

  FlyerViewDisplay.prototype = Object.create(View.prototype);
  FlyerViewDisplay.prototype.constructor = FlyerViewDisplay;

  FlyerViewDisplay.DEFAULT_OPTIONS = {
    flyerItemNumber: 2,
    flyerItems: undefined,
    flyerItemContent: 'Ja :)',
    flyerSheetWidth: 200,
    flyerSheetHeight: 110,
    flyerSheetColor: '#f9ec98',
    flyerSheetQuestion: 'Interesse?',
    borderStyle: '1px dashed black',
    showedInterest: false
  };

  FlyerViewDisplay.prototype.pullOffFlyerItem = function(flyerItemId) {

    console.log('FlyerViewDisplay: BEGIN pullOffFlyerItem..');

    if (!this.showedInterest) {

      this.flyerItems[flyerItemId].pullOff();
      this.showedInterest = true;
    } else
      alert('You have already pulled off one flyer.');

    console.log('FlyerViewDisplay: END pullOffFlyerItem..');
  };

  FlyerViewDisplay.prototype.putBackFlyerItem = function(flyerItemId) {

    console.log('FlyerViewDisplay: BEGIN putBackFlyerItem..');

    this.flyerItems[flyerItemId].putBack();
    this.showedInterest = false;

    console.log('FlyerViewDisplay: END putBackFlyerItem..');
  };

  function _createFlyerSheet() {
    console.log('FlyerViewDisplay: BEGIN _createFlyerSheet..');

    var flyerSheetSizeMod = new StateModifier({
      size: [this.options.flyerSheetWidth, this.options.flyerSheetHeight],
    });

    var flyerSheetBackground = new Surface({
      properties: {
        backgroundColor: this.options.flyerSheetColor,
        boxShadow: '10px 2px 70px black',
        borderBottom: this.options.borderStyle
      }
    });

    var border = 4;
    var flyerInputWidth = this.options.flyerSheetWidth - 2 * border;
    var flyerContentHeight = 0.8;

    var flyerSheetContent = new Surface({
      content: this.options.flyerSheetContent,
      size: [flyerInputWidth, this.options.flyerSheetHeight * flyerContentHeight],
      properties: {
        textAlign: 'left',
        zIndex: 1,
      }
    });

    var flyerSheetContentModifier = new StateModifier({
      origin: [0.5, 0],
      align: [0.5, 0],
      transform: Transform.translate(0, border, 1)
    });

    var flyerSheetQuestion = new Surface({
      content: this.options.flyerSheetQuestion,
      size: [flyerInputWidth, this.options.flyerSheetHeight * (1-flyerContentHeight)],
      properties: {
        textAlign: 'center',
        zIndex: 1,
      }
    });

    var flyerSheetQuestionModifier = new StateModifier({
      origin: [0.5, 0],
      align: [0.5, 0],
      transform: Transform.translate(0, (this.options.flyerSheetHeight * flyerContentHeight) - border , 1)
    });

    var flyerSheetNode = this.mainNode.add(flyerSheetSizeMod);
    flyerSheetNode.add(flyerSheetBackground);
    flyerSheetNode.add(flyerSheetContentModifier).add(flyerSheetContent);
    flyerSheetNode.add(flyerSheetQuestionModifier).add(flyerSheetQuestion);

    console.log('FlyerViewDisplay: END _createFlyerSheet..');
  }

  function _createFlyerItems() {
    console.log('FlyerViewDisplay: BEGIN _createFlyerItems..');

    this.flyerItems = [];

    var downModifier = new StateModifier({
      transform: Transform.translate(0, this.options.flyerSheetHeight, 0)
    });
    var node = this.mainNode.add(downModifier);

    // calculate flyer item width
    var flyerItemWidthVal = this.options.flyerSheetWidth / this.options.flyerItemNumber;

    // add flyers to the flyer sheet
    for (var i = 0; i < this.options.flyerItemNumber; i++) {

      var moveRight = flyerItemWidthVal * i;
      var rightModifier = new StateModifier({
        transform: Transform.translate(moveRight, 0, 0)
      });

      var flyer = new FlyerItemView({
        flyerId: i,
        flyerItemWidth: flyerItemWidthVal,
        flyerContent: this.options.flyerItemContent
      });


      var higherLevel = this;
      // flyer.on('click', this.pullOffFlyerItem.bind(this));
      flyer.on('pullOff', function(flyerItemId) {

        console.log('FlyerViewDisplay: BEGIN pullOff onEventListener..');

        higherLevel.pullOffFlyerItem(flyerItemId);

        console.log('FlyerViewDisplay: END pullOff onEventListener..');

      });


      flyer.on('putBack', function(flyerItemId) {

        console.log('FlyerViewDisplay: BEGIN putBack onEventListener..');

        higherLevel.putBackFlyerItem(flyerItemId);

        console.log('FlyerViewDisplay: END putBack onEventListener..');

      });




      this.flyerItems.push(flyer);
      node.add(rightModifier).add(flyer);
    }

    console.log('FlyerViewDisplay: END _createFlyerItems..');
  }

  module.exports = FlyerViewDisplay;
});
