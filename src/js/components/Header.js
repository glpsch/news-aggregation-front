export default class Header {
  constructor() {
    // this.loggedInState = loggedInState;
    this.loggedInState = false;
  }

  render({ isLoggedIn, userName }) {
    const articles = document.querySelector(".header__link_articles");
    const headerButton = document.querySelector(".header__button");
    const headerButtonContent = document.querySelector(".header__button-content");
    const headerLinks = document.querySelector(".header__links");

    if (isLoggedIn) {
      articles.style.display = 'flex';
      headerButton.classList.remove('header__button_unlogged');
      headerButtonContent.textContent = userName;
      headerLinks.classList.remove("header__links_unlogged");

      this.loggedInState = true;
    }

    else {
      articles.style.display = 'none';
      headerButton.classList.add('header__button_unlogged');
      headerButtonContent.textContent = '';
      headerLinks.classList.add("header__links_unlogged");

      this.loggedInState = false;
    }


  }
}
