import '@components/button/button';
import '@components/link/link';
import '@components/logo/logo';
import './header.scss';
let buttonMenu = document.querySelectorAll('.js-header__burger-menu');

buttonMenu.forEach((elem) => {
  let navBar = elem.parentElement.querySelector('.js-header__nav-bar');
  let iconMenu = elem.querySelector('.js-header__menu-icon_opened');
  let iconClose = elem.querySelector('.js-header__menu-icon_closed');

  elem.addEventListener('click', bindThis.bind(this));

  function bindThis() {
    navBar.classList.toggle('header__nav-bar_open');
    iconMenu.classList.toggle('header__menu-icon_hidden');
    iconClose.classList.toggle('header__menu-icon_hidden');
  }
});
