'use strict';

class CloseOpenCommand {
  execute(data) {
    var input  = InputUtils.parse(data);
    var output = InputUtils.testVerbNoun(input);

    if (!output) {
      if (input.noun1.item.locked) {
        output = `The ${input.noun1.term} is locked.`;
      }
      else if (typeof input.noun1.item[input.verb] === 'undefined') {
        output = `You cannot ${input.verb} the ${input.noun1.term}.`;
      }
    }

    if (output) {
      chasm.publish(Events.OUTPUT_WRITELN, output);      
      return;
    }

    output = input.noun1.item[input.verb]();
    chasm.publish(Events.OUTPUT_WRITELN, output);
    chasm.publish(`${input.verb}/${input.noun1.item.title}`);
  }
}