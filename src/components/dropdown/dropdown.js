import "./dropdown.scss";
import "../buttons/buttons";

let dropdow = document.querySelectorAll(".dropdown");

dropdow.forEach((drop) => {
  let select_container = drop.querySelector(".dropdown__select-container"); //drop.firstElementCh
  let select_list = drop.querySelector(".dropdown__select-list");
  let placeholder = drop.querySelector(".dropdown__placeholder");
  let material_icon = drop.querySelector(".dropdown__material-icons");
  let item_score = drop.querySelectorAll(".item-count__score");
  let minuses = drop.querySelectorAll(".item-count__min");
  let pluses = drop.querySelectorAll(".item-count__plus");
  let clear_button = drop.querySelector(".dropdown__clear-button");
  let apply_button = drop.querySelector(".dropdown__apply-button");
  //let child = drop.querySelector('.dropdown__item-name_child')

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

  //кнопка минус
  for (let minus of minuses) {
    minus.addEventListener("click", function () {
      let score = this.nextElementSibling;
      if (Number(score.innerHTML) > 0) {
        score.innerHTML = Number(score.innerHTML) - 1;
      }

      //скрытие кнопки "Очистить"
      if (checkCountScore(item_score)) {
        clear_button.classList.add("dropdown__clear-button_hidden");
      }

      /*
      если счет возле кнопки минус равен нулю,
      то она становится прозрачной
      */
      if (Number(score.innerHTML) == 0) {
        this.classList.add("item-count__min_hidden");
      }
      letCorrectGuests(item_score);
    });
  }

  //кнопка плюс
  for (let plus of pluses) {
    plus.addEventListener("click", function () {
      let score = this.previousElementSibling;
      score.innerHTML = Number(score.innerHTML) + 1;

      //скрытие кнопки "Очистить"
      clear_button.classList.remove("dropdown__clear-button_hidden");
      letCorrectGuests(item_score);

      /* 
      получаем первый элемент в родительском узле, 
      т.е. кнопку минус и убираем прозрачность
          */
      this.parentElement.firstElementChild.classList.remove(
        "item-count__min_hidden"
      );
    });
  }

  //кнопка Очистить
  clear_button.addEventListener("click", function () {
    //обнуление счетчиков
    for (let elem of item_score) {
      elem.innerHTML = 0;
      clear_button.classList.add("dropdown__clear-button_hidden");
      letCorrectGuests(item_score);
    }

    //прозрачность кнопки очистить
    for (let minus of minuses) {
      minus.classList.add("item-count__min_hidden");
    }

    placeholder.innerHTML = "Сколько гостей";
  });

  //кнопка Применить, закрытие дропдауна
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
    let sumChild = 0;

    let str = "";
    let strChild = "";
    for (let elem of array) {
      if (elem.classList.contains("item-count__child")) {
        sumChild = sumChild + Number(elem.innerHTML);
      } else {
        sum = sum + Number(elem.innerHTML);
      }
    }

    if (sum == 1) {
      str = sum + " гость";
    } else if (sum > 1 && sum <= 4) {
      str = sum + " гостя";
    } else if (sum >= 5 && sum <= 20) {
      str = sum + " гостей";
    }

    if (sumChild == 1) {
      strChild = " , " + sumChild + " младенец";
    } else if (sumChild > 1 && sumChild <= 4) {
      strChild = " , " + sumChild + " младенца";
    } else if (sumChild >= 5 && sumChild <= 20) {
      strChild = " , " + sumChild + " младенцев";
    }

    if (sum == 0) {
      placeholder.innerHTML = "Сколько гостей";
    } else {
      placeholder.innerHTML = str + strChild;
    }
  }
});
