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
    this.initPlaces();
    this.initExits();
    this.initItems();
  }
  initPlaces() {
    this.places = new Map();
    this.places.set(Places.FOREST_CLEARING, new Place(Places.FOREST_CLEARING, 'You are standing in a forest clearing with a path leading to the east where you see a rocky mountainside. All other directions are impassable.'));
    this.places.set(Places.CHASM_ENTRANCE, new Place(Places.CHASM_ENTRANCE, 'You are standing at the entrance to a chasm which can be entered by climbing down. There is a clearing to the west.'));
    this.places.set(Places.NARROW_PASSAGE, new Place(Places.NARROW_PASSAGE, 'You begin your decent through the crack in the mountainside. It\'s a pretty tight fit, but you manage.'));
    this.places.set(Places.TROLL_ROOM, new Place(Places.TROLL_ROOM, 'You are in the Troll\'s Room. It\'s dark and smelly.'));
    this.place = this.places.get(Places.FOREST_CLEARING);
  }
  initExits() {
    this.places.get(Places.FOREST_CLEARING).exits.set(Actions.EAST, this.places.get(Places.CHASM_ENTRANCE));
    this.places.get(Places.CHASM_ENTRANCE).exits.set(Actions.WEST, this.places.get(Places.FOREST_CLEARING));
    this.places.get(Places.CHASM_ENTRANCE).exits.set(Actions.DOWN, this.places.get(Places.NARROW_PASSAGE));
    this.places.get(Places.NARROW_PASSAGE).exits.set(Actions.UP, this.places.get(Places.CHASM_ENTRANCE));
    this.places.get(Places.NARROW_PASSAGE).exits.set(Actions.DOWN, this.places.get(Places.TROLL_ROOM));
    this.places.get(Places.TROLL_ROOM).exits.set(Actions.UP, this.places.get(Places.NARROW_PASSAGE));
  }
  initItems() {
    var lantern = new LightEmittingItem('lantern', 'a rusty oil lantern', 4);
    this.places.get(Places.FOREST_CLEARING).items.set(lantern.title, lantern);

    var torch = new LightEmittingItem('torch', 'a well structured torch', 4);
    this.places.get(Places.FOREST_CLEARING).items.set(torch.title, torch);

    var foo = new Item('blob', 'a blue blob');
    this.places.get(Places.FOREST_CLEARING).items.set(foo.title, foo);
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