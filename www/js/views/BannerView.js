'use strict';

class BannerView {
  constructor() {
    this.el = document.getElementById('banner');
    this._title = '';
    this._score = 0;
    this._moves = 0;
  }
  set title(title) {
    this._title = title;
    this.render();
  }
  set score(score) {
    this._score = score;
    this.render();
  }
  set moves(moves) {
    this._moves = moves;
    this.render();
  }
  render() {
    var title = Utils.setChars(this._title, 21);
    var score = Utils.setChars('Score:'+this._score, 9);
    var moves = Utils.setChars('Moves:'+this._moves, 10);
    var str = (title+score+moves).replace(/\s/g, '&nbsp;');
    this.el.innerHTML = str;
  }
}