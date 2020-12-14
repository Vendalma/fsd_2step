import "../buttons/buttons";
import "../checkbox/checkbox";
import "./expandable-checkbox.scss";

class ExpandableCheckbox {
  constructor(container) {
    this.container = container
    this.items = this.container.querySelector(".js-expandable-checkbox__items");
    this.materialIcons = this.container
      .querySelector(
        ".js-expandable-checkbox__material-icon"
      );
    this.openList()
  }
  openList() {
    this.container.addEventListener(('click'), this.bindThis.bind(this))
  }

  bindThis() {
    this.items.classList.toggle("expandable-checkbox__items_hidden");
    this.materialIcons.classList.toggle("expandable-checkbox__material-icon_open");
  }
}

let checkboxLists = document.querySelectorAll(".js-expandable-checkbox");

checkboxLists.forEach((checkboxList) => {
  let openList = new ExpandableCheckbox(checkboxList)
});

