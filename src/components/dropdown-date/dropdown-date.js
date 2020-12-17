import "air-datepicker";
import "air-datepicker/dist/js/datepicker";
import "../description/description";
import "./dropdown-date.scss";

var $this = $("body").find(".js-dropdown-date_active");

$this.each(function () {
  let $this = $(this);

  /*
<----------------------------------------------------->

          Инициализация календаря на два инпута

<----------------------------------------------------->
*/

  if ($this.hasClass("js-dropdown-date_range")) {
    let $start = $(".js-dropdown-date__input_range-start");
    let picker = $(".js-dropdown-date__input_range-start").datepicker({
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
        $(".js-dropdown-date__input_range-start").val(fd.split("-")[0]);
        $(".js-dropdown-date__input_range-end").val(fd.split("-")[1]);
      },
    });

    $(".js-dropdown-date__input_range-end").on("click", () => {
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
    picker.hasClass('js-dropdown-date__set-date') ? setRange(picker) : null;
  }

  /*
  <----------------------------------------------------->
  
            Инициализация постоянно активного календаря
  
  <----------------------------------------------------->
  */
  if ($this.hasClass("js-dropdown-date_inline")) {
    $(".js-dropdown-date_inline").datepicker({
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
    addButtons($(".js-dropdown-date_inline"));
    setRange($(".js-dropdown-date_inline"));
  }

  /*
  <----------------------------------------------------->
  
            Инициализация календаря на один инпут
   
  <----------------------------------------------------->
  */

  if ($this.hasClass("js-dropdown-date_filter")) {
    $(".js-dropdown-date__input_filter").datepicker({
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
        $(".js-dropdown-date__input_filter").val(fd.toLowerCase());
      },
    });
    addButtons($(".js-dropdown-date__input_filter"));
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
