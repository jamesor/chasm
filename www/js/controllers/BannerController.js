'use strict';

class BannerController {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.view = new BannerView();
    eventBus.subscribe(Events.PLACE_CHANGED, this.onPlaceChanged, this);
    eventBus.subscribe(Events.PLAYER_SCORED, this.onUserScored, this);
    eventBus.subscribe(Events.PLAYER_MOVED, this.onUserMoved, this);
  }
  onPlaceChanged(place) {
    this.view.title = place.title;
  }
  onUserScored(score) {
    this.view.score = score;
  }
  onUserMoved(moves) {
    this.view.moves = moves;
  }
  destroy() {
    this.eventBus.unsubscribe(Events.PLACE_CHANGED, this.onPlaceChanged, this);
    this.eventBus.unsubscribe(Events.PLAYER_SCORED, this.onUserScored, this);
    this.eventBus.unsubscribe(Events.PLAYER_MOVED, this.onUserMoved, this);
  }
}