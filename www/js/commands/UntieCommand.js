'use strict';

class UntieCommand extends BaseActionCommand {
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
      this.game.publish(Events.OUTPUT_WRITELN, this.output);
      return;
    }

    this.target.restoreLongDescription();
    this.item.tiedTo = null;
    this.item.setFeature('take', true);
    this.game.place.removeItem(this.item);
    this.game.player.addItem(this.item);
    this.output = `You've untied the ${this.item.title} from the ${this.target.title} and have taken it.`;

    super.execute();
  }
}