'use strict';

class TieCommand {
  execute(data) {
    var input, output;

    input = InputUtils.parse(data, 'to,around');

    if (!input.noun1) {
      output = 'What do you want to ${input.verb}?';
    }
    else if (!input.noun1.item) {
      output = input.noun1.output;
    }
    else if (!input.noun1) {
      output = `You do not see the ${input.noun1.term} here.`;
    }
    else if (input.noun1.item.tiedTo) {
      output = `The ${input.noun1.item.title} is already tied to the ${input.noun1.item.tiedTo.title}.`;
    }
    else if (!input.prep) {
      output = 'I don\'t understand that sentence.';
    }
    else if (!input.noun2) {
      output = `What do you want to ${input.verb} the ${input.noun1.term} ${input.prep}?`;
    }
    else if (!input.noun2.item) {
      output = input.noun2.output;
    }
    else if (input.noun1.item === input.noun2.item) {
      output = 'I should recurse infinitely to teach you a lesson, but...';
    }
  
    if (output) {
      chasm.publish(Events.OUTPUT_WRITELN, output);
      return;
    }

    input.noun1.item.tie(input.noun2.item);
    chasm.player.removeItem(input.noun1.item.title);
    chasm.place.addItem(input.noun1.item);
    chasm.publish(Events.OUTPUT_WRITELN, `The ${input.noun1.item.title} is now securely fastened to the ${input.noun2.item.title}.`);
    chasm.publish(`${input.verb}/${input.noun1.item.title}/${input.noun2.item.title}`);
  }
}