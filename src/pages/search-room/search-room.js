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



let optionsBlock = document.querySelector(".options");
let blockMenu = document.querySelector(".options__block_menu");
let blockClose = document.querySelector(".options__block_close");
let filter = document.querySelector(".filter");
let rooms = document.querySelector(".rooms");

optionsBlock.addEventListener("click", function () {
  blockMenu.classList.toggle("options__block_active");
  blockClose.classList.toggle("options__block_active");
  filter.classList.toggle("search-room_active");
  rooms.classList.toggle("search-room_close");
});
