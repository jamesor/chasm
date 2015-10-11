'use strict';

class MoveCommand {
  execute(data) {
    chasm.player.moves++;
    chasm.publish(Events.PLAYER_MOVED, chasm.player.moves);
  }
}