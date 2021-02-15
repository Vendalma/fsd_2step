import BgSlider from '@/assets/js/change-bg.js';
import '@/main';
import '@components/footer/footer';
import '@components/header/header';
import '@components/registration-card/registration-card';
import '@components/simple-footer/simple-footer';
import './registration.scss';

const registrationContent = document.querySelector('.js-registration__content');
const images = [
  'url("../../assets/images/bg-image-1.jpg")',
  'url("../../assets/images/bg-image-4.jpg")',
];
new BgSlider(registrationContent, images);
