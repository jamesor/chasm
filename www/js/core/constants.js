'use strict';

const PrepLookup = Object.freeze({
  'tie'    : ['to','around'],
  'untie'  : ['from'],
  'take'   : ['from'],
  'put'    : ['in','into','on'],
  'unlock' : ['with'],
  'lock'   : ['with'],
  'take'   : ['from'],
  'pick up': ['from'],
  'get'    : ['from'],
  'open'   : ['with']
});

const Events = Object.freeze({
  GAME_START      : 'game/start',
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
  INPUT_PROMPT    : 'input/prompt'
});

const nArticles = Object.freeze('a,an,the'.toDictionary());

const nTwoWordVerbs = Object.freeze('pick up,put down,look in,look at'.toDictionary());
