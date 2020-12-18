import "@/main.scss";
import "@components/checkbox/checkbox";
import "@components/description/description";
import "@components/dropdown-date/dropdown-date";
import "@components/dropdown/dropdown";
import "@components/expandable-checkbox/expandable-checkbox";
import "@components/footer-small/footer-small";
import "@components/footer/footer";
import "@components/header/header";
import "@components/pagination/pagination";
import "@components/range slider/range slider";
import "@components/room-card/room-card";
import "./search-room.scss";



let optionsBlock = document.querySelector(".js-search-room__icon");
let blockMenu = document.querySelector(".js-search-room__icon_menu");
let blockClose = document.querySelector(".js-search-room__icon_close");
let filter = document.querySelector('.js-search-room__filter')
let rooms = document.querySelector('.js-search-room__rooms')

optionsBlock.addEventListener("click", openFilter.bind(this));

function openFilter() {
  blockMenu.classList.toggle("options__block_active");
  blockClose.classList.toggle("options__block_active");
  filter.classList.toggle("search-room_active");
  rooms.classList.toggle("search-room_close");
}