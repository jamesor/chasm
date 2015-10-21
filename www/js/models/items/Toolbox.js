'use strict';

class Toolbox extends Item {
  constructor() {
    super(Items.TOOLBOX, 'a red toolbox');
    this.commonTitle = 'toolbox';
    this.longDescription = 'A small red toolbox is rusty with a clasp on the front and a handle on top.';
    this.canHoldItems = true;
    this.canBeTaken = true;
    
    this.canBeOpened = true;
    this.opened = false;
  }
}