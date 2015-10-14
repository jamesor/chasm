'use strict';

class ItemsMap extends Map {
  add(item) {
    if (item) this.set(item.title, item);
  }
}