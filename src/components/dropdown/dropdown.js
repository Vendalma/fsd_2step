import '../button/button';
import './dropdown.scss';

class Dropdown {
  constructor(container) {
    this.container = container;
    this.data = {};
    this.init();
    this.clickOnInput();
    this.checkMaterialIcons();
    this.clickClearButton();
    this.clickApplyButton();
    this.checkActiveDropdown();
    this.countClick();
  }

  init() {
    this.input = this.container.querySelector('.js-dropdown__input');
    this.selectList = this.container.querySelector('.js-dropdown__select-list');
    this.icon = this.container.querySelector('.js-dropdown__icon');
    this.countContainer = this.container.querySelectorAll('.dropdown__count');
    if (this.checkTypeDropdown()) {
      this.clearButton = this.container.querySelector(
        '.js-dropdown__button_type_clear'
      );
      this.applyButton = this.container.querySelector(
        '.js-dropdown__button_type_apply'
      );
    }
  }

  clickOnInput() {
    this.input.addEventListener('click', this.openContainer.bind(this));
  }

  openContainer() {
    this.selectList.classList.toggle('dropdown__select-list_closed');
    if (!this.checkTypeDropdown()) {
      this.selectList.classList.toggle('dropdown__select-list_opened');
    } else {
      this.selectList.classList.toggle('dropdown__select-list_opened');
    }

    this.input.classList.toggle('dropdown__input_closed');
    this.input.classList.toggle('dropdown__input_opened');

    this.icon.classList.toggle('dropdown__icon_default');
    this.icon.classList.toggle('dropdown__icon_open');
  }

  checkMaterialIcons() {
    if (this.input.classList.contains('dropdown__input_opened')) {
      this.icon.classList.toggle('dropdown__icon_closed');
      this.icon.classList.toggle('dropdown__icon_opened');
    }
  }

  onMinClick(elem) {
    let score = elem.nextElementSibling;
    if (Number(score.innerHTML) > 0) {
      score.innerHTML = Number(score.innerHTML) - 1;
    }
    if (Number(score.innerHTML) <= 0) {
      this.hideMinButton(elem);
    }
    return Number(score.innerHTML);
  }

  hideMinButton(elem) {
    elem.classList.add('dropdown__button_visibility_transparent');
  }

  setMinButton(elem) {
    elem.classList.remove('dropdown__button_visibility_transparent');
  }

  hideClearButton() {
    if (this.checkCountScore() && this.checkTypeDropdown()) {
      this.clearButton.classList.add('dropdown__button_visibility_hidden');
    }
  }

  setClearButton() {
    if (this.checkTypeDropdown()) {
      this.clearButton.classList.remove('dropdown__button_visibility_hidden');
    }
  }

  onPlusClick(elem) {
    let score = elem.previousElementSibling;
    score.innerHTML = Number(score.innerHTML) + 1;
    console.log(score.previousElementSibling);
    this.setMinButton(score.previousElementSibling);
    this.setClearButton();
    return Number(score.innerHTML);
  }

  countClick() {
    this.countContainer.forEach((item) => {
      item.addEventListener('click', this.onCountClick.bind(this));
      if (!this.data[item.dataset.id]) {
        this.data[item.dataset.id] = {};
        this.data[item.dataset.id].name = item.dataset.name;
      }
    });
  }

  onCountClick(event) {
    let score;
    if (event.target.classList.contains('js-dropdown__button_type_plus')) {
      score = this.onPlusClick(event.target);
    } else if (
      event.target.classList.contains('js-dropdown__button_type_min')
    ) {
      score = this.onMinClick(event.target);
    }
    let id = event.target.parentElement.dataset.id;
    this.data[id].score = score;
    this.renderStr();
  }

  checkTypeDropdown() {
    return this.container.classList.contains('dropdown_type_guests');
  }

  renderStr() {
    let str = '';
    for (let item in this.data) {
      const { name, score } = this.data[item];
      score > 0 &&
        (str += `${score} ${this.setRightName(score, name.split('|'))}, `);
    }
    if (str === '' && this.checkTypeDropdown()) {
      this.input.placeholder = 'Сколько гостей';
      this.hideClearButton();
    } else if (str === '' && !this.checkTypeDropdown()) {
      this.input.placeholder = 'Какие удобства';
      this.hideClearButton();
    } else {
      this.input.placeholder = str.substring(0, str.length - 2);
    }
  }

  setRightName(num, arrItemName) {
    num = Math.abs(num) % 100;
    var num1 = num % 10;
    if (num > 10 && num < 20) {
      return arrItemName[2];
    }
    if (num1 > 1 && num1 < 5) {
      return arrItemName[1];
    }
    if (num1 == 1) {
      return arrItemName[0];
    }
    return arrItemName[2];
  }

  checkCountScore() {
    for (let item in this.data) {
      if (this.data[item].score > 0) {
        return false;
      }
    }
    return true;
  }

  cleanScore() {
    for (let item in this.data) {
      this.data[item].score = 0;
      this.hideClearButton();
      this.renderStr();
    }
    this.countContainer.forEach((item) => {
      let scoreContainer = item.querySelector('.js-dropdown__score');
      scoreContainer.innerHTML = '0';

      let minButtons = item.querySelectorAll('.js-dropdown__button_type_min');
      minButtons.forEach((elem) => {
        this.hideMinButton(elem);
      });
    });
  }

  clickClearButton() {
    if (this.checkTypeDropdown()) {
      this.clearButton.addEventListener(
        'click',
        this.onClickClearButton.bind(this)
      );
    }
  }

  onClickClearButton() {
    this.cleanScore();
    this.hideClearButton();
  }

  clickApplyButton() {
    if (this.checkTypeDropdown()) {
      this.applyButton.addEventListener('click', this.openContainer.bind(this));
    }
  }

  checkActiveDropdown() {
    this.countContainer.forEach((item) => {
      let scoreContainer = item.querySelector('.js-dropdown__score');
      let min = item.querySelector('.js-dropdown__button_type_min');
      if (Number(scoreContainer.innerHTML) > 0) {
        this.data[item.dataset.id] = {};
        this.data[item.dataset.id].name = item.dataset.name;
        this.data[item.dataset.id].score = Number(scoreContainer.innerHTML);
        this.setMinButton(min);
        this.setClearButton();
      }
    });
    this.renderStr();
  }
}

let dropdown = document.querySelectorAll('.js-dropdown');
dropdown.forEach((elem) => {
  return new Dropdown(elem);
});
