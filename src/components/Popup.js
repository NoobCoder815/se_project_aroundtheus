class Popup {
  constructor({ popupSelector }) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add("modal_opened");
  }

  close() {
    this._popup.classList.remove("modal_opened");
  }

  _handleCloseByEsc(evt) {
    if (evt.key === "Escape") {
      const modalOpened = document.querySelector(".modal_opened");
      this.close(modalOpened);
    }
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", () => {
      if (
        this._popup.classList.contains("modal") ||
        this._popup.classList.contains("modal__close-button")
      ) {
        this._popup.this.close();
      }
    });

    this._popup.addEventListener("keydown", this._handleCloseByEsc);
  }
}
export default Popup;
