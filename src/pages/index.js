import "./index.css";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import * as constants from "../utils/constants.js";
import { handleSubmit } from "../utils/utils.js";
// User Data
const userInfo = new UserInfo(
  constants.profileName,
  constants.profileDescription,
  constants.profileImage
);
// Create Card
const createCard = (cardData) => {
  const cardElement = new Card(
    cardData,
    {
      handleCardClick: () => cardImagePopup.open(cardData),
      handleCardDelete: () => {
        deleteConfirmation.open();
        deleteConfirmation.submit(() => {
          function makeRequest() {
            return api.deleteCard(cardData._id).then(cardElement.removeCard());
          }
          handleSubmit(makeRequest, deleteConfirmation, "Deleting...");
        });
      },
      handleCardLike: (cardId) => {
        !cardElement.isLiked
          ? api
              .addLike(cardId)
              .then((status) => cardElement.setLikeStatus(status.isLiked))
              .catch(console.error)
          : api
              .deleteLike(cardId)
              .then((status) => cardElement.setLikeStatus(status.isLiked))
              .catch(console.error);
      },
    },
    constants.cardTemplate
  );
  return cardElement.getView();
};
// Add Card
const addCard = (cardData) => {
  const card = createCard(cardData);
  cardSection.setItem(card);
};
// Card Section
const cardSection = new Section(addCard, constants.cardGallery);
// Popup Instantiations
const cardImagePopup = new PopupWithImage(
  constants.previewImage,
  constants.previewImageText,
  constants.previewImageModal
);
const editProfileForm = new PopupWithForm(
  {
    popup: constants.editModal,
    handleFormSubmit: (editFormData) => {
      function makeRequest() {
        return api.editProfileData(editFormData).then((editFormData) => {
          userInfo.setUserInfo(editFormData);
          editProfileForm.resetForm();
        });
      }
      handleSubmit(makeRequest, editProfileForm);
    },
  },
  constants.config
);
const newCardForm = new PopupWithForm(
  {
    popup: constants.newCardModal,
    handleFormSubmit: (newCardData) => {
      function makeRequest() {
        return api.addNewCard(newCardData).then((newCardData) => {
          addCard(newCardData);
          newCardForm.resetForm();
        });
      }
      handleSubmit(makeRequest, newCardForm);
    },
  },
  constants.config
);
const avatarEditForm = new PopupWithForm(
  {
    popup: constants.avatarModal,
    handleFormSubmit: (avatarData) => {
      function makeRequest() {
        return api.updateProfileImage(avatarData).then((avatarData) => {
          userInfo.setUserProfileImage(avatarData);
          avatarEditForm.resetForm();
        });
      }
      handleSubmit(makeRequest, avatarEditForm);
    },
  },
  constants.config
);
const deleteConfirmation = new PopupWithConfirmation(
  constants.deleteModal,
  constants.config
);
// Handler Functions
const handleEditFormOpen = () => {
  editProfileForm.setInputValues(userInfo.getUserInfo());
  formValidators["edit-form"].resetValidation();
  editProfileForm.open();
};
const handleNewCardFormOpen = () => {
  formValidators["new-card-form"].resetValidation();
  newCardForm.open();
};
const handleAvatarEditOpen = () => {
  formValidators["avatar-edit-form"].resetValidation();
  avatarEditForm.open();
};
// Click Handlers
constants.profileEditBtn.addEventListener("click", handleEditFormOpen);
constants.newCardBtn.addEventListener("click", handleNewCardFormOpen);
constants.avatarEditBtn.addEventListener("click", handleAvatarEditOpen);
// Event Listeners
cardImagePopup.setEventListeners();
editProfileForm.setEventListeners();
newCardForm.setEventListeners();
avatarEditForm.setEventListeners();
deleteConfirmation.setEventListeners();
// Enable validation for all forms
const formValidators = {};
const enableValidation = (config) => {
  const formList = [...document.querySelectorAll(config.formSelector)];
  formList.forEach((form) => {
    const validator = new FormValidator(config, form);
    const formName = form.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(constants.config);
// Api Instantiation
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "9fbfab1b-69d6-43a9-b085-60d57b074309",
    "Content-Type": "application/json",
  },
});
// Server Requests
Promise.all([api.getUserInformation(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserProfileImage(userData);
    cardSection.renderItems(cards);
  })
  .catch(console.error);
