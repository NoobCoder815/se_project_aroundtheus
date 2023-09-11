const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active",
};

const showInputError = (
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) => {
  const errorMessage = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  errorMessage.textContent = inputElement.validationMessage;
  errorMessage.classList.add(errorClass);
};

const hideInputError = (
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) => {
  const errorMessage = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorClass);
  errorMessage.classList.remove(errorClass);
  errorMessage.textContent = "";
};

const checkInputValidity = (formElement, inputElement, options) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, options);
  } else {
    hideInputError(formElement, inputElement, options);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (
  inputList,
  buttonElement,
  { inactiveButtonClass }
) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute("disabled", "");
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};

const setEventListeners = (formElement, options) => {
  const inputList = [...formElement.querySelectorAll(options.inputSelector)];
  const buttonElement = formElement.querySelector(options.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, options);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputList, buttonElement, options);
    });
  });
};

const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formElement, options);
  });
};

enableValidation(config);
