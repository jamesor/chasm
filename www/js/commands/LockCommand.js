'use strict';

class LockCommand extends BaseCommand {

  execute() {
    
    if (!output && this.item.locked) {
      this.output = `The ${this.item.title} is already locked.`;
    }
    
    if (this.output) {
      chasm.publish(Events.OUTPUT_WRITELN, this.output);
      return;
    }

    this.item.locked = true;
    this.output = `You locked the ${this.item.title}.`;
    
    super.execute();
  }

}