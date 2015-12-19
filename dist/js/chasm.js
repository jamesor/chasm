/*!
 * chasm v0.9.0 (https://github.com/jamesor/chasm.git)
 * A browser-based text adventure game engine
 * Copyright 2015 James O'Reilly
 * Licensed under the MIT license
 */

"use strict";

Array.prototype.toDictionary = function() {
  var dict = {};
  this.forEach(word => dict[word] = true);
  return dict;
};

String.prototype.sizeTo = function(len, chr) {
  return (this + new Array(len + 1).join(chr || ' ')).substr(0, len);
}

String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.toDictionary = function() {
  return this.split(',').toDictionary();
};

// Shims

if (typeof Object.values === 'undefined') {
  Object.values = obj => Object.keys(obj).map(key => obj[key]);
}
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

class InputUtils {

  static tokenize(input) {
    var tokens = input.split(/\s+/);
    var token;

    for (let i=tokens.length-1; i>=0; i--) {
      token = tokens[i];
      if (nArticles[token]) {
        tokens.splice(i, 1);
      } 
      else if (nVocabulary[token]) {
        if (tokens.length > i) {
          token += ' ' + tokens[i+1];
          if (nItems[token] || nTwoWordVerbs[token]) {
            tokens[i] = token;
            tokens.splice(i+1, 1);
          }
        }
      }
      else {
        return `I don't know the word ${token}`;
      }
    }

    if (tokens.length === 0) {
      return 'I beg your pardon?';
    }

    return tokens;
  }

  static parse(data) {
    var verb  = data[0];
    var prepList = PrepLookup[verb];
    var noun1 = (data[1]) ? ItemsProxy.findAll(data[1]) : null;
    var prep  = (data[2] && (prepList && prepList.indexOf(data[2]) !== -1)) ? data[2] : null;
    var noun2 = (data[3]) ? ItemsProxy.findAll(data[3]) : null;
    var item, target, output;

    if (noun1) {
      item = noun1.item;
      output = noun1.output;
    }

    if (noun2) {
      target = noun2.item;
      output = output || noun2.output;
    }

    prep = prep || (prepList) ? prepList[0] : null;

    return {verb, noun1, prep, noun2, item, target, output};
  }

  static testVerb(input) {
    if (!input.item) {
      return `What do you want to ${input.verb}?`;
    }
  }

  static testNoun1(input) {
    if (input.noun1 && input.noun1.output) {
      return input.noun1.output;
    }
  }

  static testPrep(input) {
    if (!input.prep) {
      return `What do you want to ${input.verb} the ${input.noun1.term} ${input.validPrep}?`;
    }
  }

  static testNoun2(input) {
    if (!input.noun2) {
      return `What do you want to ${input.verb} the ${input.noun1.term} ${input.prep}?`;
    }
    else if (input.noun2.output) {
      return input.noun2.output;
    }
    else if (input.item === input.target) {
      return 'I should recurse infinitely to teach you a lesson, but...';
    }
  }

  static getAlreadyDoneResponse() {
    let resp = [
      'I think you\'ve already done that.',
      'You think it isn\'t?',
      'Look around.'
    ];
    return resp[MathUtils.getRandomInt(0, resp.length)];
  }

  static testAction(input) {
    var result = input.item.canDo(input.verb);
    if (typeof result === 'string') {
      return result;
    } else if (result === false) {
      return `The ${input.noun1.term} isn't something you can ${input.verb}.`;
    }
  }

  static testActionWithTarget(input) {
    if (!input.item.canDoWith(input.verb, input.target.title)) {
      return `You cannot ${input.verb} the ${input.noun1.term} ${input.prep} the ${input.noun2.term}.`;
    }
  }

  static testVerbItem(input) {
    return InputUtils.testVerb(input) ||
           InputUtils.testNoun1(input) ||
           InputUtils.testAction(input);
  }

  static testVerbItemWithTarget(input) {
    return InputUtils.testVerb(input) ||
           InputUtils.testNoun1(input) ||
           InputUtils.testPrep(input) ||
           InputUtils.testNoun2(input) ||
           InputUtils.testActionWithTarget(input);
  }

}
class MathUtils {
  // Returns true or false randomly
  static getRandomBoolean() {
    return !!Math.floor(Math.random() * 2);
  }
  
