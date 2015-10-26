'use strict';

class ScoreCommand {
  execute(data) {
    chasm.player.scorePoints(data);
  }
}