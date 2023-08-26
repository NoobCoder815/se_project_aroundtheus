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
const newCardModal = document.querySelector("#card-add-modal");
const previewImageModal = document.querySelector("#preview-image-modal");
const profileEditForm = editModal.querySelector(".modal__form");
const profileNewCardForm = newCardModal.querySelector(".modal__form");

const profileEditBtn = document.querySelector("#profile-edit-button");
const profileNewCardBtn = document.querySelector(".profile__plus-button");
const profileEditCloseBtn = editModal.querySelector(".modal__close-button");
const profileNewCardCloseBtn = newCardModal.querySelector(
  ".modal__close-button"
);
const previewImageCloseBtn = previewImageModal.querySelector(
  ".modal__close-button_image"
);

const inputName = profileEditForm.querySelector(".modal__input_type_name");
const inputJob = profileEditForm.querySelector(
  ".modal__input_type_description"
);
const inputTitle = profileNewCardForm.querySelector(".modal__input_type_title");
const inputLink = profileNewCardForm.querySelector(".modal__input_type_link");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

function openModal(modal) {
  modal.classList.add("modal_opened");
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function renderCards(cardData, gallery) {
  const cardElement = getCardElement(cardData);
  gallery.prepend(cardElement);
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
    const previewImage = previewImageModal.querySelector(".preview-image");
    const previewImageDescription =
      previewImageModal.querySelector(".image-description");

    previewImage.src = cardImage.src;
    previewImage.alt = cardImage.alt;
    previewImageDescription.textContent = cardTitle.textContent;
    openModal(previewImageModal);
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  deleteButton.addEventListener("click", () => {
    cardContainer.remove();
  });
  previewImageCloseBtn.addEventListener("click", () => {
    closeModal(previewImageModal);
  });

  return cardElement;
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
  closeModal(newCardModal);
}

profileEditForm.addEventListener("submit", handleEditFormSubmit);
profileNewCardForm.addEventListener("submit", handleNewCardFormSubmit);

profileEditBtn.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openModal(editModal);
});
profileEditCloseBtn.addEventListener("click", () => {
  closeModal(editModal);
});

profileNewCardBtn.addEventListener("click", () => {
  openModal(newCardModal);
});
profileNewCardCloseBtn.addEventListener("click", () => {
  closeModal(newCardModal);
});

initialCards.forEach((cardData) => renderCards(cardData, profileGallery));
