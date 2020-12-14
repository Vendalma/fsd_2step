import "@components/buttons/buttons";
import "@components/links/links";
import "@components/logo/logo";
import "./header.scss";

let buttonBurger = document.querySelectorAll(".js-header__burger-menu");

buttonBurger.forEach((elem) => {
  let blockMenu = elem.parentElement.querySelector('.js-header__menu');
  let iconMenu = elem.querySelector(".js-header__burger-menu_open");
  let iconClose = elem.querySelector(".js-header__burger-menu_close");

  elem.addEventListener("click", bindThis.bind(this));

  function bindThis() {
    blockMenu.classList.toggle("header__menu_open");
    iconMenu.classList.toggle("header__burger-menu_hidden");
    iconClose.classList.toggle("header__burger-menu_hidden");
  }
});
