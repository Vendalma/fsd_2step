import "air-datepicker/dist/js/datepicker";
import "./dropdown-date.scss";
import "../description/description";
import "air-datepicker";

/*let datePicker = document.querySelectorAll(".datepicker-here");

datePicker.forEach((elem) => {
  $(elem).datepicker({
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
    // setRange(inlineInput);
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
    let $start = $("#start");
    let $end = $("#end");
    let datepickers = elem;

    $(datepickers).datepicker({
      onSelect: function (fd, date) {
        $end
          .data("datepicker")
          .update("selectedDates", $start.data("datepicker").selectedDates);
        var start = fd.split("-")[0];
        var end = fd.split("-")[1];
        if (end) {
          $start.val(start);
          $end.val(end);
        } else {
          $end.val("");
        }
      },
    });

    /* $(endInput).on("click", () => {
      $(startInput).data("datepicker").show();
    });*/
//addButtons(elem);
//setRange(elem);
/*}

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
});

function setRange(elem) {
  $(elem)
    .data("datepicker")
    .selectDate([new Date("2019-08-19"), new Date("2019-08-23")]);
}
*/

var $start = $("#start"),
  $end = $("#end");
var $datepickers = $(".dropdown-date__input_double");

$datepickers.datepicker({
  //language: "ja",
  // offset: ,
  navTitles: {
    days: "<i>yyyy</i> MM",
    months: "yyyy",
    years: "yyyy1 - yyyy2",
  },
  //minDate: now,
  //maxDate: endDate,
  multipleDatesSeparator: "-",
  range: true,
  onSelect: function (fd, date) {
    $end
      .data("datepicker")
      .update("selectedDates", $start.data("datepicker").selectedDates);
    var start = fd.split("-")[0];
    var end = fd.split("-")[1];
    if (end) {
      $start.val(start);
      $end.val(end);
    } else {
      $end.val("");
    }
    console.log($end.data("datepicker"));
  },
});
$datepickers
  .data("datepicker")
  .selectDate([new Date("2019-08-19"), new Date("2019-08-23")]);
