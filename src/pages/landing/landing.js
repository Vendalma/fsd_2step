import BgSlider from '@/assets/js/change-bg.js';
import "@/main.scss";
import "@components/footer-small/footer-small";
import "@components/footer/footer";
import "@components/header/header";
import "@components/search-card/search-card";
import "normalize.css";
import "./landing.scss";

let sliderWrapper = document.querySelector('.js-landing__content');
let images = [
  'url("../../assets/images/bg-image-1.jpg")',
  'url("../../assets/images/bg-image-2.jpg")',
  'url("../../assets/images/bg-image-3.jpg")'
]
new BgSlider(sliderWrapper, images)