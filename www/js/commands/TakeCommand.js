'use strict';

class TakeCommand extends BaseCommand {
  execute(data) {

    if (!this.output) {
      if (chasm.player.hasItem(this.item.title)) {
        this.output `You already have the ${this.item.title}.`;
      }
    }

    if (this.output) {
      chasm.publish(Events.OUTPUT_WRITELN, this.output);
      return;
    }

    chasm.getRef(this.item.parent).removeItem(this.item.title);
    chasm.player.addItem(this.item);
    this.output = `${this.item.title.capitalizeFirstLetter()} taken.`;

    super.execute();
  }
}