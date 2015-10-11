'use strict';

class OutputView {
  constructor() {
    this.$el = $('#output');
  }
  clear() {
    this.$el.empty();
  }
  write(str) {
    this.$el.append(str);
    this.$el[0].scrollTop = this.$el[0].scrollHeight;
  }
}