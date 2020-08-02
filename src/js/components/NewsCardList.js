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

   renderResults(button) {
      // this.cardArray.forEach((card) => {
      //     this.container.appendChild(card);
      // });
      this.button = button;
      // this.cardArray = cardArray;

      for (let n = 0; (n < 3) && ( n < this.cardArray.length) ; n++) {
       this.container.appendChild( this.cardArray[n])
      }




       this.button.addEventListener("click", function () {
        for (let n = 0; (n < 3) && ( n < this.cardArray.length) ; n++) {
          this.container.appendChild( this.cardArray[n])
         }
       });

      //  this.button.addEventListener("click", function () {
      //   for (let n = 0; (n < 3) && ( n < this.cardArray.length.bind(this)) ; n++) {
      //     this.container.bind(this).appendChild( this.cardArray[n].bind(this))
      //    }
      //  });

  }
}


