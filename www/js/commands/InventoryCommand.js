'use strict';

class InventoryCommand {
  static verbs() { return ['i','inventory']; }
  execute(data) {
    chasm.publish(Events.OUTPUT_WRITELN, chasm.player.itemsToList());
  }
}