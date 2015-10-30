'use strict';

class UntieCommand extends BaseCommand {
  static verbs() { return ['untie','unwrap']; }
  execute() {
    if (!this.output) {
      if (!this.item.tiedTo) {
        this.output = `The ${this.item.title} is not tied to anything.`;
      }
      else if (this.item.tiedTo !== this.target) {
        this.output = `The ${this.item.title} is not tied to the ${target.title}`;
      }
    }

    if (this.output) {
      chasm.publish(Events.OUTPUT_WRITELN, this.output);
      return;
    }

    this.target.restoreLongDescription();
    this.item.tiedTo = null;
    this.item.setFeature('take', true);
    chasm.place.removeItem(this.item);
    chasm.player.addItem(this.item);
    this.output = `You've untied the ${this.item.title} from the ${this.target.title} and have taken it.`;

    super.execute();
  }
}