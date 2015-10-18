'use strict';

class Item extends Entity {
  constructor(title, description) {
    super(title, description);
    this.canBeTaken = true;
    this.canBeOpened = false;
    this.opened = false;
  }
}
