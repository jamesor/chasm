'use strict';

class ExamineCommand extends BaseActionCommand {
  static verbs() { return ['examine']; }
  execute() {
    if (!this.output) {
      if (!this.item.longDescription) {
        this.output = `You see nothing special about the ${this.item.title}.`;
      }
    }

    if (this.output) {
      this.game.publish(Events.OUTPUT_WRITELN, this.output);
      return;
    }

    this.output = this.item.longDescription;

    super.execute();
  }
}