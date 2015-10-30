'use strict';

class ExamineCommand extends BaseCommand {
  execute() {
    if (!this.output && !this.item.longDescription) {
      this.output = `You see nothing special about the ${this.item.title}.`;
    }

    if (this.output) {
      chasm.publish(Events.OUTPUT_WRITELN, this.output);      
      return;
    }

    this.output = this.item.longDescription;

    super.execute();
  }
}