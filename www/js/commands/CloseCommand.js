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

      if (!itemRef1.canBeOpened) {
        chasm.publish(Events.OUTPUT_WRITELN, 'You cannot close the ' + itemName1 + '.');
        return;
      }

      if (!itemRef1.opened) {
        let resp = [
          'I think you\'ve already done that.',
          'You think it isn\'t?',
          'Look around.'
        ]
        chasm.publish(Events.OUTPUT_WRITELN, resp[MathUtils.getRandomInt(0,resp.length)]);
        return;
      }

      itemRef1.opened = false;
      let output = 'Closed.';

      if (itemRef1.openMessage) {
        output = itemRef1.closeMessage;
      }

      chasm.publish(Events.OUTPUT_WRITELN, output);
      return;
    }

    chasm.publish(Events.OUTPUT_WRITELN, 'Which ' + itemName1 + ' did you mean?');
  }
}