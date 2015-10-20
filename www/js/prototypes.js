'use strict';

Array.prototype.toDictionary = function() {
  var dict = {};
  this.forEach(word => dict[word] = true);
  return dict;
};

Object.prototype.values = function() {
  return Object.keys(this).map(key => this[key]);
};

String.prototype.sizeTo = function(len, chr) {
  return this + new Array(len + 1).join(chr || ' ');
}

String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.toDictionary = function() {
  return this.split(',').toDictionary();
};