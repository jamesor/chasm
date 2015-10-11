'use strict';

class InputView {
  constructor() {
    this.$prompt = $('#prompt');
    this.$response = $('#response');
  }
  clear() {
    this.$response.empty();
  }
  write(str) {
    this.$response.html(str.replace(/ /g, '&nbsp;'));
  }
  prompt(str) {
    this.$prompt.html(str.replace(/ /g, '&nbsp;'));
  }
}