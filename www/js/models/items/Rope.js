'use strict';

class Rope extends Item {
  constructor() {
    super(Items.ROPE, 'rope');
    this.longDescription = 'A long and thick length of woven cabled rope, capable of supporting significant weight.';
    this.tiedTo = null;

    this._features.set('tie', [Items.MAPLE_TREE]);
    this._features.set('untie', [Items.MAPLE_TREE]);
  }
}