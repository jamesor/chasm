'use strict';

class CloseCommand extends BaseCommand {
  static verbs() { return ['close']; }
  execute() {
    if (!this.output) {
      if (!this.item.opened) {
        this.output = InputUtils.getAlreadyDoneResponse();
      }
    }

    if (this.output) {
      chasm.publish(Events.OUTPUT_WRITELN, this.output);
      return;
    }

    this.item.opened = false;
    this.output = `You closed the ${this.item.title}.`;

    super.execute();
  }
}