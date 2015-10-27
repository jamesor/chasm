'use strict';

class CloseCommand {
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
    else if (!input.noun1.item.opened) {
      let resp = [
        'I think you\'ve already done that.',
        'You think it isn\'t?',
        'Look around.'
      ];
      output = resp[MathUtils.getRandomInt(0,resp.length)];
    }
    else {
      input.noun1.item.opened = false;

      output = `You closed the ${input.noun1.item.title}`;

      if (input.noun1.item.closeMessage) {
        output = input.noun1.item.closeMessage;
      }

      output += '.';
    }

    chasm.publish(Events.OUTPUT_WRITELN, output);
  }
}