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

  const loginForm = popupLoginContent.querySelector(".popup__form");
  const loginEmailInput = loginForm.querySelector('#login-email');
  const loginPasswordInput = loginForm.querySelector('#login-password');

  template.addEventListener("click", function (event) {
    if (event.target.classList.contains("login__submit")) {
    event.preventDefault();
    //onUpload
    // userPopup.onUpload('Загрузка..');
    console.log('login');
    mainApi.signin(loginEmailInput.value, loginPasswordInput.value)
        .then((res) => {
          console.log(res, 'res');
            // userRecord.setUserInfo(res.name, res.about);
            // userRecord.updateUserInfo();

            popup.close();
        })
        .catch(onError)
        //onUpload
        // .finally(function () {
        //   popup.onUpload('Сохранить')
        // });
      }
});









})();
