class Section {
  constructor(renderer, container) {
    this._renderer = renderer;
    this._container = container;
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  setItem(item) {
    this._container.prepend(item);
  }
}

export default Section;
