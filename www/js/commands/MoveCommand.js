'use strict';

class MoveCommand {
  static verbs() { return ['move']; }
  execute(data) {
    chasm.player.moves++;
    chasm.publish(Events.PLAYER_MOVED, chasm.player.moves);
  }
}