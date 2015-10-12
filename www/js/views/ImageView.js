'use strict';

class ImageView {
  constructor() {
    this.el = document.getElementById('image').getElementsByTagName('img')[0];
  }
  set imageSrc(val) {
    this.el.setAttribute('src', val);
  }
}