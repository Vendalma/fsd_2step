import "./range slider.scss";
import "ion-rangeslider/js/ion.rangeSlider";
//import "ion-rangeslider/css/ion.rangeSlider.css";
import "ion-rangeslider";
import "jquery";

$(function () {
  $("#range").ionRangeSlider({
    keyboard: false,
    type: "double",
    min: 0,
    max: 15000,
    from: 5000,
    to: 10000,
    postfix: "₽",
    hide_min_max: true,
    prettify_enabled: true,
  });
});
