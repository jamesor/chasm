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

const nVocabulary = Object.freeze((
  /* dire */ 'north,n,south,s,east,e,west,w,up,u,down,d,walk,go,' + 
  /* actn */ 'take,drop,open,close,attack,hit,look,l,inventory,i,put,examine,' +
             'lock,unlock,foo,look,tie,untie,get,pick,' +
  /* char */ 'goblin,troll,' +
  /* adjs */ 'silver,wooden,shiny,broken,dull,metal,small,red,rusty,maple,' + 
  /* item */ 'key,door,chest,sword,toolbox,shed,rope,tree,' +
  /* prep */ 'at,with,in,into,to,from,around'
  ).toDictionary());

const nItems = Object.freeze(([
    ...Object.values(Items), 
    ...Object.values(Exits), 
    ...Object.values(Places)
  ]).toDictionary());
