'use strict';

class LookCommand {
  execute(data) {
    var prep = data[1];
    var noun = data[2];
    var output;

    if (data.length === 1) {
      output = chasm.place.look();
    }
    else if (prep === 'at') {
      let result = ItemsProxy.findAll(noun);
      if (result.item) {
        chasm.publish('examine', ['examine', result.term]);
        return;
      }
      else {
        output = result.output;
      }
    }
    else if (prep === 'in') {
      let result = ItemsProxy.findAll(noun);
      if (result.item) {
        output = result.item.lookInside();
      }
      else {
        output = result.output;
      }
    }
    else {
      output = 'I don\'t understand that sentence.';
    }

    chasm.publish(Events.OUTPUT_WRITELN, output);
  }
}