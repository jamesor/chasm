'use strict';

class OpenCommand {
  execute(data) {
    var itemName1, foundItems;

    if (data.length === 1) {
      chasm.publish(Events.OUTPUT_WRITELN, 'What do you wish to open?');
      return;
    }

    itemName1 = data[1].word;
    foundItems = chasm.findItems(itemName1);

    if (foundItems.length === 0) {
      chasm.publish(Events.OUTPUT_WRITELN, 'You do not see the ' + itemName1 + ' here.');
      return;
    }

    if (foundItems.length === 1) {
      let itemRef1 = foundItems[0];
      
      if (itemRef1.locked) {
        chasm.publish(Events.OUTPUT_WRITELN, 'The ' + itemName1 + ' is locked.');
        return;
      }

      if (!itemRef1.canBeOpened) {
        chasm.publish(Events.OUTPUT_WRITELN, 'You cannot open the ' + itemName1 + '.');
        return;
      }

      if (itemRef1.opened) {
        chasm.publish(Events.OUTPUT_WRITELN, 'The ' + itemName1 + ' is already open.');
        return;
      }

      itemRef1.opened = true;

      let output = 'Opened.';

      if (itemRef1.openMessage) {
        output = itemRef1.openMessage;
      }

      if (itemRef1.hasItems()) {
        output += ', revealing ' + itemRef1.itemsToSentence();
      }
      output += '.';
      chasm.publish(Events.OUTPUT_WRITELN, output);
      return;
    }

    chasm.publish(Events.OUTPUT_WRITELN, 'Which ' + itemName1 + ' did you mean?');
  }
}