"use strict";

import "../pages/index.css";
import "../pages/articles.css";

import Popup from "./js/components/Popup";
import MainApi from "./js/api/MainApi";
import Form from "./js/components/Form";
import onError from "./js/utils/onError";
import Header from "./js/components/Header";

(function () {
  // TODO change after deployment to "https://news-exploring.ga/"
  // const mainUrl = "https://glpsch.github.io/news-aggregation-front/";
  const mainUrl = "http://localhost:8080/";
  //Const - popups
  const template = document.querySelector(".popup-template");
  const popupLoginContent = document.querySelector(".popup_login__content");
  const authBtnLogIn = document.querySelector(".header__button_unlogged");
  const authBtnLogOut = document.querySelector(".header__button_logged-in");
  const mobileMenuBtn = document.querySelector(".header__mobile-menu");

  const popupRegContent = document.querySelector(".popup_registration__content");
  const popupSuccessContent = document.querySelector(".popup_success__content");

  //Const - API
  const serverUrl = "https://api.news-exploring.ga/";

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
  if (authBtnLogIn) {
    authBtnLogIn.addEventListener("click", function () {
      if (!popup.isOpen) {
        setPopup(popupLoginContent);
      }
    });
  }

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
      if (
        event.target.classList.contains("success-link") ||
        event.target.classList.contains("popup__reg-login")
      ) {
        popup.close();
        setPopup(popupLoginContent);
      }
    });
  }

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
       if (window.location.pathname !== '/') {
        window.location.pathname = '/';
       };
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
  }

  ///////////////////////////////////////////////
  /// mobile
  ///////////////////////////////////////////////

  mobileMenuBtn.addEventListener("click", function () {
    document.querySelector(".header__links").classList.toggle("header__links_visible-on-mobile");
    document.querySelector(".backdrop").classList.toggle("backdrop_active");
  });
})();
