"use strict";

import "../../pages/articles.css";

import MainApi from "../js/api/MainApi";
import Header from "../js/components/Header";
import NewsCard from "../js/components/NewsCard";
import NewsCardList from "../js/components/NewsCardList";

(function () {
  // TODO change after deployment to "https://news-exploring.ga/"
  const mainUrlPathName = "/news-aggregation-front/";
  const serverUrl = "https://api.news-exploring.ga/";
  const authBtnLogOut = document.querySelector(".header__button_logged-in");
  const mobileMenuBtn = document.querySelector(".header__mobile-menu");
  const searchResultsNone = document.querySelector(".search-results_nothing-found");
  const savedCardTemplate = document.querySelector("#articles-card-template").content.querySelector(".card");
  const savedList = document.querySelector(".articles-cards");

  // Class instances
  const mainApi = new MainApi(serverUrl);
  const header = new Header();

  ///////////////////////////////////////////////////////////////////////////
  // Additional functions
  function calculateKeywords(articles) {
    let byKeywords = {};
    (articles || []).forEach((article) => {
      const keyword = article.keyword;
      if (!byKeywords[keyword]) {
        byKeywords[keyword] = 1;
      } else {
        byKeywords[keyword]++;
      }
    });
    const byPolularity = Object.keys(byKeywords)
      .map((keyword) => {
        return {
          keyword,
          occurences: byKeywords[keyword],
        };
      })
      .sort((a, b) => {
        return a.keyword.localeCompare(b.keyword, ["ru", "en"], { numeric: true });
      })
      .sort((a, b) => {
        return b.occurences - a.occurences;
      });
    console.log("byKeywords:", byKeywords);
    const top_3 = byPolularity.slice(0, 3).map((rec) => rec.keyword);
    return {
      top_3,
      keywords_left: byPolularity.length - top_3.length,
    };
  }

  // LOG OUT
  authBtnLogOut.addEventListener("click", function () {
    console.log("removing token from local storage");
    localStorage.removeItem("token");
    if (event.target.parentNode.classList.contains("header_theme_black")) {
      window.location.pathname = mainUrlPathName;
    }
  });
  //// mobile
  mobileMenuBtn.addEventListener("click", function () {
    document.querySelector(".header__links").classList.toggle("header__links_visible-on-mobile");
    document.querySelector(".backdrop").classList.toggle("backdrop_active");
  });
  /// set title
  function setUserName(name) {
    const articlesTitle = document.querySelector(".articles-caption__main_name");
    articlesTitle.textContent = name;
  }
  function setArticlesCount(number) {
    const articlesTitle = document.querySelector(".articles-caption__main_data");
    if (number === 0) {
      articlesTitle.textContent = "нет";
    } else {
      articlesTitle.textContent = number;
    }
  }
  /// set keywords
  function setKeywords(topKeywords) {
    const keywordsContainer = document.querySelector(".articles-caption__keywords");
    const topWords = topKeywords.top_3.join(", ");
    let keywordsLabel = `По ключевым словам: ${topWords}`;
    if (topKeywords.keywords_left) {
      keywordsLabel = keywordsLabel + ` и ${topKeywords.keywords_left} другим`;
    }
    keywordsContainer.textContent = keywordsLabel;
  }
  ///Counter
  function setArticleCounter() {
    return mainApi.getArticles()
    .then((cards) => {
      // console.log('data', cards.data);
      setArticlesCount(cards.data.length);
      const top3 = calculateKeywords(cards.data);
      setKeywords(top3);
      // console.log({ top3 });
    })
    .catch((error) => {
      console.log(error);
      noArticles();
    });
  }
  //nothing found
  function noArticles() {
    setArticlesCount(0);
    searchResultsNone.classList.add("search-results_enabled_flex");
    // TODO
    // document.querySelector(".articles-caption").classList.add("articles-caption_nothing");
    // document.querySelector(".articles-cards").classList.add("articles-cards_nothing");
  }
  ///////////////////////////////////////////////////////////////////////////
  // onload: check user + redirect
  mainApi
    .checkStatus()
    .then((user) => {
      console.log({ user });
      header.render({
        isLoggedIn: true,
        userName: user.name,
      });
      setUserName(user.name);
    })
    .catch(() => {
      window.location.pathname = mainUrlPathName;
    });

  //////////////////////
  // initial cards
  mainApi
    .getArticles()
    .then((cards) => {
      console.log(cards.data);
      setArticlesCount(cards.data.length);
      const top3 = calculateKeywords(cards.data);
      setKeywords(top3);
      // console.log({ top3 });
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
          mainApi,
          articleData._id,
          setArticleCounter
        ).createSaved();
      });
      const newsCardList = new NewsCardList(savedList, receivedCards, NewsCard);
      newsCardList.renderSaved();
    })
    .catch((error) => {
      console.log(error);
      noArticles();
    });

  //
})();
