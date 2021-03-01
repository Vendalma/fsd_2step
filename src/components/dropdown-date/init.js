import DatePicker from './DatePicker';

const container = document.querySelectorAll('.js-dropdown-date');
container.forEach((elem) => new DatePicker(elem));
