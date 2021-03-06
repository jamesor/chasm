class UnlockCommand extends BaseActionCommand {
  static verbs() { return ['unlock']; }
  execute() {
    if (!this.output) {
      if (!this.item.locked) {
        this.output = `The ${this.item.title} is already unlocked.`;
      }
    }

    if (this.output) {
      this.game.publish(Events.OUTPUT_WRITELN, this.output);
      return;
    }

    this.item.locked = false;
    this.output = `You unlocked the ${this.item.title}.`;

    super.execute();
  }

}