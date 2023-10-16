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
const userName = profileEditForm.querySelector(".modal__input");
const userJob = profileEditForm.querySelector(".modal__input_type_bio");

const enableValidation = (config) => {
  const formList = [...document.querySelectorAll(config.formSelector)];
  formList.forEach((form) => {
    const validator = new FormValidator(config, form);
    const formName = form.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

const popupImage = new PopupWithImage(
  {
    popupImage: previewImage,
    popupImageText: previewImageText,
  },
  previewImageModal
);

const userInfo = new UserInfo({
  userName: profileName,
  userJob: profileJob,
});

const createCard = (data) => {
  const cardElement = new Card({
    data: data,
    cardSelector: profileTemplate,
    handleCardClick: () => {
      popupImage.open(data);
    },
  });
  return cardElement.getView();
};

const addCard = (data) => {
  const card = createCard(data);
  cardSection.setItem(card);
};

const cardSection = new Section(
  {
    items: initialCards,
    renderer: addCard,
  },
  profileGallery
);

const editModalNew = new PopupWithForm(
  {
    popup: editModal,
    handleFormSubmit: (editModalData) => {
      userInfo.setUserInfo(editModalData);
      editModalNew.close();
    },
  },
  config
);
const cardModalNew = new PopupWithForm(
  {
    popup: newCardModal,
    handleFormSubmit: (newCardData) => {
      addCard(newCardData);
      cardModalNew.close();
    },
  },
  config
);

const handleEditFormOpen = () => {
  formValidators["edit-form"].resetValidation();
  const userData = userInfo.getUserInfo();
  editModalNew.setInputValues(userData);
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
popupImage.setEventListeners();

enableValidation(config);
cardSection.renderItems();
