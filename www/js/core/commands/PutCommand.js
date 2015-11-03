'use strict';

class PutCommand extends BaseCommand {
  static verbs() { return ['put','drop']; }
  execute() {
    var successStr;

    if (!this.output) {
      if (this.target) {
        if (!this.item.canBeTaken) {
          this.output = `You cannot take the ${this.item.title}.`;
        }
        else if (!this.target.canHoldItems) {
          this.output = 'That can\'t contain things.';
        }
        else if (!this.item.opened) {
          output = `The ${this.item.title} is closed.`;
        }
        else {
          successStr = `You ${this.verb} the ${this.item.title} ${this.prep} the ${this.target.title}.`;
        }
      }
      else {
        this.target = this.game.place;
        successStr = `${this.item.title.capitalizeFirstLetter()} dropped.`;
      }
    }

    if (this.output) {
      this.game.publish(Events.OUTPUT_WRITELN, this.output);
      return;
    }

    this.game.getRef(this.item.parent).removeItem(this.item);
    this.target.addItem(this.item);
    this.output = successStr;

    super.execute();
  }
}