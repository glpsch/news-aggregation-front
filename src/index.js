"use strict";

import '../pages/index.css';
import '../pages/articles.css';

import Popup from './js/components/Popup';


// popup_registration

(function () {

const templateContainer = document.querySelector('.popup-template__container');


const popupLoginElementContent = document.querySelector('.popup_login__content');
const authBtn = document.querySelector('.header__button');

// const popupLoginElement = document.querySelector('.popup_login');
// const popupLogin = new Popup(popupLoginElement);
// authBtn.addEventListener('click', popupLogin.open.bind(popupLogin));


console.log('popupLoginElementContent', popupLoginElementContent);

const popup = new Popup(templateContainer);

authBtn.addEventListener('click', function() {
  console.log('got click')
  if (!popup.isOpen){
    popup.setContent(popupLoginElementContent);
    popup.open.bind(popup)();
    popup.isOpen = true;
  }

}
);


// console.log('popupLoginElementContent', popupLoginElementContent)

// const popupReg = '.popup_registration';
// const regLink = document.querySelector('.popup__reg-link');
// regLink.addEventListener('click', function() {
//   popup.replaceContent(popupReg);
// }
// );

// authBtn.addEventListener('click', function() {console.log('bubu')});



})();
