class GameInput {
  processInput(eventBus, inputBuff) {
    var input = inputBuff.toLowerCase().trim();

    eventBus.publish(Events.OUTPUT_WRITE, `>${input}<br>`);
    eventBus.publish(Events.INPUT_CLEAR);
    
    let inputObj = InputUtils.tokenize(input);

    if (typeof inputObj === 'object') {
      eventBus.publish(inputObj[0], inputObj);
      eventBus.publish(Events.PLAYER_MOVE);
    }
    else {
      eventBus.publish(Events.OUTPUT_WRITELN, e.message);
    }

  }
}