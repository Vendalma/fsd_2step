import "@components/buttons/buttons";
import "@components/links/links";
import "@components/logo/logo";
import "./header.scss";

let buttonBurger = document.querySelectorAll(".js-header__burger-menu");

buttonBurger.forEach((elem) => {
  let navBar = elem.parentElement.querySelector('.js-header__nav-bar');
  let iconMenu = elem.querySelector(".js-header__burger-menu_open");
  let iconClose = elem.querySelector(".js-header__burger-menu_close");

  elem.addEventListener("click", bindThis.bind(this));

  function bindThis() {
    navBar.classList.toggle("header__nav-bar_open");
    iconMenu.classList.toggle("header__burger-menu_hidden");
    iconClose.classList.toggle("header__burger-menu_hidden");
  }
});
