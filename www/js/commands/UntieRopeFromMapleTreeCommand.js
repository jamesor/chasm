'use strict';

class UntieRopeFromMapleTreeCommand {
  static verbs() { return [`untie/${Items.ROPE}/${Items.MAPLE_TREE}`]; }
  execute() {
    chasm.getRef(Exits.CHASM2PASSGE).blocked = true;
  }
}