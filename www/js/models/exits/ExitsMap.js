'use strict';

class ExitsMap extends Map {
  go(direction) {
    var exit = this.get(direction);
    if (exit) {
      if (!exit.isClosed) {
        if (!exit.isLocked) {
          return exit.target;
        } else {
          return exit.lockedMessage;
        }
      } else {
        return exit.closedMessage;
      }
    } else {
      return 'You cannot travel in that direction.';
    }
  }
}