"use strict";

import "../pages/index.css";
import "../pages/articles.css";

import Popup from "./js/components/Popup";

(function () {
  const template = document.querySelector(".popup-template");
  const popupLoginContent = document.querySelector(".popup_login__content");
  const authBtn = document.querySelector(".header__button");

  const popup = new Popup(template);

  authBtn.addEventListener("click", function () {
    // console.log('got click')
    if (!popup.isOpen) {
      popup.setContent(popupLoginContent);
      popup.open.bind(popup)();
      popup.isOpen = true;
      console.log(
        "still got regLinks",
        document.querySelectorAll(".popup__reg-link")
      );
    }
  });
  //////////

  const popupRegContent = document.querySelector(
    ".popup_registration__content"
  );

  template.addEventListener("click", function (event) {
    if (event.target.classList.contains("popup__reg-link")) {
      popup.close.bind(popup)();
      popup.setContent(popupRegContent);
      popup.open.bind(popup)();
      popup.isOpen = true;
    }
  });

  // regLink.addEventListener('click', function() {
  //   console.log('got click');
  //   popup.close.bind(popup)();
  //     popup.setContent(popupRegContent);
  //     popup.open.bind(popup)();
  //     popup.isOpen = true;

  // }
  // );

  // authBtn.addEventListener('click', function() {console.log('bubu')});
})();
