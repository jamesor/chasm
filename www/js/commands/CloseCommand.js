'use strict';

class CloseCommand {
  execute(data) {
    var itemName1, itemRef1, foundItems;

    if (data.length === 1) {
      chasm.publish(Events.OUTPUT_WRITELN, 'What do you want to close?');
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

      if (itemRef1.location !== 'player') {
        chasm.publish(Events.OUTPUT_WRITELN, 'You are not carrying the ' + itemName1 + '.');
        return;
      }
      
      if (!itemRef1.canBeOpened) {
        chasm.publish(Events.OUTPUT_WRITELN, 'You cannot close the ' + itemName1 + '.');
        return;
      }

      if (!itemRef1.opened) {
        chasm.publish(Events.OUTPUT_WRITELN, 'The ' + itemName1 + ' is already closed.');
        return;
      }

      itemRef1.opened = false;
      chasm.publish(Events.OUTPUT_WRITELN, 'You closed the ' + itemName1 + '.');
      return;
    }

    chasm.publish(Events.OUTPUT_WRITELN, 'Which ' + itemName1 + ' did you mean?');
  }
}