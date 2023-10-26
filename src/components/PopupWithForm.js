import Popup from "./Popup";

class PopupWithForm extends Popup {
  constructor({ popup, handleFormSubmit }, config) {
    super({ popup });
    this._handleFormSubmit = handleFormSubmit;
    this._submitBtn = this._popup.querySelector(config.submitButtonSelector);
    this._submitBtnText = this._submitBtn.textContent;
    this._popupForm = this._popup.querySelector(config.formSelector);
    this._inputList = [...this._popup.querySelectorAll(config.inputSelector)];
  }

  _getInputValues() {
    const formValues = {};

    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });

    return formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitBtn.textContent = loadingText;
    } else {
      this._submitBtn.textContent = this._submitBtnText;
    }
  }

  resetForm() {
    this._popupForm.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}

export default PopupWithForm;
