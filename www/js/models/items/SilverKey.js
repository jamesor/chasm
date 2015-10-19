'use strict';

class SilverKey extends Item {
  constructor() {
    super(Items.SILVER_KEY, 'a small key');
    this.longDescription = 'The small key is made of silver and has teeth along one edge. The handle is ornate with an etching of a sparrow.';
    this.commonTitle = 'key';
    this.canBeOpened = false;
    this.canHoldItems = false;
  }
}