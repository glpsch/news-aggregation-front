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

  renderResults(from, to) {
    // this.cardArray.forEach((card) => {
    //   this.container.appendChild(card);
    // });

    for(let currentIndex = from; currentIndex <= to; currentIndex++){
      if (!this.cardArray[currentIndex]){
        console.warn('requested to render an element outside of range');
        return;
      }
      this.container.appendChild( this.cardArray[currentIndex])
    }

    // for (let n = 0; (n < 3) && ( n < this.cardArray.length) ; n++) {
    //  this.container.appendChild( this.cardArray[n])
    // }
  }
  /////// TODO
  setMoreBtn(button, increment, startIndex) {
    let currentIndex = startIndex;
    this.button = button;
    const maxIndex = this.cardArray.length - 1;
    console.log('got MaxIndex as:', maxIndex)
    button.addEventListener('click', ()=>{
      console.log('calling to render stuff')
      currentIndex += increment;
      const renderToIndex = currentIndex + increment;
      if (renderToIndex >= maxIndex){
        console.log('remove button');
      }
      this.renderResults(currentIndex, renderToIndex);
    });
  }
}
