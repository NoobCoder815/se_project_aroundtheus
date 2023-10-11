import Popup from "./Popup";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupForm = this._popup.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _close() {
    this._popupForm.reset();
    super.close();
  }

  _getInputValues() {
    this._inputList = this._popupForm.querySelectorAll(".modal__input");

    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues());

      this._close();
    });
  }
}

export default PopupWithForm;
