import Popup from "./Popup";

class PopupWithForm extends Popup {
  constructor({ popup, handleFormSubmit }, config) {
    super({ popup });
    this._popupForm = this._popup;
    this._handleFormSubmit = handleFormSubmit;
    this._inputSelector = config.inputSelector;
  }

  _getInputList() {
    this._inputList = [
      ...this._popupForm.querySelectorAll(this._inputSelector),
    ];
  }

  getInputValues() {
    this._getInputList();

    const formValues = {};

    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });

    return formValues;
  }

  setInputValues(data) {
    this._getInputList();

    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this._handleFormSubmit);
  }
}

export default PopupWithForm;
