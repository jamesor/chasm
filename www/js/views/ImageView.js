'use strict';

class ImageView {
  constructor() {
    this.el = document.getElementById('image');
  }
  set imageSrc(val) {
    this.el.style['background-image'] = 'url(' + val + ')';
  }
}