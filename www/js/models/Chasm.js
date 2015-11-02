'use strict';

class Chasm extends BaseApp {
  initModels() {
    super.initModels();

    [
      WoodenChest, SilverKey,
      Toolbox, Rope, MapleTree
    ]
    .forEach(Cls => this.addRef(new Cls()));

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

    this.place = this.getRef(GameConfig.startingLocation);
  }

  initCommands() {
    super.initCommands();
    [
      TieRopeToMapleTreeCommand, 
      UntieRopeFromMapleTreeCommand
    ]
    .forEach(Cls => Cls.verbs().map(verb => this.registerCommand(verb, Cls)));
  }
}