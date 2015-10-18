'use strict';

class DooredExit extends Exit {
  constructor(place) {
    super(place);
    this.isClosed = true;
    this.openedMessage = 'You have opened the door.';
    this.closedMessage = 'You cannot because the door is closed.';
  }
  
  open() {
    if (this.isClosed) {
      this.isClosed = false;
      return this.openedMessage;
    }
    return 'The door is already open.';
  }

  close() {
    if (this.isClosed) {
      this.isClosed = true;
      return this.closedMessage;
    }
    return 'The door is already closed.';
  }

  go() {
    return (this.isClosed) ? this.closedMessage : super.go();
  }
}