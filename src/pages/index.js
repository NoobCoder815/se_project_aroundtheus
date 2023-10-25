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

Promise.all([api.getUserInformation(), api.getInitialCards()]).then(
  ([userData, initialCards]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserProfileImage(userData);
    const apiCardSection = new Section(
      {
        items: initialCards,
        renderer: addCard,
      },
      constants.cardGallery
    );
    apiCardSection.renderItems();
  }
);
// Create Card + Add Card Functions
const createCard = (cardData) => {
  const cardElement = new Card(
    cardData,
    {
      handleCardClick: () => popupImage.open(cardData),
      handleDeleteClick: () => {
        deleteModalNew.open();
        deleteModalNew.submitForm(() => {
          api
            .deleteCard(cardData._id)
            .then(() => {
              deleteModalNew.close();
              cardElement.removeCard();
            })
            .catch((err) => console.error(err));
        });
      },
      handleLikeClick: (card) => {
        // debugger;
        if (!cardData.isLiked) {
          api
            .addLike(card)
            .then((res) => {
              cardElement.setLike(res);
              console.log("add");
              console.log(res.isLiked);
            })
            .catch((err) => console.error(err));
        } else {
          api
            .deleteLike(card)
            .then((res) => {
              cardElement.setLike(res.isLiked);
              console.error("delete");
              console.log(res.isLiked);
            })
            .catch((err) => console.error(err));
        }
      },
    },
    constants.cardTemplate
  );
  return cardElement.getView();
};
const addCard = (cardData) => {
  const card = createCard(cardData);
  cardSection.setItem(card);
};
// Section instance to use methods
const cardSection = new Section(
  {
    items: [],
    renderer: () => {},
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
const editModalNew = new PopupWithForm(
  {
    popup: constants.editModal,
    handleFormSubmit: (editModalData) => {
      api
        .editProfileData(editModalData)
        .then((editModalData) => {
          userInfo.setUserInfo(editModalData);
          editModalNew.close();
        })
        .catch((err) => console.error(err));
    },
  },
  constants.config
);
const cardModalNew = new PopupWithForm(
  {
    popup: constants.newCardModal,
    handleFormSubmit: (newCardData) => {
      api
        .addNewCard(newCardData)
        .then((newCardData) => {
          addCard(newCardData);
          cardModalNew.close();
        })
        .catch((err) => console.error(err));
    },
  },
  constants.config
);
const avatarModalNew = new PopupWithForm(
  {
    popup: constants.avatarModal,
    handleFormSubmit: (avatarData) => {
      api
        .updateProfileImage(avatarData)
        .then((res) => {
          userInfo.setUserProfileImage(res);
          avatarModalNew.close();
        })
        .catch((err) => console.error(err));
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
