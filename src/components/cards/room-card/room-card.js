import "./room-card.scss";
import "../../../library/light slider/light-slider.scss";

import "@components/rate button/rate button";
import "lightslider/dist/js/lightslider";
import "lightslider";

let roomslider = document.querySelectorAll(".room-card__slider");

roomslider.forEach((elem) => {
  $(document).ready(function () {
    $(elem).lightSlider({
      item: 1,
      nextHtml: '<i class="material-icons">expand_more</i>',
      prevHtml: '<i class="material-icons">expand_more</i>',
    });
  });
});
