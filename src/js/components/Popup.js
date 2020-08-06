export default class Popup {
  constructor(popupContainer) {

      this.isOpen = false;
      this.popupContainer = popupContainer;

      // this.popupContainer
      //     .querySelector('.popup__close')
      //     .addEventListener('click', this.close.bind(this));

      // document
      //     .addEventListener('keydown', (e) => {
      //         if (e.keyCode == 27) {
      //             this.close();
      //         }
      //     });
      // document
      //     .addEventListener('mousedown', (e) => {
      //         if (e.target.classList.contains('popup')) {
      //             this.close();
      //         }
      //     });

  }
  open() {
           // disableSubmit
           console.log('open: this.popupContainer.classList', this.popupContainer.classList);
           if (this.popupContainer.querySelector('.popup__button')) {
            const inputBtn = this.popupContainer.querySelector('.popup__button');
            inputBtn.setAttribute('disabled', true);
            inputBtn.classList.add('popup__button_inactive');
        }
      this.popupContainer.classList.add('popup_is-opened');
  }
  close() {
      this.popupContainer.classList.remove('popup_is-opened');
      this.isOpen = false;
      this.popupContainer.innerHTML = "";
  }

  setContent(content){
      this.content = content;
      this.popupContainer.insertAdjacentHTML('beforeend', content.outerHTML);

      // set close button
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


  // clearContent(popup){
  // }
}