  // Returns a random number between 0 (inclusive) and 1 (exclusive)
  static getRandom() {
    return Math.random();
  }

  // Returns a random number between min (inclusive) and max (exclusive)
  static getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  // Returns a random integer between min (included) and max (excluded)
  static getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // Returns a random integer between min (included) and max (included)
  static getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
class ItemsProxy {

  static findAll(term) {
    var playerItems = chasm.player.findItems(term);
    var placeItems = chasm.place.findItems(term);
    var foundItems = [...playerItems, ...placeItems];
    var item = null;
    var output = '';

    if (foundItems.length === 0) {
      output = `You do not see the ${term} here.`;
    }
    else if (foundItems.length === 1) {
      item = foundItems[0];
    }
    else if (foundItems.length > 1) {
      output = `Which ${term} did you mean?`;
    }

    return {term, item, output};
  }

}
class BaseApp {
  constructor(config) {
    this.initModels(config);
    this.initControllers(config);
    this.initCommands(config);
    this.subscribe(Events.GAME_START, this.startGame, this, true);
  }

  //-------------------------------
  // Pub/Sub Event Bus

  registerCommand(topic, cmd, fireOnce) {
    if (!this.topics.has(topic)) this.topics.set(topic, []);
    this.topics.get(topic).push({cmd, fireOnce});
  }
  
  subscribe(topic, fn, cxt, fireOnce) {
    if (!this.topics.has(topic)) this.topics.set(topic, []);
    this.topics.get(topic).push({fn, cxt, fireOnce});
  }

  unsubscribe(topic, fn, cxt) {
    if (this.topics.has(topic) && this.topics.get(topic).length > 0) {
      // todo: probably not needed tho.
      console.warn('BaseApp.unsubscribe() not yet implemented.');
    }
  }

  publish(topic, data) {
    let game = this;
    if (this.topics.has(topic) && this.topics.get(topic).length > 0) {
      let obj;
      let handlers = this.topics.get(topic);
      for (let i=0, len=handlers.length; i<len; i++) {
        obj = handlers[i];
        if (obj) {
          if (obj.cmd) {
            new obj.cmd(game, data).execute();
          } else if (obj.cxt) {
            obj.fn.call(obj.cxt, data);
          } else {
            obj.fn(data);
          }
          if (obj.fireOnce) {
            handlers[i] = null;
          }
        }
      }
    }
  }

  //-------------------------------
  // Object Caching

  getRef(key) {
    if (key === 'player') {
      return this.player
    }
    else if (this.refs.has(key)) {
      return this.refs.get(key);
    }
    console.error(key + ' not found in chasm.getRef()');
  }

  addRef(object) {
    this.refs.set(object.title, object);
    return object;
  }

  removeRef(title) {
    this.refs.delete(title);
  }

  //-------------------------------
  // Initialization

  initModels(config) {
    this.topics = new Map();
    this.commands = new Map();
    this.refs = new Map();
    this.items = new Map();
    this.player = new Player(this);
    this.scoreboard = new Scoreboard(this, config.points);

    config.items.forEach(cfg => this.addRef(ItemFactory.create(this, cfg)));
    config.places.forEach(cfg => this.addRef(PlaceFactory.create(this, cfg)));
    config.exits.forEach(cfg => this.addRef(ExitFactory.create(this, cfg)));
    
    this.place = this.getRef(config.startingLocation);
  }

  initControllers(config) {
    this.controllers = [
      new BannerController(this),
      new ImageController(this),
      new OutputController(this),
      new InputController(this),
      new KeyboardController(this)
    ];
  }

  initCommands(config) {
    this.registerCommand(Player.SCORE, ScoreCommand);
    this.registerCommand(Player.MOVE, MoveCommand);
    [
      CloseCommand, ExamineCommand, FooCommand, GoCommand, InventoryCommand,
      LockCommand, LookCommand, OpenCommand, PutCommand, TakeCommand, 
      TieCommand, UnlockCommand, UntieCommand,
    ]
    .forEach(Cls => Cls.verbs().map(verb => this.registerCommand(verb, Cls)));

    if (config.commands) {
      config.commands.forEach(Cls => Cls.verbs().map(verb => this.registerCommand(verb, Cls)));
    }
  }
  
