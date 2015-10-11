'use strict';

class DropCommand {
  execute(data) {
    var item, output;

    if (chasm.player.items.size === 0) {
      output = 'You aren\'t carrying anything to drop.';
    } else if (data.words.length < 1) {
      output = 'What do you want to drop?';
    } else {
      item = chasm.player.items.get(data.words[0]);
      if (item) {
        chasm.player.items.delete(item.title);
        chasm.place.items.set(item.title, item);
        output = 'You have dropped ' + item.description + '.';
      } else {
        output = 'You cannot drop that.';
      }
    }

    chasm.publish(Events.OUTPUT_WRITELN, output);
  }
}