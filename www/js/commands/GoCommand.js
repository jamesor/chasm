'use strict';

class GoCommand {
  execute(data) {
    var verb = data[0].word.charAt(0);
    var exit, str;

    if (verb) {
      exit = chasm.place.exits.get(verb);
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
        str = 'You can\'t go that way.';
      }

      chasm.publish(Events.OUTPUT_WRITELN, str);
    }
  }
}