'use strict';

class TakeCommand extends BaseActionCommand {
  static verbs() { return ['take','get','pick up']; }
  execute() {
    if (!this.output) {
      if (this.game.player.hasItem(this.item.title)) {
        this.output `You already have the ${this.item.title}.`;
      }
    }

    if (this.output) {
      this.game.publish(Events.OUTPUT_WRITELN, this.output);
      return;
    }

    this.game.getRef(this.item.parent).removeItem(this.item);
    this.game.player.addItem(this.item);
    this.output = `${this.item.title.capitalizeFirstLetter()} taken.`;

    super.execute();
  }
}