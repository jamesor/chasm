'use strict';

class Player {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.score = 0;
    this.moves = 0;
    this.items = new InventoryManager();
  }
}

class InventoryManager extends Map {
  toString() {
    var str;

    if (this.size === 0) {
      return 'You are not carrying anything.';
    }

    str = 'You are carrying:<br>';
    this.forEach(function (item) {
      str += ' - ' + item.description + '<br>';
    });
    
    return str;
  }
};