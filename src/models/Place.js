class Place extends Container {
  constructor(config) {
    super(config.title, config.description);
    this.canBeTaken = false;
    this.visited = false;
    this._exits = new Map();
  }

  addExit(direction, place) {
    this._exits.set(direction, place);
    return this;
  }

  get imageSrc() {
    return `images/${this.title.toLowerCase().replace(/ /g,'-')}.png`;
  }

  look() {
    return `<strong>${this.title}</strong><br>${this.description}<br>${this.itemsToList()}`;
  }

  describe() {
    if (this.visited) {
      return `<strong>${this.title}</strong><br>${this.itemsToList()}`;
    }
    this.visited = true;
    return this.look();
  }

  findItems(itemName) {
    var foundList = super.findItems(itemName);

    this._exits.forEach(function (exit) {
      if (exit.title === itemName || exit.commonTitle === itemName) {
        foundList.push(exit);
      }
    });

    return foundList;
  }

  getExit(direction) {
    return this._exits.get(direction);
  }
}

class PlaceFactory {
  static create(game, config) {
    var place = new Place(config);

    if (config.items) {
      config.items.forEach(placeName => place.addItem(game.getRef(placeName)));
    }

    return place;
  }
}