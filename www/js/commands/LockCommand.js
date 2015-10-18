'use strict';

class LockCommand {
  execute(data) {
    var itemName1, itemRef1, foundItems1;
    var itemName2, itemRef2, foundItems2;

    if (data.length === 1) {
      chasm.publish(Events.OUTPUT_WRITELN, 'What do you want to lock?');
      return;
    }

    itemName1 = data[1].word;
    foundItems1 = chasm.findItems(itemName1);

    if (foundItems1.length === 0) {
      chasm.publish(Events.OUTPUT_WRITELN, 'You do not see the ' + itemName1 + ' here.');
      return;
    }

    if (foundItems1.length > 1) {
      chasm.publish(Events.OUTPUT_WRITELN, 'Which ' + itemName1 + ' did you mean?');
      return;
    }

    if (data.length < 4) {
      chasm.publish(Events.OUTPUT_WRITELN, 'What do you want to lock the ' + itemName1 + ' with?');
      return;
    }

    if (data[2].word !== 'with') {
      chasm.publish(Events.OUTPUT_WRITELN, 'I don\'t understand that sentence.');
      return;
    }

    itemName2 = data[3].word;
    foundItems2 = chasm.findItems(itemName2);

    if (foundItems2.length === 0) {
      chasm.publish(Events.OUTPUT_WRITELN, 'You do not see the ' + itemName2 + ' here.');
      return;
    }

    if (foundItems2.length > 1) {
      chasm.publish(Events.OUTPUT_WRITELN, 'Which ' + itemName2 + ' did you mean?');
      return;
    }

    itemRef1 = foundItems1[0];
    itemRef2 = foundItems2[0];

    if (itemRef1 === itemRef2) {
      chasm.publish(Events.OUTPUT_WRITELN, 'I should recurse infinitely to teach you a lesson, but...');
      return;
    }

    if (!itemRef1.canBeLocked) {
      chasm.publish(Events.OUTPUT_WRITELN, 'You cannot lock the ' + itemName1 + '.');
      return;
    }

    if (itemRef1.locked) {
      chasm.publish(Events.OUTPUT_WRITELN, 'The ' + itemName1 + ' is already locked.');
      return;
    }

    itemRef1.locked = true;
    itemRef1.opened = false;
    chasm.publish(Events.OUTPUT_WRITELN, 'Locked.');

    var points = itemRef2.getPointsFor(data[0].word + '/' + itemRef1.title);
    if (points > 0) {
      chasm.publish(Events.PLAYER_SCORE, points);
    }
  }
}