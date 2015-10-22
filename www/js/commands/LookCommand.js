'use strict';

class LookCommand {
  execute(data) {
    var itemName1, foundItems;

    if (data.length === 1) {
      chasm.publish(Events.OUTPUT_WRITELN, chasm.place.look());
      return;
    }

    if (data[1] === 'at') {
      if (data.length !== 3) {
        chasm.publish(Events.OUTPUT_WRITELN, 'What do you want to look at?');
      }
      else {
        chasm.publish('examine', ['examine', data[2]]);
      }
      return;
    }

    if (data[1] === 'in') {
      if (data.length !== 3) {
        chasm.publish(Events.OUTPUT_WRITELN, 'What do you want to look in?');
        return;
      }
    }

    if (data.length !== 3) {
      chasm.publish(Events.OUTPUT_WRITELN, 'I don\'t understand that sentence.');
      return;
    }

    itemName1 = data[2];
    foundItems = chasm.findItems(itemName1);

    if (foundItems.length === 1) {
      let itemRef1 = foundItems[0];
      if (itemRef1.opened) {
        chasm.publish(Events.OUTPUT_WRITELN, itemRef1.itemsToList());
      }
      else {
        chasm.publish(Events.OUTPUT_WRITELN, `The ${itemRef1.title} isn\'t open.`);
      }
      return;
    }

    chasm.publish(Events.OUTPUT_WRITELN, `Which ${itemName1} did you mean?`);
  }
}