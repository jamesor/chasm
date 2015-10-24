'use strict';

Array.prototype.toDictionary = function() {
  var dict = {};
  this.forEach(word => dict[word] = true);
  return dict;
};

String.prototype.sizeTo = function(len, chr) {
  return (this + new Array(len + 1).join(chr || ' ')).substr(0, len);
}

String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.toDictionary = function() {
  return this.split(',').toDictionary();
};

// Shims

if (typeof Object.values === 'undefined') {
  Object.values = obj => Object.keys(obj).map(key => obj[key]);
}