'use strict';

class LookCommand extends BaseCommand {
  static verbs() { return ['l','look']; }
  execute() {
    var prep = this.data[1];
    var noun = this.data[2];
    var output;

    if (this.data.length === 1) {
      output = this.game.place.look();
    }
    else if (prep === 'at') {
      let result = ItemsProxy.findAll(noun);
      if (result.item) {
        this.game.publish('examine', ['examine', result.term]);
        return;
      }
      else {
        output = result.output;
      }
    }
    else if (prep === 'in') {
      let result = ItemsProxy.findAll(noun);
      if (result.item) {
        output = result.item.lookInside();
      }
      else {
        output = result.output;
      }
    }
    else {
      output = 'I don\'t understand that sentence.';
    }

    this.game.publish(Events.OUTPUT_WRITELN, output);
  }
}