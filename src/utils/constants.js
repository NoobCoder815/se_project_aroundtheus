// Profile data
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
// Card gallery + card template
const cardGallery = document.querySelector(".gallery__cards");
const cardTemplate = document.querySelector("#card-template").content;
// All modals
const editModal = document.getElementById("edit-modal");
const newCardModal = document.getElementById("new-card-modal");
const avatarModal = document.getElementById("avatar-edit-modal");
const deleteModal = document.getElementById("delete-confirmation-modal");
const previewImageModal = document.getElementById("preview-image-modal");
// Preview image + text
const previewImage = previewImageModal.querySelector(".preview-image");
const previewImageText = previewImageModal.querySelector(".image-name");
// Buttons
const profileEditBtn = document.querySelector(".edit-profile-button");
const newCardBtn = document.querySelector(".add-new-card-button");
const avatarEditBtn = document.querySelector(".edit-avatar-button");
// Modal selectors
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__confirm-button",
  inactiveButtonClass: "modal__confirm-button_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active",
};

export {
  profileName,
  profileDescription,
  profileImage,
  cardGallery,
  cardTemplate,
  editModal,
  newCardModal,
  avatarModal,
  deleteModal,
  previewImageModal,
  previewImageText,
  previewImage,
  profileEditBtn,
  newCardBtn,
  avatarEditBtn,
  config,
};
