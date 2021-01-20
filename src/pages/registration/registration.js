import BgSlider from '@/assets/js/change-bg.js';
import "@/main.scss";
import "@components/footer-small/footer-small";
import "@components/footer/footer";
import "@components/header/header";
import "@components/registration-card/registration-card";
import "normalize.css";
import "./registration.scss";

let registrationContent = document.querySelector('.js-registration__content');
let images = [
  'url("../../assets/images/bg-image-1.jpg")',
  'url("../../assets/images/bg-image-4.jpg")',
]
new BgSlider(registrationContent, images)