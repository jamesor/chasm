'use strict';

class Chasm extends BaseApp {
  constructor() {
    super();
    this.initModels();
    this.initControllers();
    this.initCommands();
  }

  // Models
 
  initModels() {
    this.player = new Player(this);

    // Places

    var forestClearing = new ForestClearing();
    var chasmEntrance = new Place(Places.CHASM_ENTRANCE, 'You are standing at the entrance to a chasm which can be entered by climbing down. There is a clearing to the west.');
    var narrowPassage = new Place(Places.NARROW_PASSAGE, 'You begin your decent through the crack in the mountainside. It\'s a pretty tight fit, but you manage.');
    var trollRoom = new Place(Places.TROLL_ROOM, 'You are in the Troll\'s Room. It\'s dark and smelly.');
    var shed = new Shed();

    // Items

    var lantern = new LightEmittingItem('lantern', 'a rusty oil lantern', 4);
    var torch = new LightEmittingItem('torch', 'a well structured torch', 4);

    // Store place objects

    this.places = new Map();
    this.places.set(forestClearing.title, forestClearing);
    this.places.set(chasmEntrance.title, chasmEntrance);
    this.places.set(narrowPassage.title, narrowPassage);
    this.places.set(trollRoom.title, trollRoom);
    this.places.set(shed.title, shed);
    this.place = forestClearing;

    // Configure exit relationships

    forestClearing.exits.set(Actions.EAST, new Exit(chasmEntrance));
    forestClearing.exits.set(Actions.NORTH, new DooredExit(shed));
    shed.exits.set(Actions.SOUTH, new Exit(forestClearing));
    chasmEntrance.exits.set(Actions.WEST, new Exit(forestClearing));
    chasmEntrance.exits.set(Actions.DOWN, new Exit(narrowPassage));
    narrowPassage.exits.set(Actions.UP, new Exit(chasmEntrance));
    narrowPassage.exits.set(Actions.DOWN, new Exit(trollRoom));
    trollRoom.exits.set(Actions.UP, new Exit(narrowPassage));

    // Stash item objects in places

    shed.items.add(lantern);
    shed.items.add(torch);
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

    this.registerCommand(Actions.TAKE, TakeCommand);
    this.registerCommand(Actions.DROP, DropCommand);
    this.registerCommand(Actions.NORTH, GoCommand);
    this.registerCommand(Actions.SOUTH, GoCommand);
    this.registerCommand(Actions.EAST, GoCommand);
    this.registerCommand(Actions.WEST, GoCommand);
    this.registerCommand(Actions.UP, GoCommand);
    this.registerCommand(Actions.DOWN, GoCommand);
    this.registerCommand(Actions.LOOK, LookCommand);
    this.registerCommand(Actions.INVENTORY, InventoryCommand);
  }

  initGame() {
    this.publish(Events.PLACE_CHANGED, this.place);
    this.publish(Events.OUTPUT_CLEAR);
    this.publish(Events.OUTPUT_WRITELN, this.place.describe());
    this.publish(Events.INPUT_PROMPT, '&gt;');
  }
}