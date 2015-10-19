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

const Vocabulary = Object.freeze({
  [LangTypes.ARTICLE]     : ['a','an','the'],
  [LangTypes.ADVERB]      : [],
  [LangTypes.VERB]        : ['north','n','south','s','east','e','west','w','up','u','down','d','take','drop','open','close','attack','hit','look','l','inventory','i','put','examine','lock','unlock','foo'],
  [LangTypes.PRONOUN]     : ['goblin'],
  [LangTypes.ADJECTIVE]   : ['shiny','wooden','silver','dull','bronze'],
  [LangTypes.NOUN]        : ['door','chest','sword', 'key', 'shed'],
  [LangTypes.PREPOSITION] : ['at','with','in','into']
});

const Items = Object.freeze({
  SHINY_SWORD  : 'shiny sowrd',
  DULL_SWORD   : 'dull sword',
  BROKEN_SWORD : 'broken sword',
  WOODEN_CHEST : 'wooden chest',
  SILVER_KEY   : 'silver key'
});

const ItemTokens = Object.freeze({
  [Items.SHINY_SWORD]  : {type: LangTypes.NOUN, word: Items.SHINY_SWORD},
  [Items.DULL_SWORD]   : {type: LangTypes.NOUN, word: Items.DULL_SWORD},
  [Items.BROKEN_SWORD] : {type: LangTypes.NOUN, word: Items.BROKEN_SWORD},
  [Items.WOODEN_CHEST] : {type: LangTypes.NOUN, word: Items.WOODEN_CHEST},
  [Items.SILVER_KEY]   : {type: LangTypes.NOUN, word: Items.SILVER_KEY}
});

const Places = Object.freeze({
  FOREST_CLEARING : 'Forest Clearing',
  CHASM_ENTRANCE  : 'Chasm Entrance',
  NARROW_PASSAGE  : 'Narrow Passage',
  TROLL_ROOM      : 'Troll Room',
  SHED            : 'Shed'
});

const Exits = Object.freeze({
  DEFAULT         : 'default exit',
  SHED_DOOR       : 'shed door'
});

const Events = Object.freeze({
  PLACE_CHANGED   : 'place/changed',
  PLAYER_SCORE    : 'player/score',
  PLAYER_SCORED   : 'player/scored',
  PLAYER_MOVE     : 'player/move',
  PLAYER_MOVED    : 'player/moved',
  OUTPUT_WRITE    : 'output/write',
  OUTPUT_WRITELN  : 'output/writeln',
  OUTPUT_CLEAR    : 'output/clear',
  INPUT_WRITE     : 'input/write',
  INPUT_CLEAR     : 'input/clear',
  INPUT_PROMPT    : 'input/prompt',
  LIGHT_ON        : 'light/on',
  LIGHT_OFF       : 'light/off'
});
