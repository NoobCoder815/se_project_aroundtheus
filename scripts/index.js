const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const profileTemplate = document.querySelector("#gallery-template").content;
const profileGallery = document.querySelector(".gallery__cards");

const editModal = document.querySelector("#edit-modal");
const newCardModal = document.querySelector("#new-card-modal");
const previewImageModal = document.querySelector("#preview-image-modal");

const profileEditForm = document.forms["edit-form"];
const newCardForm = document.forms["new-card-form"];

const profileEditBtn = document.querySelector("#profile-edit-button");
const newCardBtn = document.querySelector(".profile__plus-button");
const closeButtons = document.querySelectorAll(".modal__close-button");

const inputName = profileEditForm.querySelector(".modal__input_type_name");
const inputJob = profileEditForm.querySelector(".modal__input_type_bio");
const inputTitle = newCardForm.querySelector(".modal__input_type_title");
const inputLink = newCardForm.querySelector(".modal__input_type_link");

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const previewImage = previewImageModal.querySelector(".preview-image");
const previewImageText = previewImageModal.querySelector(".image-description");

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeByEscape);
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeByEscape);
}

function getCardElement(cardData) {
  const cardElement = profileTemplate.cloneNode(true);
  const cardContainer = cardElement.querySelector(".card");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = cardData.name;
  cardImage.alt = cardData.name;
  cardImage.src = cardData.link;

  cardImage.addEventListener("click", () => {
    previewImage.src = cardImage.src;
    previewImage.alt = cardImage.alt;
    previewImageText.textContent = cardTitle.textContent;
    openModal(previewImageModal);
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  deleteButton.addEventListener("click", () => {
    cardContainer.remove();
  });

  return cardElement;
}

function renderCards(cardData, gallery) {
  const cardElement = getCardElement(cardData);
  gallery.prepend(cardElement);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closeModal(editModal);
}
function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  const name = inputTitle.value;
  const link = inputLink.value;
  renderCards({ name, link }, profileGallery);
  evt.target.reset();
  closeModal(newCardModal);
}

profileEditForm.addEventListener("submit", handleEditFormSubmit);
newCardForm.addEventListener("submit", handleNewCardFormSubmit);

profileEditBtn.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openModal(editModal);
});
newCardBtn.addEventListener("click", () => {
  openModal(newCardModal);
});

const modalList = Array.from(document.querySelectorAll(".modal"));
modalList.forEach((container) => {
  container.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal")) {
      closeModal(container);
    }
    if (evt.target.classList.contains("modal__close-button")) {
      closeModal(container);
    }
  });
});

function closeByEscape(evt) {
  const modalOpened = document.querySelector(".modal_opened");
  if (evt.key === "Escape") {
    closeModal(modalOpened);
  }
}

initialCards.forEach((cardData) => renderCards(cardData, profileGallery));
