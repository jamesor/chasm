'use strict';

class SilverKey extends Item {
  constructor() {
    super('silver key', 'a small key');
    this.longDescription = 'The small key is made of silver and has teeth along one edge. The handle is ornate with an etching of sparrow.';
    this.commonTitle = 'key';
    this.canBeOpened = false;
    this.canHoldItems = false;
    
    this._points.set('unlock/wooden chest', 10);
  }

}