'use strict';

class DooredExit extends Exit {
  constructor(title) {
    super(title);
    this.commonTitle = 'door';
    this.opened = false;
    this.closedMessage = `The ${this.title} is closed.`;

    this._features.set('open', true);
    this._features.set('close', true);
  }

  getPlace(direction) {
    return (this.opened) ? super.getPlace(direction) : false;
  }
}