// Profile data
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
// Card gallery + card template
const cardGallery = document.querySelector(".gallery__cards");
const cardTemplate = document.querySelector("#card-template").content;
// All modals
const editModal = document.getElementById("edit-modal");
const newCardModal = document.getElementById("new-card-modal");
const avatarModal = document.getElementById("avatar-edit-modal");
const deleteCardModal = document.getElementById("delete-confirmation-modal");
const previewImageModal = document.getElementById("preview-image-modal");
// Preview image + text
const previewImage = previewImageModal.querySelector(".preview-image");
const previewImageText = previewImageModal.querySelector(".image-description");
// Buttons
const profileEditBtn = document.querySelector(".profile__edit-button");
const newCardBtn = document.querySelector(".profile__plus-button");
const avatarEditBtn = document.querySelector(".edit__avatar-button");
// Modal selectors
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__confirm-button",
  inactiveButtonClass: "modal__confirm-button_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active",
};
// Universal function for submit handling
const handleSubmit = (request, popupInstance, loadingText = "Saving...") => {
  popupInstance.renderLoading(true, loadingText);
  request()
    .then(() => {
      popupInstance.close();
    })
    .catch(console.error)
    .finally(() => {
      popupInstance.renderLoading(false);
    });
};

export {
  profileName,
  profileDescription,
  profileAvatar,
  cardGallery,
  cardTemplate,
  editModal,
  newCardModal,
  avatarModal,
  deleteCardModal,
  previewImageModal,
  previewImageText,
  previewImage,
  profileEditBtn,
  newCardBtn,
  avatarEditBtn,
  config,
  handleSubmit,
};
