import Dropdown from './Dropdown';

const dropdown = document.querySelectorAll('.js-dropdown');
dropdown.forEach((elem) => new Dropdown(elem));
