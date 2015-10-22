'use strict';

class LightEmittingItem extends Item {
  constructor(title, description, light) {
    super(title, description);
    this.isOn = false;
    this.light = light || 0;
  }
  on() {
    if (this.isOn) {
      chasm.publish(Events.OUTPUT_WRITELN, `${this.title} is already on.`);
    } else if (this.light === 0) {
      chasm.publish(Events.OUTPUT_WRITELN, `${this.title} can no longer emit light.`);
    } else {
      this.isOn = true;
      chasm.publish(Events.OUTPUT_WRITELN, `${this.title} is now emitting light.`);
      chasm.publish(Events.LIGHT_ON, this);
      chasm.subscribe(PLAYER_MOVED, this.onMove, this);
    }
  }
  off() {
    if (this.isOn) {
      this.isOn = false;
      this.light = 0
      chasm.publish(Events.OUTPUT_WRITELN, `${this.title} has stopped emitting light.`);
      chasm.publish(Events.LIGHT_OFF, this);
      chasm.unsubscribe(PLAYER_MOVED, this.onMove, this);
    } else {
      chasm.publish(Events.OUTPUT_WRITELN, `${this.title} is already off.`);
    }
  }
  onMove() {
    if (this.isOn) {
      if (--this.light < 1) {
        this.off();
      }
    }
  }
}