'use strict';

class SilverKey extends Item {
  constructor() {
    super('silver key', 'a small silver key');
    this.commonTitle = 'key';
    this.canBeOpened = false;
    this.canHoldItems = false;
  }  
}