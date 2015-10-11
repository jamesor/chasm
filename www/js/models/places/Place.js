'use strict';

class Place {
  constructor(title, description) {
    this.title = title || 'Unknown location';
    this.description = description || 'Nothing to see here.';
    this.items = new Map();
    this.exits = new ExitsMap();
  }
  get imageSrc() {
    return 'images/'+this.title.toLowerCase().replace(/ /g,'-')+'.png';
  }
  describe() {
    var str = this.description, ary = [], last;
    if (this.items.size > 0) {
      this.items.forEach(function (item) {
        ary.push(item.description);
      });
      last = ary.pop();
      str += ' You see ' + ((ary.length > 0) ? ary.join(', ') + ' and ' : '') + last + '.';
    }
    return str;
  }
}

class ExitsMap extends Map {
  go(direction) {
    // todo: check to see if the direction requires unblocking/problem solving
    return this.get(direction) || 'You cannot travel in that direction.';
  }
}