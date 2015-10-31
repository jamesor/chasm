'use strict';

class BaseCommand {
  constructor(game, data) {
    this.game = game;
    this.data = data;
  }

  static verbs() { return []; }

  execute() {
    if (!this.output) {
      this.output = 'I don\'t understand that sentence.';
    }
    this.game.publish(Events.OUTPUT_WRITELN, this.output);
    if (this.action) {
      this.game.publish(Player.SCORE, this.action);
      this.game.publish(this.action);
    }
  }
}