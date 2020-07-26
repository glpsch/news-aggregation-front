export default class Popup {
  constructor(popupContainer) {

      this.isOpen = false;
      this.popupContainer = popupContainer;

      this.popupContainer
          .querySelector('.popup__close')
          .addEventListener('click', this.close.bind(this));

      document
          .addEventListener('keydown', (e) => {
              if (e.keyCode == 27) {
                  this.close();
              }
          });
      document
          .addEventListener('mousedown', (e) => {
              if (e.target.classList.contains('popup')) {
                  this.close();
              }
          });

  }
  open() {
    console.log('called open')
      this.popupContainer.parentNode.classList.add('popup_is-opened');
  }
  close() {
      this.popupContainer.parentNode.classList.remove('popup_is-opened');
      this.isOpen = false;
      // this.popupContainer.innerHTML = "";
  }

  setContent(content){
   if (!this.popupContainer
    .querySelector('.popup__content')) {
      this.content = content;
      this.popupContainer.insertAdjacentHTML('beforeend', content.outerHTML);
  }

  }
  // replaceContent(content){
  //   this.content = content;
  //   console.log('replace', {CLASS_list: this.popup.classList[1], CONTENT: content});
  //   this.popup.classList.replace(this.popup.classList[1], content);

  // }


  // clearContent(popup){
  // }
}
