import "./landing.scss";

import "@layout/website-base/website-base";
import "@layout/header/header";
import "@layout/footer/footer";
import "@layout/footer-small/footer-small";
import "@layout/cards/search-card/search-card";

import "@/main.scss";

//идея реализации слайдера позаимствоана здесь --> http://gnatkovsky.com.ua/plavnaya-smena-fona-s-ispolzovaniem-jquery.html

$(function () {
  var transTime = 40000;
  var numBgColors = $(".landing-page__slider_item").length;
  var bgtrans = setInterval(function () {
    if (
      $(".landing-page__slider_active").index() ==
      $(".landing-page__slider_item").length - 1
    ) {
      $(".landing-page__slider_active").removeClass(
        "landing-page__slider_active"
      );
      $(".landing-page__slider_item")
        .eq(0)
        .addClass("landing-page__slider_active");
    } else {
      var curIndex = $(
        ".landing-page__slider_item.landing-page__slider_active"
      ).index();
      $(".landing-page__slider_item.landing-page__slider_active").removeClass(
        "landing-page__slider_active"
      );
      $(".landing-page__slider_item")
        .eq(curIndex + 1)
        .addClass("landing-page__slider_active");
    }
  }, transTime);
});
