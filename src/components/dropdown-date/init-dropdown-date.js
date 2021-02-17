import DatePicker from './dropdown-date';

const container = document.querySelectorAll('.js-dropdown-date');
container.forEach((elem) => new DatePicker(elem));
