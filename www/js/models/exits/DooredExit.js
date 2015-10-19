'use strict';

class DooredExit extends Exit {
  constructor(title, places) {
    super(title, places);
    this.commonTitle = 'door';

    this.canBeOpened = true;
    this.opened = false;

    this.openedMessage = 'Opened.';
    this.closedMessage = 'The door is closed.';
  }

  getPlace(direction) {
    return (this.opened) ? super.getPlace(direction) : false;
  }
}