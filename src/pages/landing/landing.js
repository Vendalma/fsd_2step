import "@/main.scss";
import "@components/footer-small/footer-small";
import "@components/footer/footer";
import "@components/header/header";
import "@components/search-card/search-card";
import "./landing.scss";



//идея реализации слайдера позаимствована здесь --> http://gnatkovsky.com.ua/plavnaya-smena-fona-s-ispolzovaniem-jquery.html

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
