'use strict';

class LightEmittingItem extends Item {
  constructor(title, description, light) {
    super(title, description);
    this.isOn = false;
    this.light = light || 0;
  }
  on() {
    console.log(this);
    if (this.isOn) {
      chasm.publish('writeOutput', this.title + ' is already on.');
    } else if (this.light === 0) {
      chasm.publish('writeOutput', this.title + ' can no longer emit light.');
    } else {
      this.isOn = true;
      chasm.publish('writeOutput', this.title + ' is now emitting light.');
      chasm.publish('light', this);
      chasm.subscribe('move', this.onMove, this);
    }
  }
  off() {
    if (this.isOn) {
      this.isOn = false;
      this.light = 0
      chasm.publish('writeOutput', this.title + ' has stopped emitting light.');
      chasm.publish('light', this);
      chasm.unsubscribe('move', this.onMove, this);
    } else {
      chasm.publish('writeOutput', this.title + ' is already off.');
    }
  }
  onMove() {
    console.log(this);
    if (this.isOn) {
      if (--this.light < 1) {
        this.off();
      }
    }
    console.log('moved');
  }
}