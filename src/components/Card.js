class Card {
  constructor(
    { name, link, isLiked, _id },
    { handleCardClick, handleCardDelete, handleCardLike },
    cardTemplate
  ) {
    this._title = name;
    this._link = link;
    this._id = _id;
    this.isLiked = isLiked;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
  }

  _getTemplate() {
    const cardElement = this._cardTemplate
      .cloneNode(true)
      .querySelector(".card");

    return cardElement;
  }

  setLikeStatus(isLiked) {
    this.isLiked = isLiked;
    this._renderLike();
  }

  _renderLike() {
    if (this.isLiked) {
      this._likeBtn.classList.add("card__like-button_active");
    } else {
      this._likeBtn.classList.remove("card__like-button_active");
    }
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", this._handleCardClick);

    this._likeBtn.addEventListener("click", () => {
      this._handleCardLike(this._id);
    });

    this._deleteBtn.addEventListener("click", this._handleCardDelete);
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

    this._renderLike();
    this._setEventListeners();

    return this._cardElement;
  }
}

export default Card;
