import BgSlider from '@/assets/js/change-bg.js';
import '@/main.scss';
import '@components/footer/footer';
import '@components/header/header';
import '@components/sign-in-card/sign-in-card';
import '@components/simple-footer/simple-footer';
import 'normalize.css';
import './sign-in.scss';

let signInContent = document.querySelector('.js-sign-in__content');
let images = [
  'url("../../assets/images/bg-image-1.jpg")',
  'url("../../assets/images/bg-image-4.jpg")',
];
new BgSlider(signInContent, images);
