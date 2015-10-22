'use strict';

class Player extends Entity {
  constructor(eventBus) {
    super('player', 'You are an attractive adventurer with an athetic build.');
    this.eventBus = eventBus;
    this.canHoldItems = true;
    this.score = 0;
    this.moves = 0;
  }

  itemsToList() {
    var str;

    if (this._items.size === 0) {
      return 'You are empty handed.';
    }

    str = 'Your are carrying:<br>';
    this._items.forEach(function (item) {
      str += `&nbsp;${item.describe(true).capitalizeFirstLetter()}<br>`;
    });
    
    return str;
  }
}