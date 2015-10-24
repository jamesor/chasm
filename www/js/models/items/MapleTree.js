'use strict';

class MapleTree extends Item {
  constructor() {
    super(Items.MAPLE_TREE, 'a maple tree');
    this.commonTitle = 'tree';
    this.longDescription = 'a tall maple tree with a thick trunk and visible roots.';
    this.canBeTaken = false;
    this.hideFromList = true;
  }
}