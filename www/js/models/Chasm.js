'use strict';

class Chasm extends BaseApp {
  constructor() {
    super();
    this.refs = new Map();
    this.items = new Map();
    this.player = new Player(this);
    this.initModels();
    this.initControllers();
    this.initCommands();
    this.subscribe(Events.GAME_START, this.startGame, this);
  }

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

  // Models

  initModels() {

    // Places

    this.addRef(new ForestClearing());
    this.addRef(new ChasmEntrance());
    this.addRef(new NarrowPassage());
    this.addRef(new TrollRoom());
    this.addRef(new Shed());
    this.addRef(new TrollArmoury());
    this.addRef(new TrollKitchen());

    // Things

    this.addRef(new WoodenChest());
    this.addRef(new SilverKey());
    this.addRef(new Toolbox());
    this.addRef(new Rope());
    this.addRef(new MapleTree());

    // Exits

    this.addRef(new DooredExit(Exits.SHED_DOOR,
                [
                  ['n', this.getRef(Places.SHED)],
                  ['s', this.getRef(Places.FOREST_CLEARING)]
                ]));
    this.addRef(new Exit(Exits.FOREST2CHASM,
                [
                  ['e', this.getRef(Places.CHASM_ENTRANCE)],
                  ['w', this.getRef(Places.FOREST_CLEARING)]
                ]));
    this.addRef(new Exit(Exits.PASSGE2TROLLRM,
                [
                  ['d', this.getRef(Places.TROLL_ROOM)],
                  ['u', this.getRef(Places.NARROW_PASSAGE)]
                ]));
    this.addRef(new DooredExit(Exits.METAL_DOOR,
                [
                  ['n', this.getRef(Places.TROLL_ROOM)],
                  ['s', this.getRef(Places.TROLL_ARMOURY)]
                ]));
    this.addRef(new DooredExit(Exits.WOODEN_DOOR,
                [
                  ['e', this.getRef(Places.TROLL_ROOM)],
                  ['w', this.getRef(Places.TROLL_KITCHEN)]
                ]));
    this.addRef(new Exit(Exits.CHASM2PASSGE,
                [
                  ['d', this.getRef(Places.NARROW_PASSAGE)],
                  ['u', this.getRef(Places.CHASM_ENTRANCE)]
                ])).blocked = true;

    // Stash item objects in places

    this.getRef(Places.FOREST_CLEARING)
        .addItem(this.getRef(Items.SILVER_KEY))
        .addItem(this.getRef(Items.WOODEN_CHEST))
        .addItem(this.getRef(Items.ROPE));

    this.getRef(Places.SHED)
        .addItem(this.getRef(Items.TOOLBOX));

    this.getRef(Places.CHASM_ENTRANCE)
        .addItem(this.getRef(Items.MAPLE_TREE));

    this.getRef(Items.TOOLBOX);

    // Starting Position

    this.place = this.getRef(Places.FOREST_CLEARING);
  }

  // Controllers

  initControllers() {
    this.controllers = [
      new BannerController(this),
      new ImageController(this),
      new OutputController(this),
      new InputController(this),
      new KeyboardController(this)
    ];
  }

  // Commands

  initCommands() {
    this.registerCommand(Events.PLAYER_SCORE, ScoreCommand);
    this.registerCommand(Events.PLAYER_MOVE, MoveCommand);

    this.registerCommand('take', TakeCommand);
    this.registerCommand('drop', DropCommand);
    this.registerCommand('north', GoCommand);
    this.registerCommand('n', GoCommand);
    this.registerCommand('south', GoCommand);
    this.registerCommand('s', GoCommand);
    this.registerCommand('east', GoCommand);
    this.registerCommand('e', GoCommand);
    this.registerCommand('west', GoCommand);
    this.registerCommand('w', GoCommand);
    this.registerCommand('up', GoCommand);
    this.registerCommand('u', GoCommand);
    this.registerCommand('down', GoCommand);
    this.registerCommand('d', GoCommand);
    this.registerCommand('walk', GoCommand);
    this.registerCommand('go', GoCommand);
    this.registerCommand('look', LookCommand);
    this.registerCommand('l', LookCommand);
    this.registerCommand('inventory', InventoryCommand);
    this.registerCommand('i', InventoryCommand);
    // this.registerCommand('use', UseCommand);
    this.registerCommand('open', OpenCommand);
    this.registerCommand('close', CloseCommand);
    this.registerCommand('put', PutCommand);
    this.registerCommand('examine', ExamineCommand);
    this.registerCommand('unlock', UnlockCommand);
    this.registerCommand('lock', LockCommand);
    this.registerCommand('foo', FooCommand);
    this.registerCommand('tie', TieCommand);
    this.registerCommand('untie', UntieCommand);

    this.registerCommand(`tie/${Items.ROPE}/${Items.MAPLE_TREE}`, TieRopeToMapleTreeCommand);
    this.registerCommand(`untie/${Items.ROPE}/${Items.MAPLE_TREE}`, UntieRopeFromMapleTreeCommand);
  }

  startGame() {
    this.publish(Events.PLACE_CHANGED, this.place);
    this.publish(Events.OUTPUT_CLEAR);
    this.publish(Events.OUTPUT_WRITELN, this.place.describe());
    this.publish(Events.INPUT_PROMPT, '&gt;');
  }

  findItems(itemName) {
    var playerItems = this.player.findItems(itemName);
    var placeItems = this.place.findItems(itemName);
    return [...playerItems, ...placeItems];
  }
}