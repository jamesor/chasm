'use strict';

class UntieCommand {
  execute(data) {
    var input  = InputUtils.parse(data, ['from']);
    var output = InputUtils.testVerbNounPrepNoun(input) || 
                 InputUtils.testUsage(input);

    if (!output) {
      if (!input.noun1.item.tiedTo) {
        output = `The ${input.noun1.item.title} is not tied to anything.`;
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
    chasm.publish(`${input.verb}/${input.noun1.item.title}/${input.noun2.item.title}`);
  }
}