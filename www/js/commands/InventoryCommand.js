'use strict';

class InventoryCommand {
  execute(data) {
    chasm.publish(Events.OUTPUT_WRITELN, chasm.player.items.toString());
  }
}