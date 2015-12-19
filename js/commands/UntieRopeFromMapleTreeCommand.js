'use strict';

class UntieRopeFromMapleTreeCommand extends BaseCommand {
  static verbs() { return [`untie/${Items.ROPE}/${Items.MAPLE_TREE}`]; }
  execute() {
    this.game.getRef(Exits.CHASM2PASSGE).blocked = true;
  }
}