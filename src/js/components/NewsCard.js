// Класс карточки новости. Методы:
// renderIcon — отвечает за отрисовку иконки карточки. У этой иконки три состояния:
// иконка незалогиненного пользователя, активная иконка залогиненного, неактивная иконка залогиненного.

export default class Card {
  constructor(
    keyword,
    template,
    cardTitle,
    cardDescription,
    cardImage,
    cardSource,
    publishedAt,
    cardLink,
    loggedInState,
    API
  ) {
    this.keyword = keyword;
    this.template = template;
    this.cardTitle = cardTitle;
    this.cardDescription = cardDescription;
    this.cardImage = cardImage;
    this.cardSource = cardSource;
    this.publishedAt = publishedAt;
    this.cardLink = cardLink;
    this.loggedInState = loggedInState;
    this.API = API;
  }

  create() {
    let newCard = this.template.cloneNode(true);

    newCard.querySelector(".card__image").style.backgroundImage = "url(" + this.cardImage + ")";
    newCard.querySelector(".card__title").textContent = this.cardTitle;
    newCard.querySelector(".card__text").textContent = this.cardDescription;
    newCard.querySelector(".card__source").textContent = this.cardSource;
    newCard.querySelector(".card__date").textContent = this.publishedAt;
    // newCard.querySelector(".card__link").href = this.cardLink;
    newCard.querySelector(".card__link").href = "#";

    this.renderIcon(newCard);

    newCard.querySelector(".card__bookmark").addEventListener("click", this.bookmark.bind(this));

    return newCard;
  }

  renderIcon(newCard) {
    const bookmark = newCard.querySelector(".card__bookmark");

    if (this.loggedInState === false) {
      bookmark.classList.add("card__bookmark_unlogged");
    }
  }

  bookmark(event) {
    console.log("BOOKMARK", event.target);
    if (!event.target.classList.contains("card__bookmark_unlogged")) {
      event.target.classList.toggle("card__bookmark_bookmarked");

      if (event.target.classList.contains("card__bookmark_bookmarked")) {
        const cardObject = {
          keyword: this.keyword,
          title: this.cardTitle,
          text: this.cardDescription,
          date: this.publishedAt,
          source: this.cardSource,
          link: this.cardLink,
          image: this.cardImage,
        };
        console.log("cardObject", cardObject);

        this.API.createArticle(cardObject)

          .then((res) => {
            console.log("Article is saved", res);
            // event.target.parentElement.querySelector('.card__like-count').textContent = res.likes.length;
          })
          .catch((e) => {
            console.error("Article is NOT saved:", { e });
            });
      } else {
        console.log("remove article");

        // this.api.removeCard(this.cardId)
        //     .then((res) => {
        //       console.log('Article is removed')
        //         // event.target.parentElement.querySelector('.card__like-count').textContent = res.likes.length;
        //     })
        //     .catch();
      }
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
