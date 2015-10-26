'use strict';

class TieCommand {
  execute(data) {
    var itemName1, itemRef1, foundItems1;
    var itemName2, itemRef2, foundItems2;

    if (data.length === 1) {
      chasm.publish(Events.OUTPUT_WRITELN, 'What do you want to tie?');
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

    if (data.length < 4) {
      chasm.publish(Events.OUTPUT_WRITELN, `What do you want to tie the ${itemName1} around?`);
      return;
    }

    if (!'around,to,on'.includes(data[2])) {
      chasm.publish(Events.OUTPUT_WRITELN, 'I don\'t understand that sentence.');
      return;
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

    if (!itemRef1.canUseWith('tie', itemRef2.title)) {
      chasm.publish(Events.OUTPUT_WRITELN, `You can't tie the ${itemRef1.title} around the ${itemRef2.title}`);
      return;
    }

    if (itemRef1 === itemRef2) {
      chasm.publish(Events.OUTPUT_WRITELN, 'I should recurse infinitely to teach you a lesson, but...');
      return;
    }

    if (itemRef1.tiedTo === itemRef2) {
      chasm.publish(Events.OUTPUT_WRITELN, 'You\'ve already done that.');
      return;
    }
    
    if (itemRef1.tiedTo) {
      chasm.publish(Events.OUTPUT_WRITELN, 'The ${itemRef1.title} is already tied to another object');
      return;
    }

    itemRef1.tie(itemRef2);

    chasm.player.removeItem(itemRef1.title);
    chasm.place.addItem(itemRef1);

    chasm.publish(Events.OUTPUT_WRITELN, `The ${itemRef1.title} is now securely fasted to the ${itemRef2.title}.`);
    chasm.publish(Events.PLAYER_SCORE, `tie/${itemRef1.title}/${itemRef2.title}`);
    chasm.publish(`tie/${itemRef1.title}/${itemRef2.title}`);
  }
}