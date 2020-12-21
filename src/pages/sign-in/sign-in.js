import "@/main.scss";
import "@components/footer-small/footer-small";
import "@components/footer/footer";
import "@components/header/header";
import "@components/sign-in-card/sign-in-card";
import "./sign-in.scss";

//change background by --> https://www.youtube.com/watch?v=NTqmimXu1XM
let signInContent = document.querySelector('.js-sign-in__content');
let images = [
  'url("assets/images/bg-image-1.jpg")',
  'url("assets/images/bg-image-4.jpg")',
]
function changeBg() {
  let bg = images[Math.floor(Math.random() * images.length)]
  signInContent.style.backgroundImage = bg;
}
setInterval(changeBg, 30000)