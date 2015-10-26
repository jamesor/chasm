'use strict';

class TieRopeToMapleTreeCommand {
  execute() {
    chasm.getRef(Exits.CHASM2PASSGE).blocked = false;
    chasm.publish(Events.OUTPUT_WRITELN, 'You toss the other end of the rope into the chasm which can be used to climb down.')
  }
}