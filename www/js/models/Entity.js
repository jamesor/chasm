'use strict';

class Entity {
  constructor(title, description) {
    this.title = title || 'Untitled';
    this.description = description || 'Undescribed';
    this.canHoldItems = false;
    this._items = new Map();
  }

  describe(withContents) {
    var str = this.description;
    if (withContents && this.hasItems()) {
      str += ` with ${this.itemsToSentence()}`;
    }
    return str;
  }
  
  addItem(item) {
    if (this.canHoldItems && item) {
      item.location = this.title; // weak ref to this inventory for removal
      this._items.set(item.title, item);
    }
    return this;
  }
  
  removeItem(itemName) {
    this._items.delete(itemName);
    return this;
  }
  
  hasItem(itemName) {
    return this._items.has(itemName);
  }

  hasItems() {
    return this._items.size > 0;
  }

  findItems(itemName) {
    var foundList = [];

    function searchItems(list) {
      if (list) {
        list.forEach(function (item) {

          if (item.title === itemName || item.commonTitle === itemName) {
            foundList.push(item);
          }

          if (item.opened) {
            searchItems(item._items);
          }

        });
      }
    }

    searchItems(this._items);

    return foundList;
  }

  itemsToList() {
    function buildString(list, indent) {
      var str = '';

      if (list.size === 0) {
        return str;
      }

      list.forEach(function (item) {
        if (!item.hideFromList) {
          str += indent + item.description.capitalizeFirstLetter();
          str += (indent) ? '' : ' is here.';
          str += '<br>';
          if (item.canHoldItems && item.opened && item.hasItems()) {
            str += indent + `The ${item.title} contains:<br>`;
            str += buildString(item._items, indent + '&nbsp;');
          }
        }
      });

      return str;
    }

    return buildString(this._items, '');
  }

  itemsToSentence() {
    var str = '', ary = [], last;

    if (this._items.size > 0) {
      this._items.forEach(item => ary.push(item.description));
      last = ary.pop();
      str = ((ary.length > 0) ? ary.join(', ') + ' and ' : '') + last;
    }

    return str;
  }

  itemsToArray() {
    return this._items.values();
  }
}