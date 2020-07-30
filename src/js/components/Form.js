export default class Form {
  constructor(form) {
      this.form = form;
  }

// setServerError — добавляет форме ошибку, пришедшую с сервера;
// _validateInputElement — валидирует переданный в качестве аргумента инпут;
// _validateForm — валидирует всю форму;
// _clear — вспомогательный метод, очищает поля формы;
// _getInfo — вспомогательный метод, возвращает данные формы.

checkInputValidity(element) {
  this.element = element;
  const errorElement = document.querySelector(`#error-${this.element.id}`);
  if (!this.element.checkValidity()) {
      errorElement.textContent = 'Это обязательное поле';
      if (this.element.validity.tooShort || this.element.validity.tooLong) {
          errorElement.textContent = 'Должно быть от 2 до 30 символов';
      }
      if (this.element.validity.typeMismatch) {
          errorElement.textContent = 'Здесь должна быть ссылка';
      }
      // activateError(element);
      this.element.parentNode.classList.add('popup__input-container_invalid');
      errorElement.classList.add('popup__input-container_invalid');
      return false;
  }
  // resetError(element);
  this.element.parentNode.classList.remove('popup__input-container_invalid');
  this.element.textContent = '';

  errorElement.classList.remove('popup__input-container_invalid');
  return true;
}
setSubmitButtonState(form) {
  this.form = form;
  ////
  /// ?????
  // const inputs = Array.from(this.form.elements);
  const inputs = this.form.querySelectorAll('.popup__input');
  const inputBtn = this.form.querySelector('.popup__button');
  let isValidForm = true;

  inputs.forEach((element) => {
      if (!element.checkValidity()) isValidForm = false;
  });
  if (isValidForm) {
      inputBtn.removeAttribute('disabled');
      inputBtn.classList.remove('popup__button_inactive');
  } else {
      inputBtn.setAttribute('disabled', true);
      inputBtn.classList.add('popup__button_inactive');
  }
}
validateFormInputs(event) {
  event.preventDefault();
  this.setSubmitButtonState(this.form);
}


handleValidateForm(event) {
  this.checkInputValidity(event.target);

}

setEventListeners(form) {
  this.form = form;
  this.form.addEventListener('input', this.validateFormInputs.bind(this));
  const inputs = this.form.querySelectorAll('input');
  inputs.forEach(function (element) {
      element.addEventListener('input', this.handleValidateForm.bind(this));
  }.bind(this));
}
}

