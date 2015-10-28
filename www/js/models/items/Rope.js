'use strict';

class Rope extends Item {
  constructor() {
    super(Items.ROPE, 'rope');
    this.longDescription = 'A long and thick length of woven cabled rope, capable of supporting significant weight.';
    this.tiedTo = null;
    this.usage.set('tie', [Items.MAPLE_TREE]);
    this.usage.set('untie', [Items.MAPLE_TREE]);
  }

  tie(itemRef) {
    if (!this.tiedTo) {
      itemRef.alterDescription(`${itemRef.longDescription} ${this.title.capitalizeFirstLetter()} is securely fastened around it.`);
      this.tiedTo = itemRef;
      this.canBeTaken = false;
    }
    return this;
  }

  untie() {
    if (this.tiedTo) {
      let tiedToTitle = this.tiedTo.title;
      this.tiedTo.restoreDescription();
      this.tiedTo = null;
      this.canBeTaken = true;
    }
    return this;
  }
}