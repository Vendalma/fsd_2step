import "./dropdown.scss";
import "../buttons/buttons";

let dropdow = document.querySelectorAll(".dropdown");

dropdow.forEach((drop) => {
  let select_container = drop.querySelector(".dropdown__select-container");
  let select_list = drop.querySelector(".dropdown__select-list");
  let placeholder = drop.querySelector(".dropdown__placeholder");
  let material_icon = drop.querySelector(".dropdown__material-icons");
  let item_score = drop.querySelectorAll(".item-count__score");
  let minuses = drop.querySelectorAll(".item-count__button_min");
  let pluses = drop.querySelectorAll(".item-count__button_plus");

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

  //функция проверяет тип дропдауна
  function checkTypeDropdown() {
    if (drop.classList.contains("dropdown-guests")) {
      return true;
    }
    return false;
  }

  //дропдаун подсчета гостей
  if (checkTypeDropdown()) {
    let clear_button = drop.querySelector(".dropdown__clear-button");
    let apply_button = drop.querySelector(".dropdown__apply-button");

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
        minus.classList.add("item-count__button_hidden");
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
          this.classList.add("item-count__button_hidden");
        }

        //корректное значение гостей
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

        //корректное значение гостей
        letCorrectGuests(item_score);

        /* 
      получаем первый элемент в родительском узле, 
      т.е. кнопку минус и убираем прозрачность
          */
        this.parentElement.firstElementChild.classList.remove(
          "item-count__button_hidden"
        );
      });
    }

    activeDropdown();
    //показ кнопки "очистить" в заранее открытых дропдаунах, если кол-во гостей > 0
    if (!checkCountScore(item_score)) {
      clear_button.classList.remove("dropdown__clear-button_hidden");
    }
  }

  //дропдаун комнат
  if (!checkTypeDropdown()) {
    //кнопка минус
    for (let minus of minuses) {
      minus.addEventListener("click", function () {
        let score = this.nextElementSibling;
        if (Number(score.innerHTML) > 0) {
          score.innerHTML = Number(score.innerHTML) - 1;
        }

        /*
    если счет возле кнопки минус равен нулю,
    то она становится прозрачной
    */
        if (Number(score.innerHTML) == 0) {
          this.classList.add("item-count__button_hidden");
        }
        letCorrectGuests(item_score);
      });
    }

    //кнопка плюс
    for (let plus of pluses) {
      plus.addEventListener("click", function () {
        let score = this.previousElementSibling;
        score.innerHTML = Number(score.innerHTML) + 1;

        letCorrectGuests(item_score);

        /* 
    получаем первый элемент в родительском узле, 
    т.е. кнопку минус и убираем прозрачность
        */
        this.parentElement.firstElementChild.classList.remove(
          "item-count__button_hidden"
        );
      });
    }

    activeDropdown();
  }

  //ф-ция, для установки корректных значений в дропдаунах открытых при загрузке страницы
  function activeDropdown() {
    //если значение гостей > 0
    if (!checkCountScore(item_score)) {
      //корректное значение гостей
      letCorrectGuests(item_score);

      //удаление прозрачности кнопки минус (при необходимости)
      for (let minus of minuses) {
        let score = minus.nextElementSibling;
        if (Number(score.innerHTML) !== 0) {
          minus.classList.remove("item-count__button_hidden");
        }
      }
    }

    //изменение стилей стрелочки material icons
    if (
      select_container.classList.contains("dropdown__select-container_open")
    ) {
      material_icon.classList.toggle("dropdown__material-icons_default");
      material_icon.classList.toggle("dropdown__material-icons_open");
    }
  }

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
    if (checkTypeDropdown()) {
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
        strChild = sumChild + " младенец";
      } else if (sumChild > 1 && sumChild <= 4) {
        strChild = sumChild + " младенца";
      } else if (sumChild >= 5 && sumChild <= 20) {
        strChild = sumChild + " младенцев";
      }

      if (sum == 0 && sumChild == 0) {
        placeholder.innerHTML = "Сколько гостей";
      } else if (sum == 0 && sumChild > 0) {
        placeholder.innerHTML = strChild;
      } else if (sum > 0 && sumChild == 0) {
        placeholder.innerHTML = str;
      } else {
        placeholder.innerHTML = str + ", " + strChild;
      }
    } else {
      let bedrooms = 0;
      let beds = 0;
      let bathrooms = 0;

      let str1 = "";
      let str2 = "";
      let str3 = "";

      for (let elem of array) {
        if (elem.classList.contains("item-count__bedrooms")) {
          bedrooms = bedrooms + Number(elem.innerHTML);
        } else if (elem.classList.contains("item-count__beds")) {
          beds = beds + Number(elem.innerHTML);
        } else if (elem.classList.contains("item-count__bathrooms")) {
          bathrooms = bathrooms + Number(elem.innerHTML);
        }
      }

      if (bedrooms == 1) {
        str1 = bedrooms + " спальня";
      } else if (bedrooms > 1 && bedrooms <= 4) {
        str1 = bedrooms + " спальни";
      } else if (bedrooms >= 5 && bedrooms <= 20) {
        str1 = bedrooms + " спален";
      }

      if (beds == 1) {
        str2 = beds + " кровать";
      } else if (beds > 1 && beds <= 4) {
        str2 = beds + " кровати";
      } else if (beds >= 5 && beds <= 20) {
        str2 = beds + " кроватей";
      }

      if (bathrooms == 1) {
        str3 = bathrooms + " ванная комната";
      } else if (bathrooms > 1 && bathrooms <= 4) {
        str3 = bathrooms + " ванные комнаты";
      } else if (bathrooms >= 5 && bathrooms <= 20) {
        str3 = bathrooms + " ванных комнат";
      }

      if (bedrooms == 0 && beds == 0 && bathrooms > 0) {
        placeholder.innerHTML = str3;
      } else if (bedrooms == 0 && beds > 0 && bathrooms > 0) {
        placeholder.innerHTML = str2 + ", " + str3;
      } else if (bedrooms > 0 && beds == 0 && bathrooms > 0) {
        placeholder.innerHTML = str1 + ", " + str3;
      } else if (bedrooms > 0 && beds > 0 && bathrooms > 0) {
        placeholder.innerHTML = str1 + ", " + str2 + ", " + str3;
      } else if (bedrooms > 0 && beds > 0 && bathrooms == 0) {
        placeholder.innerHTML = str1 + ", " + str2 + "...";
      } else if (bedrooms == 0 && beds > 0 && bathrooms == 0) {
        placeholder.innerHTML = str2;
      } else if (bedrooms == 0 && beds == 0 && bathrooms == 0) {
        placeholder.innerHTML = "Какие удобства";
      } else if (bedrooms > 0 && beds == 0 && bathrooms == 0) {
        placeholder.innerHTML = str1;
      }
    }
  }
});
