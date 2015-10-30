'use strict';

class ScoreCommand {
  static verbs() { return ['score']; }
  execute(data) {
    chasm.player.scorePoints(data);
  }
}