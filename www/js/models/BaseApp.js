'use strict';

class BaseApp {
  constructor() {
    this.initModels();
    this.initControllers();
    this.initCommands();
    this.subscribe(Events.GAME_START, this.startGame, this);
  }

  //-------------------------------
  // Pub/Sub Event Bus

  registerCommand(topic, command) {
    if (!this.topics.has(topic)) this.topics.set(topic, []);
    this.topics.get(topic).push({cmd: command});
  }
  
  subscribe(topic, listener, context) {
    if (!this.topics.has(topic)) this.topics.set(topic, []);
    this.topics.get(topic).push({fn: listener, cxt: context});
  }

  unsubscribe(topic, listener, context) {
    if (this.topics.has(topic) && this.topics.get(topic).length > 0) {
      // todo: probably not needed tho.
    }
  }

  publish(topic, data) {
    let game = this;
    if (this.topics.has(topic) && this.topics.get(topic).length > 0) {
      this.topics.get(topic).forEach(function(listener) {
        if (listener.cmd) {
          new listener.cmd(game, data).execute();
        } else if (listener.cxt) {
          listener.fn.call(listener.cxt, data);
        } else {
          listener.fn(data);
        }
      });
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
    else if (this.items.has(key)) {
      return this.items.get(key);
    }
    throw new Error(key + ' not found in chasm.getRef()');
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

  initModels() {
    this.topics = new Map();
    this.commands = new Map();
    this.refs = new Map();
    this.items = new Map();
    this.player = new Player(this);

    GameConfig.places.forEach(config => this.addRef(new Place(config)));
    GameConfig.exits.forEach(config => this.addRef(Exit.create(this, config)));
  }

  initControllers() {
    this.controllers = [
      new BannerController(this),
      new ImageController(this),
      new OutputController(this),
      new InputController(this),
      new KeyboardController(this)
    ];
  }

  initCommands() {
    this.registerCommand(Player.SCORE, ScoreCommand);
    this.registerCommand(Player.MOVE, MoveCommand);
    [
      CloseCommand, ExamineCommand, FooCommand, GoCommand, InventoryCommand,
      LockCommand, LookCommand, OpenCommand, PutCommand, TakeCommand, 
      TieCommand, UnlockCommand, UntieCommand,
    ]
    .forEach(Cls => Cls.verbs().map(verb => this.registerCommand(verb, Cls)));
  }

  startGame() {
    this.publish(Events.PLACE_CHANGED, this.place);
    this.publish(Events.OUTPUT_CLEAR);
    this.publish(Events.OUTPUT_WRITELN, this.place.describe());
    this.publish(Events.INPUT_PROMPT, '&gt;');
  }

}