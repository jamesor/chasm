'use strict';

class GameInput {
  processInput(eventBus, inputBuff) {
    var input = inputBuff.toLowerCase().trim();
    var tokens = input.split(/\s+/);
    var outcome;

    eventBus.publish(Events.OUTPUT_WRITE, '>'+input+'<br>');
    eventBus.publish(Events.INPUT_CLEAR);

    if (input === '') {
      eventBus.publish(Events.OUTPUT_WRITELN, 'I beg your pardon?');
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
        //eventBus.publish(Events.OUTPUT_WRITELN, 'You can\'t see any such thing.' + token);
        eventBus.publish(Events.OUTPUT_WRITELN, 'I don\'t know the word ' + token);
        return;
      }
    }
    
    if (tokens.length > 0) {
      eventBus.publish(tokens[0], tokens);
      eventBus.publish(Events.PLAYER_MOVE);
    } else {
      
    }
  }
}