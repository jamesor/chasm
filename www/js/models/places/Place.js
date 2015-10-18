'use strict';

class Place extends Entity {
  constructor(title, description) {
    super(title, description);
    this.canHoldItems = true;
    this.visited = false;
    this.exits = new Map();
  }

  addExit(direction, place) {
    this.exits.set(direction, place);
  }

  get imageSrc() {
    return 'images/'+this.title.toLowerCase().replace(/ /g,'-')+'.png';
  }

  describe() {
    if (this.visited) {
      return '<strong>' + this.title + '</strong><br>' + this.itemsToList();
    }
    this.visited = true;
    return '<strong>' + this.title + '</strong><br>' + this.description + '<br>' + this.itemsToList();
  }

  go(direction) {
    var exit = this.exits.get(direction);
    if (!exit) {
      return 'You cannot travel in that direction.';
    } else if (exit.isClosed) {
      return exit.closedMessage;
    } else if (exit.isLocked) {
      return exit.lockedMessage;
    } else {
      return exit.go();
    }
  }
}