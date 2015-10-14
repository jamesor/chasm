'use strict';

class GoCommand {
  execute(data) {
    var exit, str;

    if (data.verb) {
      exit = chasm.place.exits.get(data.verb);
      if (exit) {
        if (!exit.isClosed) {
          if (!exit.isLocked) {
            chasm.place = exit.target;
            chasm.publish(Events.PLACE_CHANGED, exit.target);
            chasm.publish(Events.OUTPUT_WRITELN, exit.target.describe());
            return;
          } else {
            str = exit.lockedMessage;
          }
        } else {
          str = exit.closedMessage;
        }
      } else {
        str = 'You cannot go ' + data.verb + ' from here.';
      }

      chasm.publish(Events.OUTPUT_WRITELN, str);
    }
  }
}