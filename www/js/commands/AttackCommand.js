'use strict';

class AttackCommand {
  isCharacterPresent(character) {
    return !!Math.floor(Math.random() * 2);
  }

  isCharacterAttackable(character) {
    return character.word === 'goblin';
  }

  execute(tokens) {
    var output, verb, character, weapon;

    verb = tokens[0];

    if (tokens.length === 1) {
      chasm.publish(Events.OUTPUT_WRITELN, 'What do you wish to ' + verb.word + '?');
      return;
    }

    character = tokens[1];

    if (tokens.length === 2) {
      chasm.publish(Events.OUTPUT_WRITELN, 'What do you want to ' + verb.word + ' the ' + character.word + ' with?');
      return;
    }

    if (tokens.length !== 4 || tokens[2].word !== 'with') {
      chasm.publish(Events.OUTPUT_WRITELN, 'USAGE: ' + verb.word + ' <character> with <weapon>');
      return;
    }

    weapon = tokens[3];

    if (character.type !== TokenTypes.PRONOUN) {
      chasm.publish(Events.OUTPUT_WRITELN, 'You cannot ' + character.word + ' that.');
      return;
    }

    if (!this.isCharacterPresent(character)) {
      chasm.publish(Events.OUTPUT_WRITELN, 'You do not see the ' + character.word + ' here.');
      return;
    }

    if (!this.isCharacterAttackable(character)) {
      chasm.publish(Events.OUTPUT_WRITELN, 'You cannot ' + verb.word + ' the ' + character.word + '.');
      return;
    }

    if (weapon.type !== TokenTypes.NOUN) {
      chasm.publish(Events.OUTPUT_WRITELN, 'You cannot ' + weapon.word + ' with that.');
      return;
    }

    if (!chasm.player.items.has(weapon.word)) {
      chasm.publish(Events.OUTPUT_WRITELN, 'You are not holding the ' + weapon.word + '.');
      return;
    }

    // TODO: play out the attack with character and player damage.

    chasm.publish(Events.OUTPUT_WRITELN, 'You ' + verb.word + ' the ' + character.word + ' with the ' + weapon.word);
  }
}