import "./registration.scss";

import "@layout/website-base/website-base";
import "@layout/header/header";
import "@layout/footer/footer";
import "@layout/cards/registration-card/registration-card";

import "@/main.scss";

//идея реализации слайдера позаимствоана здесь --> http://gnatkovsky.com.ua/plavnaya-smena-fona-s-ispolzovaniem-jquery.html

$(function () {
  var transTime = 5000;
  var numBgColors = $(".registration-page__slider_item").length;
  var bgtrans = setInterval(function () {
    if (
      $(".registration-page__slider_active").index() ==
      $(".registration-page__slider_item").length - 1
    ) {
      $(".registration-page__slider_active").removeClass(
        "registration-page__slider_active"
      );
      $(".registration-page__slider_item")
        .eq(0)
        .addClass("registration-page__slider_active");
    } else {
      var curIndex = $(
        ".registration-page__slider_item.registration-page__slider_active"
      ).index();
      $(
        ".registration-page__slider_item.registration-page__slider_active"
      ).removeClass("registration-page__slider_active");
      $(".registration-page__slider_item")
        .eq(curIndex + 1)
        .addClass("registration-page__slider_active");
    }
  }, transTime);
});
