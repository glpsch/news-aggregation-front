export default class NewsCardList {
  // Конструктор принимает массив карточек,
  // которые должны быть в списке при первой отрисовке. Методы:
  // renderResults принимает массив экземпляров карточек и отрисовывает их;
  // renderLoader отвечает за отрисовку лоудера;
  // renderError принимает объект ошибки и показывает ошибку в интерфейсе;
  // showMore отвечает за функциональность кнопки «Показать ещё»;
  // addCard принимает экземпляр карточки и добавляет её в список.

  constructor(container, cardArray) {
    this.container = container;
    this.cardArray = cardArray;
  }

  addCard(newCard) {
    this.container.appendChild(newCard);
  }

  renderResults() {
    // this.cardArray.forEach((card) => {
    //   this.container.appendChild(card);
    // });

    for (let n = 0; (n < 3) && ( n < this.cardArray.length) ; n++) {
     this.container.appendChild( this.cardArray[n])
    }
  }
  /////// TODO
  setMoreBtn(button) {
    this.button = button;
    // this.button.addEventListener("click", function(){

    //   this.cardArray.renderResults.bind(this);
    //   console.log('showed more');
    // })

    this.button.addEventListener("click", this.renderResults.bind(this));
  }
}
