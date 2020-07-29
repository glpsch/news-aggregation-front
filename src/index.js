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
  const serverUrl = "http://api.news-exploring.ga/";

  const mainApi = new MainApi(serverUrl);

  template.addEventListener("click", function (event) {
    if (event.target.classList.contains("login__submit")) {
      event.preventDefault();
      //onUpload
      // userPopup.onUpload('Загрузка..');

      /////???
      // const loginForm = template.querySelector(".popup__form");
      const loginEmailInput = template.querySelector("#login-email");
      const loginPasswordInput = template.querySelector("#login-password");

      ////!!!!
      console.log("login", loginEmailInput.value);

      mainApi
        .signin(loginEmailInput.value, loginPasswordInput.value)
        .then((res) => {
          console.log("all is ok");
          console.log(res, "res");
          // userRecord.updateUserInfo();
          popup.close();
        })
        .catch((e) => {
          console.error("all is NOT ok:", e);
          onError(e);
        });
      //onUpload
      // .finally(function () {
      //   popup.onUpload('Сохранить')
      // });
    }
  });
})();
