import Dropdown from './dropdown';
let dropdown = document.querySelectorAll('.js-dropdown');
dropdown.forEach((elem) => {
  return new Dropdown(elem);
});
