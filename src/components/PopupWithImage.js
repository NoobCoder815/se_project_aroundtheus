import Popup from "./Popup";

class PopupWithImage extends Popup {
  constructor({ data, popupImage, popupImageText }, popupSelector) {
    super({ popupSelector });
    this._popupSelector = popupSelector;
    this._popupImage = popupImage;
    this._popupImageText = popupImageText;
    this._title = data.title;
    this._link = data.link;
  }

  open() {
    super.open();
    this._popupImage.src = this._link;
    this._popupImage.alt = this._title;
    this._popupImageText.textContent = this._title;
    this._setEventListeners();
  }

  _setEventListeners() {
    super.setEventListeners();
  }
}

export default PopupWithImage;
