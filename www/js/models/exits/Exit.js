'use strict';

class Exit {
  constructor(place) {
    this.target = place;
  }
  
  go() {
    return this.target;
  }
}