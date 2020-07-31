export default class Header {
  constructor(loggedInState) {
    this.loggedInState = loggedInState;
// if (!loggedInState) {

// }
  }

  render({ isLoggedIn, userName }) {
    if (isLoggedIn) {
      const articles = document.querySelector(".header__link_articles");
      articles.style.display = 'flex';

      const headerButton = document.querySelector(".header__button");
      headerButton.classList.remove('header__button_unlogged');
      headerButton.querySelector(".header__button-content").textContent = userName;


    }
  }
}
