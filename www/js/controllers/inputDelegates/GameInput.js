'use strict';

class GameInput {
  processInput(eventBus, inputBuff) {
    var input = inputBuff.toLowerCase().trim();

    eventBus.publish(Events.OUTPUT_WRITE, `>${input}<br>`);
    eventBus.publish(Events.INPUT_CLEAR);
    
    try {
      let inputObj = InputUtils.tokenize(input);
      eventBus.publish(inputObj[0], inputObj);
      eventBus.publish(Events.PLAYER_MOVE);
    }
    catch (e) {
      eventBus.publish(Events.OUTPUT_WRITELN, e.message);
    }

  }
}