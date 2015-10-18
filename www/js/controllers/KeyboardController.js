'use strict';

class KeyboardController {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this._inputBuffer = '';
    this._validTokens = {};
    this.init();
    document.addEventListener('keydown', this.onKeydown.bind(this));
    document.addEventListener('keypress', this.onKeypress.bind(this));
    setTimeout(this.processInput.bind(this), 300);
  }

  init() {
    var self = this;
    Object.keys(Vocabulary).forEach(function (element) {
      Vocabulary[element].forEach(function (item) {
        self._validTokens[item] = {type: element, word: item};
      });
    });
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
    var tokens = input.split(' ');
    var outcome;

    this.eventBus.publish(Events.OUTPUT_WRITE, '>'+input+'<br>');
    this.eventBus.publish(Events.INPUT_CLEAR);

    if (input === '') {
      this.eventBus.publish(Events.OUTPUT_WRITELN, 'I beg your pardon?');
      return;
    }

    for (var i=tokens.length-1; i>=0; i--) {
      if (this._validTokens[tokens[i]]) {
        if (LangTypes.ARTICLE === this._validTokens[tokens[i]].type) {
          tokens.splice(i, 1);
        } else {
          tokens[i] = this._validTokens[tokens[i]];
          if (LangTypes.ADJECTIVE === tokens[i].type && tokens.length > i) {
            tokens[i] = ItemTokens[tokens[i].word + ' ' + tokens[i+1].word];
            tokens.splice(i+1, 1);
          }
        }
      }
      else {
        this.eventBus.publish(Events.OUTPUT_WRITELN, 'You can\'t see any such thing.');
        return;
      }
    }
    
    if (tokens[0].type === LangTypes.VERB) {
      this.eventBus.publish(tokens[0].word, tokens);
    } else {
      this.eventBus.publish(Events.OUTPUT_WRITELN, 'I don\'t understand that command.');
    }

    this.eventBus.publish(Events.PLAYER_MOVE);
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