  startGame() {
    this.publish(Events.PLACE_CHANGED, this.place);
    this.publish(Events.OUTPUT_CLEAR);
    this.publish(Events.OUTPUT_WRITELN, this.place.describe());
    this.publish(Events.INPUT_PROMPT, '&gt;');
  }

}
class Entity {
  constructor(title, description) {
    this.title = title || 'Untitled';
    this.description = description || 'Undescribed';
  }

  get longDescription() {
    return this._longDescription;
  }

  set longDescription(str) {
    this._tmpLongDescription = this._longDescription;
    this._longDescription = str;
  }

  restoreLongDescription() {
    if (this.tmpLongDescription) {
      this._longDescription = this._tmpLongDescription;
    }
  }
}
class Item extends Entity {
  constructor(title, description) {
    super(title, description);
    this.canBeTaken = true;
    this.canHoldItems = false;
    this._features = new Map([
        ['examine', true],
        ['take', true]
      ]);
  }

  setFeature(key, value) {
    this._features.set(key, value);
  }

  describe() {
    return this.description;
  }
  
  canDo(key) {
    if (typeof this._features.get(key) === 'object') {
      return `What would you like to ${key} the ${this.title} with?`;
    }
    return this._features.get(key);
  }

  canDoWith(key, target) {
    if (typeof this._features.get(key) === 'object') {
      return (this._features.get(key).indexOf(target) !== -1);
    }
    return this._features.get(key);
  }
}

class ItemFactory {
  static create(game, config) {
    var item;

    switch (config.type) {
      case 'Container':
        item = new Container(config.title, config.title);
        break;
      default:
        item = new Item(config.title, config.title);
    }

    if (config.props) {
      Object.keys(config.props).forEach(key => item[key] = config.props[key]);
    }

    if (config.features) {
      Object.keys(config.features).forEach(key => item.setFeature(key, config.features[key]));
    }

    if (config.items) {
      config.items.forEach(obj => item.addItem(game.addRef(ItemFactory.create(game, obj))));
    }

    return item;
  }
}
class Container extends Item {
  constructor(title, description) {
    super(title, description);
    this._items = new Map();
    this.canHoldItems = true;
    this.opened = true;

    this._features.set('open', true);
    this._features.set('close', true);
  }

  describe(withContents) {
    var str = this.description;
    if (withContents && this.hasItems()) {
      str += ` with ${this.itemsToSentence()}`;
    }
    return str;
  }
  
  lookInside() {
    if (!this.canHoldItems) {
      return `The ${this.title} can't contain other objects.`;
    }
    else if (!this.opened) {
      return `The ${this.title} is closed.`;
    }
    else {
      return this.itemsToList();
    }
  }

  addItem(item) {
    if (this.canHoldItems && item) {
      item.parent = this.title; // weak ref to this inventory for removal
      this._items.set(item.title, item);
    }
    return this;
  }
  
  removeItem(item) {
    this._items.delete(item.title);
    return this;
  }
  
  hasItem(itemName) {
    return this._items.has(itemName);
  }

  hasItems() {
    return this._items.size > 0;
  }

  findItems(itemName) {
    var foundList = [];

    function searchItems(list) {
      if (list) {
        list.forEach(function (item) {

          if (item.title === itemName || item.commonTitle === itemName) {
            foundList.push(item);
          }

          if (item.opened) {
            searchItems(item._items);
          }

        });
      }
    }

    searchItems(this._items);

    return foundList;
  }

  itemsToList() {
    function buildString(list, indent) {
      var str = '';

      if (list.size === 0) {
        return str;
      }

      list.forEach(function (item) {
        if (!item.hideFromList) {
          str += indent + item.description.capitalizeFirstLetter();
          str += (indent) ? '' : ' is here.';
          str += '<br>';
          if (item.canHoldItems && item.opened && item.hasItems()) {
            str += indent + `The ${item.title} contains:<br>`;
            str += buildString(item._items, indent + '&nbsp;');
          }
        }
      });

      return str;
    }

    return buildString(this._items, '');
  }

  itemsToSentence() {
    var str = '', ary = [], last;

    if (this._items.size > 0) {
      this._items.forEach(item => ary.push(item.description));
      last = ary.pop();
      str = ((ary.length > 0) ? ary.join(', ') + ' and ' : '') + last;
    }

    return str;
  }

