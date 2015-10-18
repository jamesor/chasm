'use strict';

class WoodenChest extends Item {
  constructor() {
    super('wooden chest', 'a non-remarkable wooden chest');
    this.commonTitle = 'chest';
    this.canHoldItems = true;
    this.canBeTaken = false;
    this.canBeOpened = true;
    this.opened = true;
  }
}