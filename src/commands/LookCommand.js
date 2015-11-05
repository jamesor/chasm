class LookCommand extends BaseCommand {
  constructor(game, data) {
    super(game, data);

    var input = InputUtils.parse(data);

    this.verb = input.verb;
    this.item = input.item;
    this.noun1 = input.noun1;

    if (this.noun1) {
      this.output = InputUtils.testVerbItem(input);
      this.action = `${this.verb}/${this.item.title}`;
    }
    else {
      this.output = InputUtils.testVerb(input);
    }
  }
  static verbs() { return ['l','look','look in']; }
  execute() {

    switch (this.verb) {
      case 'l':
      case 'look':
        this.output = this.game.place.look();
        break;
      case 'look in':
        let result = ItemsProxy.findAll(this.noun1.term);
        this.output = (result.item) ? result.item.lookInside() : result.output;
        break;
      default:
        this.output = 'I don\'t understand that sentence.';
    }

    this.game.publish(Events.OUTPUT_WRITELN, this.output);
  }
}