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

  renderResults(from, to, max) {

    for(let currentIndex = from; currentIndex <= to; currentIndex++){
      if (!this.cardArray[currentIndex]){
        console.warn('requested to render an element outside of range');
       //TODO fix later
       if (max > 2)
       { this.container.appendChild( this.cardArray[max])}
        return;
      }
      this.container.appendChild( this.cardArray[currentIndex])
    }
  }

  setMoreBtn(button, increment, startIndex) {
    this.button = button;
    this.button.classList.remove('invisible');

    let currentIndex = startIndex;
    const maxIndex = this.cardArray.length - 1;
    console.log('got MaxIndex as:', maxIndex)
    button.addEventListener('click', ()=>{
      console.log('calling to render stuff')
      currentIndex += increment;
      const renderToIndex = currentIndex + increment;
      if (renderToIndex > maxIndex){
        console.log('remove button');
        this.button.classList.add('invisible');
      }
      this.renderResults(currentIndex, renderToIndex - 1, maxIndex);
    });
  }


  renderSaved() {
  this.cardArray.forEach((card) => {
    this.container.appendChild(card);
    });
}
}


