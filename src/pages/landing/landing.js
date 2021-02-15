import BgSlider from '@/assets/js/change-bg.js';
import '@/main';
import '@components/footer/footer';
import '@components/header/header';
import '@components/search-card/search-card';
import '@components/simple-footer/simple-footer';
import './landing.scss';

const sliderWrapper = document.querySelector('.js-landing__content');
const images = [
  'url("../../assets/images/bg-image-1.jpg")',
  'url("../../assets/images/bg-image-2.jpg")',
  'url("../../assets/images/bg-image-3.jpg")',
];
new BgSlider(sliderWrapper, images);
