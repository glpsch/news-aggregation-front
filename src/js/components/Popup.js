export default class Popup {
  constructor(popup) {
      this.popup = popup;
      this.popup
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
      this.popup.classList.add('popup_is-opened');
  }
  close() {
      this.popup.classList.remove('popup_is-opened');
  }
}
