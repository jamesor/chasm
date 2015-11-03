'use strict';

class InputController {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.promptView = new TextView('prompt');
    this.responseView = new TextView('response');
    eventBus.subscribe(Events.INPUT_WRITE, this.onWrite, this);
    eventBus.subscribe(Events.INPUT_CLEAR, this.onClear, this);
    eventBus.subscribe(Events.INPUT_PROMPT, this.onPrompt, this);
  }
  onWrite(str) {
    this.responseView.text = str;
  }
  onClear() {
    this.responseView.text = '';
  }
  onPrompt(str) {
    this.promptView.text = str;
  }
  destroy() {
    this.eventBus.unsubscribe(Events.INPUT_WRITE, this.onWrite, this);
    this.eventBus.unsubscribe(Events.INPUT_CLEAR, this.onClear, this);
    this.eventBus.unsubscribe(Events.INPUT_PROMPT, this.onPrompt, this);
  }
}