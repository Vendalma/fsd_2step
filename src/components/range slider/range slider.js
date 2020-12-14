import "ion-rangeslider";
import "ion-rangeslider/js/ion.rangeSlider";
import "jquery";
import "./range slider.scss";

$(function () {
  $(".range").ionRangeSlider({
    keyboard: false,
    type: "double",
    min: 0,
    max: 15900,
    from: 5000,
    to: 10000,
    postfix: "₽",
    hide_min_max: true,
    prettify_enabled: true,
  });
});
