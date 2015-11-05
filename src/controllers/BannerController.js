class BannerController {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.placeView = new TextView('place', 'Start', 21);
    this.scoreView = new TextView('score', 'Score:0', 9);
    this.movesView = new TextView('moves', 'Moves:0', 10);
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