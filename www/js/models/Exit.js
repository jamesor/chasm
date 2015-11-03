'use strict';

class Exit extends Item {
  constructor(title) {
    super(title, title);
    this._places = new Map();
    this.opened = true;
    this.blocked = false;
    this.setFeature('take', false);
  }

  addPlace(direction, place) {
    this._places.set(direction, place);
  }

  getPlace(direction) {
    return this._places.get(direction);
  }
}

class DooredExit extends Exit {
  constructor(title) {
    super(title);
    this.commonTitle = 'door';
    this.opened = false;
    this.closedMessage = `The ${this.title} is closed.`;

    this._features.set('open', true);
    this._features.set('close', true);
  }

  getPlace(direction) {
    return (this.opened) ? super.getPlace(direction) : false;
  }
}

class LockedExit extends DooredExit {
  constructor(title) {
    super(title);
    this.locked = true;
    this.unlockedMessage = 'Locked.';
    this.lockedMessage = 'The door is locked.';
  }

  getPlace(direction) {
    return (this.isLocked) ? this.lockedMessage : super.getPlace(direction);
  }
}

class ExitFactory {
  static create(game, config) {
    var exit;

    var title = config.title;
    var places = config.places;

    switch (config.type) {
      case "DooredExit":
        exit = new DooredExit(config.title);
        break;
      case "LockedExit":
        exit = new LockedExit(title);
        break;
      default:
        exit = new Exit(title);
    }

    if (exit && places && places.length === 2) {
      let p0 = places[0];
      let p1 = places[1];

      let place0 = game.getRef(p0.place);
      let place1 = game.getRef(p1.place);

      // create forward links
      exit.addPlace(p0.dir, place0);
      exit.addPlace(p1.dir, place1);

      // create back links
      place0.addExit(p1.dir, exit);
      place1.addExit(p0.dir, exit);
    }
    else {
      throw new Error('Invalid args: Exit.create()');
    }

    exit.blocked = !!config.blocked;

    return exit;
  }
}