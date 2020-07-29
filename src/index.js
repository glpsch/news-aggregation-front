"use strict";

import "../pages/index.css";
import "../pages/articles.css";

import Popup from "./js/components/Popup";
import MainApi from "./js/api/MainApi";
import onError from "./js/utils/onError";

(function () {
  //Const - popups
  const template = document.querySelector(".popup-template");
  const popupLoginContent = document.querySelector(".popup_login__content");
  const authBtn = document.querySelector(".header__button");
  const popupRegContent = document.querySelector(
    ".popup_registration__content"
  );

  // Class instances
  const popup = new Popup(template);

  // Listeners
  authBtn.addEventListener("click", function () {
    if (!popup.isOpen) {
      popup.setContent(popupLoginContent);
      popup.open.bind(popup)();
      popup.isOpen = true;
    }
  });

  template.addEventListener("click", function (event) {
    if (event.target.classList.contains("popup__reg-link")) {
      popup.close.bind(popup)();
      popup.setContent(popupRegContent);
      popup.open.bind(popup)();
      popup.isOpen = true;
    }
  });

  /////////////////////////////////////////////////////////////////////
  //API

  //https?
  const serverUrl = "https://api.news-exploring.ga/";

  const mainApi = new MainApi(serverUrl);


  // LOGIN
  template.addEventListener("click", function (event) {
    if (event.target.classList.contains("login__submit")) {
      event.preventDefault();
      //onUpload
      // userPopup.onUpload('Загрузка..');

      const loginEmailInput = template.querySelector("#login-email");
      const loginPasswordInput = template.querySelector("#login-password");
      ////
      console.log("login", loginEmailInput.value);
      mainApi
        .signin(loginEmailInput.value, loginPasswordInput.value)
        .then((res) => {
          console.log("login is ok");
          console.log(res, "res");
          // userRecord.updateUserInfo();
          popup.close();
        })
        .catch((e) => {
          console.error("login is NOT ok:", e);
          onError(e);
        });
      //onUpload
      // .finally(function () {
      //   popup.onUpload('Сохранить')
      // });
    }
  });

  // REGISTRATION
  template.addEventListener("click", function (event) {
    if (event.target.classList.contains("reg__submit")) {
      event.preventDefault();
      //onUpload
      // userPopup.onUpload('Загрузка..');

      const regEmailInput = template.querySelector("#reg-email");
      const regPasswordInput = template.querySelector("#reg-password");
      const regNameInput = template.querySelector("#reg-name");

      console.log(regEmailInput.value, regPasswordInput.value, regNameInput.value);
      ////
      mainApi
        .signup(regEmailInput.value, regPasswordInput.value, regNameInput.value)
        .then((res) => {
          console.log("reg is ok");
          console.log(res, "res");
          // userRecord.updateUserInfo();
          popup.close();
        })
        .catch((e) => {
          console.error("reg is NOT ok:", e);
          onError(e);
        });
      //onUpload
      // .finally(function () {
      //   popup.onUpload('Сохранить')
      // });
    }
  });














})();
