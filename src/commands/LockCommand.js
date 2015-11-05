class LockCommand extends BaseActionCommand {
  static verbs() { return ['lock']; }
  execute() {
    if (!this.output) {
      if (this.item.locked) {
        this.output = `The ${this.item.title} is already locked.`;
      }
    }

    if (this.output) {
      this.game.publish(Events.OUTPUT_WRITELN, this.output);
      return;
    }

    this.item.locked = true;
    this.output = `You locked the ${this.item.title}.`;

    super.execute();
  }
}