class ItemsProxy {

  static findAll(term) {
    var playerItems = chasm.player.findItems(term);
    var placeItems = chasm.place.findItems(term);
    var foundItems = [...playerItems, ...placeItems];
    var item = null;
    var output = '';

    if (foundItems.length === 0) {
      output = `You do not see the ${term} here.`;
    }
    else if (foundItems.length === 1) {
      item = foundItems[0];
    }
    else if (foundItems.length > 1) {
      output = `Which ${term} did you mean?`;
    }

    return {term, item, output};
  }

}