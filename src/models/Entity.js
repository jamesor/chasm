class Entity {
  constructor(title, description) {
    this.title = title || 'Untitled';
    this.description = description || 'Undescribed';
  }

  get longDescription() {
    return this._longDescription;
  }

  set longDescription(str) {
    this._tmpLongDescription = this._longDescription;
    this._longDescription = str;
  }

  restoreLongDescription() {
    if (this.tmpLongDescription) {
      this._longDescription = this._tmpLongDescription;
    }
  }
}