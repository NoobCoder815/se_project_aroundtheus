import "./index.css";

import Card from "/src/components/Card.js";
import FormValidator from "/src/components/FormValidator.js";
import { initialCards, config } from "/src/utils/constants.js";
// import Section from "../components/Section.js";
// import UserInfo from "../components/UserInfo.js";
// import Popup from "../components/Popup.js";
// import PopupWithForm from "../components/PopupWithForm.js";
// import PopupWithImage from "../components/PopupWithImage.js";

const profileTemplate = document.querySelector("#gallery-template").content;
const profileGallery = document.querySelector(".gallery__cards");

const editModal = document.querySelector("#edit-modal");
const newCardModal = document.querySelector("#new-card-modal");
const modalList = [...document.querySelectorAll(".modal")];

const profileEditForm = document.forms["edit-form"];
const newCardForm = document.forms["new-card-form"];
const editFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, newCardForm);

const profileEditBtn = document.querySelector(".profile__edit-button");
const newCardBtn = document.querySelector(".profile__plus-button");

const inputName = profileEditForm.querySelector(".modal__input_type_name");
const inputJob = profileEditForm.querySelector(".modal__input_type_bio");
const inputTitle = newCardForm.querySelector(".modal__input_type_title");
const inputLink = newCardForm.querySelector(".modal__input_type_link");

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

editFormValidator.enableValidation();
addFormValidator.enableValidation();

export function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeByEscape);
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeByEscape);
}
function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const modalOpened = document.querySelector(".modal_opened");
    closeModal(modalOpened);
  }
}

function renderCard(cardData, gallery) {
  const cardElement = new Card({
    data: cardData,
    cardSelector: profileTemplate,
  });
  gallery.prepend(cardElement.getView());
}
initialCards.forEach((cardData) => {
  renderCard(cardData, profileGallery);
});

const handleEditFormOpen = () => {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  editFormValidator.toggleButtonState();
  editFormValidator.checkInputValidity(inputName);
  editFormValidator.checkInputValidity(inputJob);
  openModal(editModal);
};
const handleNewCardFormOpen = () => {
  addFormValidator.toggleButtonState();
  openModal(newCardModal);
};
const handleEditFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closeModal(editModal);
};
const handleNewCardFormSubmit = (evt) => {
  evt.preventDefault();
  const name = inputTitle.value;
  const link = inputLink.value;
  renderCard({ name, link }, profileGallery);
  evt.target.reset();
  closeModal(newCardModal);
};

profileEditBtn.addEventListener("click", handleEditFormOpen);
newCardBtn.addEventListener("click", handleNewCardFormOpen);
profileEditForm.addEventListener("submit", handleEditFormSubmit);
newCardForm.addEventListener("submit", handleNewCardFormSubmit);

modalList.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("modal") ||
      evt.target.classList.contains("modal__close-button")
    ) {
      closeModal(modal);
    }
  });
});