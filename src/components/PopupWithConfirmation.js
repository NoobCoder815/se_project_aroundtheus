import Popup from "./Popup";

class PopupWithConfirmation extends Popup {
  constructor({ popup }, config) {
    super({ popup });
    this._popupForm = this._popup;
    this._submitButton = config.submitButtonSelector;
  }

  submitForm(callBack) {
    this._handleFormSubmit = callBack;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }
}

export default PopupWithConfirmation;
