import "./expandable-checkbox.scss";
import "../checkbox/checkbox";
import "../buttons/buttons";

let checkboxLists = document.querySelectorAll(".expandable-checkbox");

checkboxLists.forEach((checkboxList) => {
  let items = checkboxList.querySelector(".expandable-checkbox__items");
  let materialIcons = checkboxList.querySelector(
    ".expandable-checkbox__material-icon"
  );

  checkboxList.addEventListener("click", function () {
    items.classList.toggle("expandable-checkbox__items_hidden");
    materialIcons.classList.toggle("expandable-checkbox__material-icon_open");
  });
});
