'use strict';

class TakeCommand {
  execute(data) {
    var item, output;

    if (chasm.place.items.size === 0) {
      output = 'You don\'t see anything here worth taking.';
    } else if (data.words.length < 1) {
      output = 'What do you want to pick up?';
    } else {
      item = chasm.place.items.get(data.words[0]);
      if (item) {
        chasm.player.items.set(item.title, item);
        chasm.place.items.delete(item.title);
        output = 'You have taken ' + item.description + '.';
      } else {
        output = 'You cannot pick that up.';
      }
    }

    chasm.publish(Events.OUTPUT_WRITELN, output);
  }
}