  itemsToArray() {
    return this._items.values();
  }
}
class Exit extends Item {
  constructor(title) {
    super(title, title);
    this._places = new Map();
    this.opened = true;
    this.blocked = false;
    this.setFeature('take', false);
  }

  addPlace(direction, place) {
    this._places.set(direction, place);
  }

  getPlace(direction) {
    return this._places.get(direction);
  }
}

class DooredExit extends Exit {
  constructor(title) {
    super(title);
    this.commonTitle = 'door';
    this.opened = false;
    this.closedMessage = `The ${this.title} is closed.`;

    this._features.set('open', true);
    this._features.set('close', true);
  }

  getPlace(direction) {
    return (this.opened) ? super.getPlace(direction) : false;
  }
}

class LockedExit extends DooredExit {
  constructor(title) {
    super(title);
    this.locked = true;
    this.unlockedMessage = 'Locked.';
    this.lockedMessage = 'The door is locked.';
  }

  getPlace(direction) {
    return (this.isLocked) ? this.lockedMessage : super.getPlace(direction);
  }
}

class ExitFactory {
  static create(game, config) {
    var exit;

    var title = config.title;
    var places = config.places;

    switch (config.type) {
      case "DooredExit":
        exit = new DooredExit(config.title);
        break;
      case "LockedExit":
        exit = new LockedExit(title);
        break;
      default:
        exit = new Exit(title);
    }

    if (exit && places && places.length === 2) {
      let p0 = places[0];
      let p1 = places[1];

      let place0 = game.getRef(p0.place);
      let place1 = game.getRef(p1.place);

      // create forward links
      exit.addPlace(p0.dir, place0);
      exit.addPlace(p1.dir, place1);

      // create back links
      place0.addExit(p1.dir, exit);
      place1.addExit(p0.dir, exit);
    }
    else {
      console.error('Invalid args: Exit.create()');
    }

    exit.blocked = !!config.blocked;

    return exit;
  }
}
class Place extends Container {
  constructor(config) {
    super(config.title, config.description);
    this.canBeTaken = false;
    this.visited = false;
    this._exits = new Map();
  }

  addExit(direction, place) {
    this._exits.set(direction, place);
    return this;
  }

  get imageSrc() {
    return `images/${this.title.toLowerCase().replace(/ /g,'-')}.png`;
  }

  look() {
    return `<strong>${this.title}</strong><br>${this.description}<br>${this.itemsToList()}`;
  }

  describe() {
    if (this.visited) {
      return `<strong>${this.title}</strong><br>${this.itemsToList()}`;
    }
    this.visited = true;
    return this.look();
  }

  findItems(itemName) {
    var foundList = super.findItems(itemName);

    this._exits.forEach(function (exit) {
      if (exit.title === itemName || exit.commonTitle === itemName) {
        foundList.push(exit);
      }
    });

    return foundList;
  }

  getExit(direction) {
    return this._exits.get(direction);
  }
}

class PlaceFactory {
  static create(game, config) {
    var place = new Place(config);

    if (config.items) {
      config.items.forEach(placeName => place.addItem(game.getRef(placeName)));
    }

    return place;
  }
}
class Player extends Container {
  constructor(eventBus) {
    super('player', 'You are an attractive adventurer with an athetic build.');
    this.eventBus = eventBus;
    this.canHoldItems = true;
    this.moves = 0;
  }

  itemsToList() {
    var str;

    if (this._items.size === 0) {
      return 'You are empty handed.';
    }

    str = 'Your are carrying:<br>';
    this._items.forEach(function (item) {
      str += `&nbsp;${item.describe(true).capitalizeFirstLetter()}<br>`;
    });
    
    return str;
  }
}
class Scoreboard {
  constructor(eventBus, points) {
    this.eventBus = eventBus;
    this._score = 0;
    this._points = new Map();
    Object.keys(points).forEach(key => this._points.set(key, points[key]));
  }

