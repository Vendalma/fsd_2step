import '@/main';
import '@components/checkbox/checkbox';
import '@components/description/description';
import '@components/dropdown-date/dropdown-date';
import '@components/dropdown/dropdown';
import '@components/expandable-checkbox/expandable-checkbox';
import '@components/footer/footer';
import '@components/header/header';
import '@components/pagination/pagination';
import '@components/range-slider/range-slider';
import '@components/room-card/room-card';
import '@components/simple-footer/simple-footer';
import './search-room.scss';

let optionsBlock = document.querySelector('.js-search-room__menu');
let blockOpen = document.querySelector('.js-search-room__menu-item_opened');
let blockClose = document.querySelector('.js-search-room__menu-item_closed');
let filter = document.querySelector('.js-search-room__filter');
let rooms = document.querySelector('.js-search-room__rooms');

optionsBlock.addEventListener('click', openFilter.bind(this));

function openFilter() {
  blockOpen.classList.toggle('search-room__menu-item_hidden');
  blockClose.classList.toggle('search-room__menu-item_hidden');
  filter.classList.toggle('search-room__filter_visible');
  filter.classList.toggle('search-room__filter_hidden');
  rooms.classList.toggle('search-room__rooms_hidden');
}

window.addEventListener('resize', checkWindowSize.bind(this));
function checkWindowSize() {
  if (window.matchMedia('(max-width: 768px)').matches) {
    filter.classList.add('search-room__filter_hidden');
  } else {
    filter.classList.remove('search-room__filter_hidden');
  }
}

checkWindowSize();
