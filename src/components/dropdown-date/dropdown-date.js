import "air-datepicker/dist/js/datepicker";
import "./dropdown-date.scss";
import "../description/description";
import "air-datepicker";

/*
<----------------------------------------------------->

          Инициализация календаря на два инпута

<----------------------------------------------------->
*/

let $start = $(".dropdown-date__input_double-start");
let $end = $(".dropdown-date__input_double-end");
let start = document.querySelector(".dropdown-date__input_double-start");

let picker = $(".dropdown-date__input_double-start").datepicker({
  range: true,
  multipleDates: true,
  multipleDatesSeparator: " - ",
  language: "ru",
  navTitles: {
    days: "MM yyyy",
  },
  keyboardNav: false,
  clearButton: true,
  prevHtml: '<i class="material--icon">arrow_back</i>',
  nextHtml: '<i class="material--icon">arrow_forward</i>',

  onSelect: function (fd, d, picker) {
    $(".dropdown-date__input_double-start").val(fd.split("-")[0]);
    $(".dropdown-date__input_double-end").val(fd.split("-")[1]);
  },
});

$(".dropdown-date__input_double-end").on("click", () => {
  picker.data("datepicker").show();
});

addButtons(picker);
if (start.classList.contains("dropdown-date__input_range")) {
  setRange(picker);
}
selectedDatesArray(picker);

/*
<----------------------------------------------------->

          Инициализация постоянно активного календаря

<----------------------------------------------------->
*/

let inline = $(".dropdown-date.dropdown-date__inline");
inline.datepicker({
  range: true,
  multipleDates: true,
  multipleDatesSeparator: " - ",
  language: "ru",
  navTitles: {
    days: "MM yyyy",
  },
  keyboardNav: false,
  clearButton: true,
  prevHtml: '<i class="material--icon">arrow_back</i>',
  nextHtml: '<i class="material--icon">arrow_forward</i>',
  onRenderCell: function (date, cellType) {
    if (
      date.getDate() == "8" &&
      date.getMonth() == "7" &&
      date.getFullYear() == "2019" &&
      cellType == "day"
    ) {
      return {
        classes: "datepicker--cell -current-",
      };
    }
  },
});
addButtons(inline);
setRange(inline);

/*
<----------------------------------------------------->

          Инициализация календаря на один инпут
 
<----------------------------------------------------->
*/

/* }

  function filter(elem) {
    let filterInput = elem;
    $(filterInput).datepicker({
      dateFormat: "dd M",
      onSelect: function (fd, d) {
        $(filterInput).val(fd.toLowerCase());
      },
    });
    addButtons(filterInput);
  }

  


}

var $start = $("#start"),
  $end = $("#end");
//var $datepickers = $(".dropdown-date__input_double");

/* //language: "ja",
  // offset: ,
  navTitles: {
    days: "<i>yyyy</i> MM",
    months: "yyyy",
    years: "yyyy1 - yyyy2",
  },
  //minDate: now,
  //maxDate: endDate,
  multipleDatesSeparator: "-",
  //range: true,
*/
/*$datepickers
  .data("datepicker")
  .selectDate([new Date("2019-08-19"), new Date("2019-08-23")]);
*/

//фун-ция добавления кнопки 'Применить'
function addButtons(elem) {
  let applyButton = document.createElement("span");
  applyButton.setAttribute("data-action", "apply");
  applyButton.classList.add("datepicker--button");
  applyButton.classList.add("datepicker--button-colored");
  applyButton.innerHTML = "Применить";

  applyButton.addEventListener("click", function () {
    elem.data("datepicker").hide();
    selectedDatesArray(picker);
  });

  let buttons = $(elem)
    .data("datepicker")
    .$datepicker.find(".datepicker--buttons");

  buttons.append(applyButton);
}

//ф-ция устанавливает интервал дат
function setRange(elem) {
  elem
    .data("datepicker")
    .selectDate([new Date("2019-08-19"), new Date("2019-08-23")]);
}

//ф-ция получения кол-ва дней в интервале дат
function selectedDatesArray(elem) {
  let dayOne = elem.data("datepicker").selectedDates[0];
  let dayTwo = elem.data("datepicker").selectedDates[1];
  let days = (dayTwo - dayOne) / (24 * 60 * 60 * 1000);
  let end = document.querySelector(".dropdown-date__input_double-end");
  return end.setAttribute("data-days", days);
}
