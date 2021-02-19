import Header from './header';

const buttonMenu = document.querySelectorAll('.js-header__burger-menu');
buttonMenu.forEach((elem) => {
  const headerMenu = new Header(elem);
});
