'use strict';

class ScoreCommand {
  execute(data) {
    chasm.player.score += data;
    chasm.publish(Events.PLAYER_SCORED, chasm.player.score);
  }
}