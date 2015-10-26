'use strict';

class DropCommand {
  execute(data) {
    var itemName1, item1ref, foundItems;

    if (data.length === 1) {
      chasm.publish(Events.OUTPUT_WRITELN, 'What do you want to drop?');
      return;
    }

    itemName1 = data[1];
    foundItems = chasm.player.findItems(itemName1);

    if (foundItems.length === 0) {
      chasm.publish(Events.OUTPUT_WRITELN, `You do not have the ${itemName1}.`);
      return;
    }

    if (foundItems.length === 1) {
      let itemRef1 = foundItems[0];
      chasm.getRef(itemRef1.parent).removeItem(itemRef1.title);
      chasm.place.addItem(itemRef1);
      chasm.publish(Events.OUTPUT_WRITELN, 'Dropped.');
      return;
    }

    chasm.publish(Events.OUTPUT_WRITELN, `Which ${itemName1} did you mean?`);
  }
}