import '@components/rate-button/rate-button';
import 'lightslider';
import 'lightslider/dist/css/lightslider.min.css';
import './room-card.scss';

let roomSlider = document.querySelectorAll('.js-room-card__slider');

roomSlider.forEach((elem) => {
  $(document).ready(function () {
    $(elem).lightSlider({
      item: 1,
      nextHtml: '<i class="material-icons">expand_more</i>',
      prevHtml: '<i class="material-icons">expand_more</i>',
    });
  });
});
