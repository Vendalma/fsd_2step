import "./calc-card.scss";

import "@components/dropdown-date/dropdown-date";
import "@components/dropdown/dropdown";
import "@components/description/description";

let page = document.querySelector("html");
let endBlock = document.querySelector(".dropdown-date__double-end");
let totalSum = document.querySelector(".calc-card__total-sum");
let sumOne = document.querySelector(".calc-card__sum-one");
let priceNum = document.querySelector(".calc-card__price_num");
let days = endBlock.dataset.days;
letCorrectPrice(days, totalSum, sumOne);

page.addEventListener("click", function () {
  days = endBlock.dataset.days;
  letCorrectPrice(days, totalSum, sumOne);
});

function letCorrectPrice(days, totalSum, sumOne) {
  let daysPrice = document.querySelector(".calc-card__days-price");
  daysPrice.innerHTML =
    priceNum.innerHTML + " x " + days + letCorrectDayName(days);

  letTotalSum(totalSum, sumOne, days);
}

function letReplaceNum(sumOne, days) {
  let priceNumber = letCorrectNumberPrice(priceNum);
  let sumOneNum = 0;
  sumOneNum = priceNumber * Number(days);
  sumOne.innerHTML =
    (sumOneNum + "").replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ") + "₽";

  return sumOneNum;
}

//ф-ция отрезает символ рубля в строке со стоимостью номера
function letCorrectNumberPrice(priceNum) {
  let re1 = /\D/;
  let priceNumStr = priceNum.innerHTML.split(re1).join("");

  return Number(priceNumStr);
}

function letTotalSum(totalSum, sumOne, days) {
  let sumTwo = 2179;
  let sumThree = 300;

  totalSum.innerHTML =
    (letReplaceNum(sumOne, days) - sumTwo + sumThree + "").replace(
      /(\d)(?=(\d\d\d)+([^\d]|$))/g,
      "$1 "
    ) + "₽";
}

function letCorrectDayName(days) {
  let str;
  if (days == 1 || days == 21 || days == 31) {
    return (str = " сутки");
  } else {
    return (str = " суток");
  }
}
