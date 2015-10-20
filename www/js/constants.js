'use strict';

const Places = Object.freeze({
  FOREST_CLEARING : 'Forest Clearing',
  CHASM_ENTRANCE  : 'Chasm Entrance',
  NARROW_PASSAGE  : 'Narrow Passage',
  TROLL_ROOM      : 'Troll Room',
  SHED            : 'Shed',
  TROLL_ARMOURY   : 'Troll Armoury',
  TROLL_KITCHEN   : 'Troll Kitchen'
});

const Items = Object.freeze({
  SHINY_SWORD     : 'shiny sword',
  DULL_SWORD      : 'dull sword',
  BROKEN_SWORD    : 'broken sword',
  WOODEN_CHEST    : 'wooden chest',
  SILVER_KEY      : 'silver key'
});

const Exits = Object.freeze({
  DEFAULT         : 'default exit',
  SHED_DOOR       : 'shed door',
  ARMOURY_DOOR    : 'armoury door',
  KITCHEN_DOOR    : 'kitchen door'
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

const nArticles = Object.freeze('a,an,the'.toDictionary());

const nVocabulary = Object.freeze((
  /* dire */ 'north,n,south,s,east,e,west,w,up,u,down,d,' + 
  /* actn */ 'take,drop,open,close,attack,hit,look,l,inventory,i,put,examine,lock,unlock,foo,' +
  /* char */ 'goblin,troll,' +
  /* adjs */ 'silver,wooden,shiny,broken,dull,' + 
  /* item */ 'key,door,chest,sword,' +
  /* prep */ 'at,with,in,into'
  ).toDictionary());

const nItems = Object.freeze(([...Items.values(), ...Exits.values()]).toDictionary());
