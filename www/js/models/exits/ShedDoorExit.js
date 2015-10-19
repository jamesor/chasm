'use strict';

class ShedDoorExit extends DooredExit {
  constructor(places) {
    super(Exits.SHED_DOOR);
    this.commonTitle = 'door';
    this._places = places;
  }
}