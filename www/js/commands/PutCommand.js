'use strict';

class PutCommand {
  execute(data) {
    var itemName1, itemRef1, foundItems1;
    var itemName2, itemRef2, foundItems2;

    if (data.length === 1) {
      chasm.publish(Events.OUTPUT_WRITELN, 'What do you want to put?');
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

    if ('in,into'.indexOf(data[2]) === -1) {
      chasm.publish(Events.OUTPUT_WRITELN, 'I don\'t understand that sentence.');
      return;
    }

    if (data.length < 4) {
      chasm.publish(Events.OUTPUT_WRITELN, `What do you want to put the ${itemName1} in?`);
    }

    itemName2 = data[3];
    foundItems2 = chasm.findItems(itemName2);

    if (foundItems2.length === 0) {
      chasm.publish(Events.OUTPUT_WRITELN, `You do not see the ${itemName2} here.`);
      return;
    }

    if (foundItems2.length > 1) {
      chasm.publish(Events.OUTPUT_WRITELN, `Which ${itemName2} did you mean?`);
      return;
    }

    itemRef1 = foundItems1[0];
    itemRef2 = foundItems2[0];

    if (itemRef1 === itemRef2) {
      chasm.publish(Events.OUTPUT_WRITELN, 'I should recurse infinitely to teach you a lesson, but...');
      return;
    }

    if (!itemRef1.canBeTaken) {
      chasm.publish(Events.OUTPUT_WRITELN, `You cannot take the ${itemName1}.`);
      return;
    }

    if (!itemRef2.canHoldItems) {
      chasm.publish(Events.OUTPUT_WRITELN, `That can\'t contain things.`);
      return;
    }

    if (!itemRef2.opened) {
      chasm.publish(Events.OUTPUT_WRITELN, `The ${itemName2} is closed.`);
      return;
    }

    chasm.getRef(itemRef1.location).removeItem(itemRef1.title);
    chasm.getRef(itemRef2.title).addItem(itemRef1);
    chasm.publish(Events.OUTPUT_WRITELN, `You put the ${itemName1} into the ${itemName2}.`);
  }
}