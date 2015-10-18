'use strict';

String.prototype.sizeTo = function(len, chr) {
  return this + new Array(len + 1).join(chr || ' ');
}

String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}