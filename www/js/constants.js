'use strict';

const Places = Object.freeze({
  FOREST_CLEARING : 'Forest Clearing',
  CHASM_ENTRANCE  : 'Chasm Entrance',
  NARROW_PASSAGE  : 'Narrow Passage',
  TROLL_ROOM      : 'Troll Room'
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
  INPUT_PROMPT   : 'input/prompt'
});

const Actions = Object.freeze({
  TAKE        : 'take',
  DROP        : 'drop',
  NORTH       : 'north',
  SOUTH       : 'south',
  EAST        : 'east',
  WEST        : 'west',
  UP          : 'up',
  DOWN        : 'down',
  LOOK        : 'look',
  INVENTORY   : 'inventory'
});

const KnownVerbs = Object.freeze({
  'take'      : Actions.TAKE,
  'drop'      : Actions.DROP,
  'n'         : Actions.NORTH,
  'north'     : Actions.NORTH,
  's'         : Actions.SOUTH,
  'south'     : Actions.SOUTH,
  'e'         : Actions.EAST,
  'east'      : Actions.EAST,
  'w'         : Actions.WEST,
  'west'      : Actions.WEST,
  'u'         : Actions.UP,
  'up'        : Actions.UP,
  'd'         : Actions.DOWN,
  'down'      : Actions.DOWN,
  'l'         : Actions.LOOK,
  'look'      : Actions.LOOK,
  'i'         : Actions.INVENTORY,
  'inventory' : Actions.INVENTORY
});

const UselessWords = new Set(['a','an','the','go','walk','climb', 'to']);

