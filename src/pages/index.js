import "./index.css";
import Card from "/src/components/Card.js";
import FormValidator from "/src/components/FormValidator.js";
import Section from "/src/components/Section.js";
import UserInfo from "/src/components/UserInfo.js";
import PopupWithConfirmation from "/src/components/PopupWithConfirmation.js";
import PopupWithForm from "/src/components/PopupWithForm.js";
import PopupWithImage from "/src/components/PopupWithImage.js";
import * as constants from "/src/utils/constants.js";
import Api from "/src/components/Api.js";
// User Data
const userInfo = new UserInfo({
  userName: constants.profileName,
  userDescription: constants.profileDescription,
  userProfileImage: constants.profileAvatar,
});
// Api Instantiation
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "9fbfab1b-69d6-43a9-b085-60d57b074309",
    "Content-Type": "application/json",
  },
});

// Create Card
const createCard = (cardData) => {
  const cardElement = new Card(
    cardData,
    {
      handleCardClick: () => popupImage.open(cardData),
      handleCardDelete: () => {
        deleteConfirmation.open();
        deleteConfirmation.submit(() => {
          function makeRequest() {
            return api.deleteCard(cardData._id).then(() => {
              cardElement.removeCard();
            });
          }
          constants.handleSubmit(
            makeRequest,
            deleteConfirmation,
            "Deleting..."
          );
        });
      },
      handleCardLike: (cardId) => {
        if (!cardElement.isLiked) {
          api
            .addLike(cardId)
            .then((res) => {
              cardElement.setLikeStatus(res.isLiked);
            })
            .catch(console.error);
        } else {
          api
            .deleteLike(cardId)
            .then((res) => {
              cardElement.setLikeStatus(res.isLiked);
            })
            .catch(console.error);
        }
      },
    },
    constants.cardTemplate
  );
  return cardElement.getView();
};
// Add card
const addCard = (cardData) => {
  const card = createCard(cardData);
  cardSection.setItem(card);
};
// Card section
const cardSection = new Section(
  {
    items: [],
    renderer: addCard,
  },
  constants.cardGallery
);
// Popup Instantiations
const popupImage = new PopupWithImage(
  {
    popupImage: constants.previewImage,
    popupImageText: constants.previewImageText,
  },
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
      constants.handleSubmit(makeRequest, editProfileForm);
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
      constants.handleSubmit(makeRequest, newCardForm);
    },
  },
  constants.config
);
const avatarEditForm = new PopupWithForm(
  {
    popup: constants.avatarModal,
    handleFormSubmit: (avatarData) => {
      function makeRequest() {
        return api.updateProfileImage(avatarData).then((res) => {
          userInfo.setUserProfileImage(res);
          avatarEditForm.resetForm();
        });
      }
      handleSubmit(makeRequest, avatarEditForm);
    },
  },
  constants.config
);
const deleteConfirmation = new PopupWithConfirmation(
  {
    popup: constants.deleteCardModal,
  },
  constants.config
);
// Handler Functions
const handleEditFormOpen = () => {
  const userData = userInfo.getUserInfo();
  editProfileForm.setInputValues(userData);
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
popupImage.setEventListeners();
editProfileForm.setEventListeners();
newCardForm.setEventListeners();
avatarEditForm.setEventListeners();
deleteConfirmation.setEventListeners();
// Set and enable validation for all forms
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
// Server requests
Promise.all([api.getUserInformation(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserProfileImage(userData);
    initialCards.forEach((card) => addCard(card));
  })
  .catch(console.error);
cardSection.renderItems();
