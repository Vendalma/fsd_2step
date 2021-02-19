class SearchRoom {
  constructor() {
    this.init();
    this.clickOptionsBlock();
    this.resizeWindow();
    this.checkWindowSize();
  }

  init() {
    this.optionsBlock = document.querySelector('.js-search-room__menu');
    this.blockOpen = document.querySelector(
      '.js-search-room__menu-item_opened',
    );
    this.blockClose = document.querySelector(
      '.js-search-room__menu-item_closed',
    );
    this.filter = document.querySelector('.js-search-room__filter');
    this.rooms = document.querySelector('.js-search-room__rooms');
  }

  clickOptionsBlock() {
    this.optionsBlock.addEventListener('click', this.openFilter.bind(this));
  }

  openFilter() {
    this.blockOpen.classList.toggle('search-room__menu-item_hidden');
    this.blockClose.classList.toggle('search-room__menu-item_hidden');
    this.filter.classList.toggle('search-room__filter_visible');
    this.filter.classList.toggle('search-room__filter_hidden');
    this.rooms.classList.toggle('search-room__rooms_hidden');
  }

  resizeWindow() {
    window.addEventListener('resize', this.checkWindowSize.bind(this));
  }

  checkWindowSize() {
    if (window.matchMedia('(max-width: 768px)').matches) {
      this.filter.classList.add('search-room__filter_hidden');
    } else {
      this.filter.classList.remove('search-room__filter_hidden');
    }
  }
}

export default SearchRoom;
