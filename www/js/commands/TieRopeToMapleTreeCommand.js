'use strict';

class TieRopeToMapleTreeCommand {
  execute() {
    chasm.getRef(Exits.CHASM2PASSGE).blocked = false;
    chasm.publish(Events.OUTPUT_WRITELN, 'You toss the loose end of the rope into the chasm which can now be used to climb down.')
  }
}