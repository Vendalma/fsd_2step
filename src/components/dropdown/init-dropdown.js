import Dropdown from './dropdown';

const dropdown = document.querySelectorAll('.js-dropdown');
dropdown.forEach((elem) => new Dropdown(elem));
