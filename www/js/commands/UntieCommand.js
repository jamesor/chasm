'use strict';

class UntieCommand {
  execute(data) {
    var input, output;

    input = InputUtils.parse(data, 'from');

    if (!input.noun1) {
      output = 'What do you want to ${input.verb}?';
    }
    else if (!input.noun1.item) {
      output = input.noun1.output;
    }
    else if (!input.noun1) {
      output = `You do not see the ${input.noun1.term} here.`;
    }
    else if (!input.noun1.item.tiedTo) {
      output = `The ${input.noun1.item.title} is not tied to anything.`;
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
      else if (input.noun1.item.tiedTo !== input.noun2.item) {
        output = `The ${input.noun1.term} is not tied to the ${input.noun2.term}`;
      }
    }
    
    if (output) {
      chasm.publish(Events.OUTPUT_WRITELN, output);
      return;
    }
     
    input.noun1.item.untie();
    chasm.place.removeItem(input.noun1.item.title);
    chasm.player.addItem(input.noun1.item);
    chasm.publish(Events.OUTPUT_WRITELN, `${input.noun1.item.title.capitalizeFirstLetter()} taken.`); 
    chasm.publish(`${input.verb}/${this.title}/${tiedToTitle}`);
  }
}