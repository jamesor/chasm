'use strict';

class BaseActionCommand extends BaseCommand {
  constructor(game, data) {
    super(game, data);

    var input = InputUtils.parse(data);

    this.verb = input.verb;
    this.item = input.item;
    this.prep = input.prep;
    this.target = input.target;
    this.noun1 = input.noun1;
    this.noun2 = input.noun2;

    if (this.target) {
      this.output = InputUtils.testVerbNounPrepNoun(input);
      this.action = `${this.verb}/${this.item.title}${(this.target)?'/'+this.target.title:''}`;
    }
    else {
      this.output = InputUtils.testVerbNoun(input);
      this.action = `${this.verb}/${this.item.title}`;
    }
  }

}