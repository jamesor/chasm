'use strict';

class LookCommand {
  execute(data) {
    chasm.publish(Events.OUTPUT_WRITELN, chasm.place.look());
  }
}