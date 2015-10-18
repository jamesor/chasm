'use strict';

class WoodenChest extends Item {
  constructor() {
    super(Items.WOODEN_CHEST, 'a wooden chest');
    this.longDescription = 'The chest is made of oak and has silver trim. On the lid, there is a beautifully carved sparrow.';
    this.commonTitle = 'chest';
    this.canHoldItems = true;
    this.canBeTaken = false;
    
    this.canBeOpened = true;
    this.opened = false;

    this.canBeLocked = true;
    this.locked = true;
  }
}