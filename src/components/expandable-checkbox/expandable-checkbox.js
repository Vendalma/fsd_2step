import "./expandable-checkbox.scss";
import "../checkbox/checkbox";
import "../buttons/buttons";

let checkboxLists = document.querySelectorAll(".expandable-checkbox");

checkboxLists.forEach((checkboxList) => {
  let items = checkboxList.lastElementChild;
  let nameBlock = checkboxList.firstElementChild;
  let materialIconsBlock = nameBlock.firstElementChild;
  let materialIcons = materialIconsBlock.firstElementChild;

  checkboxList.addEventListener("click", function () {
    items.classList.toggle("expandable-checkbox__items_hidden");
    materialIcons.classList.toggle(
      "expandable-checkbox__material-icon_font_open"
    );
  });
});
