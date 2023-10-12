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
    this._popup.removeEventListener("keydown", this._handleCloseByEsc);
  }

  _handleCloseByEsc(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("modal") ||
        evt.target.classList.contains("modal__close-button")
      ) {
        this.close();
      }
    });
  }
}
export default Popup;
