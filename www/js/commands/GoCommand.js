'use strict';

class GoCommand extends BaseCommand {
  static verbs() { return ['n','s','e','w','u','d','north','south','east','west','up','down','go','walk','run']; }
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
      exit = this.game.place.getExit(direction);
      if (exit) {
        if (exit.blocked) {
          output = 'You can\'t go that way... yet.';
        }
        else if (exit.opened) {
          if (!exit.locked) {
            let place = exit.getPlace(direction);
            if (place) {
              this.game.place = place;
              this.game.publish(Events.PLACE_CHANGED, place);
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

    this.game.publish(Events.OUTPUT_WRITELN, output);
  }
}