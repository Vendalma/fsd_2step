import "air-datepicker/dist/js/datepicker";
import "./dropdown-date.scss";
import "../description/description";
import "air-datepicker";

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

let datePicker = document.querySelectorAll(".datepicker-here");

datePicker.forEach((elem) => {
  $(elem).datepicker({
    range: true,
    multipleDates: 2,
    multipleDatesSeparator: "-",
    language: "ru",
    navTitles: {
      days: "MM yyyy",
    },
    keyboardNav: false,
    clearButton: true,
    prevHtml: '<i class="material--icon">arrow_back</i>',
    nextHtml: '<i class="material--icon">arrow_forward</i>',
  });

  if (elem.classList.contains("dropdown-date__inline")) {
    inline(elem);
  } else if (elem.classList.contains("dropdown-date__input_double")) {
    double(elem);
  }

  function inline(elem) {
    addButtons($(elem));
  }

  function double(elem) {
    let start = elem;
    let end = document.querySelector(".dropdown-date__input-end");

    $(start).datepicker({
      onSelect: function (fd, d, picker) {
        $(start).val(fd.split("-")[0]);
        $(end).val(fd.split("-")[1]);
      },
    });
    $(end).on("click", () => {
      $(start).data("datepicker").show();
    });
    addButtons($(start));
  }

  function addButtons(elem) {
    let applyButton = document.createElement("span");
    applyButton.setAttribute("data-action", "apply");
    applyButton.classList.add("datepicker--button");
    applyButton.classList.add("datepicker--button-colored");
    applyButton.innerHTML = "Применить";

    let buttons = elem
      .data("datepicker")
      .$datepicker.find(".datepicker--buttons");

    buttons.append(applyButton);
  }
});
