'use strict';

class Player extends Entity {
  constructor(eventBus) {
    super('player', 'You are an attractive adventurer with an athetic build.');
    this.eventBus = eventBus;
    this.canHoldItems = true;
    this._scoreboard = new Scoreboard(eventBus);
    this.moves = 0;
  }

  scorePoints(key) {
    this._scoreboard.scorePoints(key);
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