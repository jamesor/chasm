'use strict';

class MapleTree extends Item {
  constructor() {
    super(Items.MAPLE_TREE, 'a maple tree');
    this.commonTitle = 'tree';
    this.longDescription = 'You see a tall maple tree with a thick trunk and visible roots.';
    this.hideFromList = true;

    this.setFeature('take', false);
  }
}