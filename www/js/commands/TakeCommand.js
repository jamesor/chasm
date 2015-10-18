'use strict';

class TakeCommand {
  execute(data) {
    var itemName1, itemRef1, foundItems;

    if (data.length === 1) {
      chasm.publish(Events.OUTPUT_WRITELN, 'What do you want to take?');
      return;
    }

    itemName1 = data[1].word;
    foundItems = chasm.findItems(itemName1);

    if (foundItems.length === 0) {
      chasm.publish(Events.OUTPUT_WRITELN, 'You do not see the ' + itemName1 + ' here.');
      return;
    }

    if (foundItems.length === 1) {
      itemRef1 = foundItems[0];

      if (!itemRef1.canBeTaken) {
        chasm.publish(Events.OUTPUT_WRITELN, 'You cannot take the ' + itemName1 + '.');
        return;
      }

      if (chasm.player.hasItem(itemName1)) {
        chasm.publish(Events.OUTPUT_WRITELN, 'You already have the ' + itemName1 + '.');
        return;
      }

      chasm.getRef(itemRef1.location).removeItem(itemRef1.title);
      chasm.player.addItem(itemRef1);
      chasm.publish(Events.OUTPUT_WRITELN, 'Taken.');
      return;
    }

    chasm.publish(Events.OUTPUT_WRITELN, 'Which ' + itemName1 + ' did you mean?');
  }
}