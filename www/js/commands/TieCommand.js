'use strict';

class TieCommand {
  execute(data) {
    var input  = InputUtils.parse(data, ['to','around']);
    var output = InputUtils.testVerbNounPrepNoun(input) || 
                 InputUtils.testUsage(input);
  
    if (!output && input.noun1.item.tiedTo) {
      output = `The ${input.noun1.term} is already tied to ${input.noun1.item.tiedTo.title}.`;
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