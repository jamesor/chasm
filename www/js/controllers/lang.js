var Articles = {'a':true, 'an':true, 'the':true};

var TokenTypes = {
  VERB        : 'verb',
  NOUN        : 'noun',
  PRONOUN     : 'pnoun',
  ADJECTIVE   : 'adj',
  PREPOSITION : 'prep',
  ADVERBS     : 'adv',
  CONJUNCTION : 'conj',
  ITEM        : 'item'
};

var ValidTokens = {
  'attack' : {type: TokenTypes.VERB, word: 'attack'},
  'hit'    : {type: TokenTypes.VERB, word: 'hit'},
  'goblin' : {type: TokenTypes.PRONOUN, word: 'goblin'},
  'shiny'  : {type: TokenTypes.ADJECTIVE, word: 'shiny'},
  'dull'   : {type: TokenTypes.ADJECTIVE, word: 'dull'},
  'broken' : {type: TokenTypes.ADJECTIVE, word: 'broken'},
  'sword'  : {type: TokenTypes.NOUN, word: 'sword'},
  'with'   : {type: TokenTypes.PREPOSITION, word: 'with'},
  'open'   : {type: TokenTypes.VERB, word: 'open'},
  'close'  : {type: TokenTypes.VERB, word: 'close'},
  'door'   : {type: TokenTypes.NOUN, word: 'door'},
  'wooden' : {type: TokenTypes.ADJECTIVE, word: 'wooden'},
  'chest'  : {type: TokenTypes.NOUN, word: 'chest'}
};

var ItemTokens = {
  'shiny sword'  : {type: TokenTypes.NOUN, word: 'shiny sword', common: 'sword'},
  'dull sword'   : {type: TokenTypes.NOUN, word: 'dull sword', common: 'sword'},
  'broken sword' : {type: TokenTypes.NOUN, word: 'broken sword', common: 'sword'},
  'wooden chest' : {type: TokenTypes.NOUN, word: 'wooden chest', common: 'chest', isOpenable:true, opened:false}
};

function parseSentence(sentence) {
  var tokens = sentence.split(' ');
  var outcome;

  for (var i=tokens.length-1; i>=0; i--) {
    if (Articles[tokens[i]]) {
      tokens.splice(i, 1);
    }
    else if (ValidTokens[tokens[i]]) {
      tokens[i] = ValidTokens[tokens[i]];
      if (TokenTypes.ADJECTIVE === tokens[i].type && tokens.length > i) {
        tokens[i] = ItemTokens[tokens[i].word + ' ' + tokens[i+1].word];
        tokens.splice(i+1, 1);
      }
    }
    else {
      return 'I don\'t understand the word ' + tokens[i];
    }
  }

  if (tokens[0].type === TokenTypes.VERB) {
    switch (tokens[0].word) {
      case 'hit':
      case 'attack':
        outcome = attack(tokens);
        break;
      case 'open':
        outcome = open(tokens);
        break;
      case 'close':
        outcome = close(tokens);
        break;
    }
  }

  return outcome;
}

function isCharacterPresent(character) {
  return !!Math.floor(Math.random() * 2);
}

function isCharacterAttackable(character) {
  return character.word === 'goblin';
}

function isPlayerHolding(item) {
  return !!Math.floor(Math.random() * 2);
}

function attack(tokens) {
  var outcome, verb, character, weapon;

  verb = tokens[0];

  if (tokens.length === 1) {
    return 'What do you wish to ' + verb.word + '?';
  }

  character = tokens[1];

  if (tokens.length === 2) {
    return 'What do you want to ' + verb.word + ' the ' + character.word + ' with?';
  }

  if (tokens.length !== 4 || tokens[2].word !== 'with') {
    return 'USAGE: ' + verb.word + ' <character> with <weapon>';
  }

  weapon = tokens[3];

  if (character.type !== TokenTypes.PRONOUN) {
    return 'You cannot ' + character.word + ' that.';
  }

  if (!isCharacterPresent(character)) {
    return 'You do not see the ' + character.word + ' here.';
  }

  if (!isCharacterAttackable(character)) {
    return 'You cannot ' + verb.word + ' the ' + character.word + '.';
  }

  if (weapon.type !== TokenTypes.NOUN) {
    return 'You cannot ' + weapon.word + ' with that.';
  }

  if (!isPlayerHolding(weapon.word)) {
    return 'You are not holding the ' + weapon.word + '.';
  }

  // TODO: play out the attack with character and player damage.

  return 'You ' + verb.word + ' the ' + character.word + ' with the ' + weapon.word;
}

function open(tokens) {
  var outcome, item1, item2;

  if (tokens.length === 1) {
    return 'What do you wish to open?';
  }

  item1 = tokens[1];

  if (!item1.isOpenable) {
    return 'You cannot open the ' + item1.word + '.';
  }

  if (item1.opened) {
    return 'The ' + item1.word + ' is already opened.';
  }

  item1.opened = true;
  return 'You opened the ' + item1.word + '.';
}

function close(tokens) {
  var outcome, item1, item2;

  if (tokens.length === 1) {
    return 'What do you wish to close?';
  }

  item1 = tokens[1];

  if (!item1.isOpenable) {
    return 'You cannot close the ' + item1.word + '.';
  }

  if (!item1.opened) {
    return 'The ' + item1.word + ' is already closed.';
  }

  item1.opened = false;
  return 'You closed the ' + item1.word + '.';
}

/*
console.log(parseSentence('attack the goblin with the shiny sword'));
console.log(parseSentence('hit the goblin with the shiny sword'));
console.log(parseSentence('hit the rabbit with the magic hat'));
console.log(parseSentence('attack goblin with sword'));
console.log(parseSentence('attack the goblin'));
console.log(parseSentence('attack the sword'));
console.log(parseSentence('attack'));
*/

console.log(parseSentence('open shiny sword'));
console.log(parseSentence('open wooden chest'));
console.log(parseSentence('open the wooden chest'));
console.log(parseSentence('close wooden chest'));
console.log(parseSentence('close wooden chest'));
console.log(parseSentence('open the wooden chest'));

