'use strict';

const LangTypes = Object.freeze({
  ARTICLE     : 'article',
  ADVERB      : 'adverb',
  VERB        : 'verb',
  PRONOUN     : 'pronoun',
  ADJECTIVE   : 'adjective',
  NOUN        : 'noun',
  PREPOSITION : 'preposition'
});

// All of the valid words organized by language type

var vocabulary = {};
vocabulary[LangTypes.ARTICLE]     = ['a','an','the'],
vocabulary[LangTypes.ADVERB]      = [],
vocabulary[LangTypes.VERB]        = ['north','n','south','s','east','e','west','w','up','u','down','d','take','drop','open','close','attack','hit','look','l','inventory','i','put','examine','lock','unlock'],
vocabulary[LangTypes.PRONOUN]     = ['goblin'],
vocabulary[LangTypes.ADJECTIVE]   = ['shiny','wooden','silver','dull','bronze'],
vocabulary[LangTypes.NOUN]        = ['door','chest','sword', 'key', 'shed'],
vocabulary[LangTypes.PREPOSITION] = ['at','with','in','into'];

// Convert the arrays to dictionaries to make lookups faster

var validTokens = {};

Object.keys(vocabulary).forEach(function (element) {
  vocabulary[element].forEach(function (item) {
    validTokens[item] = {type: element, word: item};
  });
});

// Items

var itemTokens = {
  'shiny sword'  : {type: LangTypes.NOUN, word: 'shiny sword',  itemType: 'sword', className: 'ShinySword'},
  'dull sword'   : {type: LangTypes.NOUN, word: 'dull sword',   itemType: 'sword', className: 'DullSword'},
  'broken sword' : {type: LangTypes.NOUN, word: 'broken sword', itemType: 'sword', className: 'BrokenSword'},
  'wooden chest' : {type: LangTypes.NOUN, word: 'wooden chest', itemType: 'chest', className: 'WoodenChest'},
  'silver key'   : {type: LangTypes.NOUN, word: 'silver key',   itemType: 'key',   className: 'SilverKey'}
};

const Places = Object.freeze({
  FOREST_CLEARING : 'Forest Clearing',
  CHASM_ENTRANCE  : 'Chasm Entrance',
  NARROW_PASSAGE  : 'Narrow Passage',
  TROLL_ROOM      : 'Troll Room',
  SHED            : 'Shed'
});

const Events = Object.freeze({
  PLACE_CHANGED  : 'place/changed',
  PLAYER_SCORE   : 'player/score',
  PLAYER_SCORED  : 'player/scored',
  PLAYER_MOVE    : 'player/move',
  PLAYER_MOVED   : 'player/moved',
  OUTPUT_WRITE   : 'output/write',
  OUTPUT_WRITELN : 'output/writeln',
  OUTPUT_CLEAR   : 'output/clear',
  INPUT_WRITE    : 'input/write',
  INPUT_CLEAR    : 'input/clear',
  INPUT_PROMPT   : 'input/prompt',
  LIGHT_ON       : 'light/on',
  LIGHT_OFF      : 'light/off'
});
