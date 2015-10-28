'use strict';

class LockUnlockCommand {

  execute(data) {
    const TERM = 'lock';
    var input, output, target, scorestr;

    input = InputUtils.parse(data, 'with');

    if (!input.noun1) {
      output = 'What do you want to ${input.verb}?';
    }
    else if (!input.noun1.item) {
      output = input.noun1.output;
    }
    else if (!input.prep) {
      output = 'I don\'t understand that sentence.';
    }
    else if (!input.noun2) {
      output = `What do you want to ${input.verb} the ${input.noun1.term} ${input.prep}?`;
    }
    else if (!input.noun2.item) {
      output = input.noun2.output;
    }
    else if (input.noun1.item === input.noun2.item) {
      output = 'I should recurse infinitely to teach you a lesson, but...';
    }
    else if (!input.noun2.item.canBeTaken) {
      output = `You cannot take the ${input.noun2.term}.`;
    }
    else if (!input.noun2.item.canDoWith(TERM, input.noun1.item.title)) {
      output = `You can't ${input.verb} the ${input.noun1.term} with the ${input.noun2.term}`;
    }
    else if (!input.noun1.item.canBeLocked) {
      output = `You cannot ${input.verb} the ${input.noun1.term}`;
    }
    else if (!input.noun1.item.locked && input.verb !== TERM) {
      output = `The ${input.noun1.term} is already unlocked.`;
    }
    else if (input.noun1.item.locked && input.verb === TERM) {
      output = `The ${input.noun1.term} is already locked.`;
    }
    else {
      if (input.noun1.item.opened) {
        input.noun1.item.opened = false;
        chasm.publish(Events.OUTPUT_WRITE, `(After closing the ${input.noun1.item.title})`);
      }
      input.noun1.item.locked = (input.verb === TERM);
      output = `You ${input.verb}ed the ${input.noun1.item.title}.`;
      scorestr = `/${input.noun2.item.title}`;
    }

    chasm.publish(Events.OUTPUT_WRITELN, output);
    chasm.publish(Events.PLAYER_SCORE, `${input.verb}/${input.noun1.item.title}${scorestr}`);
  }
}