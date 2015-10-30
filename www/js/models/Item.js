'use strict';

class Item extends Entity {
  constructor(title, description) {
    super(title, description);
    this.canBeTaken = true;
    this.canHoldItems = false;
    this._features = new Map([
        ['examine', true],
        ['take', true]
      ]);
  }

  setFeature(key, value) {
    this._features.set(key, value);
  }

  describe() {
    return this.description;
  }
  
  canDo(key) {
    if (typeof this._features.get(key) === 'object') {
      return `What would you like to ${key} the ${this.title} with?`;
    }
    return this._features.get(key);
  }

  canDoWith(key, target) {
    if (typeof this._features.get(key) === 'object') {
      return (this._features.get(key).indexOf(target) !== -1);
    }
    return this._features.get(key);
  }
 }
