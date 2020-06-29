import "./dropdown.scss";
import "../buttons/buttons";

let select_container = document.querySelector(".dropdown__select-container");
let select_list = document.querySelector(".dropdown__select-list");
let item_score = document.querySelectorAll(".item-count__score");
let mins = document.querySelectorAll(".item-count__min");
let pluses = document.querySelectorAll(".item-count__plus");
let clear_button = document.querySelector(".dropdown-clear__button-block");

select_container.addEventListener("click", function () {
  select_list.classList.toggle("dropdown__select-list_default");
  select_list.classList.toggle("dropdown__select-list_open");
});

for (let min of mins) {
  min.addEventListener("click", function () {
    let score = this.nextElementSibling;
    if (Number(score.innerHTML) > 0) {
      score.innerHTML = Number(score.innerHTML) - 1;
    }
    if (checkCountScore(item_score)) {
      clear_button.classList.add("dropdown-clear__button-block_hidden");
    }
  });
}

for (let plus of pluses) {
  plus.addEventListener("click", function () {
    let score = this.previousElementSibling;
    score.innerHTML = Number(score.innerHTML) + 1;

    clear_button.classList.remove("dropdown-clear__button-block_hidden");
  });
}

clear_button.addEventListener("click", function () {
  for (let elem of item_score) {
    elem.innerHTML = 0;
    clear_button.classList.add("dropdown-clear__button-block_hidden");
  }
});

function checkCountScore(arr) {
  let count = 0;
  for (let elem of arr) {
    count = count + Number(elem.innerHTML);
  }
  if (count == 0) {
    return true;
  }

  return false;
}
