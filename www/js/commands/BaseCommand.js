'use strict';

class BaseCommand {
  constructor(data) {
    var input = InputUtils.parse(data);

    this.verb = input.verb;
    this.item = (input.noun1 && input.noun1.item) ? input.noun1.item : null;
  
    if (!input.noun1 && !input.noun1.item) {
      this.output = `You do not see the ${input.noun1.term} here.`;
    }
    else if (input.noun2 && (input.noun2.term || input.noun2.item)) {
      this.prep   = input.prep || input.validPrep;
      this.target = input.noun2.item;
      this.output = InputUtils.testVerbNounPrepNoun(input);
      if (!this.output) {
        this.action = `${this.verb}/${this.item.title}/${this.target.title}`;
      }
    }
    else {
      this.output = InputUtils.testVerbNoun(input);
      if (!this.output) {
        this.action = `${this.verb}/${this.item.title}`;
      }
    }
  }

  execute() {
    chasm.publish(Events.OUTPUT_WRITELN, this.output);
    if (this.action) {
      chasm.publish(Player.SCORE, this.action);
      chasm.publish(this.action);
    }
  }
}