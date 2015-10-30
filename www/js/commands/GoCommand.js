'use strict';

class GoCommand {
  constructor(data) {
    this.data = data;
  }

  execute() {
    var direction = this.data[0];
    var output = 'You can\'t go that way.';
    var exit;

    if ((direction === 'walk' || direction === 'go')) {
      if (this.data.length === 2) {
        direction = this.data[1];
      }
    }

    direction = direction.charAt(0);

    if (direction) {
      exit = chasm.place.getExit(direction);
      if (exit) {
        if (exit.blocked) {
          output = 'You can\'t go that way... yet.';
        }
        else if (exit.opened) {
          if (!exit.locked) {
            let place = exit.getPlace(direction);
            if (place) {
              chasm.place = place;
              chasm.publish(Events.PLACE_CHANGED, place);
              output = place.describe();
            }
          } else {
            output = exit.lockedMessage;
          }
        } else {
          output = exit.closedMessage;
        }
      }
    }

    chasm.publish(Events.OUTPUT_WRITELN, output);
  }
}