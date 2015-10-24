'use strict';

class Item extends Entity {
  constructor(title, description) {
    super(title, description);
    this.canBeTaken = true;
    this.canBeOpened = false;
    this.opened = false;
    this.usage = {};
  }

  canUseWith(verb, itemName) {
    if (this.usage[verb]) {
      for (let item of this.usage[verb]) {
        if (item === itemName) {
          return true;
        }
      }
    }
    return false;
  }
}