  scorePoints(key) {
    var pts = this._points.get(key) || 0;
    if (pts > 0) {
      this._score += pts;
      this._points.delete(key);
      this.eventBus.publish(Events.PLAYER_SCORED, this._score);
    }
  }
}
class ImageView {
  constructor() {
    this.el = document.getElementById('image');
  }
  set imageSrc(val) {
    this.el.style['background-image'] = `url(${val})`;
  }
}
class OutputView {
  constructor() {
    this.el = document.getElementById('output');
  }
  clear() {
    this.el.innerHTML = '';
  }
  write(str) {
    this.el.innerHTML += str;
    this.el.scrollTop = this.el.scrollHeight;
  }
}
class TextView {
  constructor(id, val, len) {
    this.el = document.getElementById(id);
    this.len = len || 0;
    this.text = val || '';
  }
  set text(str) {
    var html = str + '';
    if (this.len) {
      html = html.sizeTo(this.len);
    }
    this.el.innerHTML = html.replace(/ /g, '&nbsp;');
  }
}
class BasicInput {
  processInput(eventBus, inputBuff) {
    var sInput = inputBuff.toLowerCase().trim();
    eventBus.publish(Events.OUTPUT_WRITE, '&nbsp;&nbsp;&nbsp;&nbsp;**** COMMODORE 64 BASIC V2 ****<br><br>&nbsp;64K RAM SYSTEM &nbsp;38911 BASIC BYTES FREE<br><br>READY.<br>LOAD "CHASM",8,1<br><br>SEARCHING FOR CHASM<br>LOADING<br>READY.<br>');
    eventBus.publish(Events.INPUT_CLEAR);
    if (sInput === 'run') {
      var upper = document.querySelectorAll('.upper')[0];
      upper.className = `${upper.className}`.replace('upper', '');
      var scr = document.getElementById('screen');
      scr.className = `${scr.className} game`;
      eventBus.publish(Events.GAME_START);
    }
  }
}
class GameInput {
  processInput(eventBus, inputBuff) {
    var input = inputBuff.toLowerCase().trim();

    eventBus.publish(Events.OUTPUT_WRITE, `>${input}<br>`);
    eventBus.publish(Events.INPUT_CLEAR);
    
    let inputObj = InputUtils.tokenize(input);

    if (typeof inputObj === 'object') {
      eventBus.publish(inputObj[0], inputObj);
      eventBus.publish(Events.PLAYER_MOVE);
    }
    else {
      eventBus.publish(Events.OUTPUT_WRITELN, e.message);
    }

  }
}
class BannerController {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.placeView = new TextView('place', 'Start', 21);
    this.scoreView = new TextView('score', 'Score:0', 9);
    this.movesView = new TextView('moves', 'Moves:0', 10);
    eventBus.subscribe(Events.PLACE_CHANGED, this.onPlaceChanged, this);
    eventBus.subscribe(Events.PLAYER_SCORED, this.onUserScored, this);
    eventBus.subscribe(Events.PLAYER_MOVED, this.onUserMoved, this);
  }
  onPlaceChanged(place) {
    this.placeView.text = place.title;
  }
  onUserScored(score) {
    this.scoreView.text = `Score:${score}`;
  }
  onUserMoved(moves) {
    this.movesView.text = `Moves:${moves}`;
  }
  destroy() {
    this.eventBus.unsubscribe(Events.PLACE_CHANGED, this.onPlaceChanged, this);
    this.eventBus.unsubscribe(Events.PLAYER_SCORED, this.onUserScored, this);
    this.eventBus.unsubscribe(Events.PLAYER_MOVED, this.onUserMoved, this);
  }
}
class ImageController {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.view = new ImageView();
    eventBus.subscribe(Events.PLACE_CHANGED, this.onPlaceChanged, this);
  }
  onPlaceChanged(place) {
    this.view.imageSrc = place.imageSrc;
  }
  destroy() {
    this.eventBus.unsubscribe(Events.PLACE_CHANGED, this.onPlaceChanged, this);
  }
}
class InputController {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.promptView = new TextView('prompt');
    this.responseView = new TextView('response');
    eventBus.subscribe(Events.INPUT_WRITE, this.onWrite, this);
    eventBus.subscribe(Events.INPUT_CLEAR, this.onClear, this);
    eventBus.subscribe(Events.INPUT_PROMPT, this.onPrompt, this);
  }
  onWrite(str) {
    this.responseView.text = str;
  }
  onClear() {
    this.responseView.text = '';
  }
  onPrompt(str) {
    this.promptView.text = str;
  }
  destroy() {
    this.eventBus.unsubscribe(Events.INPUT_WRITE, this.onWrite, this);
    this.eventBus.unsubscribe(Events.INPUT_CLEAR, this.onClear, this);
    this.eventBus.unsubscribe(Events.INPUT_PROMPT, this.onPrompt, this);
  }
}
class KeyboardController {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this._inputBuffer = '';
    this.delegate = new BasicInput();
    document.addEventListener('keydown', this.onKeydown.bind(this));
    document.addEventListener('keypress', this.onKeypress.bind(this));
    eventBus.subscribe(Events.GAME_START, this.onGameStart, this, true);
    setTimeout(this.processInput.bind(this), 300);
  }

  processInput() {
    this.delegate.processInput(this.eventBus, this._inputBuffer);
  }

  onGameStart() {
    this.delegate = new GameInput();
  }

  onKeydown(e) {
    const DELETE = 8;
    const ENTER  = 13;
    const SPACE  = 32;

    switch (e.which) {
    case DELETE:
      e.preventDefault();
      this._inputBuffer = this._inputBuffer.substring(0, this._inputBuffer.length - 1);
      this.eventBus.publish(Events.INPUT_WRITE, this._inputBuffer);
      break;
    case ENTER:
      e.preventDefault();
      this.processInput();
      this._inputBuffer = '';
      this.eventBus.publish(Events.INPUT_WRITE, this._inputBuffer);
      break;
    case SPACE:
      // hack to prevent page from scrolling when SPACE BAR is pressed.
      e.preventDefault();
      this._inputBuffer += ' ';
      this.eventBus.publish(Events.INPUT_WRITE, this._inputBuffer);
      break;
    }
  }
  
  onKeypress(e) {
    const MAX_LINE_LENGTH = 39;
    if (this._inputBuffer.length < MAX_LINE_LENGTH) {
      this._inputBuffer += String.fromCharCode(e.which);
      this.eventBus.publish(Events.INPUT_WRITE, this._inputBuffer);
    }
  }
}
class OutputController {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.view = new OutputView();
    eventBus.subscribe(Events.OUTPUT_WRITE, this.onWrite, this);
    eventBus.subscribe(Events.OUTPUT_WRITELN, this.onWriteLine, this);
    eventBus.subscribe(Events.OUTPUT_CLEAR, this.onClear, this);
  }
  onWrite(str) {
    this.view.write(str);
  }
  onWriteLine(str) {
    this.view.write(`<p>${str}</p>`);
  }
  onClear() {
    this.view.clear();
  }
  destroy() {
    this.eventBus.unsubscribe(Events.OUTPUT_WRITE, this.onWrite, this);
    this.eventBus.unsubscribe(Events.OUTPUT_WRITELN, this.onWriteLine, this);
    this.eventBus.unsubscribe(Events.OUTPUT_CLEAR, this.onClear, this);
  }
}
class BaseCommand {
  constructor(game, data) {
    this.game = game;
    this.data = data;
  }

