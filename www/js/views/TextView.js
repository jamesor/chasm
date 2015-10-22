'use strict';

class TextView {
  constructor(id, val, len) {
    this.el = document.getElementById(id);
    this.len = len || 0;
    this.text = val || '';
  }
  set text(str) {
    var html = str + '';
    if (this.len) {
      html = html.sizeTo(this.len);
    }
    this.el.innerHTML = html.replace(/ /g, '&nbsp;');
  }
}