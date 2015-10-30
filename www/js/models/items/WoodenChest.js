'use strict';

class WoodenChest extends Container {
  constructor() {
    super(Items.WOODEN_CHEST, 'a wooden chest');
    this.longDescription = 'The chest is made of oak and has silver trim. On the lid, there is a beautifully carved sparrow.';
    this.commonTitle = 'chest';
    this.canHoldItems = true;
    this.opened = false;
    this.canBeLocked = true;
    this.locked = true;

    this.setFeature('lock', [Items.SILVER_KEY]);
    this.setFeature('unlock', [Items.SILVER_KEY]);
    this.setFeature('take', false);
  }
}