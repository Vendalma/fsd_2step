import "./header.scss";
import "@components/logo/logo-colored/logo-colored";
import "@components/buttons/buttons";
import "@components/links/links";

let buttonBurger = document.querySelectorAll(".header__burger-menu");

buttonBurger.forEach((elem) => {
  let blockMenu = elem.nextElementSibling;

  elem.addEventListener("click", function () {
    blockMenu.classList.toggle("header__block_menu_open");
  });
});
