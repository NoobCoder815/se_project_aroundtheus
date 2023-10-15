import "./index.css";
import Card from "/src/components/Card.js";
import FormValidator from "/src/components/FormValidator.js";
import Section from "/src/components/Section.js";
import UserInfo from "/src/components/UserInfo.js";
import PopupWithForm from "/src/components/PopupWithForm.js";
import PopupWithImage from "/src/components/PopupWithImage.js";
import { initialCards, config } from "/src/utils/constants.js";

const profileTemplate = document.querySelector("#gallery-template").content;
const profileGallery = document.querySelector(".gallery__cards");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

const editModal = document.getElementById("edit-modal");
const newCardModal = document.getElementById("new-card-modal");
const previewImageModal = document.querySelector("#preview-image-modal");

const previewImage = previewImageModal.querySelector(".preview-image");
const previewImageText = previewImageModal.querySelector(".image-description");

const profileEditBtn = document.querySelector(".profile__edit-button");
const newCardBtn = document.querySelector(".profile__plus-button");

const formValidators = {};

// Delete soon
const profileEditForm = document.forms["edit-form"];
const newCardForm = document.forms["new-card-form"];
// const inputName = profileEditForm.querySelector(".modal__input_type_name");
// const inputJob = profileEditForm.querySelector(".modal__input_type_bio");
// const inputTitle = newCardForm.querySelector(".modal__input_type_title");
// const inputLink = newCardForm.querySelector(".modal__input_type_link");

const enableValidation = (config) => {
  const formList = [...document.querySelectorAll(config.formSelector)];
  formList.forEach((form) => {
    const validator = new FormValidator(config, form);
    const formName = form.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
const cardRenderer = (data) => {
  const popupImage = new PopupWithImage(
    {
      popupImage: previewImage,
      popupImageText: previewImageText,
    },
    previewImageModal
  );
  const cardElement = new Card({
    data: data,
    cardSelector: profileTemplate,
    handleCardClick: () => {
      popupImage.open(data);
      popupImage.setEventListeners();
    },
  });
  const card = cardElement.getView();
  renderCard.setItem(card);
};

const renderCard = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      cardRenderer(cardData);
    },
  },
  profileGallery
);

const userInfo = new UserInfo(
  {
    userName: profileName,
    userJob: profileJob,
  },
  config
);

const editModalNew = new PopupWithForm(
  {
    popup: editModal,
    handleFormSubmit: (evt) => {
      evt.preventDefault();
      const userData = editModalNew.getInputValues();
      userInfo.setUserInfo(userData);
      editModalNew.close();
    },
  },
  config
);
const cardModalNew = new PopupWithForm(
  {
    popup: newCardModal,
    handleFormSubmit: (evt) => {
      evt.preventDefault();
      const newCardData = cardModalNew.getInputValues();
      cardRenderer(newCardData);
      cardModalNew.close();
      evt.target.reset();
    },
  },
  config
);

// Maintenance
const handleEditFormOpen = () => {
  formValidators["edit-form"].resetValidation();
  const userInput = userInfo.getUserInfo(profileEditForm);
  editModalNew.setInputValues(userInput);
  editModalNew.open();
};
const handleNewCardFormOpen = () => {
  formValidators["new-card-form"].resetValidation();
  cardModalNew.open();
};

profileEditBtn.addEventListener("click", handleEditFormOpen);
newCardBtn.addEventListener("click", handleNewCardFormOpen);

editModalNew.setEventListeners();
cardModalNew.setEventListeners();

enableValidation(config);
renderCard.renderItems();
