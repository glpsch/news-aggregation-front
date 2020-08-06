export default class Header {
  constructor() {
    this.loggedInState = false;
  }

  render({ isLoggedIn, userName }) {
    const articles = document.querySelector(".header__link_articles");
    const ButtonUnlogged = document.querySelector(".header__button_unlogged");
    const ButtonLoggedIn = document.querySelector(".header__button_logged-in");
    const headerLinks = document.querySelector(".header__links");

    if (isLoggedIn) {
      articles.style.display = 'flex';
      if (ButtonUnlogged) {
      ButtonUnlogged.classList.add('invisible');
      }
      ButtonLoggedIn.classList.remove('invisible');
      ButtonLoggedIn.querySelector(".header__button-content").textContent = userName;
      headerLinks.classList.remove("header__links_unlogged");

      this.loggedInState = true;
    }

    else {
      articles.style.display = 'none';
      headerLinks.classList.add("header__links_unlogged");
      if (ButtonUnlogged) {
        ButtonUnlogged.classList.remove('invisible');
        }
      ButtonLoggedIn.classList.add('invisible');

      this.loggedInState = false;
    }


  }
}
