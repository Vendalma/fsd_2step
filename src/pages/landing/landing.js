import "@/main.scss";
import "@components/footer-small/footer-small";
import "@components/footer/footer";
import "@components/header/header";
import "@components/search-card/search-card";
import "./landing.scss";

//change background by --> https://www.youtube.com/watch?v=NTqmimXu1XM
let sliderWrapper = document.querySelector('.js-landing__content');
let images = [
  'url("assets/images/bg-image-1.jpg")',
  'url(assets/images/bg-image-2.jpg")',
  'url("assets/images/bg-image-3.jpg")'
]
function changeBg() {
  let bg = images[Math.floor(Math.random() * images.length)]
  sliderWrapper.style.backgroundImage = bg;
}

setInterval(changeBg, 30000)