class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  setItem(item) {
    this._container.append(item);
  }
}

export default Section;
