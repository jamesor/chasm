'use strict';

class PutCommand {
  parseInput(data, prepList) {
    var verb  = data[0];
    var noun1 = (data[1]) ? ItemsProxy.findAll(data[1]) : null;
    var prep  = (data[2] && prepList.includes(data[2])) ? data[2] : null;
    var noun2 = (data[3]) ? ItemsProxy.findAll(data[3]) : null;
    return {verb, noun1, prep, noun2};
  }

  execute(data) {
    var input = this.parseInput(data, 'in,into,on');
    var output;
    var target;

    if (!input.noun1) {
      output = 'What do you want to put?';
    }
    else if (!input.noun1.item) {
      output = input.noun1.output;
    }
    else if (input.prep || input.noun2) {
      if (!input.prep) {
        output = `I don't understand that sentence.`;
      }
      else if (!input.noun2) {
        output = `What do you want to put the ${input.noun1.term} ${input.prep}?`;
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
        output = `That can't contain things.`;
      }
      else if (!input.noun2.item.opened) {
        output = `The ${input.noun1.term} is closed.`;
      }
      else {
        target = input.noun2.item;
        output = `You put the ${input.noun1.term} into the ${input.noun2.term}.`;
      }
    }
    else {
      target = chasm.place;
      output = `You put the ${input.noun1.term} down.`;
    }

    if (target) {
      let parent = chasm.getRef(input.noun1.item.parent);
      parent.removeItem(input.noun1.item.title);
      target.addItem(input.noun1.item);
    }

    chasm.publish(Events.OUTPUT_WRITELN, output);
  }
}