class Chasm extends BaseApp {

  // TODO: Remove the need for this class

  initCommands() {
    super.initCommands();
    [
      TieRopeToMapleTreeCommand, 
      UntieRopeFromMapleTreeCommand
    ]
    .forEach(Cls => Cls.verbs().map(verb => this.registerCommand(verb, Cls)));
  }
}