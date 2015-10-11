'use strict';

class TrollRoom extends Place {
  constructor() {
    super(Places.TROLL_ROOM);
    this.description = 'You are in the Troll\'s Room. It\'s dark and smelly.';
  }
  get describe() {
    var str = super.describe();
  }
}