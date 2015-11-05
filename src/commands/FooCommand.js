class FooCommand extends BaseCommand {
  static verbs() { return ['foo']; }
  execute() {
    if (this.data.length === 1) {
      this.game.publish(Events.OUTPUT_WRITELN, 'Well, FOO, BAR, and BLETCH to you too!');
      return;
    }

    this.game.publish(Events.OUTPUT_WRITELN, 'I only understood you as far as wanting to foo.');
  }
}