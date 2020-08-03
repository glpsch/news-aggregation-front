// Класс карточки новости. Методы:
// renderIcon — отвечает за отрисовку иконки карточки. У этой иконки три состояния:
// иконка незалогиненного пользователя, активная иконка залогиненного, неактивная иконка залогиненного.

import { throws } from "assert";

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
    API,
    id,
    postDeleteCallback
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
    this.id = id;
    this.postDeleteCallback = postDeleteCallback || function(){};
  }

  create() {
    let newCard = this.template.cloneNode(true);

    newCard.querySelector(".card__image").style.backgroundImage = "url(" + this.cardImage + ")";
    newCard.querySelector(".card__title").textContent = this.cardTitle;
    newCard.querySelector(".card__text").textContent = this.cardDescription;
    newCard.querySelector(".card__source").textContent = this.cardSource;
    newCard.querySelector(".card__date").textContent = this.publishedAt;
    newCard.querySelector(".card__link").href = this.cardLink;

    this.renderIcon(newCard);

    newCard.querySelector(".card__bookmark").addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.bookmark(e).then((bookmarkId) => {
        console.log({ bookmarkId, target: e.target });
        e.target.setAttribute("bookmark_id", bookmarkId);
      });
    });

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

        return this.API.createArticle(cardObject)

          .then((res) => {
            console.log("Article is saved", res);
            return res.data._id;
            // event.target.parentElement.querySelector('.card__like-count').textContent = res.likes.length;
          })
          .catch((e) => {
            console.error("Article is NOT saved:", { e });
          });
      } else {
        console.log("remove article");
        const bookmarkId = event.target.getAttribute("bookmark_id");
        console.log("bookmark id to remove:", { bookmarkId });
        // return Promise.resolve("");

        return this.API.removeArticle(bookmarkId)
          .then(() => {
            return "";
          })
          .catch((e) => {
            console.error("Article is NOT deleted:", { e });
          });
      }
    }
  }

  createSaved() {
    let savedCard = this.template.cloneNode(true);

    savedCard.querySelector(".card__image").style.backgroundImage = "url(" + this.cardImage + ")";
    savedCard.querySelector(".card__bookmark-category").textContent = this.keyword;
    savedCard.querySelector(".card__title").textContent = this.cardTitle;
    savedCard.querySelector(".card__text").textContent = this.cardDescription;
    savedCard.querySelector(".card__source").textContent = this.cardSource;
    savedCard.querySelector(".card__date").textContent = this.publishedAt;
    savedCard.querySelector(".card__link").href = this.cardLink;
    ///
    savedCard.id = this.id;

    savedCard.querySelector(".card__bookmark").addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.remove(e);
      console.log("Article is deleted");
    });

    return savedCard;
  }

  remove(event) {
    if (window.confirm("Вы действительно хотите удалить эту статью?")) {
      let a = event.composedPath();
      console.log("composedPath", a);
      ///
      this.API.removeArticle(this.id)
      .then(()=>{
        let toDelete = a[3];
        event.target.parentElement.parentElement.parentElement.parentElement.removeChild(toDelete);
        this.postDeleteCallback();
      })
      .catch((e) => {
        console.error("Article is NOT deleted:", { e });
      });
    }
  }
}
