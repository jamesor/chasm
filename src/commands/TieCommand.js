class TieCommand extends BaseActionCommand {
  static verbs() { return ['tie','wrap']; }
  execute() {
    if (!this.output) {
      if (this.item.tiedTo) {
        this.output = `The ${this.item.title} is already tied to something.`;
      }
    }

    if (this.output) {
      this.game.publish(Events.OUTPUT_WRITELN, this.output);
      return;
    }

    this.target.longDescription = `${this.target.longDescription} ${this.item.title.capitalizeFirstLetter()} is securely fastened around it.`;
    this.item.tiedTo = this.target;
    this.item.setFeature('take', false);
    this.game.player.removeItem(this.item);
    this.game.place.addItem(this.item);
    this.output = `The ${this.item.title} is now securely fastened to the ${this.target.title}.`;

    super.execute();
  }
}