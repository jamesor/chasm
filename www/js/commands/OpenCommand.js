'use strict';

class OpenCommand extends BaseCommand {
  static verbs() { return ['open']; }
  execute() {
    if (!this.output) {
      if (this.item.locked) {
        this.output = `The ${this.item.title} is locked.`;
      }
      else if (this.item.opened) {
        this.output = InputUtils.getAlreadyDoneResponse();
      }
    }

    if (this.output) {
      chasm.publish(Events.OUTPUT_WRITELN, this.output);
      return;
    }

    this.item.opened = true;

    this.output = `You opened the ${this.item.title}`;
    if (this.item.canHoldItems && this.item.hasItems()) {
      this.output += `, revealing ${this.item.itemsToSentence()}`;
    }

    this.output = `${this.output}.`;

    super.execute();
  }
}