import "./dropdown.scss";
import "../buttons/buttons";

/*let select_container = document.querySelector(".dropdown__select-container");
let placeholder = document.querySelector(".dropdown__placeholder");
let material_icon = document.querySelector(".dropdown__material-icons");
let select_list = document.querySelector(".dropdown__select-list");
let item_score = document.querySelectorAll(".item-count__score");
let mins = document.querySelectorAll(".item-count__min");
let pluses = document.querySelectorAll(".item-count__plus");
let clear_button = document.querySelector(".dropdown-clear__button-block");
let apply_button = document.querySelector(".dropdown-apply__button-block");

select_container.addEventListener("click", function () {
  select_list.classList.toggle("dropdown__select-list_default");
  select_list.classList.toggle("dropdown__select-list_open");

  select_container.classList.toggle("dropdown__select-container_default");
  select_container.classList.toggle("dropdown__select-container_open");

  placeholder.classList.toggle("dropdown__placeholder_default");
  placeholder.classList.toggle("dropdown__placeholder_open");

  material_icon.classList.toggle("dropdown__material-icons_default");
  material_icon.classList.toggle("dropdown__material-icons_open");
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
    letCorrectGuests(item_score);
  });
}

for (let plus of pluses) {
  plus.addEventListener("click", function () {
    let score = this.previousElementSibling;
    score.innerHTML = Number(score.innerHTML) + 1;

    clear_button.classList.remove("dropdown-clear__button-block_hidden");
    letCorrectGuests(item_score);
  });
}

clear_button.addEventListener("click", function () {
  for (let elem of item_score) {
    elem.innerHTML = 0;
    clear_button.classList.add("dropdown-clear__button-block_hidden");
    letCorrectGuests(item_score);
  }
});

apply_button.addEventListener("click", function () {
  select_list.classList.toggle("dropdown__select-list_default");
  select_list.classList.toggle("dropdown__select-list_open");

  select_container.classList.toggle("dropdown__select-container_default");
  select_container.classList.toggle("dropdown__select-container_open");

  placeholder.classList.toggle("dropdown__placeholder_default");
  placeholder.classList.toggle("dropdown__placeholder_open");

  material_icon.classList.toggle("dropdown__material-icons_default");
  material_icon.classList.toggle("dropdown__material-icons_open");
});

/*function checkCountScore(arr) {
  let count = 0;
  for (let elem of arr) {
    count += Number(elem.innerHTML);
  }
  if (count == 0) {
    return true;
  }

  return false;
}

function checkCountScore(arr) {
  for (let elem of arr) {
    if (Number(elem.innerHTML) > 0) {
      return false;
    }
  }
  return true;
}

function letCorrectGuests(array) {
  let sum = 0;
  for (let elem of array) {
    sum = sum + Number(elem.innerHTML);
  }
  if (sum == 0) {
    placeholder.innerHTML = "Сколько гостей";
  } else if (sum == 1) {
    placeholder.innerHTML = sum + " гость";
  } else if (sum > 1 && sum <= 4) {
    placeholder.innerHTML = sum + " гостя";
  } else if (sum >= 5 && sum <= 20) {
    placeholder.innerHTML = sum + " гостей";
  }
}*/
