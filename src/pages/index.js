import "./index.css";
import Card from "/src/components/Card.js";
import FormValidator from "/src/components/FormValidator.js";
import Section from "/src/components/Section.js";
import UserInfo from "/src/components/UserInfo.js";
// import Popup from "../components/Popup";
import PopupWithForm from "/src/components/PopupWithForm.js";
import PopupWithImage from "/src/components/PopupWithImage.js";
import { initialCards, config } from "/src/utils/constants.js";
import Api from "/src/components/Api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "9fbfab1b-69d6-43a9-b085-60d57b074309",
    "Content-Type": "application/json",
  },
});

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
const profileGallery = document.querySelector(".gallery__cards");

const cardTemplate = document.querySelector("#card-template").content;

const editModal = document.getElementById("edit-modal");
const newCardModal = document.getElementById("new-card-modal");
const avatarModal = document.getElementById("avatar-edit-modal");
// const deleteModal = document.getElementById("delete-confirmation-modal");
const previewImageModal = document.getElementById("preview-image-modal");

const previewImage = previewImageModal.querySelector(".preview-image");
const previewImageText = previewImageModal.querySelector(".image-description");

const profileEditBtn = document.querySelector(".profile__edit-button");
const newCardBtn = document.querySelector(".profile__plus-button");
const avatarEditBtn = document.querySelector(".edit__avatar-button");
// const deleteButtons = [...document.querySelectorAll(".card__delete-button")];

const formValidators = {};

// Validation for all forms
const enableValidation = (config) => {
  const formList = [...document.querySelectorAll(config.formSelector)];
  formList.forEach((form) => {
    const validator = new FormValidator(config, form);
    const formName = form.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

// Create Card + Add Card Functions
const createCard = (data) => {
  const cardElement = new Card({
    data: data,
    cardSelector: cardTemplate,
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

// User Data
const userInfo = new UserInfo({
  userName: profileName,
  userJob: profileJob,
});

const cardSection = new Section(
  {
    items: initialCards,
    renderer: addCard,
  },
  profileGallery
);

// Popup Instantiations
const popupImage = new PopupWithImage(
  {
    popupImage: previewImage,
    popupImageText: previewImageText,
  },
  previewImageModal
);
// const deleteModalNew = new Popup({
//   popup: deleteModal,
// });
const editModalNew = new PopupWithForm(
  {
    popup: editModal,
    handleFormSubmit: (editModalData) => {
      userInfo.setUserInfo(editModalData);
      api.editProfileData(editModalData);
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
      api.addNewCard(newCardData);
      cardModalNew.close();
    },
  },
  config
);
const avatarModalNew = new PopupWithForm(
  {
    popup: avatarModal,
    handleFormSubmit: (avatarData) => {
      profileAvatar.src = avatarData;
      api.updateProfileImage(avatarData);
      avatarModalNew.close();
    },
  },
  config
);

// Maintanence Handler Functions
// const handleDeletePopupOpen = () => {
//   deleteModalNew.open();
// };
const handleEditFormOpen = () => {
  const userData = userInfo.getUserInfo();
  editModalNew.setInputValues(userData);
  formValidators["edit-form"].resetValidation();
  editModalNew.open();
};
const handleNewCardFormOpen = () => {
  formValidators["new-card-form"].resetValidation();
  cardModalNew.open();
};
const handleAvatarEditOpen = () => {
  formValidators["avatar-edit-form"].resetValidation();
  avatarModalNew.open();
};

// Click Handlers
profileEditBtn.addEventListener("click", handleEditFormOpen);
newCardBtn.addEventListener("click", handleNewCardFormOpen);
avatarEditBtn.addEventListener("click", handleAvatarEditOpen);
// deleteButtons.forEach((btn) => {
//   btn.addEventListener("click", handleDeletePopupOpen);
// });

// Event Listeners
popupImage.setEventListeners();
editModalNew.setEventListeners();
cardModalNew.setEventListeners();
avatarModalNew.setEventListeners();
// deleteModalNew.setEventListeners();

enableValidation(config);
cardSection.renderItems();
