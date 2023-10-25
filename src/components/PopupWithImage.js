import Popup from "./Popup";

class PopupWithImage extends Popup {
  constructor({ popupImage, popupImageText }, popup) {
    super({ popup });
    this._popup = popup;
    this._popupImage = popupImage;
    this._popupImageText = popupImageText;
  }

  open(data) {
    super.open();
    this._popupImage.src = data.link;
    this._popupImage.alt = data.name;
    this._popupImageText.textContent = data.name;
  }
}

export default PopupWithImage;
