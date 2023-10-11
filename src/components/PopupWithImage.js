import Popup from "./Popup";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupImage = this._popup.querySelector(".preview-image");
    this._popupImageText = this._popup.querySelector(".image-description");
  }

  _handleImageClick() {
    this._data = data;
    this._popupImage.src = data.link;
    this._popupImage.alt = data.name;
    this._popupImageText.textContent = data.name;
    super.open();
  }

  _setEventListeners() {
    super.setEventListeners();
  }
}

export default PopupWithImage;
