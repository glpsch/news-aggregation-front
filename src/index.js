"use strict";

import "../pages/index.css";
import "../pages/articles.css";

import Popup from "./js/components/Popup";
import MainApi from "./js/api/MainApi";
import Form from "./js/components/Form";
import onError from "./js/utils/onError";

(function () {
  //Const - popups
  const template = document.querySelector(".popup-template");
  const popupLoginContent = document.querySelector(".popup_login__content");
  const authBtn = document.querySelector(".header__button");
  const popupRegContent = document.querySelector(
    ".popup_registration__content"
  );
  const popupSuccessContent = document.querySelector(".popup_success__content");

  //Const - API
  const serverUrl = "https://api.news-exploring.ga/";

  // Class instances
  const popup = new Popup(template);
  const mainApi = new MainApi(serverUrl);

  // Listeners
  // authBtn.addEventListener("click", function () {
  //   if (!popup.isOpen) {
  //     popup.setContent(popupLoginContent);
  //     popup.open();
  //     popup.isOpen = true;
  //   }
  // });

  template.addEventListener("click", function (event) {
    if (event.target.classList.contains("popup__reg-link")) {
      popup.close();
      popup.setContent(popupRegContent);
      popup.open();
      popup.isOpen = true;
    }
  });

   // Listeners: SUCCESS-LOGIN / REG-LOGIN
 template.addEventListener("click", function (event) {
  if (event.target.classList.contains("success-link") || event.target.classList.contains("popup__reg-login")) {
    popup.close();
    popup.setContent(popupLoginContent);
    popup.open();
    popup.isOpen = true;
  }
});

  /////////////////////////////////////////////////////////////////////
  //API
  /////////////////////////////////////////////////////////////////////


  // LOGIN
  // template.addEventListener("click", function (event) {
  //   if (event.target.classList.contains("login__submit")) {
  //     event.preventDefault();

  //     const loginEmailInput = template.querySelector("#login-email");
  //     const loginPasswordInput = template.querySelector("#login-password");
  //     ////
  //     console.log("login", loginEmailInput.value);
  //     mainApi
  //       .signin(loginEmailInput.value, loginPasswordInput.value)
  //       .then((res) => {
  //         ///
  //         console.log("login is ok");
  //         console.log(res, "res");

  //         popup.close();
  //       })
  //       .catch((e) => {
  //         console.error("login is NOT ok:", e);
  //         onError(e);
  //       });
  //   }
  // });

  // REGISTRATION
  template.addEventListener("click", function (event) {
    if (event.target.classList.contains("reg__submit")) {
      event.preventDefault();

      const regEmailInput = template.querySelector("#reg-email");
      const regPasswordInput = template.querySelector("#reg-password");
      const regNameInput = template.querySelector("#reg-name");
      ////
      console.log(
        regEmailInput.value,
        regPasswordInput.value,
        regNameInput.value
      );

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





  // template.addEventListener("click", function (event) {
  //   if (event.target.classList.contains("login__submit")) {
  //     event.preventDefault();

  //     // const currentForm = template.querySelector(".popup__form");
  //     const loginEmailInput = template.querySelector("#login-email");
  //     const loginPasswordInput = template.querySelector("#login-password");
  //     ////
  //     // console.log("login form", currentForm);

  //     // const formToValidate = new Form(currentForm);
  //     // formToValidate.setEventListeners(currentForm);


  //     mainApi
  //       .signin(loginEmailInput.value, loginPasswordInput.value)
  //       .then((res) => {
  //         ///
  //         console.log("login is ok");
  //         console.log(res, "res");

  //         popup.close();
  //       })
  //       .catch((e) => {
  //         console.error("login is NOT ok:", e);
  //         onError(e);
  //       });
  //   }
  // });


  // LOGIN + validation
  authBtn.addEventListener("click", function () {
    if (!popup.isOpen) {
      popup.setContent(popupLoginContent);
      const currentForm = template.querySelector(".popup__form");
      ////
      console.log("login form", currentForm);

      const formToValidate = new Form(currentForm);
      formToValidate.setEventListeners(currentForm);
      popup.open();

      popup.isOpen = true;
    }
  });




})();
