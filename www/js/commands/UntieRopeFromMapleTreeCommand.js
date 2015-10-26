'use strict';

class UntieRopeFromMapleTreeCommand {
  execute() {
    chasm.getRef(Exits.CHASM2PASSGE).blocked = true;
  }
}