class InventoryCommand extends BaseCommand {
  static verbs() { return ['i','inventory']; }
  execute() {
    this.game.publish(Events.OUTPUT_WRITELN, this.game.player.itemsToList());
  }
}