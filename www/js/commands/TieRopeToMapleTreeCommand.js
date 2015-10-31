'use strict';

class TieRopeToMapleTreeCommand extends BaseCommand {
  static verbs() { return [`tie/${Items.ROPE}/${Items.MAPLE_TREE}`]; }
  execute() {
    this.game.getRef(Exits.CHASM2PASSGE).blocked = false;
    this.game.publish(Events.OUTPUT_WRITELN, 'You toss the loose end of the rope into the this.game which can now be used to climb down.')
  }
}