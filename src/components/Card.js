class Card {
  constructor({ data, cardSelector, handleCardClick }) {
    this._title = data.title;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = this._cardSelector
      .cloneNode(true)
      .querySelector(".card");

    return cardElement;
  }

  _handleLikeButton = () => {
    this._likeBtn.classList.toggle("card__like-button_active");
  };

  _handleDeleteButton = () => {
    this._cardElement.remove();
    this._cardElement = null;
  };

  _setEventListeners() {
    this._cardImage.addEventListener("click", this._handleCardClick);

    this._likeBtn.addEventListener("click", this._handleLikeButton);

    this._deleteBtn.addEventListener("click", this._handleDeleteButton);
  }

  getView() {
    this._cardElement = this._getTemplate();

    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._likeBtn = this._cardElement.querySelector(".card__like-button");
    this._deleteBtn = this._cardElement.querySelector(".card__delete-button");

    this._cardTitle.textContent = this._title;
    this._cardImage.alt = this._title;
    this._cardImage.src = this._link;

    this._setEventListeners();

    return this._cardElement;
  }
}

export default Card;
