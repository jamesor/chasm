'use strict';

class LockedExit extends DooredExit {
  constructor(place) {
    super(place);
    this.isLocked = true;
    this.unlockedMessage = 'Locked.';
    this.lockedMessage = 'The door is locked.';
  }
  
  lock() {
    if (this.isLocked) {
      this.isLocked = false;
      return this.unlockedMessage;
    }
    return 'The door is already locked.';
  }

  unlock() {
    if (this.isLocked) {
      this.isLocked = true;
      return this.lockedMessage;
    }
    return 'The door is already unlocked.';
  }

  getPlace(direction) {
    return (this.isLocked) ? this.lockedMessage : super.getPlace(direction);
  }
}