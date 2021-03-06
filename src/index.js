"use strict";

import "../pages/index.css";
// import "../pages/articles.css";

import Popup from "./js/components/Popup";
import MainApi from "./js/api/MainApi";
import NewsApi from "./js/api/NewsApi";
import Form from "./js/components/Form";
import onError from "./js/utils/onError";
import formatDate from "./js/utils/formatDate";
import calculatingDate from "./js/utils/calculatingDate";

import Header from "./js/components/Header";
import NewsCard from "./js/components/NewsCard";
import NewsCardList from "./js/components/NewsCardList";

(function () {
  // for gitPages:
  // const mainUrlPathName = "/news-aggregation-front/";
  const mainUrlPathName = "https://news-exploring.ga/";
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
  const searchResultsNone = document.querySelector(".search-results_nothing-found");
  const searchResultsOK = document.querySelector(".search-results_successful");
  const cardTemplate = document.querySelector("#news-card-template").content.querySelector(".card");
  const list = document.querySelector(".search-results_successful-cards");
  const searchForm = document.querySelector(".search__bar");
  let moreBtn = document.querySelector(".search-results_successful-more");
  const searchInput = document.querySelector(".search__input");

  // const apiURL = 'https://newsapi.org/v2/';
  let proxiUrl = "https://nomoreparties.co/news/v2/";
  const apiKey = "f3d87446c54c4e3b9fe47f4c2993c14f";
  const newsUrl =
    `${proxiUrl}everything?pageSize=100&` +
    `apiKey=${apiKey}&` +
    "sortBy=popularity&" +
    `from=${calculatingDate.weekAgo()}&` +
    `to=${calculatingDate.currentDate()}&` +
    "language=ru";

  // Class instances
  const popup = new Popup(template);
  const mainApi = new MainApi(serverUrl);
  const header = new Header();
  const newsApi = new NewsApi();

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

  function searchCleanUp() {
    searchResultsNone.classList.remove("search-results_enabled_flex");
    searchResultsOK.classList.remove("search-results_enabled");
    moreBtn.classList.add("invisible");
  }

  function showLoader() {
    document.querySelector(".search-results_loading").style.display = "flex";
  }

  function hideLoader() {
    document.querySelector(".search-results_loading").style.display = "none";
  }
  // Listeners
  // LOGIN popup
  if (authBtnLogIn) {
    authBtnLogIn.addEventListener("click", function () {
      if (!popup.isOpen) {
        setPopup(popupLoginContent);
      }
    });
  }

  // LOG OUT
  authBtnLogOut.addEventListener("click", function () {
    localStorage.removeItem("token");
    searchCleanUp();
      header.render({
        isLoggedIn: false,
        userName: "any",
      });
  });

  // REG popup
  if (template) {
    template.addEventListener("click", function (event) {
      if (event.target.classList.contains("popup__reg-link")) {
        popup.close();
        setPopup(popupRegContent);
      }
    });
  }

  // Popup redirect: SUCCESS-LOGIN / REG-LOGIN
  if (template) {
    template.addEventListener("click", function (event) {
      if (event.target.classList.contains("success-link") || event.target.classList.contains("popup__reg-login")) {
        popup.close();
        setPopup(popupLoginContent);
      }
    });
  }

  //// mobile
  mobileMenuBtn.addEventListener("click", function () {
    document.querySelector(".header__links").classList.toggle("header__links_visible-on-mobile");
    document.querySelector(".backdrop").classList.toggle("backdrop_active");
  });

  /////////////////////////////////////////////////////////////////////
  //API
  /////////////////////////////////////////////////////////////////////

  // check + redirect
  mainApi
    .checkStatus()
    .then((user) => {
      ///
      console.log({ user });

      header.render({
        isLoggedIn: true,
        userName: user.name,
      });
    })
    .catch(() => {
      localStorage.removeItem("token");
      // if (window.location.pathname !== "/") {
      //   window.location.pathname = "/";
      // }
      if (window.location.pathname === "/") {
        return;
      }
      if (window.location.pathname !== mainUrlPathName) {
        window.location.pathname = mainUrlPathName;
        console.log("window.location.href !== mainUrl", window.location.href);
      }
    });

  // LOGIN
  if (template) {
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
            searchCleanUp();
            popup.close();
          })
          .catch((e) => {
            console.error("login is NOT ok:", { e });
            onError(e);
          });
      }
    });
  }

  // REGISTRATION
  if (template) {
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
  }

  ///////////////////////////////////////////////
  /// NEWS
  ///////////////////////////////////////////////

  ///on page reload
  searchCleanUp();


  // SEARCH
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    searchCleanUp();
    // remove children
    list.querySelectorAll("*").forEach((n) => n.remove());

    const keyword = searchInput.value;
    const searchUrl = newsUrl + `&q=${keyword}`;

    if (!keyword) {
      // searchInput.setCustomValidity("Нужно ввести ключевое слово");
      console.log("Нужно ввести ключевое слово");
    }

    let userRequest = Promise.resolve();
    if (localStorage.token) {
      userRequest = mainApi.checkStatus().catch(() => {
        // console.log("no user as status has failed");
        return false;
      });
    }

    showLoader();
    userRequest
      .then((user) => {
        return newsApi.getNews(searchUrl).then((data) => {
          return {
            user,
            data,
          };
        });
      })
      .then((userAndData) => {
        const data = userAndData.data;
        const user = userAndData.user;
        let loggedInState;
        ////newsAPI
        // console.log("user:", { user });
        if (user) {
          loggedInState = true;
        } else {
          loggedInState = false;
        }

        console.log("articles", data.articles);
        let arrayLength = data.articles.length;
        if (arrayLength == 0) {
          searchResultsNone.classList.add("search-results_enabled_flex");
          return;
        }

        searchResultsOK.classList.add("search-results_enabled");
        ///
        let id = "some id";
        const receivedCards = data.articles.map(function (articleData) {
          return new NewsCard(
            keyword,
            cardTemplate,
            articleData.title,
            articleData.description,
            articleData.urlToImage,
            articleData.source.name,
            formatDate(articleData.publishedAt),
            articleData.url,
            loggedInState,
            mainApi,
            id
          ).create();
        });
        const newsCardList = new NewsCardList(list, receivedCards, NewsCard);
        let currentIndex = 0;
        const increment = 3;
        newsCardList.renderResults(currentIndex, 2, arrayLength - 1);

        if (arrayLength > 3) {
          moreBtn = document.querySelector(".search-results_successful-more");
          let clone = moreBtn.cloneNode(true);
          moreBtn.parentNode.replaceChild(clone, moreBtn);
          moreBtn = document.querySelector(".search-results_successful-more");
          newsCardList.setMoreBtn(moreBtn, increment, currentIndex);
        }
      })
      .finally(function () {
        hideLoader();
      });
  });
  ////////
})();
