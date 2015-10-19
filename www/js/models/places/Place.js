'use strict';

class Place extends Entity {
  constructor(title, description) {
    super(title, description);
    this.canHoldItems = true;
    this.visited = false;
    this._exits = new Map();
  }

  addExit(direction, place) {
    this._exits.set(direction, place);
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

  findItems(itemName) {
    var foundList = super.findItems(itemName);

    this._exits.forEach(function (exit) {
      if (exit.canBeOpened && (exit.title === itemName || exit.commonTitle === itemName)) {
        foundList.push(exit);
      }
    });

    return foundList;
  }

  getExit(direction) {
    return this._exits.get(direction);
  }

/*
  getPlace(direction) {
    var exit = this._exits.get(direction);
    if (!exit) {
      return 'You cannot travel in that direction.';
    } else if (!exit.opened) {
      return exit.closedMessage;
    } else if (exit.locked) {
      return exit.lockedMessage;
    } else {
      return exit.getPlace(direction);
    }
  }
*/
}