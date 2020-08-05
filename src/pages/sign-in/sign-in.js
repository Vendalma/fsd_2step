import "./sign-in.scss";

import "@layout/website-base/website-base";
import "@layout/header/header";
import "@layout/footer/footer";
import "@layout/footer-small/footer-small";
import "@layout/cards/sign-in-card/sign-in-card";

import "@/main.scss";

//идея реализации слайдера позаимствована здесь --> http://gnatkovsky.com.ua/plavnaya-smena-fona-s-ispolzovaniem-jquery.html

$(function () {
  var transTime = 40000;
  var numBgColors = $(".sign-in__slider_item").length;
  var bgtrans = setInterval(function () {
    if (
      $(".sign-in__slider_active").index() ==
      $(".sign-in__slider_item").length - 1
    ) {
      $(".sign-in__slider_active").removeClass("sign-in__slider_active");
      $(".sign-in__slider_item").eq(0).addClass("sign-in__slider_active");
    } else {
      var curIndex = $(".sign-in__slider_item.sign-in__slider_active").index();
      $(".sign-in__slider_item.sign-in__slider_active").removeClass(
        "sign-in__slider_active"
      );
      $(".sign-in__slider_item")
        .eq(curIndex + 1)
        .addClass("sign-in__slider_active");
    }
  }, transTime);
});
