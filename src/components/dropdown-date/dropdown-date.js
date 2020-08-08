import "air-datepicker/dist/js/datepicker";
import "./dropdown-date.scss";
import "../description/description";
import "air-datepicker";

var $this = $("body").find(".dropdown-date_active");

$this.each(function () {
  let $this = $(this);

  /*
<----------------------------------------------------->

          Инициализация календаря на два инпута

<----------------------------------------------------->
*/

  if ($this.hasClass("dropdown-date_active_double")) {
    let $start = $(".dropdown-date__double-start");
    let $end = $(".dropdown-date__double-end");
    let start = document.querySelector(".dropdown-date__double-start");

    let picker = $(".dropdown-date__double-start").datepicker({
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
        $(".dropdown-date__double-start").val(fd.split("-")[0]);
        $(".dropdown-date__double-end").val(fd.split("-")[1]);
      },
    });

    $(".dropdown-date__double-end").on("click", () => {
      picker.data("datepicker").show();
    });

    let applyButton = document.createElement("span");
    applyButton.setAttribute("data-action", "apply");
    applyButton.classList.add("datepicker--button");
    applyButton.classList.add("datepicker--button-colored");
    applyButton.innerHTML = "Применить";

    applyButton.addEventListener("click", function () {
      $start.data("datepicker").hide();
    });

    let buttons = picker
      .data("datepicker")
      .$datepicker.find(".datepicker--buttons");

    buttons.append(applyButton);

    if ($this.children().hasClass("dropdown-date__range")) {
      setRange(picker);
    }
  }

  /*
  <----------------------------------------------------->
  
            Инициализация постоянно активного календаря
  
  <----------------------------------------------------->
  */
  if ($this.hasClass("dropdown-date__inline")) {
    $(".dropdown-date__inline").datepicker({
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
    addButtons($(".dropdown-date__inline"));
    setRange($(".dropdown-date__inline"));
  }

  /*
  <----------------------------------------------------->
  
            Инициализация календаря на один инпут
   
  <----------------------------------------------------->
  */

  if ($this.hasClass("dropdown-date_active_filter")) {
    $(".dropdown-date__filter").datepicker({
      language: "ru",
      range: true,
      multipleDates: true,
      multipleDatesSeparator: " - ",
      dateFormat: "dd M",
      navTitles: {
        days: "MM yyyy",
      },
      keyboardNav: false,
      clearButton: true,
      prevHtml: '<i class="material--icon">arrow_back</i>',
      nextHtml: '<i class="material--icon">arrow_forward</i>',
      onSelect: function (fd, d) {
        $(".dropdown-date__filter").val(fd.toLowerCase());
      },
    });
    addButtons($(".dropdown-date__filter"));
  }

  //фун-ция добавления кнопки 'Применить'
  function addButtons(elem) {
    let applyButton = document.createElement("span");
    applyButton.setAttribute("data-action", "apply");
    applyButton.classList.add("datepicker--button");
    applyButton.classList.add("datepicker--button-colored");
    applyButton.innerHTML = "Применить";

    applyButton.addEventListener("click", function () {
      elem.data("datepicker").hide();
    });

    let buttons = elem
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
});
