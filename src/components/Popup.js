class Popup {
  constructor({ popupSelector }) {
    this._popup = popupSelector;
  }

  open() {
    this._popup.classList.add("modal_opened");
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove("modal_opened");
  }

  _handleCloseByEsc = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("modal") ||
        evt.target.classList.contains("modal__close-button")
      ) {
        this.close();
      }
    });

    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    document.addEventListener("keydown", this._handleCloseByEsc);
  }
}
export default Popup;
