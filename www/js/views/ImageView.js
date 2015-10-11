'use strict';

class ImageView {
  constructor() {
    this.$el = $('#image img');
  }
  set imageSrc(val) {
    this.$el.attr('src', val);
  }
}