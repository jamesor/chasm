'use strict';

class KeyboardController {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this._inputBuffer = '';
    this._validTokens = {};
    document.addEventListener('keydown', this.onKeydown.bind(this));
    document.addEventListener('keypress', this.onKeypress.bind(this));
    setTimeout(this.processInput.bind(this), 300);
  }

  processInput() {
    var sInput;
    this.eventBus.publish(Events.OUTPUT_WRITE, '&nbsp;&nbsp;&nbsp;&nbsp;**** COMMODORE 64 BASIC V2 ****<br><br>&nbsp;64K RAM SYSTEM &nbsp;38911 BASIC BYTES FREE<br><br>READY.<br>LOAD "CHASM",8,1<br><br>SEARCHING FOR CHASM<br>LOADING<br>READY.<br>');
    this.eventBus.publish(Events.INPUT_CLEAR);
    sInput = this._inputBuffer.toLowerCase().trim();
    if (sInput === 'run' || 1) {
      var upper = document.querySelectorAll('.upper')[0];
      upper.className = (upper.className || '').replace('upper', '');
      var scr = document.getElementById('screen');
      scr.className = scr.className + ' game';
      this.eventBus.initGame();
      this.processInput = this.processGameInput;
    }
  }

  processGameInput() {
    var input = this._inputBuffer.toLowerCase().trim();
    var tokens = input.split(/\s+/);
    var outcome;

    this.eventBus.publish(Events.OUTPUT_WRITE, '>'+input+'<br>');
    this.eventBus.publish(Events.INPUT_CLEAR);

    if (input === '') {
      this.eventBus.publish(Events.OUTPUT_WRITELN, 'I beg your pardon?');
      return;
    }

    var token;
    for (var i=tokens.length-1; i>=0; i--) {
      token = tokens[i];
      if (nArticles[token]) {
        tokens.splice(i, 1);
      } 
      else if (nVocabulary[token]) {
        if (tokens.length > i) {
          token += ' ' + tokens[i+1];
          if (nItems[token]) {
            tokens[i] = token;
            tokens.splice(i+1, 1);
          }
        }
      }
      else {
        //this.eventBus.publish(Events.OUTPUT_WRITELN, 'You can\'t see any such thing.' + token);
        this.eventBus.publish(Events.OUTPUT_WRITELN, 'I don\'t know the word ' + token);
        return;
      }
    }
    
    if (tokens.length > 0) {
      this.eventBus.publish(tokens[0], tokens);
      this.eventBus.publish(Events.PLAYER_MOVE);
    } else {
      
    }
  }

  onKeydown(e) {
    switch (e.which) {
    case 8:
      e.preventDefault();
      this._inputBuffer = this._inputBuffer.substring(0, this._inputBuffer.length - 1);
      this.eventBus.publish(Events.INPUT_WRITE, this._inputBuffer);
      break;
    case 13:
      e.preventDefault();
      this.processInput();
      this._inputBuffer = '';
      this.eventBus.publish(Events.INPUT_WRITE, this._inputBuffer);
      break;
    case 32:
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