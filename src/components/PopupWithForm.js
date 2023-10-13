import Popup from "./Popup";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupForm = this._popup;
    this._handleFormSubmit = handleFormSubmit;
  }

  _close() {
    super.close();
  }

  getInputValues() {
    const inputList = [...this._popupForm.querySelectorAll(".modal__input")];

    const formValues = {};

    inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });

    return formValues;
  }
  // Loopy Loopy Loop
  // setEventListeners() {
  //   super.setEventListeners();
  //   this._popupForm.addEventListener("submit", () => {
  //     // debugger;
  //     this._handleFormSubmit(this._getInputValues());
  //     console.log("wee wee");
  //     this._close();
  //   });
  // }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this._handleFormSubmit);
  }
}

export default PopupWithForm;
