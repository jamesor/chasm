'use strict';

class Chasm extends BaseApp {
  initModels() {
    super.initModels();

    this.refs = new Map();
    this.items = new Map();
    this.player = new Player(this);

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
        .addItem(this.getRef(Items.WOODEN_CHEST));

    this.getRef(Places.SHED)
        .addItem(this.getRef(Items.TOOLBOX));

    this.getRef(Places.CHASM_ENTRANCE)
        .addItem(this.getRef(Items.MAPLE_TREE))
        .addItem(this.getRef(Items.ROPE));

    this.getRef(Items.TOOLBOX)
        .addItem(this.getRef(Items.SILVER_KEY));

    // Starting Position

    this.place = this.getRef(Places.FOREST_CLEARING);
  }

  initCommands() {
    super.initCommands();
    [
      TieRopeToMapleTreeCommand, 
      UntieRopeFromMapleTreeCommand
    ].forEach(Cls => Cls.verbs().map(verb => this.registerCommand(verb, Cls)));
  }
}