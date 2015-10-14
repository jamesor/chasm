'use strict';

class DooredExit extends Exit {
  constructor(place) {
    super(place);
    this.isClosed = true;
    this.openedMessage = 'The door is open.';
    this.closedMessage = 'The door is closed.';
  }
  open() {
    this.isClosed = false;
    return this.openedMessage;
  }
  close() {
    this.isClosed = true;
    return this.closedMessage;
  }
}