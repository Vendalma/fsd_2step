import "@/main.scss";
import "@components/footer-small/footer-small";
import "@components/footer/footer";
import "@components/header/header";
import "@components/registration-card/registration-card";
import "./registration.scss";



//идея реализации слайдера позаимствована здесь --> http://gnatkovsky.com.ua/plavnaya-smena-fona-s-ispolzovaniem-jquery.html

$(function () {
  var transTime = 40000;
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
