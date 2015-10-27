'use strict';

class OpenCommand {
  execute(data) {
    var input, output;

    input = InputUtils.parse(data);

    if (!input.noun1) {
      output = 'What do you want to ${input.verb}?';
    }
    else if (!input.noun1.item) {
      output = input.noun1.output;
    }
    else if (!input.noun1) {
      output = `You do not see the ${input.noun1.term} here.`;
    }
    else if (input.noun1.item.locked) {
      output = `The ${input.noun1.term} is locked.`;
    }
    else if (!input.noun1.item.canBeOpened) {
      output = `You cannot ${input.verb} the ${input.noun1.term}.`;
    }
    else if (input.noun1.item.opened) {
      output = `The ${input.noun1.term} is already open.`;
    }
    else {
      input.noun1.item.opened = true;

      output = `You opened the ${input.noun1.item.title}`;

      if (input.noun1.item.openMessage) {
        output = input.noun1.item.openMessage;
      }

      if (input.noun1.item.canHoldItems && input.noun1.item.hasItems()) {
        output += `, revealing ${input.noun1.item.itemsToSentence()}`;
      }

      output += '.';
    }

    chasm.publish(Events.OUTPUT_WRITELN, output);
  }
}