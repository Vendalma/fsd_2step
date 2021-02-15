import '@components/button/button';
import '@components/link/link';
import '@components/logo/logo';
import './header.scss';

const buttonMenu = document.querySelectorAll('.js-header__burger-menu');
buttonMenu.forEach((elem) => {
  const navBar = elem.parentElement.querySelector('.js-header__nav-bar');
  const iconMenu = elem.querySelector('.js-header__menu-icon_opened');
  const iconClose = elem.querySelector('.js-header__menu-icon_closed');

  elem.addEventListener('click', bindThis.bind(this));

  function bindThis() {
    navBar.classList.toggle('header__nav-bar_open');
    iconMenu.classList.toggle('header__menu-icon_hidden');
    iconClose.classList.toggle('header__menu-icon_hidden');
  }
});
