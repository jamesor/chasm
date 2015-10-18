'use strict';

class Chasm extends BaseApp {
  constructor() {
    super();
    this.refs = new Map();
    this.player = new Player(this);
    this.initModels();
    this.initControllers();
    this.initCommands();
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
  }

  // Models
 
  initModels() {

    this.addRef(this.player);

    // Places

    this.addRef(new ForestClearing());
    this.addRef(new Place(Places.CHASM_ENTRANCE, 'You are standing at the entrance to a chasm which can be entered by climbing down. There is a clearing to the west.'));
    this.addRef(new Place(Places.NARROW_PASSAGE, 'You begin your decent through the crack in the mountainside. It\'s a pretty tight fit, but you manage.'));
    this.addRef(new Place(Places.TROLL_ROOM, 'You are in the Troll\'s Room. It\'s dark and smelly.'));
    this.addRef(new Shed());

    // Things

    this.items = new Map();
    this.items.set('wooden chest', new WoodenChest());
    this.items.set('silver key', new SilverKey());

    // Exits

    this.getRef(Places.FOREST_CLEARING).addExit('e', new Exit(this.getRef(Places.CHASM_ENTRANCE)));
    this.getRef(Places.SHED).addExit('s', new Exit(this.getRef(Places.FOREST_CLEARING)));
    this.getRef(Places.CHASM_ENTRANCE).addExit('w', new Exit(this.getRef(Places.FOREST_CLEARING)));
    this.getRef(Places.CHASM_ENTRANCE).addExit('d', new Exit(this.getRef(Places.NARROW_PASSAGE)));
    this.getRef(Places.NARROW_PASSAGE).addExit('u', new Exit(this.getRef(Places.CHASM_ENTRANCE)));
    this.getRef(Places.NARROW_PASSAGE).addExit('d', new Exit(this.getRef(Places.TROLL_ROOM)));
    this.getRef(Places.TROLL_ROOM).addExit('u', new Exit(this.getRef(Places.NARROW_PASSAGE)));

    // Stash item objects in places

    this.getRef(Places.FOREST_CLEARING).addItem( this.items.get('wooden chest') );
    this.getRef(Places.FOREST_CLEARING).addItem( this.items.get('silver key') );

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
    this.registerCommand('look', LookCommand);
    this.registerCommand('l', LookCommand);
    this.registerCommand('inventory', InventoryCommand);
    this.registerCommand('i', InventoryCommand);
    //this.registerCommand('use', UseCommand);
    this.registerCommand('open', OpenCommand);
    this.registerCommand('close', CloseCommand);
    this.registerCommand('put', PutCommand);
  }

  initGame() {
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