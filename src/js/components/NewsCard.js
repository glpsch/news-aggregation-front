// Класс карточки новости. Методы:
// renderIcon — отвечает за отрисовку иконки карточки. У этой иконки три состояния:
// иконка незалогиненного пользователя, активная иконка залогиненного, неактивная иконка залогиненного.

export default class Card {
  constructor(
    template,
    cardTitle,
    cardDescription,
    cardImage,
    cardSource,
    publishedAt,
    cardLink /* , bookmarkStatus */
  ) {
    this.template = template;
    this.cardTitle = cardTitle;
    this.cardDescription = cardDescription;
    this.cardImage = cardImage;
    this.cardSource = cardSource;
    this.publishedAt = publishedAt;
    this.cardLink = cardLink;
  }

  create() {
    let newCard = this.template.cloneNode(true);

    newCard.querySelector(".card__image").style.backgroundImage = "url(" + this.cardImage + ")";
    newCard.querySelector(".card__title").textContent = this.cardTitle;
    newCard.querySelector(".card__text").textContent = this.cardDescription;
    newCard.querySelector(".card__source").textContent = this.cardSource;
    newCard.querySelector(".card__date").textContent = this.publishedAt;
    newCard.querySelector(".card__link").href = this.cardLink;

    // if ((this.likes || []).find(e => e._id == this.userId)) {
    //     newCard.querySelector('.card__like-icon').classList.add('card__like-icon_liked');
    // }

    // newCard
    //     .querySelector('.card__bookmark')
    //     .addEventListener('click', this.bookmark.bind(this));

    return newCard;
  }

  renderIcon() {
    let loggedInState = false;

    const bookmarks = document.querySelectorAll(".card__bookmark");

    if ((loggedInState = false)) {
      bookmarks.forEach(function (element) {
        element.classList.add("card__bookmark_unlogged");
      });
    }
  }

  //   like(event) {
  //     event.target.classList.toggle('card__like-icon_liked');

  //     if (event.target.classList.contains('card__like-icon_liked')) {
  //         this.api.addLike(this.cardId)
  //             .then((res) => {
  //                 event.target.parentElement.querySelector('.card__like-count').textContent = res.likes.length;
  //             })
  //             .catch(onError);
  //     }
  //     else {
  //         this.api.removeLike(this.cardId)
  //             .then((res) => {
  //                 event.target.parentElement.querySelector('.card__like-count').textContent = res.likes.length;
  //             })
  //             .catch(onError);
  //     }
  // }

  // remove(event) {

  //     if (window.confirm("Вы действительно хотите удалить эту карточку?")) {

  //         let a = event.composedPath();
  //         let toDelete = a[2];
  //         event.target.parentElement.parentElement.parentElement.removeChild(toDelete);
  //         ///
  //         this.api.removeCard(this.cardId)
  //             .catch(onError);
  //     }
  // }
}
