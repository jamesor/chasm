'use strict';

class ExamineCommand {
  execute(data) {
    var itemName1, itemRef1, foundItems;

    if (data.length === 1) {
      chasm.publish(Events.OUTPUT_WRITELN, 'What do you want to examine?');
      return;
    }

    itemName1 = data[1];
    foundItems = chasm.findItems(itemName1);

    if (foundItems.length === 0) {
      chasm.publish(Events.OUTPUT_WRITELN, `You do not see the ${itemName1} here.`);
      return;
    }

    if (foundItems.length === 1) {
      itemRef1 = foundItems[0];

      if (!itemRef1.longDescription) {
        chasm.publish(Events.OUTPUT_WRITELN, `I see nothing special about the ${itemName1}.`);
        return;
      }

      chasm.publish(Events.OUTPUT_WRITELN, itemRef1.longDescription);
      return;
    }

    chasm.publish(Events.OUTPUT_WRITELN, `Which ${itemName1} did you mean?`);
  }
}