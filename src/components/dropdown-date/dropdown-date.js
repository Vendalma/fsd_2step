import "air-datepicker/dist/js/datepicker";
import "./dropdown-date.scss";
import "../description/description";
import "air-datepicker";

let datePicker = document.querySelectorAll(".datepicker-here");

datePicker.forEach((elem) => {
  $(elem).datepicker({
    range: true,
    multipleDates: 2,
    multipleDatesSeparator: " - ",
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
  } else if (elem.classList.contains("dropdown-date__input_filter")) {
    filter(elem);
  }

  function inline(elem) {
    let inlineInput = elem;
    addButtons(inlineInput);
    setRange(inlineInput);
    $(inlineInput).datepicker({
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
  }

  function double(elem) {
    let startInput = elem;
    let endInput = document.querySelector(".dropdown-date__input-end");

    $(startInput).datepicker({
      minDate: new Date(),
      onSelect: function (fd, d, picker) {
        $(startInput).val(fd.split("-")[0]);
        $(endInput).val(fd.split("-")[1]);
      },
    });
    $(endInput).on("click", () => {
      $(startInput).data("datepicker").show();
    });
    addButtons(startInput);
  }

  function filter(elem) {
    let filterInput = elem;
    $(filterInput).datepicker({
      minDate: new Date(),
      dateFormat: "dd M",
      onSelect: function (fd, d) {
        $(filterInput).val(fd.toLowerCase());
      },
    });
    addButtons(filterInput);
  }

  function addButtons(elem) {
    let applyButton = document.createElement("span");
    applyButton.setAttribute("data-action", "apply");
    applyButton.classList.add("datepicker--button");
    applyButton.classList.add("datepicker--button-colored");
    applyButton.innerHTML = "Применить";

    applyButton.addEventListener("click", function () {
      $(elem).data("datepicker").hide();
    });

    let buttons = $(elem)
      .data("datepicker")
      .$datepicker.find(".datepicker--buttons");

    buttons.append(applyButton);
  }

  function setRange(elem) {
    let rangeDates = ["2019-08-19", "2019-08-23"];

    $(elem)
      .data("datepicker")
      .selectDate(rangeDates.map((date) => new Date(date)));
  }
});
