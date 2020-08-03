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

  function calculateKeywords(articles){
    let byKeywords = {};
    (articles || []).forEach((article)=>{
      const keyword = article.keyword;
      if (!byKeywords[keyword]){
        byKeywords[keyword] = 1;
      } else {
        byKeywords[keyword]++;
      }
    });
    const byPolularity = Object.keys(byKeywords)
      .map((keyword)=>{
        return {
          keyword, occurences: byKeywords[keyword]
        };
      })
      .sort((a, b)=>{
        return a.keyword.localeCompare(b.keyword, ['ru', 'en'], {numeric: true});
      })
      .sort((a, b)=>{
        return b.occurences - a.occurences;
      });
      console.log('byKeywords:',byKeywords)
      const top_3 = byPolularity.slice(0,3).map((rec)=> rec.keyword);


    return {
      top_3,
      keywords_left: byPolularity.length - top_3.length
    }
  }
  console.log("articles page");

  // TODO change after deployment to "https://news-exploring.ga/"
  const mainUrl = "https://glpsch.github.io/news-aggregation-front/";
  const serverUrl = "https://api.news-exploring.ga/";
  const authBtnLogOut = document.querySelector(".header__button_logged-in");
  const mobileMenuBtn = document.querySelector(".header__mobile-menu");

  // Class instances
  const mainApi = new MainApi(serverUrl);
  const header = new Header();
  ///////////////////////////////////////////////////////////////////////////
  // LOG OUT
  authBtnLogOut.addEventListener("click", function () {
    console.log("removing token from local storage");
    localStorage.removeItem("token");
    if (event.target.parentNode.classList.contains("header_theme_black")) {
      window.location = mainUrl;
    }
  });
  //// mobile
  mobileMenuBtn.addEventListener("click", function () {
    document.querySelector(".header__links").classList.toggle("header__links_visible-on-mobile");
    document.querySelector(".backdrop").classList.toggle("backdrop_active");
  });
  ///////////////////////////////////////////////////////////////////////////

  // onload: check + redirect
  mainApi
    .checkStatus()
    .then((user) => {
      console.log({ user });

      header.render({
        isLoggedIn: true,
        userName: user.name,
      });
      ////// TODO
      setUserName(user.name);
    })
    .catch(() => {
      console.log("check status failed");
      window.location.pathname = mainUrl;
    });

  /// set title
  function setUserName(name) {
    const articlesTitle = document.querySelector(".articles-caption__main_name");
    articlesTitle.textContent = name;
  }
  function setArticlesCount(number) {
    const articlesTitle = document.querySelector(".articles-caption__main_data");
    articlesTitle.textContent = number;
  }
  // /// set keywords
  function setKeywords( topKeywords ) {
    const keywordsContainer = document.querySelector(".articles-caption__keywords");
    const topWords = topKeywords.top_3.join(', ');
    let keywordsLabel = `По ключевым словам: ${topWords}`;
    if (topKeywords.keywords_left){
      keywordsLabel = keywordsLabel + ` и ${topKeywords.keywords_left} другим`;
    }

    keywordsContainer.textContent = keywordsLabel;
  }
  ////////////////////////////////////////////////////////////////////////////

  const savedCardTemplate = document
    .querySelector("#articles-card-template")
    .content.querySelector(".card");
  const savedList = document.querySelector(".articles-cards");


  function setArticleCounter(){
    return mainApi.getArticles().then((cards) => {
      console.log(cards.data);
      setArticlesCount(cards.data.length);
      const top3 = calculateKeywords(cards.data);
      setKeywords(top3);
      console.log({top3});
    });
  }

  // initial cards
  mainApi.getArticles().then((cards) => {
    console.log(cards.data);
    setArticlesCount(cards.data.length);
    const top3 = calculateKeywords(cards.data);
    setKeywords(top3);
    console.log({top3});



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
  });

  //
})();
