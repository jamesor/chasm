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

  alterDescription(str) {
    this.tmpDescription = this.longDescription;
    this.longDescription = str;
  }

  restoreDescription() {
    if (this.tmpDescription) {
      this.longDescription = this.tmpDescription;
    }
  }
  
  lookInside() {
    if (!this.canHoldItems) {
      return `The ${this.title} can't contain other objects.`;
    }
    else if (!this.opened) {
      return `The ${this.title} is closed.`;
    }
    else {
      return this.itemsToList();
    }
  }
 }
