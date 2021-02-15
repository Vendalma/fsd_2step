import DatePicker from './dropdown-date';
let container = document.querySelectorAll('.js-dropdown-date');
container.forEach((elem) => {
  return new DatePicker(elem);
});
