'use strict';

class ScoreCommand extends BaseCommand {
  execute() {
    this.game.player.scorePoints(this.data);
  }
}