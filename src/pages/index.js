import "./index.css";

import Card from "/src/components/Card.js";
import FormValidator from "/src/components/FormValidator.js";
import { initialCards, config } from "/src/utils/constants.js";
import Section from "/src/components/Section.js";
import UserInfo from "/src/components/UserInfo.js";
import Popup from "/src/components/Popup.js";
import PopupWithForm from "/src/components/PopupWithForm.js";
import PopupWithImage from "/src/components/PopupWithImage.js";

const profileTemplate = document.querySelector("#gallery-template").content;
const profileGallery = document.querySelector(".gallery__cards");

const editModal = document.getElementById("edit-modal");
const newCardModal = document.getElementById("new-card-modal");
const previewImageModal = document.querySelector("#preview-image-modal");

const previewImage = previewImageModal.querySelector(".preview-image");
const previewImageText = previewImageModal.querySelector(".image-description");

const profileEditForm = document.forms["edit-form"];
const newCardForm = document.forms["new-card-form"];

const profileEditBtn = document.querySelector(".profile__edit-button");
const newCardBtn = document.querySelector(".profile__plus-button");

const inputName = profileEditForm.querySelector(".modal__input_type_name");
const inputJob = profileEditForm.querySelector(".modal__input_type_bio");
// const inputTitle = newCardForm.querySelector(".modal__input_type_title");
// const inputLink = newCardForm.querySelector(".modal__input_type_link");

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

const editFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, newCardForm);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

const renderCard = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const popupImage = new PopupWithImage(
        {
          data: cardData,
          popupImage: previewImage,
          popupImageText: previewImageText,
        },
        previewImageModal
      );
      const cardElement = new Card({
        data: cardData,
        cardSelector: profileTemplate,
        handleCardClick: () => {
          popupImage.open();
        },
      });
      const card = cardElement.getView();

      renderCard.setItem(card);
    },
  },
  profileGallery
);

const cardModalNew = new PopupWithForm({
  popupSelector: newCardModal,
  handleFormSubmit: (evt) => {
    const newCardData = cardModalNew.getInputValues();
    const popupImage = new PopupWithImage(
      {
        data: newCardData,
        popupImage: previewImage,
        popupImageText: previewImageText,
      },
      previewImageModal
    );
    const cardElement = new Card({
      data: newCardData,
      cardSelector: profileTemplate,
      handleCardClick: () => {
        popupImage.open();
      },
    });
    const newCard = cardElement.getView();
    renderCard.setItem(newCard);
    cardModalNew.close();
    evt.target.reset();
  },
});
renderCard.renderItems();

const editModalNew = new PopupWithForm({
  popupSelector: editModal,
  handleFormSubmit: () => {
    const userData = editModalNew.getInputValues();
    const userInfo = new UserInfo({
      userName: profileName,
      userJob: profileJob,
    });

    userInfo.setUserInfo(userData);
    editModalNew.close();
  },
});

const handleEditFormOpen = () => {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  editFormValidator.toggleButtonState();
  editModalNew.open();
};
const handleNewCardFormOpen = () => {
  addFormValidator.toggleButtonState();
  cardModalNew.open();
};

profileEditBtn.addEventListener("click", handleEditFormOpen);
newCardBtn.addEventListener("click", handleNewCardFormOpen);
