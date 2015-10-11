'use strict';

const Places = Object.freeze({
  FOREST_CLEARING : 'Forest Clearing',
  CHASM_ENTRANCE  : 'Chasm Entrance',
  NARROW_PASSAGE  : 'Narrow Passage',
  TROLL_ROOM      : 'Troll Room'
});

const Directions = Object.freeze({
  NORTH : 'n',
  SOUTH : 's',
  EAST  : 'e',
  WEST  : 'w',
  UP    : 'u',
  DOWN  : 'd'
});

class Place {
  constructor(title, description) {
    this.title = title || 'Unknown location';
    this.description = description || 'Nothing to see here.';
    this.items = new Map();
    this.exits = new Exits();
  }
  get imagePath() {
    return 'images/'+this.title.toLowerCase().replace(/ /g,'-')+'.png';
  }
  describe() {
    var str = this.description, ary = [], last;
    if (this.items.size > 0) {
      this.items.forEach(function (item) {
        ary.push(item.description);
      });
      last = ary.pop();
      str += ' You see ' + ((ary.length > 0) ? ary.join(', ') + ' and ' : '') + last + '.';
    }
    return str;
  }
}

class Exits extends Map {
  go(direction) {
    // todo: check to see if the direction requires unblocking/problem solving
    return this.get(direction) || 'You cannot travel in that direction.';
  }
}

class Item {
  constructor(title, description) {
    this.title = title || 'Unknown item';
    this.description = description || 'Unknown';
  }
}

class LightEmittingItem extends Item {
  constructor(title, description, light) {
    super(title, description);
    this.isOn = false;
    this.light = light || 0;
  }
  on() {
    console.log(this);
    if (this.isOn) {
      app.publish('writeOutput', this.title + ' is already on.');
    } else if (this.light === 0) {
      app.publish('writeOutput', this.title + ' can no longer emit light.');
    } else {
      this.isOn = true;
      app.publish('writeOutput', this.title + ' is now emitting light.');
      app.publish('light', this);
      app.subscribe('move', this.onMove, this);
    }
  }
  off() {
    if (this.isOn) {
      this.isOn = false;
      this.light = 0
      app.publish('writeOutput', this.title + ' has stopped emitting light.');
      app.publish('light', this);
      app.unsubscribe('move', this.onMove, this);
    } else {
      app.publish('writeOutput', this.title + ' is already off.');
    }
  }
  onMove() {
    console.log(this);
    if (this.isOn) {
      if (--this.light < 1) {
        this.off();
      }
    }
    console.log('moved');
  }
}

var game = {places:{}};

// Places
game.places[Places.FOREST_CLEARING] = new Place(Places.FOREST_CLEARING, 'You are standing in a forest clearing with a path leading to the east where you see a rocky mountainside. All other directions are impassable.');
game.places[Places.CHASM_ENTRANCE]  = new Place(Places.CHASM_ENTRANCE, 'You are standing at the entrance to a chasm which can be entered by climbing down. There is a clearing to the west.');
game.places[Places.NARROW_PASSAGE]  = new Place(Places.NARROW_PASSAGE, 'You begin your decent through the crack in the mountainside. It\'s a pretty tight fit, but you manage.');
game.places[Places.TROLL_ROOM]      = new Place(Places.TROLL_ROOM, 'You are in the Troll\'s Room. It\'s dark and smelly.');

// Exits
game.places[Places.FOREST_CLEARING].exits.set(Directions.EAST, game.places[Places.CHASM_ENTRANCE]);
game.places[Places.CHASM_ENTRANCE].exits.set(Directions.WEST, game.places[Places.FOREST_CLEARING]);

game.places[Places.CHASM_ENTRANCE].exits.set(Directions.DOWN, game.places[Places.NARROW_PASSAGE]);
game.places[Places.NARROW_PASSAGE].exits.set(Directions.UP, game.places[Places.CHASM_ENTRANCE]);

game.places[Places.NARROW_PASSAGE].exits.set(Directions.DOWN, game.places[Places.TROLL_ROOM]);
game.places[Places.TROLL_ROOM].exits.set(Directions.UP, game.places[Places.NARROW_PASSAGE]);

// Items
var lantern = new LightEmittingItem('lantern', 'a rusty oil lantern', 4);
game.places[Places.FOREST_CLEARING].items.set(lantern.title, lantern);

var torch = new LightEmittingItem('torch', 'a well structured torch', 4);
game.places[Places.FOREST_CLEARING].items.set(torch.title, torch);

var foo = new Item('blob', 'a blue blob');
game.places[Places.FOREST_CLEARING].items.set(foo.title, foo);




