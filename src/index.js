"use strict";

import "../pages/index.css";
import "../pages/articles.css";

import Popup from "./js/components/Popup";
import MainApi from "./js/api/MainApi";
import NewsApi from "./js/api/NewsApi";
import Form from "./js/components/Form";
import onError from "./js/utils/onError";
import Header from "./js/components/Header";
import NewsCard from "./js/components/NewsCard";
import NewsCardList from "./js/components/NewsCardList";

(function () {
  // TODO change after deployment to "https://news-exploring.ga/"
  const mainUrl = "https://glpsch.github.io/news-aggregation-front/";
  const serverUrl = "https://api.news-exploring.ga/";

  //Const - popups
  const template = document.querySelector(".popup-template");
  const popupLoginContent = document.querySelector(".popup_login__content");
  const authBtnLogIn = document.querySelector(".header__button_unlogged");
  const authBtnLogOut = document.querySelector(".header__button_logged-in");
  const mobileMenuBtn = document.querySelector(".header__mobile-menu");

  const popupRegContent = document.querySelector(".popup_registration__content");
  const popupSuccessContent = document.querySelector(".popup_success__content");

  //Const - search
  const searchBtn = document.querySelector(".search__button");

  // Class instances
  const popup = new Popup(template);
  const mainApi = new MainApi(serverUrl);
  const header = new Header();

  // Additional functions
  function setForm() {
    const currentForm = template.querySelector(".popup__form");
    const formToValidate = new Form(currentForm);
    formToValidate.setEventListeners(currentForm);
  }

  function setPopup(content) {
    popup.setContent(content);
    setForm();
    popup.open();
    popup.isOpen = true;
  }

  // Listeners
  // LOGIN popup
  authBtnLogIn.addEventListener("click", function () {
    if (!popup.isOpen) {
      setPopup(popupLoginContent);
    }
  });

  // LOG OUT
  authBtnLogOut.addEventListener("click", function () {
    console.log("removing token from local storage");
    localStorage.removeItem("token");

    if (event.target.parentNode.classList.contains("header_theme_black")) {
      window.location = mainUrl;
    } else {
      header.render({
        isLoggedIn: false,
        userName: "any",
      });
    }
  });

  // REG popup
  template.addEventListener("click", function (event) {
    if (event.target.classList.contains("popup__reg-link")) {
      popup.close();
      setPopup(popupRegContent);
    }
  });

  // Popup redirect: SUCCESS-LOGIN / REG-LOGIN
  template.addEventListener("click", function (event) {
    if (
      event.target.classList.contains("success-link") ||
      event.target.classList.contains("popup__reg-login")
    ) {
      popup.close();
      setPopup(popupLoginContent);
    }
  });

  /////////////////////////////////////////////////////////////////////
  //API
  /////////////////////////////////////////////////////////////////////

  // check + redirect
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
      localStorage.removeItem("token");
      if (window.location.pathname !== "/") {
        window.location.pathname = "/";
      }
    });

  // LOGIN
  template.addEventListener("click", function (event) {
    if (event.target.classList.contains("login__submit")) {
      event.preventDefault();

      const loginEmailInput = template.querySelector("#login-email");
      const loginPasswordInput = template.querySelector("#login-password");

      mainApi
        .signin(loginEmailInput.value, loginPasswordInput.value)
        .then((data) => {
          ///
          console.log("login is ok");

          header.render({
            isLoggedIn: true,
            userName: data.user.name,
          });

          popup.close();
        })
        .catch((e) => {
          console.error("login is NOT ok:", { e });
          onError(e);
        });
    }
  });

  // REGISTRATION
  template.addEventListener("click", function (event) {
    if (event.target.classList.contains("reg__submit")) {
      event.preventDefault();

      const regEmailInput = template.querySelector("#reg-email");
      const regPasswordInput = template.querySelector("#reg-password");
      const regNameInput = template.querySelector("#reg-name");
      ////
      mainApi
        .signup(regEmailInput.value, regPasswordInput.value, regNameInput.value)
        .then((res) => {
          console.log("reg is ok");
          console.log(res, "res");

          popup.close();
          popup.setContent(popupSuccessContent);
          popup.open();
          popup.isOpen = true;
        })
        .catch((e) => {
          console.error("reg is NOT ok:", e);
          onError(e);
        });
    }
  });

  /////////////////////////////
  /// mobile
  /////////////////////////////

  mobileMenuBtn.addEventListener("click", function () {
    document.querySelector(".header__links").classList.toggle("header__links_visible-on-mobile");
    document.querySelector(".backdrop").classList.toggle("backdrop_active");
  });

  ///////////////////////////////////////////////
  /// NEWS
  ///////////////////////////////////////////////

  // const apiURL='https://newsapi.org/v2/';
  let proxiUrl = "https://praktikum.tk/news/v2/";
  const apiKey = "f3d87446c54c4e3b9fe47f4c2993c14f";

  const newsUrl =
    `${proxiUrl}everything?pageSize=100&` +
    `apiKey=${apiKey}&` +
    "sortBy=popularity&" +
    //TODO set dates
    "from=2020-07-26&" +
    "to=2020-08-02&" +
    "language=ru";

  console.log({ newsUrl });
  const newsApi = new NewsApi();

  const searchResultsNone = document.querySelector(".search-results_nothing-found");
  const searchResultsOK = document.querySelector(".search-results_successful");
  ///on page reload
  searchResultsNone.classList.remove("search-results_enabled_flex");
  searchResultsOK.classList.remove("search-results_enabled");

  const cardTemplate = document.querySelector("#news-card-template").content.querySelector(".card");
  const list = document.querySelector(".search-results_successful-cards");

  //TODO on submit
  searchBtn.addEventListener("click", function () {
    console.log("search begin");

    searchResultsNone.classList.remove("search-results_enabled_flex");
    searchResultsOK.classList.remove("search-results_enabled");

    // remove children
    list.querySelectorAll("*").forEach((n) => n.remove());

    const keyword = document.querySelector(".search__input").value;
    const searchUrl = newsUrl + `&q=${keyword}`;

    if (!keyword) {
      // TODO выводится ошибка «Нужно ввести ключевое слово»
      console.log("Нужно ввести ключевое слово");
    } else {
      ////////////
      newsApi.getNews(searchUrl).then((data) => {
        console.log("articles", data.articles);
        console.log("keyword", keyword);
        //////////////
        // onload
        // //////////
        if (data.articles.length == 0) {
          searchResultsNone.classList.add("search-results_enabled_flex");
        } else {
          searchResultsOK.classList.add("search-results_enabled");

          const receivedCards = data.articles.map(function (articleData) {
            return new NewsCard(
              cardTemplate,
              articleData.title,
              articleData.description,
              articleData.urlToImage,
              articleData.source.name,
              articleData.publishedAt
            ).create();
          });
          const newsCardList = new NewsCardList(list, receivedCards, NewsCard);
          newsCardList.render();
        }
      });
    }
  });


})();
