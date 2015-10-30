'use strict';

class Toolbox extends Container {
  constructor() {
    super(Items.TOOLBOX, 'a red toolbox');
    this.commonTitle = 'toolbox';
    this.longDescription = 'A small red toolbox is rusty with a clasp on the front and a handle on top.';
    this.opened = false;
  }
}