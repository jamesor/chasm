class OutputView {
  constructor() {
    this.el = document.getElementById('output');
  }
  clear() {
    this.el.innerHTML = '';
  }
  write(str) {
    this.el.innerHTML += str;
    this.el.scrollTop = this.el.scrollHeight;
  }
}