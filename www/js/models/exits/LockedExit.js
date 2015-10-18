'use strict';

class LockedExit extends DooredExit {
  constructor(place) {
    super(place);
    this.isLocked = true;
    this.unlockedMessage = 'You have unlocked the door.';
    this.lockedMessage = 'You cannot because the door is locked.';
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

  go() {
    return (this.isLocked) ? this.lockedMessage : super.go();
  }
}