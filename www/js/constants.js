'use strict';

const PrepLookup = Object.freeze({
  'tie'    : ['to','around'],
  'untie'  : ['from'],
  'take'   : ['from'],
  'put'    : ['in','into','on'],
  'unlock' : ['with'],
  'lock'   : ['with'],
  'take'   : ['from'],
  'open'   : ['with']
});

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
  SILVER_KEY      : 'silver key',
  TOOLBOX         : 'red toolbox',
  ROPE            : 'rope',
  MAPLE_TREE      : 'maple tree'
});

const Exits = Object.freeze({
  SHED_DOOR       : 'shed door',
  METAL_DOOR      : 'metal door',
  WOODEN_DOOR     : 'wooden door',
  FOREST2CHASM    : 'forest/chasm',
  CHASM2PASSGE    : 'chasm/passage',
  PASSGE2TROLLRM  : 'passage/trollroom'
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
  INPUT_PROMPT    : 'input/prompt',
  LIGHT_ON        : 'light/on',
  LIGHT_OFF       : 'light/off'
});

const nArticles = Object.freeze('a,an,the'.toDictionary());

const nVocabulary = Object.freeze((
  /* dire */ 'north,n,south,s,east,e,west,w,up,u,down,d,walk,go,' + 
  /* actn */ 'take,drop,open,close,attack,hit,look,l,inventory,i,put,examine,lock,unlock,foo,look,tie,untie,' +
  /* char */ 'goblin,troll,' +
  /* adjs */ 'silver,wooden,shiny,broken,dull,metal,small,red,rusty,maple,' + 
  /* item */ 'key,door,chest,sword,toolbox,shed,rope,tree,' +
  /* prep */ 'at,with,in,into,to,from,around'
  ).toDictionary());

const nItems = Object.freeze(([...Object.values(Items), ...Object.values(Exits), ...Object.values(Places)]).toDictionary());
