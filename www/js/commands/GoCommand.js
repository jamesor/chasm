'use strict';

class GoCommand {
  execute(data) {
    var verb = data[0].charAt(0);
    var exit, str = 'You can\'t go that way.';

    if (verb) {
      exit = chasm.place.getExit(verb);
      if (exit) {
        if (exit.opened) {
          if (!exit.locked) {
            let place = exit.getPlace(verb);
            if (place) {
              chasm.place = place;
              chasm.publish(Events.PLACE_CHANGED, place);
              str = place.describe();
            }
          } else {
            str = exit.lockedMessage;
          }
        } else {
          str = exit.closedMessage;
        }
      }
    }

    chasm.publish(Events.OUTPUT_WRITELN, str);
  }
}