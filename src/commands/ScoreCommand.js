class ScoreCommand extends BaseCommand {
  execute() {
    this.game.scoreboard.scorePoints(this.data);
  }
}