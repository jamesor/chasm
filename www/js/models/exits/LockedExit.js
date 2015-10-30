'use strict';

class LockedExit extends DooredExit {
  constructor(title, places) {
    super(title, places);

    this.canBeLocked = true;
    this.locked = true;
    
    this.unlockedMessage = 'Locked.';
    this.lockedMessage = 'The door is locked.';
  }

  getPlace(direction) {
    return (this.isLocked) ? this.lockedMessage : super.getPlace(direction);
  }
}