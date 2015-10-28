'use strict';

class Toolbox extends Item {
  constructor() {
    super(Items.TOOLBOX, 'a red toolbox');
    this.commonTitle = 'toolbox';
    this.longDescription = 'A small red toolbox is rusty with a clasp on the front and a handle on top.';
    this.canHoldItems = true;
    this.canBeTaken = true;
    this.opened = false;
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