  static verbs() { return []; }

  execute() {
    if (!this.output) {
      this.output = 'I don\'t understand that sentence.';
    }
    this.game.publish(Events.OUTPUT_WRITELN, this.output);
    if (this.action) {
      this.game.publish(Player.SCORE, this.action);
      this.game.publish(this.action);
    }
  }
}
class BaseActionCommand extends BaseCommand {
  constructor(game, data) {
    super(game, data);

    var input = InputUtils.parse(data);

    // The first verb in the list is the actual action, the rest are synonyms.
    this.verb = input.verb = this.__proto__.constructor.verbs()[0];

    this.item = input.item;
    this.prep = input.prep;
    this.target = input.target;
    this.noun1 = input.noun1;
    this.noun2 = input.noun2;
    this.output = input.output;

    if (!this.output) {
      if (this.target) {
        this.output = InputUtils.testVerbItemWithTarget(input);
        this.action = `${this.verb}/${this.item.title}/${this.target.title}`;
      }
      else {
        this.output = InputUtils.testVerbItem(input);
        this.action = `${this.verb}/${this.item.title}`;
      }
    }

  }
}
class CloseCommand extends BaseActionCommand {
  static verbs() { return ['close']; }
  execute() {
    if (!this.output) {
      if (!this.item.opened) {
        this.output = InputUtils.getAlreadyDoneResponse();
      }
    }

    if (this.output) {
      this.game.publish(Events.OUTPUT_WRITELN, this.output);
      return;
    }

    this.item.opened = false;
    this.output = `You closed the ${this.item.title}.`;

    super.execute();
  }
}
class ExamineCommand extends BaseActionCommand {
  static verbs() { return ['examine','look at']; }
  execute() {
    if (!this.output) {
      if (!this.item.longDescription) {
        this.output = `You see nothing special about the ${this.item.title}.`;
      }
    }

    if (this.output) {
      this.game.publish(Events.OUTPUT_WRITELN, this.output);
      return;
    }

    this.output = this.item.longDescription;

    super.execute();
  }
}
class FooCommand extends BaseCommand {
  static verbs() { return ['foo']; }
  execute() {
    if (this.data.length === 1) {
      this.game.publish(Events.OUTPUT_WRITELN, 'Well, FOO, BAR, and BLETCH to you too!');
      return;
    }

    this.game.publish(Events.OUTPUT_WRITELN, 'I only understood you as far as wanting to foo.');
  }
}
class GoCommand extends BaseCommand {
  static verbs() { return ['n','s','e','w','u','d','north','south','east','west','up','down','go','walk','run']; }
  execute() {
    var direction = this.data[0];
    var output = 'You can\'t go that way.';
    var exit;

    if ((direction === 'walk' || direction === 'go')) {
      if (this.data.length === 2) {
        direction = this.data[1];
      }
    }

    direction = direction.charAt(0);

    if (direction) {
      exit = this.game.place.getExit(direction);
      if (exit) {
        if (exit.blocked) {
          output = 'You can\'t go that way... yet.';
        }
        else if (exit.opened) {
          if (!exit.locked) {
            let place = exit.getPlace(direction);
            if (place) {
              this.game.place = place;
              this.game.publish(Events.PLACE_CHANGED, place);
              output = place.describe();
            }
          } else {
            output = exit.lockedMessage;
          }
        } else {
          output = exit.closedMessage;
        }
      }
    }

    this.game.publish(Events.OUTPUT_WRITELN, output);
  }
}
class InventoryCommand extends BaseCommand {
  static verbs() { return ['i','inventory']; }
  execute() {
    this.game.publish(Events.OUTPUT_WRITELN, this.game.player.itemsToList());
  }
}
class LockCommand extends BaseActionCommand {
  static verbs() { return ['lock']; }
  execute() {
    if (!this.output) {
      if (this.item.locked) {
        this.output = `The ${this.item.title} is already locked.`;
      }
    }

    if (this.output) {
      this.game.publish(Events.OUTPUT_WRITELN, this.output);
      return;
    }

    this.item.locked = true;
    this.output = `You locked the ${this.item.title}.`;

    super.execute();
  }
}
class LookCommand extends BaseCommand {
  constructor(game, data) {
    super(game, data);

    var input = InputUtils.parse(data);

    this.verb = input.verb;
    this.item = input.item;
    this.noun1 = input.noun1;

    if (this.noun1) {
      this.output = InputUtils.testVerbItem(input);
      this.action = `${this.verb}/${this.item.title}`;
    }
    else {
      this.output = InputUtils.testVerb(input);
    }
  }
  static verbs() { return ['l','look','look in']; }
  execute() {

    switch (this.verb) {
      case 'l':
      case 'look':
        this.output = this.game.place.look();
        break;
      case 'look in':
        let result = ItemsProxy.findAll(this.noun1.term);
        this.output = (result.item) ? result.item.lookInside() : result.output;
        break;
      default:
        this.output = 'I don\'t understand that sentence.';
    }

    this.game.publish(Events.OUTPUT_WRITELN, this.output);
  }
}
class MoveCommand extends BaseCommand {
  execute() {
    this.game.player.moves++;
    this.game.publish(Events.PLAYER_MOVED, this.game.player.moves);
  }
}
class OpenCommand extends BaseActionCommand {
  static verbs() { return ['open']; }
  execute() {
    if (!this.output) {
      if (this.item.locked) {
        this.output = `The ${this.item.title} is locked.`;
      }
      else if (this.item.opened) {
        this.output = InputUtils.getAlreadyDoneResponse();
      }
    }

    if (this.output) {
      this.game.publish(Events.OUTPUT_WRITELN, this.output);
      return;
    }

    this.item.opened = true;

    this.output = `You opened the ${this.item.title}`;
    if (this.item.canHoldItems && this.item.hasItems()) {
      this.output += `, revealing ${this.item.itemsToSentence()}`;
    }

    this.output = `${this.output}.`;

    super.execute();
  }
}
class PutCommand extends BaseCommand {
  static verbs() { return ['put','drop']; }
  execute() {
    var successStr;

    if (!this.output) {
      if (this.target) {
        if (!this.item.canBeTaken) {
          this.output = `You cannot take the ${this.item.title}.`;
        }
        else if (!this.target.canHoldItems) {
          this.output = 'That can\'t contain things.';
        }
        else if (!this.item.opened) {
          output = `The ${this.item.title} is closed.`;
        }
        else {
          successStr = `You ${this.verb} the ${this.item.title} ${this.prep} the ${this.target.title}.`;
        }
      }
      else {
        this.target = this.game.place;
        successStr = `${this.item.title.capitalizeFirstLetter()} dropped.`;
      }
    }

    if (this.output) {
      this.game.publish(Events.OUTPUT_WRITELN, this.output);
      return;
    }

    this.game.getRef(this.item.parent).removeItem(this.item);
    this.target.addItem(this.item);
    this.output = successStr;

    super.execute();
  }
}
class ScoreCommand extends BaseCommand {
  execute() {
    this.game.scoreboard.scorePoints(this.data);
  }
}
class TakeCommand extends BaseActionCommand {
  static verbs() { return ['take','get','pick up']; }
  execute() {
    if (!this.output) {
      if (this.game.player.hasItem(this.item.title)) {
        this.output = `You already have the ${this.item.title}.`;
      }
    }

    if (this.output) {
      this.game.publish(Events.OUTPUT_WRITELN, this.output);
      return;
    }

    this.game.getRef(this.item.parent).removeItem(this.item);
    this.game.player.addItem(this.item);
    this.output = `${this.item.title.capitalizeFirstLetter()} taken.`;

    super.execute();
  }
}
class TieCommand extends BaseActionCommand {
  static verbs() { return ['tie','wrap']; }
  execute() {
    if (!this.output) {
      if (this.item.tiedTo) {
        this.output = `The ${this.item.title} is already tied to something.`;
      }
    }

    if (this.output) {
      this.game.publish(Events.OUTPUT_WRITELN, this.output);
      return;
    }

    this.target.longDescription = `${this.target.longDescription} ${this.item.title.capitalizeFirstLetter()} is securely fastened around it.`;
    this.item.tiedTo = this.target;
    this.item.setFeature('take', false);
    this.game.player.removeItem(this.item);
    this.game.place.addItem(this.item);
    this.output = `The ${this.item.title} is now securely fastened to the ${this.target.title}.`;

    super.execute();
  }
}
class UnlockCommand extends BaseActionCommand {
  static verbs() { return ['unlock']; }
  execute() {
    if (!this.output) {
      if (!this.item.locked) {
        this.output = `The ${this.item.title} is already unlocked.`;
      }
    }

    if (this.output) {
      this.game.publish(Events.OUTPUT_WRITELN, this.output);
      return;
    }

    this.item.locked = false;
    this.output = `You unlocked the ${this.item.title}.`;

    super.execute();
  }

}
class UntieCommand extends BaseActionCommand {
  static verbs() { return ['untie','unwrap']; }
  execute() {
    if (!this.output) {
      if (!this.item.tiedTo) {
        this.output = `The ${this.item.title} is not tied to anything.`;
      }
      else if (this.item.tiedTo !== this.target) {
        this.output = `The ${this.item.title} is not tied to the ${target.title}`;
      }
    }

    if (this.output) {
      this.game.publish(Events.OUTPUT_WRITELN, this.output);
      return;
    }

    this.target.restoreLongDescription();
    this.item.tiedTo = null;
    this.item.setFeature('take', true);
    this.game.place.removeItem(this.item);
    this.game.player.addItem(this.item);
    this.output = `You've untied the ${this.item.title} from the ${this.target.title} and have taken it.`;

    super.execute();
  }
}