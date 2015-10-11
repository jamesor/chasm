'use strict';

class GoCommand {
  execute(data) {
    if (data.verb) {
      var place = chasm.place.exits.go(data.verb);

      if (typeof place === 'string') {
        chasm.publish(Events.OUTPUT_WRITELN, place);
      } else if (typeof place === 'object') {
        chasm.place = place;
        chasm.publish(Events.PLACE_CHANGED, place);
        chasm.publish(Events.OUTPUT_WRITELN, place.describe());
      }
    }
  }
}