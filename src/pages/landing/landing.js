import BgSlider from '@/assets/js/change-bg';
import '@/main';
import '@components/footer/footer';
import '@components/header/init-header';
import '@components/search-card/search-card';
import '@components/simple-footer/simple-footer';
import './landing.scss';

const sliderWrapper = document.querySelector('.js-landing__content');
const images = [
  'url("../../assets/images/bg-image-1.jpg")',
  'url("../../assets/images/bg-image-2.jpg")',
  'url("../../assets/images/bg-image-3.jpg")',
];
const bgSlider = new BgSlider(sliderWrapper, images);
