"use strict";

// import "../../pages/index.css";
import "../../pages/articles.css";

import MainApi from "../js/api/MainApi";
// import NewsApi from "../js/api/NewsApi";
import onError from "../js/utils/onError";
import Header from "../js/components/Header";
import NewsCard from "../js/components/NewsCard";
import NewsCardList from "../js/components/NewsCardList";

(function () {
  console.log("articles page");

  // TODO change after deployment to "https://news-exploring.ga/"
  const mainUrl = "https://glpsch.github.io/news-aggregation-front/";
  const serverUrl = "https://api.news-exploring.ga/";
  //!!!
  const authBtnLogOut = document.querySelector(".header__button_logged-in");
  const mobileMenuBtn = document.querySelector(".header__mobile-menu");

  // Class instances
  const mainApi = new MainApi(serverUrl);
  const header = new Header();
  ///////////////////////////////////////////////////////////////////////////

  // onload: check + redirect
  mainApi
    .checkStatus()
    .then((user) => {
      ///
      console.log("check status has completed");
      console.log({ user });

      header.render({
        isLoggedIn: true,
        userName: user.name,
      });
    })
    .catch(() => {
      console.log("check status failed");
      window.location.pathname = mainUrl;
    });
  ////////////////////////////////////////////////////////////////////////////
  const savedCardTemplate = document
    .querySelector("#articles-card-template")
    .content.querySelector(".card");
  const savedList = document.querySelector(".articles-cards");

  // initial cards
  mainApi
    .getArticles()
    .then((cards) => {
      console.log(cards.data);
      //??
      const loggedInState = true;

      const receivedCards = cards.data.map(function (articleData) {
        return new NewsCard(
          articleData.keyword,
          savedCardTemplate,
          articleData.title,
          articleData.text,
          articleData.image,
          articleData.source,
          articleData.date,
          articleData.link,
          loggedInState,
          mainApi
          // articleData._id
        ).createSaved();
      });
      const newsCardList = new NewsCardList(savedList, receivedCards, NewsCard);
      newsCardList.renderSaved();

    })




  //
})();
