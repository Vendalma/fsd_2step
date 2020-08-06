import "./header.scss";
import "@components/logo/logo-colored/logo-colored";
import "@components/buttons/buttons";
import "@components/links/links";

let buttonBurger = document.querySelectorAll(".header__burger-menu");

buttonBurger.forEach((elem) => {
  let blockMenu = elem.nextElementSibling;
  let iconMenu = elem.querySelector(".header__block_menu");
  let iconClose = elem.querySelector(".header__block_close");

  elem.addEventListener("click", function () {
    blockMenu.classList.toggle("header__menu_open");
    iconMenu.classList.toggle("header__block_active");
    iconClose.classList.toggle("header__block_active");
  });
});
