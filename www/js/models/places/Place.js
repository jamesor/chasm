'use strict';

class Place {
  constructor(title, description) {
    this.title = title || 'Unknown location';
    this.description = description || 'Nothing to see here.';
    this.items = new Map();
    this.exits = new Map();
  }
  get imageSrc() {
    return 'images/'+this.title.toLowerCase().replace(/ /g,'-')+'.png';
  }
  addItem(item) {
    if (item) this.items.set(item.title, item);
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