'use strict';

class InputController {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.view = new InputView();
    eventBus.subscribe(Events.INPUT_WRITE, this.onWrite, this);
    eventBus.subscribe(Events.INPUT_CLEAR, this.onClear, this);
    eventBus.subscribe(Events.INPUT_PROMPT, this.onPrompt, this);
  }
  onWrite(data) {
    this.view.write(data);
  }
  onClear() {
    this.view.clear();
  }
  onPrompt(data) {
    this.view.writePrompt(data);
  }
  destroy() {
    this.eventBus.unsubscribe(Events.INPUT_WRITE, this.onWrite, this);
    this.eventBus.unsubscribe(Events.INPUT_CLEAR, this.onClear, this);
    this.eventBus.unsubscribe(Events.INPUT_PROMPT, this.onPrompt, this);
  }
}