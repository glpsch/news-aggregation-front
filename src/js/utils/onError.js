export default function onError(err) {
  const mainError = document.querySelector(".popup-template").querySelector(".popup__input-error_main");
  mainError.textContent = err.message;
  mainError.style.display = 'flex';

}