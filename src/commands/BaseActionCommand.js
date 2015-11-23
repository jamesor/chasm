class BaseActionCommand extends BaseCommand {
  constructor(game, data) {
    super(game, data);

    var input = InputUtils.parse(data);

    // The first verb in the list is the actual action, the rest are synonyms.
    this.verb = input.verb = this.__proto__.constructor.verbs()[0];

    this.item = input.item;
    this.prep = input.prep;
    this.target = input.target;
    this.noun1 = input.noun1;
    this.noun2 = input.noun2;
    this.output = input.output;

    if (!this.output) {
      if (this.target) {
        this.output = InputUtils.testVerbItemWithTarget(input);
        this.action = `${this.verb}/${this.item.title}/${this.target.title}`;
      }
      else {
        this.output = InputUtils.testVerbItem(input);
        this.action = `${this.verb}/${this.item.title}`;
      }
    }

  }
}