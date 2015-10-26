'use strict';

class Scoreboard {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.init();
  }

  init() {
    this._score = 0;
    this._points = new Map([
      [`unlock/${Items.WOODEN_CHEST}/${Items.SILVER_KEY}`, 10],
      [`tie/${Items.ROPE}/${Items.MAPLE_TREE}`, 5]
    ]); 
  }

  scorePoints(key) {
    var pts = this._points.get(key) || 0;
    if (pts > 0) {
      this._score += pts;
      this._points.delete(key);
      this.eventBus.publish(Events.PLAYER_SCORED, this._score);
    }
  }
}