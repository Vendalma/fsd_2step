import "./search-room.scss";

import "@layout/website-base/website-base";
import "@layout/header/header";
import "@layout/footer/footer";
import "@layout/footer-small/footer-small";
import "@components/description/description";
import "@components/dropdown/dropdown";
import "@components/dropdown-date/dropdown-date";
import "@components/checkbox/checkbox";
import "@components/range slider/range slider";
import "@components/expandable-checkbox/expandable-checkbox";
import "@layout/cards/room-card/room-card";
import "@components/pagination/pagination";

import "@/main.scss";

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
