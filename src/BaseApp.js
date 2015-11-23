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