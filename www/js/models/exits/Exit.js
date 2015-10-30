'use strict';

class Exit extends Item {
  constructor(title, places) {
    super(title, title);
    this._places = new Map(places);
    this.opened = true;
    this.blocked = false;

    // create back links
    places[0][1].addExit(places[1][0], this);
    places[1][1].addExit(places[0][0], this);

    this.setFeature('take', false);
  }
  
  addPlace(direction, placeTitle) {
    this._places.set(direction, placeTitle);
  }

  getPlace(direction) {
    return this._places.get(direction);
  }
}