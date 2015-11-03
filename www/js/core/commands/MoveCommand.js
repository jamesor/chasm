'use strict';

class MoveCommand extends BaseCommand {
  execute() {
    this.game.player.moves++;
    this.game.publish(Events.PLAYER_MOVED, this.game.player.moves);
  }
}