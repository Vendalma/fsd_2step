import "air-datepicker/dist/js/datepicker";
import "./dropdown-date.scss";
import "../description/description";
import "air-datepicker";

$(function () {
  let $start = $("#start"),
    $end = $("#end");

  let picker = $("#start")
    .datepicker({
      range: true,
      multipleDatesSeparator: "-",
      language: "en",
      navTitles: {
        days: "MM yyyy",
      },
      keyboardNav: false,
      clearButton: true,
      prevHtml: '<i class="material--icon">arrow_back</i>',
      nextHtml: '<i class="material--icon">arrow_forward</i>',

      onSelect: function (fd, d, picker) {
        $("#start").val(fd.split("-")[0]);
        $("#end").val(fd.split("-")[1]);
      },
    })
    .data("datepicker");

  $("#end").on("click", () => {
    picker.show();
  });
});

$(".dropdown-date__input_filter").datepicker({
  navTitles: {
    days: "MM yyyy",
  },
  prevHtml: '<i class="material--icon">arrow_back</i>',
  nextHtml: '<i class="material--icon">arrow_forward</i>',
  clearButton: true,
  range: true,
  multipleDatesSeparator: "-",
  monthsShort: [
    "янв",
    "фев",
    "мар",
    "апр",
    "май",
    "июн",
    "июл",
    "авг",
    "сен",
    "окт",
    "ноя",
    "дек",
  ],
  dateFormat: "dd M",
  keyboardNav: false,
});

let datePicker = document.querySelectorAll(".datepicker");

datePicker.forEach((elem) => {
  console.log(1);
  let buttons = elem.querySelector(".datepicker--buttons");
  let btn = document.createElement("span");
  btn.classList.add("datepicker--button");
  btn.classList.add("datepicker--button-color_one");
  btn.setAttribute("data-action", "button");
  btn.innerHTML = "Применить";
  buttons.appendChild(btn);
});
