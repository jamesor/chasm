'use strict';

class GameInputController {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.view = new InputView();
  }
}