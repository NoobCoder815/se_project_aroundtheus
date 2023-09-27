const previewImageModal = document.querySelector("#preview-image-modal");
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

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const modalOpened = document.querySelector(".modal_opened");
    closeModal(modalOpened);
  }
}

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick();
    });

    this._cardContainer
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._handleLikeButton());

    this._cardContainer
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._handleDeleteButton());
  }

  _handleImageClick() {
    previewImage.src = this._link;
    previewImage.alt = this._name;
    previewImageText.textContent = this._name;
    openModal(previewImageModal);
  }

  _handleLikeButton() {
    this._cardContainer
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteButton() {
    this._cardContainer.remove();
  }

  getCardElement() {
    this._cardElement = this._cardSelector.cloneNode(true);

    this._cardContainer = this._cardElement.querySelector(".card");

    this._cardImage = this._cardContainer.querySelector(".card__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._cardContainer.querySelector(".card__title").textContent = this._name;

    this._setEventListeners();

    return this._cardContainer;
  }
}

export default Card;
