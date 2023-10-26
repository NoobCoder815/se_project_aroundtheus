import Popup from "./Popup";

class PopupWithConfirmation extends Popup {
  constructor({ popup }, config) {
    super({ popup });
    this._submitBtn = this._popup.querySelector(config.submitButtonSelector);
    this._submitBtnText = this._submitBtn.textContent;
  }

  submit(callBack) {
    this._handleSubmit = callBack;
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitBtn.textContent = loadingText;
    } else {
      this._submitBtn.textContent = this._submitBtnText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }
}

export default PopupWithConfirmation;
