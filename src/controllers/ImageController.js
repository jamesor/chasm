class ImageController {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.view = new ImageView();
    eventBus.subscribe(Events.PLACE_CHANGED, this.onPlaceChanged, this);
  }
  onPlaceChanged(place) {
    this.view.imageSrc = place.imageSrc;
  }
  destroy() {
    this.eventBus.unsubscribe(Events.PLACE_CHANGED, this.onPlaceChanged, this);
  }
}