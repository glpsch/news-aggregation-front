"use strict";

import '../pages/index.css';
import '../pages/articles.css';

import Popup from './js/components/Popup';


// popup_registration

(function () {

const popupLoginElement = document.querySelector('.popup_login');
const authBtn = document.querySelector('.header__button');
const popupLogin = new Popup(popupLoginElement);
authBtn.addEventListener('click', popupLogin.open.bind(popupLogin));





// authBtn.addEventListener('click', function() {console.log('bubu')});

// authBtn.addEventListener('click', undefined);



// console.log('popupLogin')


// console.log('scope:', this);
})();
