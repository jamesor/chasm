'use strict';

class LockedExit extends DooredExit {
  constructor(place) {
    super(place);
    this.isLocked = true;
    this.unlockedMessage = 'The door is unlocked.';
    this.lockedMessage = 'The door is locked.';
  }
  unlock() {
    this.isLocked = false;
    return this.unlockedMessage;
  }
  lock() {
    this.isLocked = true;
    return this.lockedMessage;
  }
}