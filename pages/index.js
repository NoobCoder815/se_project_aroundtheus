import Card from "/components/Card.js";
import FormValidator from "/components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const profileTemplate = document.querySelector("#gallery-template").content;
const profileGallery = document.querySelector(".gallery__cards");

const editModal = document.querySelector("#edit-modal");
const newCardModal = document.querySelector("#new-card-modal");
const previewImageModal = document.querySelector("#preview-image-modal");

const profileEditForm = document.forms["edit-form"];
const newCardForm = document.forms["new-card-form"];

const profileEditBtn = document.querySelector("#profile-edit-button");
const newCardBtn = document.querySelector(".profile__plus-button");
const closeButtons = document.querySelectorAll(".modal__close-button");

const inputName = profileEditForm.querySelector(".modal__input_type_name");
const inputJob = profileEditForm.querySelector(".modal__input_type_bio");
const inputTitle = newCardForm.querySelector(".modal__input_type_title");
const inputLink = newCardForm.querySelector(".modal__input_type_link");

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const previewImage = previewImageModal.querySelector(".preview-image");
const previewImageText = previewImageModal.querySelector(".image-description");

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active",
};

const editFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, newCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeByEscape);
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeByEscape);
}

function handleImageClick(cardImage) {
  cardImage = previewImage.src = cardImage.src;
  previewImage.alt = cardImage.alt;
  previewImageText.textContent = cardImage.alt;
  openModal(previewImageModal);
}

function renderCards(cardData, gallery) {
  const cardElement = new Card(cardData, profileTemplate, handleImageClick);
  gallery.prepend(cardElement.getCardElement());
}

profileEditBtn.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openModal(editModal);
});
newCardBtn.addEventListener("click", () => openModal(newCardModal));

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closeModal(editModal);
}
function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  const name = inputTitle.value;
  const link = inputLink.value;
  renderCards({ name, link }, profileGallery);
  evt.target.reset();
  closeModal(newCardModal);
}

profileEditForm.addEventListener("submit", handleEditFormSubmit);
newCardForm.addEventListener("submit", handleNewCardFormSubmit);

const modalList = [...document.querySelectorAll(".modal")];
modalList.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal")) {
      closeModal(modal);
    }
    if (evt.target.classList.contains("modal__close-button")) {
      closeModal(modal);
    }
  });
});

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const modalOpened = document.querySelector(".modal_opened");
    closeModal(modalOpened);
  }
}

initialCards.forEach((cardData) => {
  renderCards(cardData, profileGallery);
});
