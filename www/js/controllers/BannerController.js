'use strict';

class BannerController {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.placeView = new TextView('place', 21, 'Start');
    this.scoreView = new TextView('score', 9, 'Score:0');
    this.movesView = new TextView('moves', 10, 'Moves:0');
    eventBus.subscribe(Events.PLACE_CHANGED, this.onPlaceChanged, this);
    eventBus.subscribe(Events.PLAYER_SCORED, this.onUserScored, this);
    eventBus.subscribe(Events.PLAYER_MOVED, this.onUserMoved, this);
  }
  onPlaceChanged(place) {
    this.placeView.text = place.title;
  }
  onUserScored(score) {
    this.scoreView.text = `Score:${score}`;
  }
  onUserMoved(moves) {
    this.movesView.text = `Moves:${moves}`;
  }
  destroy() {
    this.eventBus.unsubscribe(Events.PLACE_CHANGED, this.onPlaceChanged, this);
    this.eventBus.unsubscribe(Events.PLAYER_SCORED, this.onUserScored, this);
    this.eventBus.unsubscribe(Events.PLAYER_MOVED, this.onUserMoved, this);
  }
}