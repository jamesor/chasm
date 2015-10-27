'use strict';

class ExamineCommand {
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
    else if (!input.noun1.item.longDescription) {
      output = `You see nothing special about the ${input.noun1.term}.`;
    }
    else {
      output = input.noun1.item.longDescription;
    }

    chasm.publish(Events.OUTPUT_WRITELN, output);
  }
}