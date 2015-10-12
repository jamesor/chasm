'use strict';

class InputView {
  constructor() {
    this.prompt = document.getElementById('prompt');
    this.response = document.getElementById('response');
  }
  clear() {
    this.response.innerHTML = '';
  }
  write(str) {
    this.response.innerHTML = str.replace(/ /g, '&nbsp;');
  }
  writePrompt(str) {
    this.prompt.innerHTML = str.replace(/ /g, '&nbsp;');
  }
}