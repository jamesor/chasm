'use strict';

class KeyboardController {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.inputBuffer = '';
    document.addEventListener('keydown', this.onKeydown.bind(this));
    document.addEventListener('keypress', this.onKeypress.bind(this));
    setTimeout(this.processInput.bind(this), 300);
  }
  processInput() {
    var sInput;
    this.eventBus.publish(Events.OUTPUT_WRITE, '&nbsp;&nbsp;&nbsp;&nbsp;**** COMMODORE 64 BASIC V2 ****<br><br>&nbsp;64K RAM SYSTEM &nbsp;38911 BASIC BYTES FREE<br><br>READY.<br>LOAD "CHASM",8,1<br><br>SEARCHING FOR CHASM<br>LOADING<br>READY.<br>');
    this.eventBus.publish(Events.INPUT_CLEAR);
    sInput = this.inputBuffer.toLowerCase().trim();
    if (sInput === 'run') {
      var upper = document.querySelectorAll('.upper')[0];
      upper.className = (upper.className || '').replace('upper', '');
      var scr = document.getElementById('screen');
      scr.className = scr.className + ' game';
      this.eventBus.initGame();
      this.processInput = this.processGameInput;
    }
  }
  processGameInput() {
    var input, words, verb;

    function removeInsignificantWords(list) {
      for (var i=list.length; i>=0; i--) {
        if (UselessWords.has(list[i])) {
          list.splice(i, 1);
        } 
      }
      return list;
    }

    input = this.inputBuffer.toLowerCase().trim();
    words = removeInsignificantWords(input.split(' '));

    if (words.lenth < 1) return;

    verb = KnownVerbs[words.shift()];

    this.eventBus.publish(Events.OUTPUT_WRITE, '>'+input+'<br>');
    this.eventBus.publish(Events.INPUT_CLEAR);

    if (verb) {
      this.eventBus.publish(verb, {
          input: input,
          verb: verb,
          words: words
        });
    } else {
      this.eventBus.publish(Events.OUTPUT_WRITELN, 'I don\'t understand that command.');
    }

    this.eventBus.publish(Events.PLAYER_MOVE);
  }
  onKeydown(e) {
    switch (e.which) {
    case 8:
      e.preventDefault();
      this.inputBuffer = this.inputBuffer.substring(0, this.inputBuffer.length - 1);
      this.eventBus.publish(Events.INPUT_WRITE, this.inputBuffer);
      break;
    case 13:
      e.preventDefault();
      this.processInput();
      this.inputBuffer = '';
      this.eventBus.publish(Events.INPUT_WRITE, this.inputBuffer);
      break;
    case 32:
      // hack to prevent page from scrolling when SPACE BAR is pressed.
      e.preventDefault();
      this.inputBuffer += ' ';
      this.eventBus.publish(Events.INPUT_WRITE, this.inputBuffer);
      break;
    }
  }
  onKeypress(e) {
    if (this.inputBuffer.length < 39) {
      this.inputBuffer += String.fromCharCode(e.which);
      this.eventBus.publish(Events.INPUT_WRITE, this.inputBuffer);
    }
  }
}