import "../buttons/buttons";
import "../checkbox/checkbox";
import "./expandable-checkbox.scss";

let checkboxLists = document.querySelectorAll(".js-expandable-checkbox");

checkboxLists.forEach((checkboxList) => {
  let items = checkboxList.querySelector(".js-expandable-checkbox__items");
  let materialIcons = checkboxList.querySelector(
    ".js-expandable-checkbox__material-icon"
  );

  checkboxList.addEventListener("click", function () {
    items.classList.toggle("expandable-checkbox__items_hidden");
    materialIcons.classList.toggle("expandable-checkbox__material-icon_open");
  });
});
