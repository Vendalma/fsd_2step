import "./dropdown.scss";
import "../buttons/buttons";

let dropdow = document.querySelectorAll(".dropdown");
//let select_container = document.querySelector(".dropdown__select-container");
//let placeholder = document.querySelectorAll(".dropdown__placeholder");
//let material_icon = document.querySelectorAll(".dropdown__material-icons");
//let select_list = document.querySelectorAll(".dropdown__select-list");

//let mins = document.querySelectorAll(".item-count__min");
//let pluses = document.querySelectorAll(".item-count__plus");
//let clear_button = document.querySelectorAll(".dropdown__clear-button");
//let apply_button = document.querySelectorAll(".dropdown__apply-button");

dropdow.forEach((drop) => {
  let select_container = drop.firstElementChild;
  let select_list = select_container.nextElementSibling;
  let placeholder = select_container.firstElementChild;
  let material_icon = select_container.lastElementChild;
  let items = select_list.childNodes;
  let buttons = select_list.lastElementChild;
  let clear_button = buttons.firstElementChild;
  let apply_button = buttons.lastElementChild;

  //открытие дропдауна
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

  items.forEach((item) => {
    let count = item.lastElementChild;
    let minus = count.firstElementChild;
    let plus = count.lastElementChild;
    let score = minus.nextElementSibling;

    //кнопка минус
    minus.addEventListener("click", function () {
      //let score = this.nextElementSibling;
      if (Number(score.innerHTML) > 0) {
        score.innerHTML = Number(score.innerHTML) - 1;
      }

      //скрытие кнопки "Очистить"
      /*if (checkCountScore(item_score)) {
          clear_button.classList.add("dropdown__clear-button_hidden");
        }*/

      /*
            если счет возле кнопки минус равен нулю,
            то она становится прозрачной
          */
      if (Number(score.innerHTML) == 0) {
        this.classList.add("item-count__min_hidden");
      }
      //letCorrectGuests(item_score);
    });

    //кнопка плюс
    plus.addEventListener("click", function () {
      //let score = this.previousElementSibling;
      score.innerHTML = Number(score.innerHTML) + 1;

      //скрытие кнопки "Очистить"
      clear_button.classList.remove("dropdown__clear-button_hidden");
      //letCorrectGuests(item_score);

      /* 
          получаем первый элемент в родительском узле, 
          т.е. кнопку минус и убираем прозрачность
        */
      this.parentElement.firstElementChild.classList.remove(
        "item-count__min_hidden"
      );
    });
  });

  //кнопка Очистить
  clear_button.addEventListener("click", function () {
    for (let elem of item_score) {
      elem.innerHTML = 0;
      clear_button.classList.add("dropdown__clear-button_hidden");
      letCorrectGuests(item_score);
    }
  });
  /*
  //кнопка Применить, закрытие дропдауна
  apply_button.addEventListener("click", function () {
    elem.nextElementSibling.classList.toggle("dropdown__select-list_default");
    elem.nextElementSibling.classList.toggle("dropdown__select-list_open");

    elem.classList.toggle("dropdown__select-container_default");
    elem.classList.toggle("dropdown__select-container_open");

    elem.firstElementChild.classList.toggle("dropdown__placeholder_default");
    elem.firstElementChild.classList.toggle("dropdown__placeholder_open");

    elem.lastElementChild.classList.toggle("dropdown__material-icons_default");
    elem.lastElementChild.classList.toggle("dropdown__material-icons_open");
  });
*/
  /* function checkCountScore(arr) {
  let count = 0;
  for (let elem of arr) {
    count += Number(elem.innerHTML);
  }
  if (count == 0) {
    return true;
  }

  return false;
}*/

  //функция проверяет равно ли кол-во гостей нулю
  function checkCountScore(arr) {
    for (let elem of arr) {
      if (Number(elem.innerHTML) > 0) {
        return false;
      }
    }
    return true;
  }

  //корректное склонение слов
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
  }
});
