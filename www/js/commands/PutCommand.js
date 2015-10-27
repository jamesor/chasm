'use strict';

class PutCommand {

  execute(data) {
    var input, output, target;

    input = InputUtils.parse(data, 'in,into,on');

    if (!input.noun1) {
      output = 'What do you want to ${input.verb}?';
    }
    else if (!input.noun1.item) {
      output = input.noun1.output;
    }
    else if (input.prep || input.noun2) {
      if (!input.prep) {
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
      else if (!input.noun1.item.canBeTaken) {
        output = `You cannot take the ${input.noun1.term}.`;
      }
      else if (!input.noun2.item.canHoldItems) {
        output = 'That can\'t contain things.';
      }
      else if (!input.noun2.item.opened) {
        output = `The ${input.noun1.term} is closed.`;
      }
      else {
        target = input.noun2.item;
        output = `You ${input.verb} the ${input.noun1.term} ${input.prep} the ${input.noun2.term}.`;
      }
    }
    else {
      target = chasm.place;
      output = `${input.noun1.item.title.capitalizeFirstLetter()} dropped.`;
    }

    if (target) {
      let parent = chasm.getRef(input.noun1.item.parent);
      parent.removeItem(input.noun1.item.title);
      target.addItem(input.noun1.item);
    }

    chasm.publish(Events.OUTPUT_WRITELN, output);
  }
}