'use strict';

class Scoreboard {
  constructor(eventBus, points) {
    this.eventBus = eventBus;
    this._score = 0;
    this._points = new Map();
    Object.keys(points).forEach(key => this._points.set(key, points[key]));
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