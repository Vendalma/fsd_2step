import "air-datepicker/dist/js/datepicker";
//import "../../library/air-datapicker/air-datapicker";
import "./dropdown-date.scss";

import "air-datepicker";
$(".dropdown-date__input").datepicker({
  navTitles: {
    days: "MM yyyy",
  },
  prevHtml: '<i class="material--icon">arrow_back</i>',
  nextHtml: '<i class="material--icon">arrow_forward</i>',
  clearButton: true,
});
let input_filter = document.querySelector(".dropdown-date__input_filter");
input_filter.setAttribute("data-multiple-dates-separator", " - ");
$(".dropdown-date__input_filter").datepicker({
  navTitles: {
    days: "MM yyyy",
  },
  prevHtml: '<i class="material--icon">arrow_back</i>',
  nextHtml: '<i class="material--icon">arrow_forward</i>',
  clearButton: true,
  range: true,
});

let dataPicker = document.querySelectorAll(".datepicker--buttons");

for (let elem of dataPicker) {
  let btn = document.createElement("span");
  btn.classList.add("datepicker--button");
  btn.classList.add("datepicker--button-color_one");
  btn.setAttribute("data-action", "button");
  btn.innerHTML = "Применить";
  elem.appendChild(btn);
}
