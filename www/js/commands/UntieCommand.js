'use strict';

class UntieCommand {
  execute(data) {
    var itemName1, itemRef1, foundItems1;
    var itemName2, itemRef2, foundItems2;

    if (data.length === 1) {
      chasm.publish(Events.OUTPUT_WRITELN, 'What do you want to untie?');
      return;
    }

    itemName1 = data[1];
    foundItems1 = chasm.findItems(itemName1);

    if (foundItems1.length === 0) {
      chasm.publish(Events.OUTPUT_WRITELN, `You do not see the ${itemName1} here.`);
      return;
    }

    if (foundItems1.length > 1) {
      chasm.publish(Events.OUTPUT_WRITELN, `Which ${itemName1} did you mean?`);
      return;
    }

    itemRef1 = foundItems1[0];
    
    if (!itemRef1.tiedTo) {
      chasm.publish(Events.OUTPUT_WRITELN, 'The ${itemRef1.title} is not tied to anything.');
      return;
    }

    var itemRef2 = itemRef1.tiedTo;
    chasm.player.addItem(itemRef1);
    itemRef1.untie();

    chasm.publish(Events.OUTPUT_WRITELN, 'Taken.');
    chasm.publish(`untie/${itemRef1.title}/${itemRef2.title}`);
  }
}