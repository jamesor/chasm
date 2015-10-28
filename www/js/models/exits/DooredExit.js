'use strict';

class DooredExit extends Exit {
  constructor(title, places) {
    super(title, places);
    this.commonTitle = 'door';
    this.opened = false;
    this.closedMessage = `The ${this.title} is closed.`;
  }

  getPlace(direction) {
    return (this.opened) ? super.getPlace(direction) : false;
  }

  open() {
    if (this.opened) {
      return InputUtils.getAlreadyDoneResponse();
    }

    this.opened = true;

    var output = `You opened the ${this.title}`;

    if (this.canHoldItems && this.hasItems()) {
      output += `, revealing ${this.itemsToSentence()}`;
    }

    return `${output}.`;
  }

  close() {
    if (!this.opened) {
      return InputUtils.getAlreadyDoneResponse();
    }
    
    this.opened = false;
    return `You closed the ${this.title}.`;
  }
}