import "@/main.scss";
import "@components/footer-small/footer-small";
import "@components/footer/footer";
import "@components/header/header";
import "@components/registration-card/registration-card";
import "normalize.css";
import "./registration.scss";

//change background by --> https://www.youtube.com/watch?v=NTqmimXu1XM
let registrationContent = document.querySelector('.js-registration__content');
let images = [
  'url("assets/images/bg-image-1.jpg")',
  'url("assets/images/bg-image-4.jpg")',
]
function changeBg() {
  let bg = images[Math.floor(Math.random() * images.length)]
  registrationContent.style.backgroundImage = bg;
}
setInterval(changeBg, 30000)