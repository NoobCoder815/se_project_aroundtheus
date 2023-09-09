const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active",
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add("modal__input_type_error");
  formError.textContent = errorMessage;
  formError.classList.add("modal__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove("modal__input_type_error");
  formError.classList.remove("modal__input-error_active");
  formError.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("modal__save-button_inactive");
    buttonElement.setAttribute("disabled", "");
  } else {
    buttonElement.classList.remove("modal__save-button_inactive");
    buttonElement.removeAttribute("disabled");
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".modal__input"));
  const buttonElement = formElement.querySelector(".modal__save-button");

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formElement);
  });
};
