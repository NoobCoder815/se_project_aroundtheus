class Popup {
  constructor({ popup }) {
    this._popup = popup;
  }

  open() {
    this._popup.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleCloseByEsc);
  }

  close() {
    this._popup.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleCloseByEsc);
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
  }
}
export default Popup;
