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
const cardAddModal = document.querySelector("#card-add-modal");
const profileEditForm = editModal.querySelector(".modal__form");
const profileCardAddForm = cardAddModal.querySelector(".modal__form");

const profileEditBtn = document.querySelector("#profile-edit-button");
const profileCardAddBtn = document.querySelector(".profile__plus-button");
const profileEditCloseBtn = editModal.querySelector(".modal__close-button");
const profileCardAddCloseBtn = cardAddModal.querySelector(
  ".modal__close-button"
);

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

const inputName = profileEditForm.querySelector(".modal__input_type_name");
const inputJob = profileEditForm.querySelector(
  ".modal__input_type_description"
);
const inputTitle = profileCardAddForm.querySelector(".modal__input_type_title");
const inputLink = profileCardAddForm.querySelector(".modal__input_type_link");

function openModal(modal) {
  modal.classList.add("modal_opened");
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closeModal(editModal);
}
function handleCardAddFormSubmit(evt) {
  evt.preventDefault();
  const newData = { name: inputTitle.value, link: inputLink.value };
  initialCards.push(newData);
  closeModal(cardAddModal);
}

function getCardElement(data) {
  const cardElement = profileTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  cardTitle.textContent = data.name;
  cardImage.alt = data.name;
  cardImage.src = data.link;
  return cardElement;
}

profileEditForm.addEventListener("submit", handleEditFormSubmit);
profileEditBtn.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openModal(editModal);
});
profileEditCloseBtn.addEventListener("click", () => {
  closeModal(editModal);
});

profileCardAddForm.addEventListener("submit", handleCardAddFormSubmit);
profileCardAddBtn.addEventListener("click", () => {
  openModal(cardAddModal);
});
profileCardAddCloseBtn.addEventListener("click", () => {
  closeModal(cardAddModal);
});

initialCards.forEach((initialCard) => {
  profileGallery.prepend(getCardElement(initialCard));
});
