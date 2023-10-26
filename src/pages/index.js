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
        deleteModalNew.open();
        deleteModalNew.submitForm(() => {
          function makeRequest() {
            return api.deleteCard(cardData._id).then(() => {
              cardElement.removeCard();
            });
          }
          handleSubmit(makeRequest, deleteModalNew, "Deleting...");
        });
      },
      handleCardLike: (card) => {
        if (!cardElement.isLiked) {
          api
            .addLike(card)
            .then((res) => {
              cardElement.setLikeStatus(res.isLiked);
            })
            .catch(console.error);
        } else {
          api
            .deleteLike(card)
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
// Universal function for submit handling
function handleSubmit(request, popupInstance, loadingText = "Saving...") {
  popupInstance.renderLoading(true, loadingText);
  request()
    .then(() => {
      popupInstance.close();
    })
    .catch(console.error)
    .finally(() => {
      popupInstance.renderLoading(false);
    });
}
// Popup Instantiations
const popupImage = new PopupWithImage(
  {
    popupImage: constants.previewImage,
    popupImageText: constants.previewImageText,
  },
  constants.previewImageModal
);
const editModalNew = new PopupWithForm(
  {
    popup: constants.editModal,
    handleFormSubmit: (editModalData) => {
      function makeRequest() {
        return api.editProfileData(editModalData).then((editModalData) => {
          userInfo.setUserInfo(editModalData);
          editModalNew.resetForm();
        });
      }
      handleSubmit(makeRequest, editModalNew);
    },
  },
  constants.config
);
const cardModalNew = new PopupWithForm(
  {
    popup: constants.newCardModal,
    handleFormSubmit: (newCardData) => {
      function makeRequest() {
        return api.addNewCard(newCardData).then((newCardData) => {
          constants.cardGallery.prepend(createCard(newCardData));
          cardModalNew.resetForm();
        });
      }
      handleSubmit(makeRequest, cardModalNew);
    },
  },
  constants.config
);
const avatarModalNew = new PopupWithForm(
  {
    popup: constants.avatarModal,
    handleFormSubmit: (avatarData) => {
      function makeRequest() {
        return api.updateProfileImage(avatarData).then((res) => {
          userInfo.setUserProfileImage(res);
          avatarModalNew.resetForm();
        });
      }
      handleSubmit(makeRequest, avatarModalNew);
    },
  },
  constants.config
);
const deleteModalNew = new PopupWithConfirmation(
  {
    popup: constants.deleteCardModal,
  },
  constants.config
);
// Handler Functions
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
constants.profileEditBtn.addEventListener("click", handleEditFormOpen);
constants.newCardBtn.addEventListener("click", handleNewCardFormOpen);
constants.avatarEditBtn.addEventListener("click", handleAvatarEditOpen);
// Event Listeners
popupImage.setEventListeners();
editModalNew.setEventListeners();
cardModalNew.setEventListeners();
avatarModalNew.setEventListeners();
deleteModalNew.setEventListeners();
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
    const apiCardSection = new Section(
      {
        items: initialCards,
        renderer: (initialCard) => {
          const card = createCard(initialCard);
          apiCardSection.setItem(card);
        },
      },
      constants.cardGallery
    );
    apiCardSection.renderItems();
  })
  .catch(console.error);
