'use strict';

class TakeCommand {
  execute(data) {
    var input, output;

    input = InputUtils.parse(data, 'in,into,on');

    if (!input.noun1) {
      output = 'What do you want to ${input.verb}?';
    }
    else if (!input.noun1.item) {
      output = input.noun1.output;
    }
    else if (!input.noun1) {
      output = `You do not see the ${input.noun1.term} here.`;
    }
    else if (!input.noun1.item.canBeTaken) {
      let resp = [
        'A valiant attempt.',
        'You can\'t be serious.',
        'What a concept!',
        'Not likely.',
        'An interesting idea...'
      ];
      output = resp[MathUtils.getRandomInt(0,resp.length)];
    }
    else if (chasm.player.hasItem(input.noun1.item.title)) {
      output = `You already have the ${input.noun1.item.title}.`;
    }
    else {
      let parent = chasm.getRef(input.noun1.item.parent);
      parent.removeItem(input.noun1.item.title);
      chasm.player.addItem(input.noun1.item);
      output = `${input.noun1.item.title.capitalizeFirstLetter()} taken.`;
    }

    chasm.publish(Events.OUTPUT_WRITELN, output);
  }
}