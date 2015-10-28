'use strict';

class WoodenChest extends Item {
  constructor() {
    super(Items.WOODEN_CHEST, 'a wooden chest');
    this.longDescription = 'The chest is made of oak and has silver trim. On the lid, there is a beautifully carved sparrow.';
    this.commonTitle = 'chest';
    this.canHoldItems = true;
    this.canBeTaken = false;
    
    this.opened = false;

    this.canBeLocked = true;
    this.locked = true;
  }

  open() {
    if (this.opened) {
      return InputUtils.getAlreadyDoneResponse();
    }

    this.opened = true;

    var output = `You opened the ${this.title}`;

    if (this.canHoldItems && this.hasItems()) {
      output += `, revealing ${this.itemsToSentence()}`;
    }

    return `${output}.`;
  }

  close() {
    if (!this.opened) {
      return InputUtils.getAlreadyDoneResponse();
    }
    
    this.opened = false;
    return `You closed the ${this.title}.`;
  }
}