'use strict';

class KeyboardController {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this._inputBuffer = '';
    this.delegate = new BasicInput();
    document.addEventListener('keydown', this.onKeydown.bind(this));
    document.addEventListener('keypress', this.onKeypress.bind(this));
    eventBus.subscribe(Events.GAME_START, this.onGameStart, this);
    setTimeout(this.processInput.bind(this), 300);
  }

  processInput() {
    this.delegate.processInput(this.eventBus, this._inputBuffer);
  }

  onGameStart() {
    this.delegate = new GameInput();
    this.eventBus.unsubscribe(Events.GAME_START, this.onGameStart, this);
  }

  onKeydown(e) {
    const DELETE = 8;
    const ENTER  = 13;
    const SPACE  = 32;

    switch (e.which) {
    case DELETE:
      e.preventDefault();
      this._inputBuffer = this._inputBuffer.substring(0, this._inputBuffer.length - 1);
      this.eventBus.publish(Events.INPUT_WRITE, this._inputBuffer);
      break;
    case ENTER:
      e.preventDefault();
      this.processInput();
      this._inputBuffer = '';
      this.eventBus.publish(Events.INPUT_WRITE, this._inputBuffer);
      break;
    case SPACE:
      // hack to prevent page from scrolling when SPACE BAR is pressed.
      e.preventDefault();
      this._inputBuffer += ' ';
      this.eventBus.publish(Events.INPUT_WRITE, this._inputBuffer);
      break;
    }
  }
  
  onKeypress(e) {
    if (this._inputBuffer.length < 39) {
      this._inputBuffer += String.fromCharCode(e.which);
      this.eventBus.publish(Events.INPUT_WRITE, this._inputBuffer);
    }
  }
}